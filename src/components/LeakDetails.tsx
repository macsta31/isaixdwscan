import styled from 'styled-components'
import fs from 'fs';
import { useCallback, useEffect, useState } from 'react';
import ThreatBar from './ThreatBar';
import  { AiFillQuestionCircle } from 'react-icons/ai'

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

interface LeakDetailsProps{
    leakData: Data
    errorMessage: string | null;
}

type DataClassThreatMap = { [dataClass: string]: number };

async function fetchCSVFile(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
}
  
async function parseCSVToHashMap(csvUrl: string): Promise<DataClassThreatMap> {
    const content = await fetchCSVFile(csvUrl);
    const rows = content.split('\n');
    const hashMap: DataClassThreatMap = {};
  
    for (const row of rows) {
      const [dataClass, threatLevel] = row.split(',');
      hashMap[dataClass] = parseInt(threatLevel, 10);
    }
  
    return hashMap;
}

const getGlobalThreatLevel = async (dataclasses: string[], hashMap: DataClassThreatMap): Promise<number> => {
    let totalThreat = 0;
  
    for (const dataClass of dataclasses) {
      const threatLevel = hashMap[dataClass] || 0;
      totalThreat += threatLevel;
    }
  
    // Normalize the total threat value between 0 and 100
    const normalizedThreat = (totalThreat / (dataclasses.length * 10)) * 100;
    return normalizedThreat;
};

const LeakDetails: React.FC<LeakDetailsProps> = ({leakData, errorMessage}) => {

    const [hashMap, setHashMap] = useState<DataClassThreatMap>({});
    const [globalThreat, setGlobalThreat] = useState(0)
    const [infoToggle, setInfoToggle] = useState(false)

    const loadHashMap = useCallback(async () => {
        const csvUrl = '/threatLevels.csv'; // Replace this with the URL to your CSV file
        const hashMap = await parseCSVToHashMap(csvUrl);
        setHashMap(hashMap);
    }, []);

    useEffect(() => {
        loadHashMap();
        getGlobalThreatLevel(leakData.DataClasses, hashMap).then((threatLevel) => {
            setGlobalThreat(threatLevel)
            // console.log('Global threat level:', threatLevel);
        });

    }, [loadHashMap, leakData]);

    if(errorMessage){
        leakData = emptyData
    }

    const toggleInfo = () => {
        setInfoToggle(!infoToggle)
    }
  return (
    <Container>
        <H2Title>Leak Details</H2Title>
        {
            leakData && leakData?.Name !== '' ? 
            <>
                <SiteName>{leakData.Name}</SiteName>
                <H3>Breached On: {leakData.BreachDate}</H3>
                <SubContainer>
                    <H3Leak>Leaked Data</H3Leak>
                    <InfoPanel onClick={()=>toggleInfo()}> <AiFillQuestionCircle size={36} /> </InfoPanel>
                    <List>
                        {
                            (leakData as Data).DataClasses.map((dataclass, key) => (
                                <ListItem key={key} >{dataclass}</ListItem>
                            ))
                        }
                    </List>
                    <ThreatBar globalThreat={globalThreat}/>
                    {
                        infoToggle ?
                        <SubContainerInfo>
                            <TextBlurb>
                                This is all of the data that was present in the <b>{leakData?.Name}</b> data leak that we found.<br/> If your <i>Password</i> is among these categories, you can change it <a href={`https://www.${leakData.Domain}`}>here</a>
                            </TextBlurb>
                        </SubContainerInfo>
                        :
                        <></>
                    }
                </SubContainer>

                


            </>
            : 
            <></>
        }

        {
            errorMessage ?

            <NoLeakContainer>
                <NoLeakTitle>No Leaks Found!</NoLeakTitle>
                <NoLeakMessage>No leaks for this email address were found on the deep web.<br/>This is not a guarantee of safety but a we think you are doing pretty good</NoLeakMessage>
                <p>Or maybe you spelled your email wrong :O</p>
            </NoLeakContainer>
            :
            <></>
        }
    </Container>
  )
}

const TextBlurb = styled.p`
    text-align: center;
    line-height: 1.5;
    margin: 20px;
`

const Div = styled.div`
    border: 1ps solid black;
    border-radius: 20px;
`

const InfoPanel = styled.div`
    position: absolute;
    top:0;
    right:0;
    margin: 30px;
    z-index: 3;

    &:hover{
        cursor: pointer;
        transition: 1.5s;
        transform: scale(1.2)
    }

    &:not(:hover){
        transition: 1.5s;
    }
`

const NoLeakContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1 1 auto;
    border: 5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    border-radius: 20px;
`

const NoLeakTitle = styled.h1`
    font-size: 4em;
    padding: 40px;

`

const NoLeakMessage = styled.p`
    text-align: center;
    line-height: 2em;
    font-size: 1.6em;
    padding: 20px;
`

const Container = styled.div`
    display:flex;
    flex-direction: column;
    /* overflow: scroll; */
    padding: 30px;
    /* align-items:center; */
    /* justify-content: center; */
    align-items:center;
    width: 100%;
`

const H2Title = styled.h2`
    border-bottom: 3px solid white;
    margin-bottom: 10px;
    padding-bottom: 5px;
`

const SiteName = styled.h2`
    /* padding-bottom: 10px; */
    font-size: 2em;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    line-height: 2em;
    font-size: 1.2em;
    list-style-type: none;
    text-align: center;
`

const ListItem = styled.li`
    
`

const SubContainer = styled.div`
    position: relative;
    display: flex;
    height: min-content;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 4px solid black;
    border-radius: 20px;
    width: 60%;
`

const SubContainerInfo = styled.div`
    position: absolute;
    top:0;
    left:0;
    background-color: #0720c1;
    opacity: 0.99;
    width:100%;
    height:100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const H3 = styled.h3`
    padding: 10px;
`

const H3Leak = styled.h3`
    padding-bottom: 30px;
    text-decoration: underline;
    font-size: 1.6em
`

export default LeakDetails