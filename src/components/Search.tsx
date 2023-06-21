import styled from 'styled-components'
import { useState } from 'react'
import { PacmanLoader } from 'react-spinners'


/*Props for Search Component
callAPI: function to call our proxy server --> passed up to Layout for final call
clearLeaks: function to reset leaks --> passed up to Layout for final call */
interface SearchProps {
    callAPIBreachedAccount: (email:string) => Promise<void>
    callAPIDomain: (domain:string) => Promise<void>
    clearLeaks: () => void
    loading: boolean
}

const Search: React.FC<SearchProps> = ({callAPIBreachedAccount, clearLeaks, callAPIDomain, loading}) => {

    
    // email state to hold value in search bar
    const [input, setInput] = useState('')
    const [domainScan, setDomainScan] = useState(false)

    // email error state for form validation
    const [noEmailError, setNoEmailError] = useState(false)

    /**Form Submittion Function
     * sends form value (held in email state) to callAPI function which is executed in Layout
     * does form validation
     * clearsLeaks before calling api
     * resets form after api call
     */
    const submitFormBreach = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const inputBar = document.getElementById("input")
        const inputElement = inputBar as HTMLFormElement
        const formValue = inputElement.value

        if(formValue === ''){
            const inputBar = document.getElementById("input")
            if(inputBar !== null){
                setNoEmailError(true);
                inputBar.style.border = "1px solid red"
            }
            clearLeaks()
            return;
        }
        callAPIBreachedAccount(input)
        form.reset()
        
    }

    const submitFormDomain = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const inputBar = document.getElementById("input")
        const inputElement = inputBar as HTMLFormElement
        const formValue = inputElement.value

        if(formValue === ''){
            const inputBar = document.getElementById("input")
            if(inputBar !== null){
                setNoEmailError(true);
                inputBar.style.border = "1px solid red"
            }
            clearLeaks()
            return;
        }
        callAPIDomain(input)
        form.reset()
        
    }

    // updates email state on form change
    const updateInput = (e:React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()
        e.target.style.border = "1px solid black"
        setNoEmailError(false);
        setInput(e.target.value)
    }

    const switchMode = () => {
        setDomainScan(!domainScan)
    }
  return (
    <Div id='searchdiv'>  

            
            {/* <H3>Enter {domainScan ? <>domain</> : <>email</>} to begin dark web scan</H3> */}
            {
                !domainScan ?
                <Form onSubmit={(e) => submitFormBreach(e)}>
                        {!loading ? <Input id="input" placeholder={'mark@gmail.com'} onChange={(e) => updateInput(e)}/> : <PacmanLoader color='#2334C6' size={32} />}
                        <div style={{display:'flex', alignItems:'center', justifyContent: 'space-between', width:'400px'}}>
                            <Button id='search' type='submit'>Search</Button>
                            <SwitchMode onClick={() => switchMode()}>{domainScan ? <>Email</> : <>Domain</>} Scan</SwitchMode>
                        </div>
                </Form>
            :
                <Form onSubmit={(e) => submitFormDomain(e)}>
                    {!loading ? <Input id="input" placeholder='facebook.com' onChange={(e) => updateInput(e)}/> : <PacmanLoader color='#2334C6' size={32} />}
                    <div style={{display:'flex', alignItems:'center', justifyContent: 'space-between', width:'400px'}}>
                        <Button id='search1' type='submit'>Search</Button>
                        <SwitchMode onClick={() => switchMode()}>{domainScan ? <>Email</> : <>Domain</>} Scan</SwitchMode>
                    </div>            
                </Form>
            }
            
        {
            noEmailError ?
            <p style={{display: 'grid', placeContent:'center', marginTop:'20px', color:'red'}}>Don't forget to input an email address!</p>
            :
            <></>
        }
    </Div>
  )
}




const SwitchMode = styled.div`
    margin-top: 30px;
    padding: 10px 30px;
    font-weight: 600;
    width: 150px;
    text-align: center;
    background-color: #001220;
    border: none;
    color: white;
    font-size: 1.3em;
    border-radius: 18px;
    box-shadow: -5px -5px 15px #001424, 5px 5px 15px #000a12, inset 5px 5px 10px #001b2f, inset -5px -5px 10px #001424;
	color: white;
	font-size: 1.2em;


    &:hover {
      box-shadow: -5px -5px 15px #002644, 5px 5px 15px #000a12, inset 5px 5px 10px #000a12, inset -5px -5px 10px #002644;
      font-size: 1em;
      transition: 500ms;
      color: white;
	  text-shadow: 0px 0px 10px white;
      cursor:pointer;
    }

    &:active {
      box-shadow: -10px -10px 20px #002644, 10px 10px 20px #000a12, inset 10px 10px 15px #000a12, inset -10px -10px 15px #002644;
      font-size: 1em;
      color: white;
	  text-shadow: 0px 0px 10px white;
    }

`

// const H3 = styled.h3`
//     padding-bottom: 30px;
// `
const Div = styled.div`
    /* position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:15px 0px;
    justify-content: center;
    align-items:center;
    border-radius: 20px;
    background-color:rgba(235, 232, 226, 0.35);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: bold; */

`
// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items:center;
//     padding: 40px;
// `

const Form = styled.form`
    /* display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: rgba(216, 213, 207, 0.35);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    width: 100%;
    padding: 10px; */
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    /* width: 500px;
    padding: 5px 20px;
    background: #f3f3f3;
    border-radius: 20px;
    border: transparent;
    font-size: 20px;
    text-align: center;
    margin: 0px 20px; */
    min-width: 45vw;
    padding: 5px 10px;
    border-radius: 18px;
    text-align: center;
    font-size: 1.5em;
`

const Button = styled.button`
    /* background: #050505;
    border-radius: 20px;
    min-width: 15%;
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
    } */
    margin-top: 30px;
    padding: 10px 30px;
    font-weight: 600;
    width: 150px;
    background-color: #001220;
    border: none;
    color: white;
    font-size: 1.3em;
    border-radius: 18px;
    box-shadow: -5px -5px 15px #001424, 5px 5px 15px #000a12, inset 5px 5px 10px #001b2f, inset -5px -5px 10px #001424;
	color: white;
	font-size: 1.2em;


    &:hover {
      box-shadow: -5px -5px 15px #002644, 5px 5px 15px #000a12, inset 5px 5px 10px #000a12, inset -5px -5px 10px #002644;
      font-size: 1em;
      transition: 500ms;
      color: white;
	    text-shadow: 0px 0px 10px white;
        cursor:pointer;
    }

    &:active {
      box-shadow: -10px -10px 20px #002644, 10px 10px 20px #000a12, inset 10px 10px 15px #000a12, inset -10px -10px 15px #002644;
      font-size: 1em;
      color: white;
      text-shadow: 0px 0px 10px white;
    }
`

export default Search