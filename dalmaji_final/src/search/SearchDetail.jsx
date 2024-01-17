import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledSearchDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 8fr 1.5fr;
    place-items: center center;
`;

const StyledDetailContentDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 5fr 3fr 2fr 3fr;
    & > div:first-child > h1 {
            border-bottom: 3px solid black;
        }
    & > div:nth-child(2){
        width: 100%;
        height: 100%;
        display: flex;

    }
`;

const SearchDetail = () => {
    console.log("SearchDetail render!!!");

    //url에서 bookNo 추출
    const selectedBookNo = useParams();
    console.log("selectedBookNo ::: ", selectedBookNo);

    // 사용할 변수 준비
    const [bookDetailVo, setBookDetailVo] = useState([]);

    useEffect( () => {
        const loadBookDetailVo = () => {
            fetch(`http://127.0.0.1:8888/app/search/book/detail?bookNo=${selectedBookNo}`,{
                    method: "GET",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                })
            .then( resp => resp.json() )
            .then( (data) => {
                console.log('msg', data.msg);
                setBookDetailVo(data);
            })
            ;
        }
        loadBookDetailVo();
    }, [] )

    return (
        <StyledSearchDetailDiv>
            <div>1</div>
            <StyledDetailContentDiv>
                <div><h1>상세정보</h1></div>
                <div>
                    <div>
                        <img src={bookDetailVo.bookImg} alt={bookDetailVo.title} />
                    </div>
                    <div>
                        <div>{bookDetailVo.title}</div>
                        <div><strong>작가: </strong> {bookDetailVo.author}</div>
                        <div><strong>출판사: </strong> {bookDetailVo.company}</div>
                        <div><strong>출판년도: </strong> {bookDetailVo.publisherYear}</div>
                        <div><strong>도서번호: </strong> {bookDetailVo.bookNo}</div>
                    </div>
                </div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </StyledDetailContentDiv>
            <div>3</div>
        </StyledSearchDetailDiv>
    );
};

export default SearchDetail;