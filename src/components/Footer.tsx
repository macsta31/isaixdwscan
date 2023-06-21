import styled from 'styled-components'


/**
 * Footer for Webpage
 * Gives credit to HIBP API for data in accordance with their documentation
 */
const Footer = () => {
  return (
    <Div>
        <P>Data used for this project comes from <a href={'https://haveibeenpwned.com/'}>haveibeenpwned.com</a></P>
    </Div>
  )
}

const Div = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    height: 10vh;
`

const P = styled.p`
    font-size: 12px;
`
export default Footer