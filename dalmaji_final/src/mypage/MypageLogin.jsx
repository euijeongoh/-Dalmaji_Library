import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

       & > div:nth-child(3) {
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

       & > div:nth-child(6) {
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
        width: 25%;
        height: 55%;
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


const MypageLogin = () => {

    const navigate = useNavigate();

    const jsonStr = sessionStorage.getItem("loginMemberVo");
    const sessionLoginMemberVo = JSON.parse(jsonStr);
    const [loginMemberVo , setLoginMemberVo] = useState(sessionLoginMemberVo);

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

        event.preventDefault();

        fetch("http://127.0.0.1:8888/app/member/login" , {
            method : "POST" ,
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(vo) ,
        })
        .then( (resp) => { return resp.json() } )
        .then( (data) => { 
            if(data.msg === "good"){
                alert("로그인 성공 !");
                sessionStorage.setItem("loginMemberVo" , JSON.stringify(data.loginMemberVo));
                setLoginMemberVo(data.loginMember);
            }else{
                alert("로그인 실패...");
            }
         } )
        .catch( (e) => {console.log(e);} )
        .finally( () => {console.log("로그인 fetch 끝");} )
        ;

    }

    return (
        <StyledLoginMainDiv>
            {loginMemberVo ? (
                <div>
                    <h3>{loginMemberVo.name} 님 환영합니다.</h3>
                    <button
                    onClick={() => {
                        sessionStorage.removeItem("loginMemberVo");
                        setLoginMemberVo(null);
                    }}
                    >
                    로그아웃
                    </button>
                </div>
            ) : (
                <form onSubmit={ handleLoginSubmit }>
                <div className='img'><img src="/images/header/logo.png" alt="로고" /></div>
                <div><h1>로그인</h1></div>
                <div>아이디</div>
                <div><input type="text" name='id' onChange={handleInputChange}/></div>
                <div className='none'></div>
                <div>비밀번호</div>
                <div><input type="password" name='pwd' onChange={handleInputChange}/></div>
                <div></div>
                <div><button>로그인</button></div>
                <div className='ul'>
                    <ul>
                        <li><Link to="http:/localhost:3000/member/join">회원가입</Link></li>
                        <li><a>아이디 찾기</a></li>
                        <li><a>비밀번호 찾기</a></li>
                    </ul>
                </div>
            </form>
              )}
            
            

        </StyledLoginMainDiv>
    );
};

export default MypageLogin;