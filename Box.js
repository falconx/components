import styled from '@emotion/styled';
import { compose, space, color, layout, flexbox } from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';
import shouldForwardProp from '@styled-system/should-forward-prop';

// https://styled-system.com/guides/build-a-box
const Box = styled('div', { shouldForwardProp })`
  // ensures the Box can shrink below its minimum content size when used as a flex item
  min-width: 0;

  ${compose(
    space,
    color,
    layout,
    flexbox
  )}
`;

Box.propTypes = {
  ...createPropTypes(space.propNames),
  ...createPropTypes(color.propNames),
  ...createPropTypes(layout.propNames),
  ...createPropTypes(flexbox.propNames)
};

export default Box;
