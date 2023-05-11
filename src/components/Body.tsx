import LeakDetails from './LeakDetails'
import Leaks from './Leaks'
import styled from 'styled-components'
import Data from '../types/Data.types'
import {emptyData}  from '../data/Data.instance'

import { useEffect, useState } from 'react'


/*Props for Body component
leaks: Array of Data (custom data type -> found in types folder) Objects
errorMessage: string representing error from callAPI --> Passed to LeakDetails to display no leaks message */
interface BodyProps{
    leaks: Data[]
    errorMessage: string | null;
}


const Body: React.FC<BodyProps> = ({leaks, errorMessage}) => {
    // State holding leak data for one leak to be passed to leakDetails Component
    const [leakData, setLeakData] = useState<Data>(emptyData);

    // function to get leak data from one leak that was clicked on in Leaks Component to be passed to leakDetails Component
    const getData = (data:Data): void => {
        setLeakData(data)
    }

    // Sets leak data to empty data object (found in data folder) this is why leakDetails is empty on load
    // Change to setLeakData(leaks[0]) to make it load the first leak on load
    // Recalls if leaks are changed --> when new email is entered
    useEffect(() => {
        setLeakData(emptyData)
    }, [leaks])

    return (
    <Container>
        <Leaks leaks={leaks} getData={getData} />
        <LeakDetails leakData={leakData} errorMessage={errorMessage} />
    </Container>
    )
}

const Container = styled.div`
    display:flex;
    width: 85%;
    max-width: 1400px;
    align-self: center;
    padding: 15px 30px;
    background: #EFE9DC;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    /* align-items: center; */
    /* justify-content: space-between; */
    min-height: 75vh;
    /* flex: 1 1 auto; */
    /* padding: 50px; */
    margin:20px;

`

export default Body