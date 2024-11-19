import React from 'react';

const Reservation = () => {
    return (
        <div>
            <div class="reservation-controller">
                <section>
                    <ol>
                        <li><a href="#">이벤트</a></li>
                        <li><a href="#">행사MC</a></li>
                    </ol>
                </section>
                <section class="product-title">
                    <h3>[유튜브 4,000만 조회수] 운동하는 물리치료사 김동우의 진짜 헬스케어</h3>
                    </section>
                <section>
                    <div class="product-options">
                        <div class="options-wrapper">
                            [모이고 마켓 한정] 체험 수업 1회 (55,000 원)
                        </div>
                        <div class="product-reservation-date">
                            <ul class="picker-items">
                                <li class="picker-item">
                                    <p class="date-text-today">오늘</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-18"/>
                                        <span>18</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">화</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-19"/>
                                        <span>19</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">수</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-20"/>
                                        <span>20</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">목</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-21"/>
                                        <span>21</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">금</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-22"/>
                                        <span>22</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">토</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-23"/>
                                        <span>23</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">일</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-24"/>
                                        <span>24</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">월</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-25"/>
                                        <span>25</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">화</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-26"/>
                                        <span>26</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">수</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-27"/>
                                        <span>27</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">목</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-28"/>
                                        <span>28</span>
                                    </label>
                                </li>
                                <li class="picker-item">
                                    <p class="date-text">금</p>
                                    <label>
                                        <input type="radio" name="data-picker" value="2024-11-29"/>
                                        <span>29</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-controller">
                            <button class="btn-prev">
                            <svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M168.837,256L388.418,36.418c8.331-8.331,8.331-21.839,0-30.17c-8.331-8.331-21.839-8.331-30.17,0L123.582,240.915 c-8.331,8.331-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17 L168.837,256z"></path> </g> </g> </g></svg>
                            </button>
                            <button class="btn-next">
                            <svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M388.418,240.915L153.752,6.248c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17L343.163,256 L123.582,475.582c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667 C396.749,262.754,396.749,249.246,388.418,240.915z"></path> </g> </g> </g></svg>
                            </button>
                        </div>
                    </div>
                    <div class="reservation-time">
                        <div class="reservation-timebox">
                            <ul class="reservation-timelist">
                                <li class="reservation-time-item">
                                    <label for="9:00">
                                        <input type="radio" value="09:00" name="product-reservation-time"/>
                                        <span>오전 9:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="10:00">
                                        <input type="radio" value="10:00" name="product-reservation-time"/>
                                        <span>오전 10:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="11:00">
                                        <input type="radio" value="11:00" name="product-reservation-time"/>
                                        <span>오전 11:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="12:00">
                                        <input type="radio" value="12:00" name="product-reservation-time"/>
                                        <span>오후 12:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="13:00">
                                        <input type="radio" value="13:00" name="product-reservation-time"/>
                                        <span>오후 1:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="14:00">
                                        <input type="radio" value="14:00" name="product-reservation-time"/>
                                        <span>오후 2:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="15:00">
                                        <input type="radio" value="15:00" name="product-reservation-time"/>
                                        <span>오후 3:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="16:00">
                                        <input type="radio" value="16:00" name="product-reservation-time"/>
                                        <span>오후 4:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="17:00">
                                        <input type="radio" value="17:00" name="product-reservation-time"/>
                                        <span>오후 5:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="18:00">
                                        <input type="radio" value="18:00" name="product-reservation-time"/>
                                        <span>오후 6:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="19:00">
                                        <input type="radio" value="19:00" name="product-reservation-time"/>
                                        <span>오후 7:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="20:00">
                                        <input type="radio" value="20:00" name="product-reservation-time"/>
                                        <span>오후 8:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="21:00">
                                        <input type="radio" value="21:00" name="product-reservation-time"/>
                                        <span>오후 9:00</span>
                                    </label>
                                </li>
                                <li class="reservation-time-item">
                                    <label for="22:00">
                                        <input type="radio" value="22:00" name="product-reservation-time"/>
                                        <span>오후 10:00</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <button type="button" class="reservation-btn">예약하기</button>
                    </div>
                    <br/>
                </section>
            </div>
        </div>
    );
};

export default Reservation;