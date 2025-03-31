import {useEffect, useState} from 'react';
import styled from 'styled-components';
import InputButton from './InputButton';
import printHtml from '../../utils/printHtml';

const inputArray = ['h1', 'h2', 'h3', 'div', 'br', 'red-font', 'blue-font', 'toggle'];

const HtmlPrinter = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    console.log(output);
  }, [output]);
  return (
    <Container>
      <ButtonContainer>
        {inputArray.map((item, index) => (
          <InputButton
            key={`${item} + ${index}`}
            title={item}
            onClick={() => {
              console.log(printHtml(item));
              setOutput(printHtml(item));
            }}
          />
        ))}
      </ButtonContainer>
      <ResultContainer
        value={output}
        onChange={e => {
          setOutput(e.target.value);
        }}
      >
        {output}
      </ResultContainer>
    </Container>
  );
};

export default HtmlPrinter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  gap: 1rem;
`;

const ResultContainer = styled.textarea`
  width: 90%;
  height: 100%;
  overflow-y: auto;
`;
