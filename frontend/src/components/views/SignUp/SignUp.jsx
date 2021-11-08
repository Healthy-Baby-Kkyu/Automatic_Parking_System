
import TitleBar from '@/components/common/TitleBar/TitleBar'
import styles from '@/components/views/SignUp/SignUp.module.css'
import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

function SignUp() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
      
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <Form.Item
          name="year"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="Birth year (ex> 2021)" />
        </Form.Item>
        <Form.Item
          name="monthDate"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="Birth month & date (ex> 0822)" />
        </Form.Item>
      </Form.Item>
      
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input 
          placeholder="ex> 01012345678" 
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="Car Type"
        label="Car Type"
        rules={[
          {
            required: true,
            message: 'Please select your Car Type!',
          },
        ]}
      >
        <Select placeholder="select your Car Type!">
          <Option value="경차">경차</Option>
          <Option value="소형차">소형차</Option>
          <Option value="중형차">중형차</Option>
          <Option value="대형차">대형차</Option>
        </Select>
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
