import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;

export const StyledHeader = styled(Header)`
  &.ant-layout-header {
    color: #fff;
    background: #7dbcea;
    display: flex;

    .ant-menu {
      margin-left: auto;
    }
  }
`;
