import TitleBar from "@/components/common/TitleBar/TitleBar";
import styles from "@/components/views/Login/Login.module.css";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { style } from "@mui/system";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
    fetch("http://127.0.0.1:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.username,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <TitleBar title_name="Sign In" />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className={styles.submit}>
            Submit
          </Button>
        </Form.Item>
        <center>
          New to us? <a>Sign Up</a>
        </center>
      </Form>
    </>
  );
}

export default Login;