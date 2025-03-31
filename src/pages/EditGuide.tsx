import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {FileDrop} from 'react-file-drop';
import {uploadImage, updateGuideData} from '../api';
import {useNavigate, useParams} from 'react-router';
import '../styles/markdown.css';
import {useQuery} from '@tanstack/react-query';
import {getGuideData} from '../api';
import HtmlPrinter from '../components/textEditor/HtmlPrinter';

const EditGuide = () => {
  const {id} = useParams();

  const {data} = useQuery({
    queryKey: [`${id}`],
    queryFn: async () => {
      return await getGuideData(id);
    },
    staleTime: Infinity,
  });

  const [inputs, setInputs] = useState<any>({
    category: '',
    title: '',
  });
  const [_id, setId] = useState();

  const {category, title} = inputs;
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setInputs({
        category: data.category,
        title: data.title,
      });
      setContent(data.content);
      setId(data._id);
    }
  }, [data]);

  const onChange = (e: React.ChangeEvent<any>) => {
    const {value, name} = e.target;
    console.log(value, name);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const getImagePath = async (files: FileList, formData: FormData) => {
    const file = await uploadImage(formData);
    const imagePath = file?.data;
    const result = `<img src="${imagePath}">`;
    setContent(content + result);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submit = () => {
    if (title && category) {
      updateGuideData({category, title, content, _id});
      navigate(`/guide/${id}`);
    } else {
      alert('빈칸을 모두 채워주시요');
    }
  };

  return (
    <FileDrop
      onDrop={files => {
        if (files) {
          const formData = new FormData();
          formData.append('image', files[0]);
          getImagePath(files, formData);
        }
      }}
    >
      <InputWrapper>
        <Label>카테고리 :</Label>
        <Toggle name="category" onChange={onChange} value={category}>
          <option value="1장">1장</option>
          <option value="2장">2장</option>
          <option value="3장">3장</option>
          <option value="모험랭크">모험랭크</option>
          <option value="클래스 퀘스트">클래스 퀘스트</option>
          <option value="히든 퀘스트">히든 퀘스트</option>
          <option value="50레벨제 무기 입수">50레벨제 무기 입수</option>
          <option value="추가 조사 미션">추가 조사 미션</option>
          <option value="서브 퀘스트">서브 퀘스트</option>
          <option value="팁">팁</option>
        </Toggle>
      </InputWrapper>
      <InputWrapper>
        <Label>컨텐츠 제목 :</Label>
        <Input name="title" onChange={onChange} value={title}></Input>
      </InputWrapper>
      <InputWrapper>
        <HtmlPrinter />
      </InputWrapper>
      <Container>
        <Editor onChange={onChangeContent} value={content}></Editor>
        <Button onClick={submit}>SUBMIT</Button>
        <Preview>
          <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </Preview>
      </Container>
    </FileDrop>
  );
};

export default EditGuide;

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  margin: 0 1rem;
`;

const Editor = styled.textarea`
  width: 48%;
  box-sizing: border-box;
  height: 100vh;
  padding: 2rem;
  font-size: 1.2rem;
  overflow: scroll;
`;

const Preview = styled.div`
  width: 48%;
  height: 100vh;
  overflow: scroll;
`;

const Button = styled.button`
  position: fixed;
  z-index: 100;
  width: 100px;
  height: 50px;
  margin: 1rem;

  background-color: white;
  cursor: pointer;
  right: 10px;
  bottom: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin: none;
  padding: 0.5rem 2rem;
`;

const Label = styled.span`
  flex: 1;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
`;

const Toggle = styled.select`
  flex: 10;
`;
const Input = styled.input`
  flex: 10;
`;
