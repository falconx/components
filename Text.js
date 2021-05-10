import styled from '@emotion/styled';
import { system, compose, color, typography } from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';
import shouldForwardProp from '@styled-system/should-forward-prop';

const Text = styled('div', { shouldForwardProp })`
  ${compose(color, typography)}

  ${system({
    textTransform: true,
    textDecoration: true,
    whiteSpace: true,
  })}
`;

Text.propTypes = {
  ...createPropTypes(color.propNames),
  ...createPropTypes(typography.propNames),
};

export default Text;
