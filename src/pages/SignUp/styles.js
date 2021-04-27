import styled from "styled-components";
import { Card } from "antd";

export const LoginContainer = styled.div`
  /* width: 100%; */
`;

export const StyledCard = styled(Card)`
  &.ant-card {
    width: 500px;
    /* margin: 10px; */
    margin: 15vh auto;

    & button {
      float: right;
    }
  }
`;
