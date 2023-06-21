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
  min-height: 45px;
  width: 175px;
	height: 50px;
	cursor: pointer;
	background: #011220; //333
  /* background-color: #001220;
    border: none;
    color: white;
    font-size: 1.3em;
    border-radius: 18px;
    box-shadow: -5px -5px 15px #001424, 5px 5px 15px #000a12, inset 5px 5px 10px #001b2f, inset -5px -5px 10px #001424; */
	margin: 10px;
	border: none;
	border-radius: 10px;
  box-shadow: 0px 0px 0px #001424, 0px 0px 0px #000a12, inset 6px 7px 10px #001b2f, inset -5px -5px 10px #001424;
  color: white;
	font-size: 1.2em;


    &:hover {
      box-shadow: 0px 0px 0px #283ae1, 0px 0px 0px #2334C6, inset 5px 5px 10px #000000, inset -5px -5px 10px #000000;
      font-size: 1em;
      transition: 500ms;
      color: white;
	    text-shadow: 0px 0px 10px white;
    }

    &:active {
      box-shadow: 0px 0px 0px #283ae1, 0px 0px 0px #2334C6, inset 5px 5px 20px #000000, inset -5px -5px 20px #000000;
      font-size: 1em;
      transition: 0.2s;
      color: #2334C6;
	    text-shadow: 0px 0px 10px #2334C6;
    }
`

export default Leak