import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <div>
    <SpinnerContainer>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </SpinnerContainer>
    </div>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default LoadingSpinner;
