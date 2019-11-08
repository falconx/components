import { createGlobalStyle } from 'styled-components';

import { Row, Col } from 'antd/lib/grid';
import gridStyles from 'antd/lib/grid/style/index.css';

const GridStyles = createGlobalStyle`
  ${gridStyles}
`;

export {
  GridStyles,
  Row,
  Col
};