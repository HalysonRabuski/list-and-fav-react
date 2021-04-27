import React from "react";
import { StyledHeader } from "./styles.js";
// import { Button } from "antd";
import Title from "../Title";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/customHooks/useAuth";
import { Menu } from "antd";
import {
  UnorderedListOutlined,
  LikeOutlined,
  LoginOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function AppHeader(props) {
  const context = useAuth();

  return (
    <>
      <StyledHeader data-testid="header">
        <Title level={3} text="List n' Favorite" />
        <Menu
          // onClick={(item, key, keypath) => {
          //   console.log(item, key, keypath);
          // }}
          // selectedKeys=
          mode="horizontal"
          // selectedKeys={[location]}
        >
          <SubMenu
            key="SubMenu"
            icon={<UnorderedListOutlined />}
            title="Characters List"
          >
            <Menu.ItemGroup title="Shows">
              <Menu.Item key="/list/got">
                <Link to="/list/got?page=1">Game Of Thrones</Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/list/bb?page=1">Breaking Bad</Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          {context.signed ? (
            <>
              <Menu.Item icon={<LikeOutlined />}>
                <Link to="/favorites">Favorites</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />}>
                <a onClick={() => context.Logout()}>Sign Out</a>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="/signin" icon={<LoginOutlined />}>
                <Link to="/signin">Login</Link>
              </Menu.Item>
              <Menu.Item key="/signup" icon={<EditOutlined />}>
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </StyledHeader>
    </>
  );
}

export default AppHeader;
