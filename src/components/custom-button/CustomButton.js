import React from 'react';

// import './CustomButton.scss';
import { CustomButtonContainer } from './CustomButton.styles';

const CustomButton = (props) => {
  return (   
      <CustomButtonContainer {...props}>
        { props.children }
      </CustomButtonContainer>
  );
};

export default CustomButton;
