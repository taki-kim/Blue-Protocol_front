import {useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as Arrow} from '../../assets/icons/arrow.svg';
import useSidebarControl from '../../hooks/useSidebarControl';
import {useRecoilState} from 'recoil';

interface Props {
  url?: string;
  focus?: string | undefined;
  isSubmenuOpen?: boolean;
  isOpen?: boolean;
  setIsOpen?: any;
}

const commandMenuList = ['캐릭터', '소지품', '퀘스트', '지도', '커뮤니케이션', '미션', '파티', '팀'];
const menuList = ['전투', '무기 생산 및 강화', '이매진 크래프트', '낚시', '레이드 미션', '스토리', '등장인물'];

const SideBar = () => {
  const {id} = useParams();
  const [openSubMenu, setOpenSubMenu] = useState(true);
  const {isNavOpen, setIsNavOpen} = useSidebarControl();

  return (
    <Container className={isNavOpen ? 'open' : ''}>
      <ToggleMenu
        onClick={() => {
          setOpenSubMenu(!openSubMenu);
        }}
      >
        커멘드 메뉴 <ArrowIcon isSubmenuOpen={openSubMenu} />
      </ToggleMenu>
      <SubMenuContainer isSubmenuOpen={openSubMenu}>
        {commandMenuList.map(element => (
          <SubMenu
            to={`/game/command/${element}`}
            url={id}
            focus={element}
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            {element}
          </SubMenu>
        ))}
      </SubMenuContainer>
      {menuList.map(element => (
        <Menu
          to={`/game/${element}`}
          url={id}
          focus={element}
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          {element}
        </Menu>
      ))}
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 30%;
  height: auto;
  box-sizing: border-box;
  padding: 3rem;

  @media screen and (max-width: 990px) {
    display: flex;
    position: fixed;
    flex-direction: column;
    background-color: white;
    width: 100%;
    min-height: 1000px;
    left: -100%;
    box-sizing: border-box;
    padding: 3rem;
    z-index: 3;
    transition: 0.5s ease;
    &.open {
      left: 0;
      transition: 0.5s ease;
    }
  }
`;

const ToggleMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: gray;
  font-size: 1.2rem;
  padding: 0.8rem 0.5rem;
  cursor: pointer;

  @media screen and (max-width: 990px) {
    font-size: 1rem;
  }
`;

const Menu = styled(Link)<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.focus === props.url ? 'black' : 'gray')};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem;
  cursor: pointer;

  @media screen and (max-width: 990px) {
    font-size: 1rem;
  }
`;

const SubMenuContainer = styled.div<Props>`
  display: ${props => (props.isSubmenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  border-left: 1px solid gray;
`;

const SubMenu = styled(Link)<Props>`
  padding: 0.2rem 0.5rem;
  color: ${props => (props.focus === props.url ? 'black' : 'gray')};
  font-size: 1rem;
  text-decoration: none;
  padding: 0.5rem;
  @media screen and (max-width: 990px) {
    font-size: 0.8rem;
  }
`;

const ArrowIcon = styled(Arrow)<Props>`
  width: 20px;
  height: 20px;
  fill: gray;
  transform: ${props => (props.isSubmenuOpen ? 'rotate(180deg)' : null)};
`;
