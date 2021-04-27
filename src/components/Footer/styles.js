import styled from "styled-components";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Footer } = Layout;

export const StyledFooter = styled(Footer)`
  &.ant-layout-footer {
    display: flex;
    width: 100%;
    color: #fff;
    background: #7dbcea;
    /* background-color: red; */

    .social {
      margin-left: auto;
      align-items: center a {
        margin: auto 0;
        text-decoration: none;
      }
    }
  }
`;

export const GitHubIcon = styled(GithubOutlined)`
  font-size: 24px;
  /* display: inline-block; */
  /* margin-left: auto; */
  /* display: block; */
  margin: auto;
  text-decoration: none;
  color: initial;
`;
