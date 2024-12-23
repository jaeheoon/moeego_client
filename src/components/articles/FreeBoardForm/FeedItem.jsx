import React from 'react';
import '../../../css/articles/FeedItem.css';

const FeedItem = ({ item }) => {
    return (
        <div className='itemWrap'>
            <div className='itemWrap-content'>
                <div className='itemWrap-title_content'>
                    <div className='itemTitleWrap'>
                        <div>{item.subject}</div>
                    </div>
                    <div className="itemContentWrap">
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {item.content}
                        </div>
                    </div>
                </div>
                <div className='itemWrap-img'>
                    {item.imageUuids && item.imageUuids.length > 0 && (
                        <img
                            src={`https://kr.object.ncloudstorage.com/moeego/storage/${item.imageUuids[0]}`}
                            alt='Feed Image'
                        />
                    )}
                </div>
            </div>
            <div className='itemWrap-location'>
                {item.area == '지역' ? "" : item.area}
            </div>

            <div className='itemWrap-bot'>
                <div className='imageWrap'>
                    <div>
                        <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path fill="#b2b2b2" fillRule="evenodd" d="M7.596 1.516l-2.56 5.759V14.5h7.475a.75.75 0 00.741-.637l.994-6.55a.75.75 0 00-.741-.862H9.738c-.69 0-1.25-.56-1.25-1.25V2.575c0-.53-.385-.972-.892-1.06zM3.536 14.5V7.866H2.25a.75.75 0 00-.75.75v5.134c0 .414.336.75.75.75h1.287zM3.8 6.366L6.31.716A1.206 1.206 0 017.412 0a2.575 2.575 0 012.576 2.575v2.376h3.517a2.25 2.25 0 012.224 2.588l-.994 6.549A2.25 2.25 0 0112.511 16H2.25A2.25 2.25 0 010 13.75V8.616a2.25 2.25 0 012.25-2.25H3.8z" clipRule="evenodd"/></g></svg>
                        <span>{item.likes}</span>
                    </div>
                    <div>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z" fill="#b2b2b2"></path> <path fillRule="evenodd" clipRule="evenodd" d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z" fill="#b2b2b2"></path> </g></svg>
                        <span>{item.view}</span>
                    </div>
                    <div>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b2b2b2">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#b2b2b2" strokeWidth="1.5" /> </g>
                        </svg>
                        <span>{item.commentCount}</span>
                    </div>
                </div>
                <div className='written-time-warp'>
                    <div>{item.elapsedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;
