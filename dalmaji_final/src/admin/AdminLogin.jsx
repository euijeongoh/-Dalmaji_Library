import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    & > div {
        width: 100%;
        height: 100%;
        margin: auto;
    }
    & > form {
        width: 60%;
        height: 80%;
        border: 2px solid black;
        /* background-color: beige; */
        
        
        & > .img {
            height: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            /* background-color: red; */
        }

        & > .img > img {
            height: 70%;
            margin-top: 30px;
        }

        
        & > div:nth-child(2) {
            height: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            /* background-color: yellow; */
        }

       & > .id {
        height: 30px;
        display: flex;
        margin-left: 36%;
        /* background-color: aqua; */
       }

       & > div:nth-child(4) {
        height: 30px;
        display: flex;
        justify-content: center;
        /* margin-left: 45%; */
        /* background-color: greenyellow; */
       }

       & > div:nth-child(4) > input {
        width: 30%;
        height: 35px;
        border-radius: 12px;
        border: 1px solid black;
       }

       & > .none {
        height: 40px;
       }

       & > .pwd {
        height: 30px;
        display: flex;
        margin-left: 36%;
        /* background-color: aqua; */
       }

       & > div:nth-child(7) {
        height: 30px;
        display: flex;
        justify-content: center;
        /* margin-left: 45%; */
        /* background-color: greenyellow; */
       }

       & > div:nth-child(7) > input {
        width: 30%;
        height: 35px;
        border-radius: 12px;
        border: 1px solid black;
       }

       & > div:nth-child(8) {
        height: 45px;
       }

       & > div:nth-child(9) {
        width: 100%;
        height: 8%;
        display: flex;
        justify-content: center;
        /* background-color: aqua; */
       }

       & > div > button {
        width: 100px;
        height: 35px;
        border-radius: 12px;
        background-color: navy;
        color: white;
        font-family: 'Pretendard';
        font-weight: 700;
        font-size: 16px;
       }

       & > .ul {
        /* background-color: red; */

       }

       & > .ul > ul {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-evenly;
        list-style: none;
        /* background-color: aqua; */
    }

    & > .ul > ul > li > a:hover {
        color: blue;
    }

    }
    
`;


const AdminLogin = () => {

    const navigate = useNavigate();

    let isFetching = false;
    const [vo, setVo] =  useState({
        id : "",
        pwd : "",
    });

    const handleInputChange = (event) => {
        const {name , value} = event.target;

        setVo({
            ...vo,
            [name] : value
        });
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        //작업을 해도되나 안해도되나 검사하는 작업
        if(isFetching){
            return;
        }

        //작업시작
        isFetching = true;

        fetch("http://127.0.0.1:8888/app/admin/login" , {
        method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vo)
        })
        .then( resp => {
            if(!resp.ok){
                throw new Error("로그인 fetch 실패..");
            }
            return resp.json();
        } )
        .then( data => {
            if( data.msg === "good" ){
                alert("로그인 성공 !");
                navigate("/");
            }else{
                alert("로그인 실패 ...");
                navigate("/failpage~~");
            }
            
        } )
        .catch( (e) => {
            console.log(e);
            alert("로그인 실패");
        } )
        .finally( () => {
            isFetching = false;
        } )
        ;
    }

    return (
        <StyledLoginMainDiv>
            <form onSubmit={ handleLoginSubmit }>
                <div className='img'><img src="/images/header/logo.png" alt="로고" /></div>
                <div><h1>Admin Login</h1></div>
                <div className='id'>아이디</div>
                <div><input type="text" name='id' onChange={handleInputChange}/></div>
                <div className='none'></div>
                <div className='pwd'>비밀번호</div>
                <div><input type="password" name='pwd' onChange={handleInputChange}/></div>
                <div></div>
                <div><button>로그인</button></div>
                <div className='ul'>
                    <ul>
                        <li><a>회원가입</a></li>
                        <li><a>아이디 찾기</a></li>
                        <li><a>비밀번호 찾기</a></li>
                    </ul>
                </div>
            </form>
        </StyledLoginMainDiv>
    );
};

export default AdminLogin;