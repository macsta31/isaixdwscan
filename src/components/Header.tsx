import styled from 'styled-components'

/*Props for the Header Component
callAPI: function that makes the call to our proxy server to get the data for the given email --> Passed to parent component for calling (Layout)
clearLeaks: function to reset leaks when a new email is queried --> Passes to parent component for calling (Layout) */

// interface HeaderProps{
//     callAPI: (email:string) => Promise<void>;
//     clearLeaks: () => void
// }
/*Header Component
Home to the WebPage title and the Search Bar*/

const Header = () => {
  return (
    <Container>
        <H1Left>ISAIX</H1Left>
        <H1Middle>Dark Web Scanner</H1Middle>
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

export default Header