import LeakDetails from './LeakDetails'
import Leaks from './Leaks'
import styled, { keyframes } from 'styled-components'
import Data from '../types/Data.types'
// import { AiOutlineQuestionCircle } from 'react-icons/ai'
import {emptyData}  from '../data/Data.instance'


import { useEffect, useState, useRef } from 'react'


/*Props for Body component
leaks: Array of Data (custom data type -> found in types folder) Objects
errorMessage: string representing error from callAPI --> Passed to LeakDetails to display no leaks message */
interface BodyProps{
    leaks: Data[]
    errorMessage: string | null;
    searchParam: string | null
}


const Body: React.FC<BodyProps> = ({leaks, errorMessage, searchParam}) => {
    // State holding leak data for one leak to be passed to leakDetails Component
    const [leakData, setLeakData] = useState<Data>(emptyData);
    const [infoTab, setInfoTab] = useState(false);
    const myRef = useRef<HTMLElement | null>(null);

    // function to get leak data from one leak that was clicked on in Leaks Component to be passed to leakDetails Component
    const getData = (data:Data): void => {
        setLeakData(data)
    }

    const togglePageInfo = () => {
        setInfoTab(!infoTab)
    }

    // Sets leak data to empty data object (found in data folder) this is why leakDetails is empty on load
    // Change to setLeakData(leaks[0]) to make it load the first leak on load
    // Recalls if leaks are changed --> when new email is entered
    useEffect(() => {
        setLeakData(emptyData)
        if (myRef.current !== null){
            myRef.current?.scrollIntoView({ behavior: 'smooth' });
            // window.scrollBy(0, -85);
        }
        
    }, [leaks])

    return (
    <Container id='body' >
        <ScrollPoint onClick={togglePageInfo} ref={myRef as React.RefObject<HTMLDivElement>}></ScrollPoint>
        <LeaksTitle>Here's What We Found for: <br /> <p style={{fontSize:'0.8em'}}>{searchParam}</p></LeaksTitle>
        <ResultsContainer>
            {/* <InfoPanel onClick={()=>togglePageInfo()}> <AiOutlineQuestionCircle size={24} /> </InfoPanel> */}
            <Leaks leaks={leaks} getData={getData} infoTab={infoTab} />
            <LeakDetails leakData={leakData} errorMessage={errorMessage} infoTab={infoTab} searchParam={searchParam} />
        </ResultsContainer>
    </Container>
    )
}

const scaleUp = keyframes`
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
`;

const LeaksTitle = styled.h1`
    margin-bottom: 50px;
    text-align: center;

`
const Container = styled.div`
    /* animation: ${scaleUp} 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    position:relative;
    display:flex;
    width: 100%;
    max-width: 1400px;
    align-self: center;
    background: #EFE9DC;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    min-height: 70vh;
    margin:20px; */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;

`

const ScrollPoint = styled.div`
    position: absolute;
    transform: translateY(-150px)

`

const ResultsContainer = styled.div`
    display: flex;
    min-width: 80vw;

`
/* 
const InfoPanel = styled.div`
    position: absolute;
    top:0;
    right:0;
    margin: 10px;
    z-index: 3;

    &:hover{
        cursor: pointer;
        transition: 1.5s;
        transform: scale(1.2)
    }

    &:not(:hover){
        transition: 1.5s;
    }
` */

export default Body