import styled from 'styled-components'
import Data from '../types/Data.types';

/**
 * Props for Leak Component
 * leak: Data Object (types folder)
 * getData: function to get data of the clicked leak --> called in Body Component
 */
interface LeakProps{
    leak: Data
    getData: (data:Data) => void
}

/**
 * Leak Component
 * Displays leak name
 * onClick attribute to display information in sister component (leakDetails)
 */
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
    padding: 15px;
    margin: 8px;
    width: 75%;
    background: #DED9CE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    border-radius: 20px;

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