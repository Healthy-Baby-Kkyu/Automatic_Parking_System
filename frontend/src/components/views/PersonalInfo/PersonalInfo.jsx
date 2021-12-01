import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, DatePicker, Space } from "antd";
import Sider from "@/components/common/Sider/Sider";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import styles from "./PersonalInfo.module.css";
import moment from "moment";
import { USER_SERVER } from "@/Config.js";

function PersonalInfo() {
  const history = useHistory();
  const movePage = (url) => {
    history.push(url);
  };

  const dateFormat = "YYYY-MM-DD";

  // 사용자 정보
  const [userID, setUserID] = useState();
  const [totalFee, setTotalFee] = useState();
  const [currentPoint, setCurrentPoint] = useState(0);
  const [phone, setPhone] = useState();
  const [birth, setBirth] = useState();
  const [carType, setCarType] = useState();
  const [carNumber, setCarNumber] = useState();

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
        
        setUserID(response.data.user_id);
        setTotalFee(response.data.total_fee);
        setCurrentPoint(response.data.point);
        setPhone(response.data.phone_number);
        setBirth(response.data.birthday);
        setCarType(response.data.car_type);
        setCarNumber(response.data.car_number);
      });
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title_name="마이 페이지" />
      <div className={styles.ls}>
        <Sider selected_key="마이 페이지" />
      </div>
      <div className={styles.rs}>
        <div className={styles.info_header}>
          <div className={styles.subtitle}>개인 정보</div>
          <Button
            style={{ float: "right" }}
            size="small"
            onClick={() => movePage("/EditPersonalInfo")}
          >
            개인 정보 수정
          </Button>
        </div>
        <div className={styles.info1}>
          <div className={styles.info1_inside}>
            <div
              style={{
                textAlign: "left",
                paddingRight: "40px",
                marginLeft: "100px",
              }}
            >
              <img
                src="/assets/PersonalInfo/user.png"
                style={{ height: "70px", width: "70px" }}
              ></img>
            </div>
            <div
              style={{
                textAlign: "left",
                borderRight: "1px dotted #D9D9D9",
                paddingRight: "80px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "15px",
                  width: "170px",
                }}
              >
                <div style={{ marginBottom: "5px" }}>{userID}</div>
                <div>님 안녕하세요.</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "12px",
                }}
              >
                <div style={{ marginRight: "5px" }}>누적 결제 금액 : </div>
                <div>{totalFee}</div>
                <div>원</div>
              </div>
            </div>
          </div>
          <div className={styles.info1_inside}>
            <div style={{ textAlign: "center" }}>
              <div>포인트</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <div style={{ marginRight: "5px" }}>{currentPoint}</div>
                <div>P</div>
              </div>
            </div>
            <Button
              style={{ marginTop: "25px", marginLeft: "40px" }}
              size="small"
              onClick={() => movePage("/chargePoint")}
            >
              포인트 충전
            </Button>
          </div>
        </div>

        <div className={styles.info2}>
          <div className={styles.info2_inside}>
            <div style={{ marginRight: "100px", marginBottom: "15px" }}>
              휴대폰 번호
            </div>
            <div>{phone}</div>
          </div>
          <div className={styles.info2_inside}>
            <div
              style={{
                marginLeft: "40px",
                marginRight: "100px",
                paddingTop: "5px",
              }}
            >
              생일
            </div>
            <DatePicker value={moment(birth, dateFormat)} disabled />
          </div>
        </div>

        <div style={{ width: "900px" }} className={styles.subtitle}>
          차량 정보
        </div>
        <div className={styles.carInfo}>
          <div className={styles.info2_inside}>
            <div
              style={{
                marginBottom: "15px",
                marginLeft: "32px",
                marginRight: "80px",
              }}
            >
              차종
            </div>
            <div>{carType}</div>
          </div>
          <div className={styles.info2_inside}>
            <div style={{ marginRight: "80px", marginLeft:"5px" }}>차량 번호</div>
            <div>{carNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
