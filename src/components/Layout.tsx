import Header from "./Header"
import Body from "./Body"
import styled from 'styled-components'
import Footer from "./Footer"
import Search from "./Search"
import { useState } from "react"

/*Layout Component
Root of all our code */

const Layout = () => {
    // Leaks state: holds all the leaks returned by the api call. Default value: []
    const [leaks, setLeaks] = useState([])
    // Error state: Holds error message if returned from api -> no results
    const [error, setError] = useState<string | null>(null)


    /*callAPI function
    input: email: string
    output: Promise<>
    Make call to our proxy server and sets error and leaks accordingly from payload */
    const callAPIBreachedAccount = async (email: string): Promise<void> => {
        try {
          const response = await fetch(`https://dw-proxy-server.vercel.app/api/breachedaccount?email=${email}`);
          const data = await response.json();
      
          if (!response.ok) {
            setError(`Error: ${data.message}`);
            setLeaks([])
          } else {
            setLeaks(data);
            setError(null);
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(`Error: ${error.message}`);
          } else {
            setError('An unknown error occurred.');
          }
        }
    };

    const callAPIDomain = async (domain: string): Promise<void> => {
      try {
        const response = await fetch(`https://dw-proxy-server.vercel.app/api/breaches?domain=${domain}`);
        const data = await response.json();
    
        if (!response.ok) {
          setError(`Error: ${data.message}`);
          setLeaks([])
        } else if (data.length == 0){
          throw new Error("Error Not Found")
        } 
        else {
          setLeaks(data);
          setError(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
        } else {
          setError('An unknown error occurred.');
        }
      }
  };
    // resets leaks state
    const clearLeaks = (): void => {
        setLeaks([])
    }
    // Returns one main container for the webpage with a header, body and footer
    return (
    <Container>
        <Header />
        {error}
        <Search callAPIBreachedAccount={callAPIBreachedAccount} clearLeaks={clearLeaks} callAPIDomain={callAPIDomain} />
        {
          leaks.length > 0  || error ? 
          <Body leaks={leaks} errorMessage={error} />
          :
          <></>
        }
        
        <Footer />
    </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    min-height: 100vh;
    align-items: center;
    justify-content: space-evenly;
    width:90%;
    margin:auto;
`

export default Layout