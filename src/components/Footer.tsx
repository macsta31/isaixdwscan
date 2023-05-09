import styled from 'styled-components'

const Footer = () => {
  return (
    <Div>
        <P>Data used for this project comes from <a href={'haveibeenpwned.com'}>haveibeenpwned.com</a></P>
    </Div>
  )
}

const Div = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    border-top: 3px solid black;
    height: 10vh;
`

const P = styled.p`
    font-size: 12px;
`
export default Footer