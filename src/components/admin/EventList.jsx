import React, { useState, useEffect, useContext } from 'react';
import '../../css/admin/EventList.css';
import apiAxios from '../../api/apiAxios';
import { AuthContext } from '../../context/member/AuthContext';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [tableData, setTableData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const userNo = localStorage.getItem("userno");
    const ImagePath = "https://kr.object.ncloudstorage.com/moeego/storage/";
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subject: '',
        type: 1,
        content: '',
        memberNo: userNo,
        images: [],
    });

    const [removeImages, setRemoveImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    const { setIsLoggedIn, setLoginStatus } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태
    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = window.localStorage.getItem("login") === 'true'; // 로그인 상태 확인
            const memberStatus = window.localStorage.getItem("memberStatus"); // 관리자 여부 확인

            if (!isLoggedIn) {
                // 로그인하지 않은 경우
                navigate('/admin/login'); // 로그인 페이지로 리디렉션
            } else if (memberStatus !== "ROLE_ADMIN") {
                // 관리자가 아닌 경우
                alert("관리자만 접근할 수 있습니다.");
                navigate('/'); // 대시보드가 아닌 다른 페이지로 리디렉션
            } else {
                setIsAdmin(true); // 관리자인 경우
            }
        };

        checkLoginStatus();
    }, [navigate]); // `navigate`가 변경될 때마다 실행되도록 의존성 추가

    const fetchEvents = async () => {
        try {
            const { data } = await apiAxios.get('/api/admin/article');
            setTableData(data);
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const openModal = (event = null) => {
        setSelectedEvent(event);
        
        setFormData({
            subject: event ? event.subject : '',
            type: event ? (event.type === '이벤트' ? 1 : 0) : 1,
            content: event ? event.content : '',
            images: event && event.imageUuidNames ? event.imageUuidNames : [],
            memberNo: userNo
        });
        
        setRemoveImages([]); // 삭제할 이미지 배열 초기화
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'type' ? (value === 'event' ? 1 : 0) : value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const maxFileSize = 20 * 1024 * 1024;  // 20MB
        const maxFileCount = 5;

        let newImages = [];
        let isFileTooLarge = false;
        let exceededFiles = 0;

        files.forEach(file => {
            if (file.size > maxFileSize) {
                isFileTooLarge = true;
            } else if (newImages.length < maxFileCount) {
                newImages.push(file);
            } else {
                exceededFiles++;
            }
        });

        if (isFileTooLarge) {
            alert(`파일 크기는 ${maxFileSize / 1024 / 1024}MB를 초과할 수 없습니다.`);
        }
        if (exceededFiles > 0) {
            alert(`최대 ${maxFileCount}장까지만 업로드 가능합니다.`);
        }

        setFormData(prevData => ({
            ...prevData,
            images: [...prevData.images, ...newImages],
        }));
    };

    const handleRemoveFile = (fileToRemove) => {
        if (typeof fileToRemove === 'string') {
            setRemoveImages(prevRemoveImages => [...prevRemoveImages, fileToRemove]);
        }
        setFormData(prevData => ({
            ...prevData,
            images: prevData.images.filter(file => file !== fileToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const articleDto = {
            subject: formData.subject,
            type: formData.type,
            content: formData.content
        };

        const data = new FormData();
        Object.keys(articleDto).forEach(key => {
            data.append(key, articleDto[key]);
        });

        removeImages.forEach(image => {
            data.append('removeImages', image);
        });

        formData.images.forEach(image => {
            if (typeof image === 'string') {
                data.append('existingImageIds', image);
            } else {
                data.append('images', image);
            }
        });

        try {
            if (selectedEvent) {
                await apiAxios.put(`/api/admin/article/update/${selectedEvent.articleNo}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('이벤트가 수정되었습니다.');
            } else {
                await apiAxios.post(`/api/admin/article/write`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('새 이벤트가 등록되었습니다.');
            }

            fetchEvents();
            closeModal();
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    const handleDelete = async (articleNo) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await apiAxios.delete(`/api/admin/article/delete/${articleNo}`);
                alert('이벤트가 삭제되었습니다.');
                fetchEvents();
            } catch (error) {
                console.error('삭제 오류:', error);
            }
        }
    };

    const formatDate = (date) => {
        if (!date) return ''; 
        return new Date(date).toLocaleDateString('ko-KR');
    };

    const groupedData = tableData.reduce((acc, item) => {
        const { articleNo, imageUuidNames } = item;
        if (!acc[articleNo]) {
            acc[articleNo] = { ...item, images: imageUuidNames || [] };
        }
        return acc;
    }, {});

    const groupedDataArray = Object.values(groupedData);

    const filteredData = groupedDataArray.filter(item => {
        const matchesSearchTerm = item.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || (selectedType === 'event' && item.type === 1) || (selectedType === 'notice' && item.type === 0);
        return matchesSearchTerm && matchesType;
    });

    return (
        <div className="eventList-container">
            <div className="eventList-inner-container">
                <h1 className="eventList-title">이벤트 및 공지 게시판</h1>
                <hr className="eventList-divider" />
                <div className="eventList-search-container">
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="eventList-select"
                    >
                        <option value="all">전체</option>
                        <option value="event">이벤트</option>
                        <option value="notice">공지</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className="eventList-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>등록일</th>
                            <th>수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.articleNo} onClick={() => openModal(row)}>
                                <td>{row.articleNo}</td>
                                <td>{row.type === 1 ? '이벤트' : '공지'}</td>
                                <td>{row.subject}</td>
                                <td>{formatDate(row.writeDate)}</td>
                                <td>
                                    <button 
                                        className="eventList-delete-button" 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleDelete(row.articleNo); 
                                        }}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="eventList-register-button" onClick={() => openModal()}>
                    새 이벤트 및 공지 등록
                </button>
            </div>

            {modalOpen && (
                <div className="eventList-modal-container">
                    <div className="eventList-modal-content">
                        <div className="eventList-modal-header">
                            <h2>{selectedEvent ? '이벤트 수정' : '새 이벤트 등록'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="eventList-modal-body">
                            <div className="modal-body-content">
                                <div className="left-section">
                                    <div className="title-section">
                                        <label>제목</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="category-section">
                                        <label>카테고리</label>
                                        <select
                                            name="type"
                                            value={formData.type === 1 ? 'event' : 'notice'}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="event">이벤트</option>
                                            <option value="notice">공지</option>
                                        </select>
                                    </div>

                                    <div className="eventList-upload-section">
                                        <label>사진 업로드</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <div className="eventList-upload-preview">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="eventList-upload-preview-item">
                                                    {typeof image === 'string' ? (
                                                        <img
                                                            src={ImagePath + image}
                                                            alt={`미리보기 ${index + 1}`}
                                                            className="event-image"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt={`미리보기 ${index + 1}`}
                                                            className="event-image"
                                                        />
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFile(image)}
                                                        className="eventList-remove-button"
                                                    >
                                                        제거
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="right-section">
                                    <div className="content-section">
                                        <label>내용</label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="eventList-modal-footer">
                                <button type="submit" className="eventList-save-button">
                                    {selectedEvent ? '수정' : '등록'}
                                </button>
                                <button type="button" className="eventList-cancel-button" onClick={closeModal}>
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventList;