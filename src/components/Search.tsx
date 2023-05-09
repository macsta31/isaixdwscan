import styled from 'styled-components'
import { useState } from 'react'

interface SearchProps {
    callAPI: (email:string) => Promise<void>
    clearLeaks: () => void
}

const Search: React.FC<SearchProps> = ({callAPI, clearLeaks}) => {
    
    const [email, setEmail] = useState('')
    const [noEmailError, setNoEmailError] = useState(false)

    const submitForm = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        if(email === ''){
            const input = document.getElementById("input")
            if(input !== null){
                setNoEmailError(true);
                input.style.border = "5px solid red"
            }
            clearLeaks()
            return;
        }
        callAPI(email)
        form.reset()
        
    }

    const updateEmail = (e:React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()
        e.target.style.border = "1px solid black"
        setNoEmailError(false);
        setEmail(e.target.value)
    }
  return (
    <Div>  
        <Container>
            <Form onSubmit={(e) => submitForm(e)}>
                <Input id="input" onChange={(e) => updateEmail(e)}/>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
        {
            noEmailError ?
            <p>Don't forget to input an email address!</p>
            :
            <></>
        }
    </Div>
  )
}


const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    justify-content: center;
    align-items:center;
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 20px;
    width: 100%;
    /* transform:translateY(150px); */
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Input = styled.input`
    min-width: 50%;
    padding: 0px 15px;
    margin-right: 20px;
    height: 1.7em;
    border-radius: 20px;
    font-size: 1.7em;
    text-align: center;
`

const Button = styled.button`
    width: 20%;
    height: 1.9em;
    padding: 0px 10px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid black;
    font-size: 1.8em;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
        transition: 1.5s
    }

    &:not(:hover){
        transition: 1.5s
    }
`

export default Search