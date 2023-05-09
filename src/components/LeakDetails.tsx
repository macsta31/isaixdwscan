import styled from 'styled-components'

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

const LeakDetails: React.FC<LeakDetailsProps> = ({leakData, errorMessage}) => {
    // console.log(leakData?.Name)

    // if(leakData){
    //     errorMessage = null
    // }
    if(errorMessage){
        leakData = emptyData
    }
  return (
    <Container>
        <H1>Leak Details</H1>
        {
            leakData && leakData?.Name !== '' ? 
            <>
                <SiteName>{leakData.Name}</SiteName>
                <H2>Breached On: {leakData.BreachDate}</H2>
                <SubContainer>
                    <H3Leak>Leaked Data</H3Leak>
                    <List>
                        {
                            (leakData as Data).DataClasses.map((dataclass, key) => (
                                <ListItem key={key} >{dataclass}</ListItem>
                            ))
                        }
                    </List>
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

const NoLeakContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1 1 auto;
    border: 5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
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
    padding: 50px;
    /* align-items:center; */
    /* justify-content: center; */
    align-items:center;
    width: 100%;
`

const H1 = styled.h1`
    border-bottom: 3px solid black;
    margin-bottom: 30px;
    padding-bottom: 5px;
`

const SiteName = styled.h1`
    padding-bottom: 30px;
    font-size: 3em;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    line-height: 2em;
    font-size: 1.5em;
    list-style-type: none;
    text-align: center;
`

const ListItem = styled.li`
    
`

const SubContainer = styled.div`
    display: flex;
    height: min-content;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 4px solid black;
    border-radius: 20px;
    width: 60%;
`

const H2 = styled.h2`
    padding: 15px;
`

const H3Leak = styled.h3`
    padding-bottom: 30px;
    text-decoration: underline;
    font-size: 2em
`

export default LeakDetails