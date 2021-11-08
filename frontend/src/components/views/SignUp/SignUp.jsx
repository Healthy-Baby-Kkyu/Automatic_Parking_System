
import TitleBar from '@/components/common/TitleBar/TitleBar'
import styles from '@/components/views/SignUp/SignUp.module.css'
import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox,  DatePicker, Space, Select } from 'antd';
const { Option } = Select;

function SignUp() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }  

  return (
    <>
    <TitleBar title_name="Sign Up"/>
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
        label="Id"
        name="Id"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Password Check"
        name="password Check"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item
        label="Birth"
        name="Birth"
        >
        <Space direction="horizontal">
          <DatePicker onChange={onChange} picker="year" />
          <DatePicker onChange={onChange} />
        </Space>
      </Form.Item>
      
      <Form.Item
        label="Phone"
        name="Phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Input.Group compact>
        <Input style={{ width: '15%' }} defaultValue="010" />
        <Input style={{ width: '40%' }} defaultValue="" />
      </Input.Group>
      </Form.Item>

      <Form.Item
        label="Car Type"
        name="Car Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Input.Group compact>
        <Select defaultValue="경차">
          <Option value="경차">경차</Option>
          <Option value="소형차">소형차</Option>
          <Option value="중형차">중형차</Option>
          <Option value="대형차">대형차</Option>
        </Select>
      </Input.Group>
      </Form.Item>

      <Form.Item
        label="Car Number"
        name="Car Number"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input />
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
      <center>Already Registered? <a>Sign in</a></center>
    </Form>
    </>
  )
}

export default SignUp
