import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import map from 'lodash/map';
import debounce from 'lodash/debounce';

// ideally stored in theme configuration
const BREAKPOINTS = {
  xs: '@media screen and (max-width: 575px)',
  sm: '@media screen and (min-width: 576px)',
  md: '@media screen and (min-width: 768px)',
  lg: '@media screen and (min-width: 992px)',
  xl: '@media screen and (min-width: 1200px)',
  xxl: '@media screen and (min-width: 1600px)'
};

const { Provider, Consumer } = React.createContext();

const EVENT_TYPES = [
  'resize',
  'orientationchange'
];

const Breakpoints = styled.div`
  &::before {
    display: none;
  }

  ${props => map(props.theme.query, (query, name) => `
    ${query} {
      &::before {
        content: '${name}';
      }
    }
  `)};
`;

export class Breakpoint {
  constructor(value) {
    this.value = value;
    this.breakpoints = Object.keys(BREAKPOINTS);
  }

  getIndex(breakpoint) {
    return this.breakpoints.indexOf(breakpoint);
  }

  lt(compare) {
    return this.getIndex(this.value) < this.getIndex(compare);
  }

  gt(compare) {
    return this.getIndex(this.value) > this.getIndex(compare);
  }

  lte(compare) {
    return this.getIndex(this.value) <= this.getIndex(compare);
  }

  gte(compare) {
    return this.getIndex(this.value) >= this.getIndex(compare);
  }
}

class BreakpointProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialBreakpoint: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.el = React.createRef();

    this.update = this.update.bind(this);
    this.updateBreakpoint = this.updateBreakpoint.bind(this);

    this.debouncedUpdate = debounce(this.update, 250);

    this.state = {
      afterElement: null,
      breakpoint: new Breakpoint(props.initialBreakpoint),
    };
  }

  componentDidMount() {
    EVENT_TYPES.forEach(eventType =>
      window.addEventListener(eventType, this.debouncedUpdate)
    );

    this.update();
  }

  componentWillUnmount() {
    EVENT_TYPES.forEach(eventType =>
      window.removeEventListener(eventType, this.debouncedUpdate)
    );
  }

  updateBreakpoint(afterElement = this.state.afterElement) {
    if (afterElement) {
      const value = afterElement.getPropertyValue('content').replace(/"/g, '');

      if (afterElement !== this.state.afterElement) {
        this.setState({ afterElement });
      }

      if (value !== this.state.breakpoint.value) {
        const breakpoint = new Breakpoint(value);
        this.setState({ breakpoint });
      }
    }
  }

  update() {
    this.updateBreakpoint(window.getComputedStyle(this.el.current, '::before'));
  }

  render() {
    return (
      <Provider value={this.state.breakpoint}>
        <Breakpoints ref={this.el} />
        {this.props.children}
      </Provider>
    );
  }
}

export {
  BreakpointProvider,
  Consumer as Media
};