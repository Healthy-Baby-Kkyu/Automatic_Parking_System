import React, { useRef, useState, useEffect } from "react";
import Sider from "@/components/common/Sider/Sider";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import styles from "@/components/views/EditPersonalInfo/EditPersonalInfo.module.css";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import moment from "moment";
import { USER_SERVER } from "@/Config.js";

function EditPersonalInfo() {
  const dateFormat = "YYYY-MM-DD";

  function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;

    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  // 기존 사용자 정보
  const [originID, setOriginID] = useState();
  const [originPassword, setOriginPassword] = useState();
  const [originBirth, setOriginBirth] = useState();
  const [originPhone, setOriginPhone] = useState();
  const [originCarType, setOriginCarType] = useState();
  const [originCarNumber, setOriginCarNumber] = useState();

  useEffect(() => {
    fetch(`${USER_SERVER}/customer/getPersonalInfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: window.localStorage.getItem("id"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setOriginID(response.data.user_id);
        setOriginPassword(response.data.password);
        setOriginBirth(response.data.birthday);
        setOriginPhone(response.data.phone_number);
        setOriginCarType(response.data.car_type);
        setOriginCarNumber(response.data.car_number);
      });
  }, []);

  const onFinish = (values) => {
    values.id = originID;

    if (password == undefined) {
      values.password = originPassword;
    } else {
      values.password = password;
    }

    if (birth == undefined) {
      values.birth = originBirth;
    } else {
      values.birth = birth;
    }

    if (phone == undefined) {
      values.phone = originPhone;
    } else {
      values.phone = phone;
    }

    if (carType == undefined) {
      values.carType = originCarType;
    } else {
      values.carType = carType;
    }

    if (carNumber == undefined) {
      values.carNumber = originCarNumber;
    } else {
      values.carNumber = carNumber;
    }

    fetch(`${USER_SERVER}/customer/editPersonalInfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: values.id,
        password: values.password,
        birthday: values.birth,
        phone_number: values.phone,
        car_type: values.carType,
        car_number: values.carNumber,
        session_id: window.localStorage.getItem("id"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setOriginID(values.id);
        setOriginPassword(values.password);
        setOriginBirth(values.birth);
        setOriginPhone(values.phone);
        setOriginCarType(values.carType);
        setOriginCarNumber(values.carNumber);
        window.alert("개인 정보 수정이 완료되었습니다.");
        window.location.replace("/editPersonalInfo");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const [password, setPassword] = useState();
  const [birth, setBirth] = useState();
  const [phone, setPhone] = useState();
  const [carType, setCarType] = useState();
  const [carNumber, setCarNumber] = useState();

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function onBirthChange(date) {
    setBirth(formatDate(date));
  }

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  function onCarTypeChange(value) {
    setCarType(value);
  }

  const onCarNumberChange = (e) => {
    setCarNumber(e.target.value);
  };

  function handleAble() {
    setCount(count + 1);
    if (count % 2 == 1) {
      inputRef.current.disabled = "true";
    } else {
      inputRef.current.disabled = "";
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
        autoComplete="off"
      >
        <div className={styles.rs}>
          <div className={styles.edit_header}>
            <div className={styles.subtitle}>개인 정보 수정</div>
            <Button
              style={{ float: "right", width: "80px", marginRight: "15px" }}
              size="small"
              onClick={() => handleAble()}
            >
              Edit
            </Button>
            <Form.Item>
              <Button
                type="primary"
                style={{ float: "right", width: "80px", marginBottom: "10px" }}
                size="small"
                ref={inputRef}
                htmlType="submit"
                disabled
              >
                Submit
              </Button>
            </Form.Item>
          </div>
          <div className={styles.edit_main}>
            <div className={styles.edit_inside}>
              <div style={{ marginLeft: "73px", marginRight: "30px" }}>
                ID :{" "}
              </div>
              <Form.Item name="id">
                {originID && (
                  <Input
                    style={{ width: "500px" }}
                    defaultValue={originID}
                    disabled
                  />
                )}
              </Form.Item>
            </div>
            <div style={{ marginTop: "5px" }} className={styles.edit_inside}>
              <div style={{ marginLeft: "20px", marginRight: "30px" }}>
                Password :
              </div>
              {count % 2 == "0" && (
                <Form.Item name="password">
                  {originPassword && (
                    <Input.Password
                      style={{ width: "500px" }}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      defaultValue={originPassword}
                      disabled
                    />
                  )}
                </Form.Item>
              )}
              {count % 2 == "1" && (
                <Form.Item name="password">
                  <Input.Password
                    style={{ width: "500px" }}
                    placeholder="Input Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    defaultValue={originPassword}
                    onChange={onPasswordChange}
                  />
                </Form.Item>
              )}
            </div>
            <div style={{ marginTop: "5px" }} className={styles.edit_inside}>
              <div style={{ marginLeft: "55px", marginRight: "30px" }}>
                Birth :
              </div>
              {count % 2 == "0" && (
                <Form.Item name="birth">
                  {originBirth && (
                    <DatePicker
                      style={{ marginRight: "10px", width: "254px" }}
                      placeholder={originBirth}
                      disabled
                    />
                  )}
                </Form.Item>
              )}
              {count % 2 == "1" && (
                <Form.Item name="birth">
                  <DatePicker
                    style={{ marginRight: "10px", width: "254px" }}
                    defaultValue={moment(originBirth, dateFormat)}
                    onChange={onBirthChange}
                  />
                </Form.Item>
              )}
            </div>
            <div style={{ marginTop: "5px" }} className={styles.edit_inside}>
              <div
                style={{
                  marginLeft: "42px",
                  marginRight: "16px",
                  width: "70px",
                }}
              >
                Phone :
              </div>
              {count % 2 == "0" && (
                <Form.Item name="phone">
                  {originPhone && (
                    <Input
                      style={{ width: "106%", marginRight: "5px" }}
                      defaultValue={originPhone}
                      disabled
                    />
                  )}
                </Form.Item>
              )}
              {count % 2 == "1" && (
                <Form.Item name="phone">
                  <Input
                    style={{ width: "106%", marginRight: "5px" }}
                    defaultValue={originPhone}
                    placeholder="Input Phone Number"
                    onChange={onPhoneChange}
                  />
                </Form.Item>
              )}
            </div>
            <div style={{ marginTop: "10px" }} className={styles.edit_inside}>
              <div style={{ marginLeft: "26px", marginRight: "30px" }}>
                Car Type :
              </div>

              {count % 2 == "0" && (
                <Form.Item name="carType">
                  {originCarType && (
                    <Select
                      defaultValue={originCarType}
                      style={{ width: 200 }}
                      disabled
                    >
                      <Option value="경차">경차</Option>
                      <Option value="소형차">소형차</Option>
                      <Option value="중형차">중형차</Option>
                      <Option value="대형차">대형차</Option>
                    </Select>
                  )}
                </Form.Item>
              )}
              {count % 2 == "1" && (
                <Form.Item name="carType">
                  <Select
                    defaultValue={originCarType}
                    style={{ width: 200 }}
                    onChange={onCarTypeChange}
                  >
                    <Option value="경차">경차</Option>
                    <Option value="소형차">소형차</Option>
                    <Option value="중형차">중형차</Option>
                    <Option value="대형차">대형차</Option>
                  </Select>
                </Form.Item>
              )}
            </div>
            <div style={{ marginTop: "10px" }} className={styles.edit_inside}>
              <div style={{ marginRight: "30px" }}>Car Number :</div>
              {count % 2 == "0" && (
                <Form.Item name="carNumber">
                  {originCarNumber && (
                    <Input
                      style={{ width: "200px" }}
                      defaultValue={originCarNumber}
                      disabled
                    />
                  )}
                </Form.Item>
              )}
              {count % 2 == "1" && (
                <Form.Item name="carNumber">
                  <Input
                    style={{ width: "200px" }}
                    defaultValue={originCarNumber}
                    placeholder="Input Car Number"
                    onChange={onCarNumberChange}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditPersonalInfo;
