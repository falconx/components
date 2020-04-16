import styled from 'styled-components';
import { system, compose, space } from 'styled-system';
import { propType } from '@styled-system/prop-types';

const size = system({
  size: {
    property: 'margin',
    scale: 'space',
    defaultScale: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  }
})

const Spacer = styled.div`
  ${compose(space, size)}
`;

Spacer.propTypes = {
  size: propType.isRequired
};

export default Spacer;