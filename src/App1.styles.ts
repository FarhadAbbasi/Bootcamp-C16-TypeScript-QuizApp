import styled, { createGlobalStyle } from "styled-components";
import BGimage from './Components/Utils/bg1.jpg';

export const GlobalStyle = createGlobalStyle`

html{
height: 100% 
}

body {
background-img: url(${BGimage});
background-size: cover;
margin: 0;
padding: 0 20px;
display: flex:
flex-direction: column;
justify-content: center;

*{
box-sizing: border-box

}

}




`