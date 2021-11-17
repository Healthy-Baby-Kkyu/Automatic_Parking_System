
import TitleBar from '@/components/common/TitleBar/TitleBar'
import styles from '@/components/views/SignUp/SignUp.module.css'
import React, {useEffect} from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Select, DatePicker } from 'antd';
const { Option } = Select;

function SignUp() {
  const state = '';
  const onFinish = (values) => {
    console.log('Success:', values);
    fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: values.userId,
        user_name : values.username,
        password: values.password,
        birthday : values.birthDate.format('YYYY-MM-DD'),
        phone_number : values.phone,
        car_number : values.carNumber,
        car_type : values.carType
      }),
    })
      .then((response) => {
        console.log(response);
      });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/getCustomerIDs")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }, []);

  return (
    <>
    <TitleBar title_name="Sign Up"/>
    <Form 
      className = {styles.form}
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
        hasFeedback validateStatus={state}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input 
          placeholder = "Write your name."
        />
      </Form.Item>
      <Form.Item
        hasFeedback validateStatus={state}
        label="UserId"
        name="userId"
        rules={[
          {
            required: true,
            message: 'Please input your UserID!',
          },
        ]}
      >
        <Input 
          placeholder = "Write 4 to 12 numbers and alphabet."
        />
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
        <Input.Password 
          placeholder = "Write 4 to 12 numbers and alphabet."
        />
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
        <Input.Password 
          placeholder = "Check if the password is the same."
        />
      </Form.Item>

      <Form.Item
        label="BirthDate"
        name="birthDate"
      >
        <DatePicker 
          style={{
          display: 'inline-block',
          width: '100%',
        }}/>
    </Form.Item>
     
        
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input 
          placeholder="(ex > 01012345678)" 
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label="Car Type"
        name="carType"
        rules={[
          {
            required: true,
            message: 'Please select your Car Type!',
          },
        ]}
      >
        <Select placeholder="Select your Car Type.">
          <Option value="경차">경차</Option>
          <Option value="소형차">소형차</Option>
          <Option value="중형차">중형차</Option>
          <Option value="대형차">대형차</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Car Number"
        name="carNumber"
        rules={[
          {
            required: true,
            message: 'Please select your Car Number!',
          },
        ]}
      >
        <Input 
          placeholder="Write your Car Number."
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className={styles.submit}>
          Sign Up
        </Button>
      </Form.Item>
      <center>Already Registered? <a href="/">Sign in</a></center>
    </Form>
    </>
  )
}

export default SignUp
