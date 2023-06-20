import styled, { css, keyframes } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import ThreatBar from './ThreatBar';
import  { AiFillQuestionCircle } from 'react-icons/ai'
import Data from '../types/Data.types';
import { emptyData } from '../data/Data.instance';
import LeakClassItem from './LeakClassItem';
import '../App.css'

/**
 * Props for leakDetails
 * leakData: Data object (types folder)
 * errorMessage: string to display no results message
 */
interface LeakDetailsProps{
    leakData: Data
    errorMessage: string | null;
    infoTab: boolean
}
/**
 * HashMap: dataClass: string -> threatLevel: number
 */
type DataClassThreatMap = { [dataClass: string]: number };

/**
 * Function to get data from csv file
 * @param url 
 * @returns text format of csv file
 */
async function fetchCSVFile(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
}

/**
 * 
 * @param csvUrl url to csv file
 * @returns converts csv file to DataClassThreatMap
 */
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

/**
 * Algorithm to generate a threat level (0 -> 100) for combination of dataclasses present in leak
 * @param dataclasses dataClasses from leak details
 * @param hashMap threatMap
 * @returns Promise<number> between 0 and 100 representing threat level
 */
const getGlobalThreatLevel = async (dataclasses: string[], hashMap: DataClassThreatMap): Promise<number> => {
    // let totalThreat = 0;
  
    // for (const dataClass of dataclasses) {
    //   const threatLevel = hashMap[dataClass] || 0;
    //   totalThreat += threatLevel;
    // }
  
    // // Normalize the total threat value between 0 and 100
    // const normalizedThreat = (totalThreat / (dataclasses.length * 10)) * 100;
    // return normalizedThreat;

    

    let maxThreat = 0;
    let totalThreat = 0;

    for (const dataClass of dataclasses){
        const threatLevel = hashMap[dataClass];
        maxThreat = Math.max(maxThreat, threatLevel)
        totalThreat += threatLevel
    }

    const weightedThreat = (maxThreat * 5 + totalThreat) / 2;
    const dataClassCountWeight = dataclasses.length * 5;

    let finalThreat = Math.max(weightedThreat + dataClassCountWeight, maxThreat * 5);

    if (
        (dataclasses.includes("Email addresses") || dataclasses.includes("Usernames")) &&
        dataclasses.includes("Passwords")
    ) {
        finalThreat = Math.max(finalThreat, 80);
      }
    return Math.min(finalThreat, 100);
};


/**
 * Leak Details Component
 * Where all info about the selected Link is presented
 * Breach Date, Service name, Leaked Data Classes, Threat level presented as Spectrum
 */
const LeakDetails: React.FC<LeakDetailsProps> = ({leakData, errorMessage, infoTab}) => {

    // state to hold the generated hashmap
    const [hashMap, setHashMap] = useState<DataClassThreatMap>({});



    // state to hold the threat level of dataclass combination
    const [globalThreat, setGlobalThreat] = useState(0)

    // state to hold toggle value for the info tab
    const [infoToggle, setInfoToggle] = useState(false)

    /**
     * Callback to load hashmap into state
     */
    const loadHashMap = useCallback(async () => {
        const csvUrl = '/threatLevels.csv'; // Replace this with the URL to your CSV file
        const hashMap = await parseCSVToHashMap(csvUrl);
        setHashMap(hashMap);
    }, []);

    /**
     * On Component load: 
     * Loads hashmap
     * Sets gloabl threat
     */
    useEffect(() => {
        loadHashMap();
        getGlobalThreatLevel(leakData.DataClasses, hashMap).then((threatLevel) => {
            setGlobalThreat(threatLevel)
            // console.log('Global threat level:', threatLevel);
        });
        setInfoToggle(false)
    }, [loadHashMap, leakData]);
    

    if(errorMessage){

        leakData = emptyData
    }

    const toggleInfo = () => {
        console.log(1)
        setInfoToggle(!infoToggle)
    }
  return (
    <Container >
        {/* <H2Title>Leak Details</H2Title> */}
        {/* If leak data is found -> render leak data */}
        {
            !infoTab ?
            <>
            {
                leakData && leakData?.Name !== '' ? 
                <>
                    
                    <Div className='slideUp'>
                    {
                        infoToggle ?
                        <SubContainerInfo>
                            <InfoPanel onClick={()=>toggleInfo()}> <AiFillQuestionCircle size={24} /> </InfoPanel>
                            <TextBlurb 
                                dangerouslySetInnerHTML={{
                                __html: leakData.Description,
                            }} />
                        </SubContainerInfo>
                        :
                        <>
                            <InfoPanel onClick={()=>toggleInfo()}> <AiFillQuestionCircle size={24} /> </InfoPanel>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'min-content'}}>
                                <SiteName>{leakData.Name}</SiteName>
                                <H3>{leakData.BreachDate}</H3>
                            </div>
                            <SubContainer>
                                <H3Leak>Leaked Data</H3Leak>
                                
                                <List>
                                    {
                                        (leakData as Data).DataClasses.map((dataclass, key) => (
                                            <LeakClassItem key={key} dataclass={dataclass} url={leakData.Domain} />
                                        ))
                                    }
                                </List>
                            
                            </SubContainer>
                        </>
                    }
                    
                    </Div>
                    <ThreatBarDiv className='slideUp'>
                        <ThreatBar globalThreat={globalThreat}/>
                    </ThreatBarDiv>
                    

                    


                </>
                : 
                <></>
            }
            </>
            :
            <DivInfo>
                <SubContainerInfoTab>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <SiteName>Name of the site</SiteName>
                                <H3>Date of Leak</H3>
                            </div>
                            <SubContainer>
                                <H3Leak>Leaked Data</H3Leak>
                                
                                <List>
                                    Categories of data that were present in the leak.
                                </List>
                            
                            </SubContainer>
                </SubContainerInfoTab>
                <ThreatBarDivInfo>
                    This is where you will find the approximate threat level based on the combination of data classes that were present in the leak<br/>
                    We use our own proprietary algorithm to calculate this threat level.
                    <ThreatBar globalThreat={globalThreat}/>
                </ThreatBarDivInfo>
            </DivInfo>
        }
        {/* Presents no Leak Found message if api returns an error */}
        {
            errorMessage === "Error: Error Not Found" ? 

            <NoLeakContainer>
                <NoLeakTitle>No Leaks Found!</NoLeakTitle>
                <NoLeakMessage>No leaks for this address were found on the deep web.<br/>This is not a guarantee of safety but we think you are doing pretty good</NoLeakMessage>
                <p>Or maybe you it wrong :O</p>
            </NoLeakContainer>
            :
            <></>
        }
    </Container>
  )
}

// Define your keyframes
const fadeIn = keyframes`
  0% {opacity:0;}
  100% {opacity:1;}
`;

const SubContainerInfoTab = styled.div`
    background: #D6D0C7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;

`

const ThreatBarDivInfo = styled.div`
    background: #D6D0C7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width:100%;
    margin-top: 10px;
    text-align: center;
    padding: 20px 10px;
`
const DivInfo = styled.div`
    
    border-radius: 20px;
    width: 90%;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`
interface DivProps {
    animate?: boolean;
  }

const ThreatBarDiv = styled.div<DivProps>`
    margin-top: 40px;
    border-top: 3px solid white;
    width: 60vw;
    display: flex;
    justify-content: center;
    ${props => 
    props.animate
    ? css`
        animation: ${fadeIn} 0.3s linear;
      `
    : ''
  }
`


const Div = styled.div<DivProps>`
    display: flex;
    align-items: center;
    width: 60vw;
    ${props => 
    props.animate
    ? css`
        animation: ${fadeIn} 0.3s linear;
      `
    : ''
  }
`

const TextBlurb = styled.p`
    text-align: center;
    line-height: 1.8;
    margin: 20px;
`

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
`

const NoLeakContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    /* flex: 1 1 auto; */
    padding: 80px 30px;
    border: 5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    border-radius: 20px;
    margin: 0px 20px;
`

const NoLeakTitle = styled.h1`
    font-size: 4em;
    /* padding-bottom: 40px; */

`

const NoLeakMessage = styled.p`
    text-align: center;
    line-height: 2em;
    font-size: 1.6em;
    padding: 20px;
`

const Container = styled.div`
    /* display:flex;
    flex-direction: column;
    margin: 30px;
    padding:20px 0px;
    align-items:center;
    width: 60vw;
    background: #E7E2D7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px; */
    z-index: 999;
`

// const H2Title = styled.h2`
//     border-bottom: 3px solid white;
//     margin-bottom: 18px;
//     padding-bottom: 5px;
// `

const SiteName = styled.h2`
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

const SubContainer = styled.div`
    position: relative;
    display: flex;
    height: min-content;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    width: 100%;
`

const SubContainerInfo = styled.div`

    opacity: 0.99;
    max-width:100%;
    min-height:100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const H3 = styled.h3`
    padding: 10px;
    font-size:16px;
    text-align: center;
`

const H3Leak = styled.h3`
    text-decoration: underline;
    font-size: 16px;
`

export default LeakDetails