import styled from 'styled-components'
import Search from './Search'

/*Props for the Header Component
callAPI: function that makes the call to our proxy server to get the data for the given email --> Passed to parent component for calling (Layout)
clearLeaks: function to reset leaks when a new email is queried --> Passes to parent component for calling (Layout) */

interface HeaderProps{
    callAPI: (email:string) => Promise<void>;
    clearLeaks: () => void
}
/*Header Component
Home to the WebPage title and the Search Bar*/

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
    padding: 40px 80px 0px 80px;
    /* margin: 100px 100px 0px 100px; */
    font-weight: 700;
    border-bottom: 3px solid black;
`

const H1 = styled.h1`
    font-size: 2em;
`

export default Header