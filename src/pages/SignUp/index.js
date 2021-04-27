import React, { useState } from "react";
import { register } from "../../services/registerApi";
import {
  Form,
  Input,
  Button,
  Row,
  Typography,
  Alert,
  notification,
} from "antd";
import { StyledCard, LoginContainer } from "./styles";

const { Title, Text } = Typography;

function SignUp(props) {
  const [error, setError] = useState();

  async function handleRegister(values) {
    const response = await register(values.email, values.password);

    if (response.error);
    setError(response.error);

    if (response.success) {
      notification.config({
        placement: "topRight",
        duration: 3,
      });

      notification["success"]({
        message: "Success",
        description: "User has been registered successfully",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  }

  return (
    <LoginContainer>
      <Row>
        <StyledCard>
          <Title>Sign Up</Title>
          {error ? <Alert message={error} type="error" /> : null}
          <Form
            layout="vertical"
            name="basic"
            onFinish={(values) => {
              handleRegister(values);
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </StyledCard>
      </Row>
    </LoginContainer>
  );
}

export default SignUp;
