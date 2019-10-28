import PropTypes from 'prop-types';
import styled from 'styled-components';

// ideally stored in theme configuration
const SPACING_UNITS = 10;

const VerticalSpacing = styled.div`
  margin-bottom: ${props => props.size * SPACING_UNITS}px;
`;

VerticalSpacing.propTypes = {
  size: PropTypes.number.isRequired
}

export default VerticalSpacing;