import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  &.ant-card {
    width: 300px;
    height: 550px;
    margin: 10px;
    .ant-card-body {
      height: 100%;
    }
  }

  & img {
    height: 250px;
    width: auto;
    max-width: 100%;
  }
`;
