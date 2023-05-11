import React, { useState } from 'react'
import styled from 'styled-components';
import { AiFillWarning } from 'react-icons/ai'

interface LeakClassItemProps {
    dataclass: string;
    url: string;
}

const LeakClassItem: React.FC<LeakClassItemProps> = ({dataclass, url}) => {

    const [pwPrompt, setPwPrompt] = useState(false);

    const warnClick = () => {
        setPwPrompt(!pwPrompt)
    }

  return (
    <>
        {
            dataclass === 'Passwords' ?
            <>
                <ListItem>
                    {dataclass}
                    <Div>
                        <AiFillWarning size={24} onClick={warnClick}/>
                    </Div>
                    {
                        pwPrompt ? 
                        <PasswordChange>
                            <p>Reset Password<br/></p>
                            <a href={`https:/${url}`}>Here</a>
                        </PasswordChange>
                        :
                        <>
                        </>
                    }

                </ListItem>
            </>
            :
            <>
                <ListItem>{dataclass}</ListItem>
            </>
        }
    
    </>

  )
}

const ListItem = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        cursor: pointer;
        transition: 1s;
        transform: scale(1.2);
    }

    &:not(:hover){
        transition: 1s;
    }
`

const PasswordChange = styled.div`
    position: absolute;
    border: 3px solid black;
    border-radius: 20px;
    padding: 15px;
    right: -200px;
    font-size: 0.9em;
`

export default LeakClassItem