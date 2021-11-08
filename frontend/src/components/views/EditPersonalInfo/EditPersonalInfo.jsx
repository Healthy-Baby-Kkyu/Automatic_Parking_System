import React, { useRef, useState } from 'react'
import Sider from "@/components/common/Sider/Sider"
import TitleBar from "@/components/common/TitleBar/TitleBar"
import styles from "@/components/views/EditPersonalInfo/EditPersonalInfo.module.css"
import { Form, Input, Button, DatePicker, Select, Space } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import moment from 'moment';

function PrivateInfoEdit() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const dateFormat = 'YYYY-MM-DD';
    const { Option } = Select;
    const inputRef = useRef(null);
    const [count, setCount] = useState(0)

    function handleAble() {
        setCount(count + 1)
        if (count % 2 == 1) {
            inputRef.current.disabled = "true"
        }
        else {
            inputRef.current.disabled = ""
        }
    }

    return (
        <div className={styles.container}>
            <TitleBar title_name="마이 페이지" />
            <div className={styles.ls}>
                <Sider selected_key="마이 페이지" />
            </div>
            <Form
                wrapperCol={{ span: 32 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <div className={styles.rs}>
                    <div className={styles.edit_header}>
                        <div className={styles.subtitle}>개인 정보 수정</div>
                        <Button style={{ float: "right", width: "80px", marginRight: "15px" }}
                            size="small"
                            onClick={() => handleAble()}>
                            Edit
                        </Button>
                        <Button type="primary"
                            style={{ float: "right", width: "80px" }}
                            size="small"
                            htmlType="submit"
                            ref={inputRef}
                            disabled>
                            Submit
                        </Button>
                    </div>
                    <div className={styles.edit_main}>
                        <div className={styles.edit_inside}>
                            <div style={{ marginLeft: "73px", marginRight: "30px" }}>ID :</div>
                            <Form.Item name="id">
                                <Input
                                    style={{ width: "500px" }}
                                    placeholder="Input ID"
                                    defaultValue="User1"
                                    disabled />
                            </Form.Item>
                        </div>
                        <div className={styles.edit_inside}>
                            <div style={{ marginLeft: "20px", marginRight: "30px" }}>Password :</div>
                            <Form.Item name="password">
                                {count % 2 == "0" && (
                                    <Input.Password
                                        style={{ width: "500px" }}
                                        defaultValue="123456789"
                                        placeholder="Input Password"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        disabled />
                                )}
                                {count % 2 == "1" && (
                                    <Input.Password
                                        style={{ width: "500px" }}
                                        defaultValue="123456789"
                                        placeholder="Input Password"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ marginTop: "0px" }} className={styles.edit_inside}>
                            <div style={{ marginLeft: "55px", marginRight: "30px" }}>Birth :</div>
                            <Form.Item name="birth">
                                {count % 2 == "0" && (
                                    <DatePicker
                                        style={{ marginRight: "10px", width: "254px" }}
                                        defaultValue={moment('2001-02-10', dateFormat)}
                                        disabled />
                                )}
                                {count % 2 == "1" && (
                                    <DatePicker
                                        style={{ marginRight: "10px", width: "254px" }}
                                        defaultValue={moment('2001-02-10', dateFormat)} />
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ marginTop: "5px" }} className={styles.edit_inside}>
                            <div style={{ marginLeft: "42px", marginRight: "16px", width: "70px" }}>Phone :</div>
                            <Form.Item name="phone">
                                {count % 2 == "0" && (
                                    <Input.Group compact>
                                        <Input style={{ width: '20%', marginRight: "5px" }} defaultValue="010" disabled />
                                        <Input style={{ width: '33%' }} defaultValue="1234-5678" disabled />
                                    </Input.Group>
                                )}
                                {count % 2 == "1" && (
                                    <Input.Group compact>
                                        <Input style={{ width: '20%', marginRight: "5px" }} defaultValue="010" />
                                        <Input style={{ width: '33%' }} defaultValue="1234-5678" />
                                    </Input.Group>
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ marginTop: "10px" }} className={styles.edit_inside}>
                            <div style={{ marginLeft: "26px", marginRight: "30px" }}>Car Type :</div>
                            <Form.Item name="carType">
                                {count % 2 == "0" && (
                                    <Select defaultValue="경차" style={{ width: 200 }} disabled>
                                        <Option value="경차">경차</Option>
                                        <Option value="소형차">소형차</Option>
                                        <Option value="중형차">중형차</Option>
                                        <Option value="대형차">대형차</Option>
                                    </Select>
                                )}
                                {count % 2 == "1" && (
                                    <Select defaultValue="경차" style={{ width: 200 }}>
                                        <Option value="경차">경차</Option>
                                        <Option value="소형차">소형차</Option>
                                        <Option value="중형차">중형차</Option>
                                        <Option value="대형차">대형차</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ marginTop: "10px" }} className={styles.edit_inside}>
                            <div style={{ marginRight: "30px" }}>Car Number :</div>
                            <Form.Item name="carNumber">
                                {count % 2 == "0" && (
                                    <Input style={{ width: "200px" }} defaultValue="123마 4567" disabled />
                                )}
                                {count % 2 == "1" && (
                                    <Input style={{ width: "200px" }} defaultValue="123마 4567" />
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default PrivateInfoEdit
