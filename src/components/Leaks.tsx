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
    display: flex;
    flex-direction: column;
    margin-right: 60px;
    z-index: 999;
    /* width: 30%;
    max-height:650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: #E7E2D7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin: 30px 0px 30px 30px;
    padding:20px 10px;
    overflow-x: hidden;
    overflow-y: auto; /* allow vertical scrolling */
    /* scrollbar-width: none; Firefox */
    /* -ms-overflow-style: none; Internet Explorer 10+  */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }
`

const H2 = styled.h2`
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
`

export default Leaks