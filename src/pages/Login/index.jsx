import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import SignBG from "../../assets/images/curve-1.svg";
import "./login.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(username, password);
    navigate("/dashboard", { replace: true });
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>WebfmSI.com</h5>
        </div>
        <div className="header-col header-nav">test</div>
        <div className="header-col header-btn">
          <Button type="primary">Public Sites</Button>
        </div>
      </Header>
      <Content className="signin login-container">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            className="sign-img"
            xs={{ span: 24 }}
            lg={{ span: 8, offset: 4 }}
            md={{ span: 12 }}
          >
            <img src={SignBG} alt="" />
            {/* <img src="/login.gif" alt="img-login" /> */}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              onFinish={() => handleLogin()}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                initialValue={username}
                label="Email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="password"
                initialValue={password}
                label="Password"
                name="password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  disabled={!username || !password}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          {" "}
          Copyright © 2024 WebfmSI.com - Powered by Universitas Pendidikan
          Ganesha
        </p>
      </Footer>
    </Layout>
  );
};

export default LoginPage;
