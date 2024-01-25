import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdminEditDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 8fr 1.5fr;
    place-items: center center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const StyledEditContentDiv = styled.div`
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 5fr 3fr 1fr;

    & > div:first-child {
        border-bottom: 5px solid #2f2f49;
    }

    & > div:first-child > h1 {
        margin-top: 50px;
        margin-left: 10px;
        margin-bottom: 10px;
        font-size: 40px;
    }

    & > form > div {
        width: 100%;
        height: 100%;
        margin: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            & > .title {
                font-size: 33px;
            }

            & > div {
                margin-right: 30%;
                margin-top: 10%;
                font-size: 24px;

                & > input {
                    border-radius: 5px;
                    border: 1px solid black;
                }
            }
        }

        & > div > img {
            width: 350px;
            height: 500px;
            margin-right: 20%;
            margin-bottom: 10px;
        }
    }

    & > div > div > .inptContentDiv {
        margin-left: 4%;
    }

    & > div > div > .btnImg1 {
        margin-top: 5%;
        border-radius: 10px;
        margin-right: 20%;
        background-color: #2f2f49;
        border: none;
        color: white;
    }
`;

const StyledTableDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div:first-child {
        width: 100%;
        height: 50px;
        padding: 10px;
        font-size: 27px;
        background-color: #D9F1FF;
    }

    & > table {
        text-align: center;
        margin-top: 20px;
        width: 100%;
        height: 30%;

        & > thead {
            background-color: #EFEFF1;

            & > tr {
                width: 100%;
                height: 50px;
            }
        }

        & > tbody > tr {
            width: 100%;
            height: 30px;
        }
    }

    & > div:nth-child(3) {
        display: flex;
        gap: 15px;

        & > button:first-child {
            width: 110px;
            height: 35px;
            font-size: 18px;
            margin-top: 30px;
            background-color: #275FBC;
            border: none;
            border-radius: 7px;
            color: white;
            cursor: pointer;
        }

        & > .redirect {
            width: 110px;
            height: 35px;
            font-size: 18px;
            margin-top: 30px;
            background-color: #666666;
            border: none;
            border-radius: 7px;
            color: white;
            cursor: pointer;
        }

        & > button:hover {
            filter: brightness(150%);
        }
    }
`;

const SearchAdminEdit = () => {
    console.log("SearchAdminEdit render!!!");

    //url에서 bookNo 추출
    const selectedBookNo = useParams();
    console.log("selectedBookNo ::: ", selectedBookNo);
    console.log("selectedBookNo.bookNo ::: ", selectedBookNo.bookNo);

    // 사용할 변수 준비
    const [vo, setVo] = useState([]);
    const [bookVo, setBookVo] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        company: '',
        publisherYear: '',
    });

    // handleChangeInput 함수 정의
    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const loadBookDetailVo = () => {
            fetch(`http://127.0.0.1:8888/app/search/book/detail?bookNo=${selectedBookNo.bookNo}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(resp => resp.json())
                .then((data) => {
                    console.log('data:::', data);
                    setVo(data.vo);
                    setBookVo(data.bookVo);
                });
        }
        loadBookDetailVo();
    }, [selectedBookNo.bookNo])

    // // 모달창을 위한 준비
    // const [modal, setModal] = useState(false);

    // 목록버튼 클릭시 돌아가기
    const navigate = useNavigate();

   // handleSubmit 함수 정의
   const handleSubmit = (event) => {
    event.preventDefault();
    // ...
};
    return (
        <StyledAdminEditDiv>
            <div></div>
            <StyledEditContentDiv>
                <div><h1>수정하기</h1></div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <img src={vo.bookImg} alt={vo.title} />
                            <button className='btnImg1'>이미지 첨부</button>
                        </div>
                        <div className='inputContent'>
                            <div className='inptContentDiv'>
                                <strong>제목: </strong>
                                <input type="text" name='title' onChange={handleChangeInput} />
                            </div>
                            <div className='inptContentDiv'>
                                <strong>작가: </strong>
                                <input type="text" name='author' onChange={handleChangeInput} />
                            </div>
                            <div>
                                <strong>출판사: </strong>
                                <input type="text" name='company' onChange={handleChangeInput} />
                            </div>
                            <div>
                                <strong>출판일: </strong>
                                <input type="text" name="publisherYear" onChange={handleChangeInput} />
                            </div>
                            <input type="submit" value="완료" className='btnImg1' />
                        </div>
                    </div>
                </form>

                <StyledTableDiv>
                    <div>소장정보</div>
                    <table>
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>소장위치</th>
                                <th>도서상태</th>
                                <th>반납예정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{vo.bookNo}</td>
                                <td>{vo.roomName}</td>
                                <td>{bookVo.bookState}</td>
                                {
                                    bookVo === undefined
                                        ?
                                        <td></td>
                                        :
                                        <td>{bookVo.dueDate}</td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </StyledTableDiv>
                <div>4</div>
            </StyledEditContentDiv>
            <div></div>
        </StyledAdminEditDiv>
    );
};

export default SearchAdminEdit;
