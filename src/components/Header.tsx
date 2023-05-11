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
        <H1Left>ISAIX</H1Left>
        <H1Middle>Dark Web Scanner</H1Middle>
        <Div><Search callAPI={callAPI} clearLeaks={clearLeaks} /></Div>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto auto;
    align-items: start;
    max-width: 1400px;
    width:85%;
`

const H1Left = styled.h1`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding: 20px;

`

const H1Middle = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
  font-size: 2em;
  padding: 20px;
`
const Div = styled.div`
  width: 100%;
  background-color: #EFE9DC;
  padding: 15px 30px;
  border-radius: 20px;
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  justify-self: center;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
`

export default Header