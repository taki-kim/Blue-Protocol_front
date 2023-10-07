import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getNews, postLastNewsIndex} from '../../api';
import {allNewsLengthState, allNewsState} from '../../states/atoms';
import {useRecoilState, useRecoilValue} from 'recoil';

const NewsList = () => {
  const [allnews, setAllnews] = useRecoilState(allNewsState) as any[];
  const [len, setLen] = useRecoilState(allNewsLengthState);
  async function getMoreNews() {
    let index = allnews[allnews.length - 1].id;
    const arr = await postLastNewsIndex(index);
    setAllnews(allnews.concat(arr));
  }
  const allNewsLen = allnews.length;
  return (
    <>
      <NewsContainer>
        {allnews.length
          ? allnews.map((element: any, key: number) => (
              <Container key={element.key}>
                <Img src={element.thumbnail} />
                <Border />
                <TextContainer>
                  <Category>{element.category}</Category>
                  <Title>{element.title}</Title>
                  <Content>{element.outline}</Content>
                  <Time>{element.date}</Time>
                </TextContainer>
              </Container>
            ))
          : null}
      </NewsContainer>
      {len === allNewsLen ? null : (
        <BtnContainer>
          <MoreBtn onClick={getMoreNews}>더보기</MoreBtn>
        </BtnContainer>
      )}
    </>
  );
};

export default NewsList;

const Border = styled.div`
  position: absolute;
  border: 2px solid #000000;
  width: 400px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 10px;
  top: -1vh;
  left: 0.5vw;
  transition: all 0.2s;
  @media screen and (max-width: 990px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 1rem;
  cursor: pointer;
  height: 35vh;
  margin-bottom: 10vh;
  &:hover ${Border} {
    width: 99%;
  }
  

  
  @media screen and (max-width: 990px) {
    flex-direction: column;
    height: 100%;
    margin-bottom: 10vh;
    &:hover {
      background: linear-gradient(
        to bottom,
        rgba(106, 194, 195, 0.1) 60%,
        rgba(106, 194, 195, 0.5) 80%,
        rgba(106, 194, 195, 1) 100%
      );
  }
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10vh 20vw 10vh 15vw;
  border-right: 2px solid;
  border-image: linear-gradient(to bottom, #68c3c4 0%, #001fa9 99.49%);
  border-image-slice: 1;

  @media screen and (max-width: 990px) {
    border: none;
    margin: 10vh 15vw 10vh 15vw;
  }
`;

const Img = styled.img`
  width: 510px;
  min-width: 400px;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
  background-position: center;
  @media screen and (max-width: 990px) {
    margin-bottom: 5vh;
    width: auto;
    min-width: 100%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 10vw;
  width: 100%;
  margin-bottom: 10vh;
  @media screen and (max-width: 990px) {
    margin: 0;
    padding-bottom: 1rem;
    & > * {
      padding: 0 1rem;
    }
  }
`;

const Category = styled.span`
  color: #68c3c4e5;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

const Title = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
`;

const Content = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

const Time = styled.span`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15vh;
`;

const MoreBtn = styled.button`
  width: 300px;
  height: 60px;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(90deg, rgba(104, 195, 196, 0.5) 0%, rgba(0, 31, 169, 0.5) 100%);
  border: none;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #68c3c4 0%, #001fa9 100%);
  }
  @media screen and (max-width: 990px) {
    width: 150px;
    heightL 40px;
    font-size: 12px;
  }
`;
