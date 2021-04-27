import styled from "styled-components";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const StyledTitle = styled(Text)`
  &.ant-typography {
    color: #f5f5f5;
    line-height: normal !important;
    height: 64px;
    line-height: 64px !important;
    margin: 0;
    font-size: 2rem;
  }
`;
