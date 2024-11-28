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
                    <img src='/image/cleaning.png' alt='Cleaning' />
                </div>
            </div>
            <div className='itemWrap-location'>
                서울
            </div>

            <div className='itemWrap-bot'>
                <div className='imageWrap'>
                    <div>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z" fill="#b2b2b2"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z" fill="#b2b2b2"></path> </g></svg>
                        <span>{item.view}</span>
                    </div>
                    <div>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b2b2b2">
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#b2b2b2" stroke-width="1.5" /> </g>
                        </svg>
                        <span>{item.comment_co}</span>
                    </div>
                </div>
                <div className='written-time-warp'>
                    <div>{item.writeDate}</div>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;
