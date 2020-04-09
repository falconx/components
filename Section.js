import React, { useContext } from 'react';

import { HeadingContext } from './Heading';

const Section = props => {
  const level = useContext(HeadingContext);

  return (
    <HeadingContext.Provider
      value={level + 1}
      children={props.children}
    />
  );
};

export default Section;