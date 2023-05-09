import Header from "./Header"
import Body from "./Body"
import styled from 'styled-components'
import { useState } from "react"

const Layout = () => {
    const [leaks, setLeaks] = useState([])

    const [error, setError] = useState<string | null>(null)

    const callAPI = async (email: string): Promise<void> => {
        try {
          const response = await fetch(`https://isaixdwproxy.onrender.com/breachedaccount/${email}`);
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

    const clearLeaks = (): void => {
        setLeaks([])
    }

    return (
    <Container>
        <Header callAPI={callAPI} clearLeaks={clearLeaks} />

        <Body leaks={leaks} errorMessage={error} />
    </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    min-height: 100vh;
`

export default Layout