import LeakDetails from './LeakDetails'
import Leaks from './Leaks'
import styled from 'styled-components'
import Data from '../types/Data.types'
import {emptyData}  from '../data/Data.instance'

import { useEffect, useState } from 'react'

interface BodyProps{
    leaks: Data[]
    errorMessage: string | null;
}


const Body: React.FC<BodyProps> = ({leaks, errorMessage}) => {

    const [leakData, setLeakData] = useState<Data>(emptyData);


    const getData = (data:Data): void => {
        setLeakData(data)
    }

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
    /* align-items: center; */
    /* justify-content: space-between; */
    flex: 1 1 auto;
    /* padding: 50px; */

`

export default Body