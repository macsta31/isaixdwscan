import styled from 'styled-components'
import Search from './Search'

interface HeaderProps{
    callAPI: (email:string) => Promise<void>;
    clearLeaks: () => void
}

const Header: React.FC<HeaderProps> = ({callAPI, clearLeaks}) => {
  return (
    <Container>
        <H1>Dark Web Scanner</H1>
        <Search callAPI={callAPI} clearLeaks={clearLeaks} />
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    /* font-size: 4em; */
    padding: 75px 150px 0px 150px;
    /* margin: 100px 100px 0px 100px; */
    font-weight: 700;
    border-bottom: 3px solid black;
`

const H1 = styled.h1`
    font-size: 3em;
`

export default Header