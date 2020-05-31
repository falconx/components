import styled from '@emotion/styled';
import { system } from 'styled-system';
import { propType } from '@styled-system/prop-types';

const size = system({
  size: {
    property: 'margin-top',
    scale: 'space',
    defaultScale: [0, 4, 8, 16, 32, 64, 128]
  }
})

const Spacer = styled.div`
  ${size}
`;

Spacer.propTypes = {
  size: propType.isRequired
};

export default Spacer;