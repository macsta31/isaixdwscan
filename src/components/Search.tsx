import styled from 'styled-components'
import { useState } from 'react'


/*Props for Search Component
callAPI: function to call our proxy server --> passed up to Layout for final call
clearLeaks: function to reset leaks --> passed up to Layout for final call */
interface SearchProps {
    callAPI: (email:string) => Promise<void>
    clearLeaks: () => void
}

const Search: React.FC<SearchProps> = ({callAPI, clearLeaks}) => {
    
    // email state to hold value in search bar
    const [email, setEmail] = useState('')

    // email error state for form validation
    const [noEmailError, setNoEmailError] = useState(false)

    /**Form Submittion Function
     * sends form value (held in email state) to callAPI function which is executed in Layout
     * does form validation
     * clearsLeaks before calling api
     * resets form after api call
     */
    const submitForm = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const input = document.getElementById("input")
        const inputElement = input as HTMLFormElement
        const formValue = inputElement.value
        console.log(formValue)
        if(formValue === ''){
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

    // updates email state on form change
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
                <h3>Input Email:</h3>
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
    margin: 0px 20px;
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