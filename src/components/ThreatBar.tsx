import styled from 'styled-components'
import  { GiPlainArrow } from 'react-icons/gi'

interface ThreatBarProps {
    globalThreat: number;
}

interface ThreatBarProps {
    globalThreat: number;
  }
  
  const ThreatBar: React.FC<ThreatBarProps> = ({ globalThreat }) => {
    const arrowPositionPercentage = `${globalThreat}%`;
  
    return (
      <Div>
        <h3>Threat Level</h3>
        <ThreatBarContainer>
          <ArrowContainer style={{ left: arrowPositionPercentage }}>
            <GiPlainArrow size={24} />
          </ArrowContainer>
          <Bar />
          <Blurb>
            {
              globalThreat < 50 ?
              <p>
                Low threat! This leak may have caused you to receive spam mail.
              </p>
              :
              <p>
                High threat! Sensitive data may have been leaked and we recommend changing your password for the leaked service.
              </p>
            }
          </Blurb>
        </ThreatBarContainer>
      </Div>
    );
  };

  const ThreatBarContainer = styled.div`
    position: relative;
    width: 100%;
    /* z-index: 3; */
  `

  const Blurb = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    text-align: center;
  `

  const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid black;
    border-radius: 20px;
    padding: 30px;
  `
  const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    /* transform: rotate(180deg) */
  `

  // const Arrow = styled.div`
  //   width: 0;
  //   height: 0;
  //   border-left: 10px solid transparent;
  //   border-right: 10px solid transparent;
  //   border-bottom: 20px solid red;
  // `
  const Bar = styled.div`
    width: 100%;
    height: 10px;
    background-image: linear-gradient(to right, #4eff4e, orange, red);
    margin-top: 20px;
    border-radius: 10px;
  `

export default ThreatBar