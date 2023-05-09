import styled from 'styled-components'
import Leak from './Leak';
import { useEffect } from 'react';

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

interface LeaksProps{
    leaks: Data[]
    getData: (data:Data) => void
}





const Leaks: React.FC<LeaksProps> = ({leaks, getData}) => {

    // const click = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault()
    //     console.log(leaks[0].Name)
    // }

    useEffect(() => {
        if(!leaks){
            getData(emptyData)
        }
        else{
            getData(leaks[0])
        }
        
    }, [])

    return (
    <Container>
        <H1>Leaks</H1>
        {
            leaks ? 
            leaks.map((leak, key) => (
                <Leak key={key} leak={leak} getData={getData} />
            ))
            :
            <></>
        }
    </Container>
  )
}

const Container = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    /* justify-content: center; */
    border-right: 3px solid black;
`

const H1 = styled.h1`
    border-bottom: 3px solid black;
    margin-bottom: 20px;
    padding-bottom: 5px;
`

export default Leaks