import styled from 'styled-components'
import Data from '../types/Data.types';


interface LeakProps{
    leak: Data
    getData: (data:Data) => void
}

const Leak: React.FC<LeakProps> = ({leak, getData}) => {
  return (
    <Container onClick={() => getData(leak)}>
       <h3>{leak.Name}</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 8px;
    border: 2px solid black;
    border-radius: 8px;
    width: 50%;
    background-color: #1724d2;

    &:hover{
        cursor: pointer;
        transition: 0.5s;
        transform: scale(1.15);
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

export default Leak