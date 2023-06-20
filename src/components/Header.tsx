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
        <Logo>ISAIX</Logo>
        <Nav>
          <NavItem>Nav</NavItem>
          <NavItem>Nav</NavItem>
          <NavItem>Nav</NavItem>
          <NavItem>Nav</NavItem>
          <Button>Contact</Button>
        </Nav>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    padding: 20px 80px;
    justify-content: space-between;
    width: 90%;
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
    background-color:#001220;
`

const Logo = styled.h1`

`
const Button = styled.button`
  padding: 10px 25px;
  border-radius: 18px;
  background-color: #2433C7;
  border: none;
  color: white;
  font-size: 1.3em;
  text-align: center;

`

// const H1Middle = styled.div`
  
// `
const Nav = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

`

const NavItem = styled.li`
  padding: 0 40px;
  font-size: 1.3em;

`

export default Header