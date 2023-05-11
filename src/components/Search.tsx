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
            <H3>Enter email to begin dark web scan</H3>
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

const H3 = styled.h3`
    padding-bottom: 10px;
`
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
    flex-direction: column;
    justify-content: center;
    align-items:center;
    /* padding: 20px; */
    width: 100%;
    /* transform:translateY(150px); */
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: rgba(216, 213, 207, 0.35);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: 100%;
    padding: 10px;
`

const Input = styled.input`
    min-width: 50%;
    /* padding: 0px 15px;
    margin: 0px 20px;
    height: 1.7em;
    border-radius: 20px; */
    width: 45%;
    padding: 5px 20px;
    background: #f3f3f3;
    border-radius: 20px;
    border: transparent;
    font-size: 20px;
    text-align: center;
`

const Button = styled.button`
    background: #050505;
    border-radius: 20px;
    min-width: 15%;
    /* height:30px;
     */
    padding:5px;
    font-size: 1.3em;
    color:white;
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