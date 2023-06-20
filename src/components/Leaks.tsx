import styled from 'styled-components'
import Leak from './Leak';
import { useEffect } from 'react';
import Data from '../types/Data.types';
import { emptyData } from '../data/Data.instance';


interface LeaksProps{
    leaks: Data[]
    getData: (data:Data) => void
    infoTab: boolean
}





const Leaks: React.FC<LeaksProps> = ({leaks, getData, infoTab}) => {


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
        <H2>Leaks</H2>
        {
            !infoTab ?
            <>
                {
                    leaks ? 
                    leaks.map((leak, key) => (
                        <Leak key={key} leak={leak} getData={getData} />
                    ))
                    :
                    <></>
                }
            </>
            :
            <>
               <LeakInfo>
                    This is where you will find the name of the companies or services from which your data has been leaked
                </LeakInfo> 
            </>
        }
    </Container>
  )
}

const LeakInfo = styled.div`
    text-align: center;
    line-height: 1.5;
    padding: 10px;
    margin-top: 30%;
    font-size: 18px;
`

const Container = styled.div`
    transform: translateY(-75px);
    display: flex;
    flex-direction: column;
    margin-right: 60px;
    z-index: 999;
    max-height:490px;
    overflow-y: auto;

    /* Styling for Firefox */
    scrollbar-width: thin;
    scrollbar-color: #fff #2334c6;

    /* Styling for Internet Explorer */
    -ms-overflow-style: -ms-autohiding-scrollbar;

    /* Styling for Webkit browsers */
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #2334c6; 
    }

    &::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 50%;
    }
`


const H2 = styled.h2`
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
`

export default Leaks