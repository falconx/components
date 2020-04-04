import PropTypes from 'prop-types';
import styled from 'styled-components';

// ideally stored in theme configuration
const SPACING_UNITS = 10;

const Spacer = styled.div`
  margin-bottom: ${props => props.size * SPACING_UNITS}px;
`;

Spacer.propTypes = {
  size: PropTypes.number.isRequired
}

export default Spacer;