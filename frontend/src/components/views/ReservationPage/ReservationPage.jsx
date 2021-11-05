import React, { useState, useEffect } from "react";
import styles from "@reservationPage/ReservationPage.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@/components/common/Sider/Sider";
import { Button, Menu, Dropdown, DatePicker, Result } from "antd";
import ParkingLot from "@reservationPage/sections/ParkingLot";
import { DownOutlined } from "@ant-design/icons";

function ReservationPage() {
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState();
  const [step, setStep] = useState(1);

  const menu = (
    <Menu>
      <Menu.Item key="b2">B2</Menu.Item>
      <Menu.Item key="b3">B3</Menu.Item>
      <Menu.Item>
        <Button size="small">층 추가</Button>
      </Menu.Item>
    </Menu>
  );

  const getSelectedDate = (val) => {
    let startDate = val[0]._d;
    let endDate = val[1]._d;
    console.log(startDate, endDate);
    if (val !== undefined && val !== "undefined") setStep(2);
  };

  const getSelectedData = (val) => {
    if (val) setStep(3);
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
        <div className={styles.subtitle}>주차 예약</div>
        <div className={styles.box} style={{ paddingTop: "30px" }}>
          <p style={{ fontSize: "1.2em" }}>1. 날짜 및 시간 선택</p>
          <RangePicker showTime onChange={(val) => setValue(val)} />
        </div>
        {step >= 2 && (
          <div className={styles.box}>
            <p style={{ fontSize: "1.2em" }}>2. 주차 자리 선택</p>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button size="large">
                B1
                <span style={{ paddingRight: "60px" }} />
                <DownOutlined />
              </Button>
            </Dropdown>
            <ParkingLot getSelectedData={getSelectedData} />
          </div>
        )}
        {step >= 3 && (
          <>
            <div className={styles.box}>
              <p style={{ fontSize: "1.2em" }}>3. 자리 및 결제 정보 확인</p>
              <div className={styles.paper}>
                <div>
                  <b>시간권 주차티켓 (#190293)</b>
                </div>
                <div className={styles.ticket}>
                  <div>
                    주차 장소{" "}
                    <span style={{ paddingLeft: "66px" }}>B1층 A1</span>
                  </div>
                  <div>
                    이용일{" "}
                    <span style={{ paddingLeft: "82px" }}>
                      2021-08-18 16:30 ~ 2021-08-18 21:30
                    </span>
                  </div>
                  <div>
                    결제 금액
                    <span style={{ paddingLeft: "70px" }}>5000 P</span>
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
                <div>
                  <Button className={styles.button_4}>포인트 충전하기</Button>
                  <span style={{ paddingLeft: "10px" }} />
                  <Button className={styles.button_4} type="primary">
                    결제하기
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationPage;
