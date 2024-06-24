import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingSpinner = ({size}) => {
  return (
    <div>
   <SpinnerContainer size={size}>
      <Oval
        height={size}
        width={size}
        color="#4285F4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4285F4"
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

LoadingSpinner.propTypes = {
  size: PropTypes.number.isRequired,
};


export default LoadingSpinner;
