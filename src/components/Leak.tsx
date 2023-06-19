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
       {leak.Name}
    </Container>
  )
}

const Container = styled.button`
  width: 175px;
	height: 50px;
	cursor: pointer;
	background: #2433C7; //333
	margin: 10px;
	border: none;
	border-radius: 10px;
	box-shadow: -5px -5px 15px #283ae1, 5px 5px 15px #19248e, inset 5px 5px 10px #283ae1, inset -5px -5px 10px #19248e;
	color: white;
	font-size: 1.2em;


    &:hover {
      box-shadow: -5px -5px 15px #283ae1, 5px 5px 15px #19248e, inset 5px 5px 10px #19248e, inset -5px -5px 10px #283ae1;
      font-size: 1em;
      transition: 500ms;
      color: #b971f0;
	    text-shadow: 0px 0px 10px #b971f0;
    }

    &:active {
      box-shadow: -10px -10px 20px #283ae1, 10px 10px 20px #19248e, inset 10px 10px 15px #19248e, inset -10px -10px 15px #283ae1;
      font-size: 1em;
      color: #b971f0;
	    text-shadow: 0px 0px 10px #b971f0;
    }
`

export default Leak