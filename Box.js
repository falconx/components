import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// influenced heavily by https://github.com/Monar/react-styled-box

const toCss = (props, propTypes, propsMap) => {
  return Object.keys(propTypes)
    .filter((k) => props[k] )
    .map((k) => `${propsMap[k].name}: ${propsMap[k].apply ? propsMap[k].apply(props[k]) : props[k]};`)
    .join('');
}

const defaultPx = prop => typeof prop === 'number' ? `${prop}px` : prop;

const flexDirectionValues = [
  'row',
  'row-reverse',
  'column',
  'column-reverse'
];

const flexWrapValues = [
  'nowrap',
  'wrap',
  'wrap-reverse'
];

const flexFlowValues = flexDirectionValues
  .map(direction => flexWrapValues.map((wrap) => `${direction} ${wrap}`))
  .reduce((acc, val) => acc.concat(val), []);

const flexValidator = validator => {
  return (props, propName, componentName, ...rest) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!props[propName]) {
        return null;
      }

      if (props['display'] !== 'flex' && props['display'] !== 'inline-flex') {
        return new Error(`The property "${propName}" in ${componentName} is available only when is display={/flex|inline-flex/}.`);
      }

      return validator(props, propName, componentName, ...rest);
    }

    return null;
  };
}

const propsMap = {
  d: { name: 'display' },
  m: { name: 'margin', apply: defaultPx },
  p: { name: 'padding', apply: defaultPx },
  w: { name: 'width', apply: defaultPx },
  h: { name: 'height', apply: defaultPx },
  b: { name: 'border', apply: defaultPx },
  color: { name: 'background-color' },
  maxWidth: { name: 'max-width', apply: defaultPx },
  minWidth: { name: 'min-width', apply: defaultPx },
  maxHeight: { name: 'max-height', apply: defaultPx },
  minHeight: { name: 'min-height', apply: defaultPx },
  flexDirection: { name: 'flex-direction' },
  flexWrap: { name: 'flex-wrap' },
  flexFlow: { name: 'flex-flow' },
  justifyContent: { name: 'justify-content' },
  alignItems: { name: 'align-items' },
  alignContent: { name: 'align-content' },
  order: { name: 'order' },
  flexGrow: { name: 'flex-grow' },
  flexShrink: { name: 'flex-shrink' },
  flexBasis: { name: 'flex-basis', apply: defaultPx },
  flex: { name: 'flex' },
  alignSelf: { name: 'align-self' },
  overflow: { name: 'overflow' },
  overflowX: { name: 'overflow-x' },
  overflowY: { name: 'overflow-y' }
};

const propTypes = {
  d: PropTypes.oneOf([
    'block',
    'inline-block',
    'inline',
    'flex',
    'inline-flex'
  ]),
  m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  b: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  flexDirection: flexValidator(PropTypes.oneOf(flexDirectionValues)),
  flexWrap: flexValidator(PropTypes.oneOf(flexWrapValues)),
  flexFlow: flexValidator(PropTypes.oneOf(flexFlowValues)),
  justifyContent: flexValidator(PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly'
  ])),
  alignItems: flexValidator(PropTypes.oneOf([
    'flex-start',
    'flex-end',
     'center',
    'baseline',
    'stretch'
  ])),
  alignContent: flexValidator(PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'stretch'
  ])),
  order: flexValidator(PropTypes.number),
  flexGrow: flexValidator(PropTypes.number),
  flexShrink: flexValidator(PropTypes.number),
  flexBasis: flexValidator(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  flex: flexValidator(PropTypes.string),
  alignSelf: flexValidator(PropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
     'center',
    'baseline',
    'stretch'
  ])),
  overflow: PropTypes.oneOf([
    'visible',
    'hidden',
    'scroll',
    'auto'
  ]),
  overflowX: PropTypes.oneOf([
    'visible',
    'hidden',
    'scroll',
    'auto'
  ),
  overflowY: PropTypes.oneOf([
    'visible',
    'hidden',
    'scroll',
    'auto'
  )
};

const Box = styled.div`
  ${(props) => toCss(props, propTypes, propsMap)}
`;

Box.propTypes = propTypes;

export default Box;