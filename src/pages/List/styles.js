import styled from "styled-components";
import { Switch, Pagination, Select, Row, Input, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";

export const ListContainer = styled.div`
  text-align: center;
`;

export const StarIcon = styled(StarOutlined)`
  /* color: red; */
`;

export const CustomSwitch = styled(Switch)`
  margin: 0 3px;
`;

export const StyledPagination = styled(Pagination)`
  margin-left: auto;
  /* float: right; */
`;
export const StyledSelect = styled(Select)`
  /* padding: 0 20px; */
  /* width: 150px; */
  margin-left: 5px;
  min-width: 120px;
`;

export const PageFooter = styled(Row)`
  padding: 0 2vw;
`;

export const CustomInput = styled(Input)`
  margin: 5px auto;
  max-width: 50%;
`;

export const CustomButton = styled(Button)`
  /* margin-top: 2px; */
`;
