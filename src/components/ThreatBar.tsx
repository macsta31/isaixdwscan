import styled from 'styled-components'

interface ThreatBarProps {
    globalThreat: number;
}

interface ThreatBarProps {
    globalThreat: number;
  }
  
  const ThreatBar: React.FC<ThreatBarProps> = ({ globalThreat }) => {
    const arrowPositionPercentage = `${globalThreat}%`;
  
    return (
      <ThreatBarContainer>
        <ArrowContainer style={{ left: arrowPositionPercentage }}>
          <Arrow />
        </ArrowContainer>
        <Bar />
      </ThreatBarContainer>
    );
  };

  const ThreatBarContainer = styled.div`
    position: relative;
    width: 100%;
    /* z-index: 3; */
  `
  const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    transform: rotate(180deg)
  `

  const Arrow = styled.div`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid red;
  `
  const Bar = styled.div`
    width: 100%;
    height: 10px;
    background-image: linear-gradient(to right, #4eff4e, orange, red);
    margin-top: 20px;
    border-radius: 10px;
  `

export default ThreatBar