import React, { createContext, useContext } from 'react';

const HeadingContext = createContext(2);

const H = props => {
  const headingLevel = useContext(HeadingContext);
  const Heading = 'h' + Math.min(headingLevel, 6);

  return (
    <Heading {...props} />
  );
};

export { HeadingContext };
export default H;