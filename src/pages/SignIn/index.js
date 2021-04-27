import React, { useState, useEffect } from "react";
import { useAuth } from "../../services/customHooks/useAuth";
import { Form, Input, Button, Row, Typography } from "antd";
import { StyledCard, LoginContainer } from "./styles";

const { Title, Text } = Typography;

function SignIn(props) {
  const context = useAuth();
  const [error, setError] = useState("");

  async function handleLogin(values) {
    const response = await context.Login(values.email, values.password);

    if (response.error);
    setError(response.error);
  }

  useEffect(() => {
    if (context.signed) {
      props.history.push("/");
    }
  }, [context]);

  return (
    <LoginContainer>
      <Row>
        <StyledCard>
          <Title>Sign In</Title>
          <Text type="danger">{error}</Text>
          <Form
            layout="vertical"
            name="basic"
            onFinish={(values) => {
              handleLogin(values);
            }}
            // onFinishFailed={onFinishFailed}
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

export default SignIn;
