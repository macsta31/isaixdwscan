import styled from 'styled-components'
import Leak from './Leak';
import { useEffect } from 'react';
import Data from '../types/Data.types';
import { emptyData } from '../data/Data.instance';


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
        <H2>Leaks</H2>
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
    padding: 30px;
    /* justify-content: center; */
    border-right: 3px solid black;
`

const H2 = styled.h2`
    border-bottom: 3px solid white;
    margin-bottom: 20px;
    padding-bottom: 5px;
`

export default Leaks