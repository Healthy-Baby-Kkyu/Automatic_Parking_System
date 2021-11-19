import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "@reservationPage/ReservationPage.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@/components/common/Sider/Sider";
import moment from "moment";
import { Button, DatePicker, Select, Form, Input } from "antd";
import ParkingLot from "@reservationPage/sections/ParkingLot";
import { DownOutlined } from "@ant-design/icons";
import { USER_SERVER } from "@/Config.js";

function ReservationPage() {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState();
  const [step, setStep] = useState(1);
  const [selectedFloor, setSelectedFloor] = useState();
  const [selectedSlot, setSelectedSlot] = useState();

  const getSelectedDate = (val) => {
    let startDate = val[0]._d;
    let endDate = val[1]._d;
    if (val !== undefined && val !== "undefined") {
      setStep(2);
      // 해당 시간 주차자리 정보 가져오기
    }
  };

  const handleChange = (val) => {
    // console.log(val);
    setSelectedFloor(val);
    if (selectedFloor !== null) setStep(3);
  };

  const getSelectedData = (val) => {
    if (val !== null) setStep(4);
    setSelectedSlot(val);
  };

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (values) => {
    var current = new Date();
    values.start_date = values.dates[0]._d;
    values.end_date = values.dates[1]._d;
    values.slot = selectedSlot;
    console.log(values);
    fetch(`${USER_SERVER}/customer/createResv/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parking_slot_id: values.floor + values.slot,
        reservation_date: moment(current).format("YYYY-MM-DD HH:MM:SS"),
        start_date: moment(values.start_date).format("YYYY-MM-DD HH:MM:SS"),
        end_date: moment(values.end_date).format("YYYY-MM-DD HH:MM:SS"),
        price: 0,
        state: 0,
        session_id: window.localStorage.getItem("id"),
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

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  const disabledRangeTime = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  useEffect(() => {
    if (value) getSelectedDate(value);
  }, [value]);

  return (
    <div className={styles.container}>
      <TitleBar title_name="주차 예약" />
      <div className={styles.ls}>
        <Sider selected_key="주차 예약" />
      </div>
      <div className={styles.rs}>
        <Form
          form={form}
          name="make-reservation"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={styles.subtitle}>주차 예약</div>
          <div className={styles.box} style={{ paddingTop: "30px" }}>
            <p style={{ fontSize: "1.2em" }}>1. 날짜 및 시간 선택</p>
            <Form.Item name="dates" {...rangeConfig}>
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [
                    moment("09:00:00", "HH:mm:ss"),
                    moment("23:00:00", "HH:mm:ss"),
                  ],
                }}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(val) => setValue(val)}
              />
            </Form.Item>
          </div>
          {step >= 2 && (
            <div className={styles.box}>
              <p style={{ fontSize: "1.2em" }}>2. 주차 자리 선택</p>
              <div style={{ float: "left", marginRight: "10px" }}>
                <Form.Item name="floor">
                  <Select
                    placehorder="층 선택"
                    style={{ width: "120px" }}
                    onChange={handleChange}
                  >
                    <Option value="B1">B1</Option>
                    <Option value="B2">B2</Option>
                    <Option value="B3">B3</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item name="slot" style={{ width: "120px" }}>
                  <Input
                    placeholder={selectedSlot}
                    defaultValue={selectedSlot}
                    disabled
                  />
                </Form.Item>
              </div>
              {step >= 3 && (
                <ParkingLot
                  getSelectedData={getSelectedData}
                  selectedFloor={selectedFloor}
                />
              )}
            </div>
          )}
          {step >= 4 && (
            <>
              <div className={styles.box}>
                <p style={{ fontSize: "1.2em" }}>3. 자리 및 결제 정보 확인</p>
                <div className={styles.paper}>
                  <div>
                    <b>시간권 주차티켓 (#190293)</b>
                  </div>
                  <div className={styles.ticket}>
                    <div>
                      주차 장소
                      <span style={{ paddingLeft: "67px" }}>B1층 A1</span>
                    </div>
                    <div>
                      이용일
                      <span style={{ paddingLeft: "82px" }}>
                        2021-08-18 16:30 ~ 2021-08-18 21:30
                      </span>
                    </div>
                    <div>
                      결제 금액
                      <span style={{ paddingLeft: "67px" }}>5000 P</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.box}>
                <p style={{ fontSize: "1.2em" }}>4. 결제</p>
                <div className={styles.paper}>
                  <div style={{ paddingBottom: "10px" }}>
                    나의 보유 포인트
                    <span style={{ paddingLeft: "300px" }}>50000 P</span>
                  </div>
                  <div style={{ paddingBottom: "10px" }}>
                    결제 금액
                    <span style={{ paddingLeft: "340px", color: "#5172FF" }}>
                      - 5000 P
                    </span>
                  </div>
                  <hr />
                  <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
                    결제 후 포인트
                    <span style={{ paddingLeft: "315px" }}>45000 P</span>
                  </div>
                  <div style={{ float: "left", marginRight: "10px" }}>
                    <Button
                      className={styles.button_4}
                      onClick={console.log("hi")}
                    >
                      포인트 충전하기
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={styles.button_4}
                      type="primary"
                      htmlType="submit"
                    >
                      결제하기
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default ReservationPage;
