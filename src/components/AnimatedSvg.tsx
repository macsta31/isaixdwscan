import { FC, ReactNode } from 'react';
import { animated, useSpring } from 'react-spring';

interface AnimatedSvgProps {
  loading: boolean;
  id: string;
  children: ReactNode;
  [key: string]: unknown;
}

const AnimatedSvg: FC<AnimatedSvgProps> = ({ loading, id, children, ...props }) => {
  const animationProps = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'translate3d(0,20px,0)' : 'translate3d(0,0px,0)',
    delay: 200,
  });

  return (
    <animated.svg id={id} {...props} style={animationProps}>
      {children}
    </animated.svg>
  );
};

interface SvgComponentProps {
  loading: boolean;
}

export const SvgComponent: FC<SvgComponentProps> = ({ loading }) => (
  <>
    <AnimatedSvg id="svg1" width="1440" height="500" viewBox="0 0 1440 238" fill="none" xmlns="http://www.w3.org/2000/svg" className='slideUp' loading={loading}>
    <path d="M0 56.8476L48 54.3431C96 51.8387 192 46.8298 288 70.3718C384 93.4129 480 145.506 576 124.468C672 103.431 768 10.2645 864 0.747479C960 -8.2686 1056 66.8655 1152 86.9012C1248 106.937 1344 71.8744 1392 54.3431L1440 36.8119V703H1392C1344 703 1248 703 1152 703C1056 703 960 703 864 703C768 703 672 703 576 703C480 703 384 703 288 703C192 703 96 703 48 703H0V56.8476Z" fill="#475DE2"/>
    </AnimatedSvg>
    
    <AnimatedSvg id="svg2" width="1440" height="350" viewBox="0 0 1440 155" fill="none" xmlns="http://www.w3.org/2000/svg" className='slideUp' loading={loading}>
    <path d="M0 80.2924L48 92.4357C96 105.254 192 129.541 288 99.1821C384 68.8235 480 -16.1803 576 2.70944C672 21.5992 768 145.732 864 169.344C960 192.956 1056 116.048 1152 90.4119C1248 64.7758 1344 89.0627 1392 101.881L1440 114.024V620H1392C1344 620 1248 620 1152 620C1056 620 960 620 864 620C768 620 672 620 576 620C480 620 384 620 288 620C192 620 96 620 48 620H0V80.2924Z" fill="#3648D5"/>
    </AnimatedSvg>
    
    <AnimatedSvg id="svg3" width="1440" height="250" viewBox="0 0 1440 199" fill="none" xmlns="http://www.w3.org/2000/svg" className='slideUp' loading={loading}>
    <path d="M0 48.3341L48 84.7063C96 120.095 192 192.839 288 176.128C384 159.416 480 55.2152 576 16.8771C672 -20.478 768 9.01296 864 58.1644C960 107.316 1056 176.128 1152 183.009C1248 188.907 1344 133.858 1392 105.35L1440 77.825V589H1392C1344 589 1248 589 1152 589C1056 589 960 589 864 589C768 589 672 589 576 589C480 589 384 589 288 589C192 589 96 589 48 589H0V48.3341Z" fill="#2433C7"/>
    </AnimatedSvg>

    <AnimatedSvg id="svg4" width="1440" height="318" viewBox="0 0 1440 318" fill="none" xmlns="http://www.w3.org/2000/svg" className='slideUp' loading={loading}>
    <path d="M0 135.178L48 117.505C96 99.4996 192 64.1547 288 83.4944C384 102.834 480 177.525 576 165.855C672 154.184 768 56.1521 864 19.4734C960 -17.2052 1056 7.46956 1152 16.8059C1248 26.1423 1344 20.8072 1392 17.8062L1440 15.1387V612H1392C1344 612 1248 612 1152 612C1056 612 960 612 864 612C768 612 672 612 576 612C480 612 384 612 288 612C192 612 96 612 48 612H0V135.178Z" fill="#5871EE"/>
    </AnimatedSvg>
  </>
);
