import LeakDetails from './LeakDetails'
import Leaks from './Leaks'
import styled from 'styled-components'

import { useEffect, useState } from 'react'

interface Data{
    AddedDate: string;
    BreachDate: string;
    DataClasses: string[];
    Description: string;
    Domain: string;
    IsFabricated: boolean;
    isMalware: boolean;
    isRetired: boolean;
    isSensitive: boolean;
    IsSpamList: boolean;
    IsVerified: boolean;
    LogoPath: string;
    ModifiedDate: string;
    Name: string;
    PwnCount: string;
    Title: string;

}

interface BodyProps{
    leaks: Data[]
    errorMessage: string | null;
}


const emptyData: Data = {
    AddedDate: '',
    BreachDate: '',
    DataClasses: [],
    Description: '',
    Domain: '',
    IsFabricated: false,
    isMalware: false,
    isRetired: false,
    isSensitive: false,
    IsSpamList: false,
    IsVerified: false,
    LogoPath: '',
    ModifiedDate: '',
    Name: '',
    PwnCount: '',
    Title: '',
};


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