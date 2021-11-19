import React, { useState, useEffect } from "react";
import Sider from "@/components/common/Sider/Sider";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import { Button, Form, Input, Modal } from "antd";
import styles from "@/components/views/ChargePoint/ChargePoint.module.css";
import { USER_SERVER } from "@/Config.js";

function ChargePoint() {
  const [count, setCount] = useState(0);
  const [point, setPoint] = useState(0);
  const [originPoint, setOriginPoint] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onPointChange = (e) => {
    setPoint(parseInt(e.target.value));
  };

  function handleMove() {
    setCount(count + 1);
    setPoint(0);
  }

  function calcPoint(original, plus) {
    if (isNaN(plus)) {
      return original;
    }

    return original + plus;
  }

  useEffect(() => {
    fetch(`${USER_SERVER}/customer/getPersonalPoint/`, {
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
        setOriginPoint(response.data);
      });
  }, []);

  const onFinish = (values) => {
    values.point = calcPoint(originPoint, point);
    console.log("Success:", values);

    fetch(`${USER_SERVER}/customer/chargePoint/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: values.userID,
        point: values.point,
        session_id: window.localStorage.getItem("id"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        window.location.replace("/chargePoint");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <TitleBar title_name="마이 페이지" />
      <div className={styles.ls}>
        <Sider selected_key="마이 페이지" />
      </div>
      <div className={styles.rs}>
        <div className={styles.charge_header}>
          <div className={styles.subtitle}>포인트 충전</div>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={styles.charge_main}>
            <div className={styles.charge_inside}>
              <div
                style={{ flex: "1", textAlign: "right", paddingRight: "350px" }}
              >
                나의 보유 포인트 :
              </div>
              <div style={{ flex: "1" }}>{originPoint}</div>
              <div style={{ marginLeft: "-70px" }}>P</div>
            </div>
            <div style={{ marginTop: "50px" }} className={styles.charge_inside}>
              <div
                style={{ flex: "1", textAlign: "right", paddingRight: "131px" }}
              >
                충전 포인트 :
              </div>
              <div style={{ paddingRight: "80px", marginTop: "3px" }}>+</div>
              {count % 2 == "0" && (
                <Input
                  style={{
                    width: "327px",
                    marginLeft: "-70px",
                    marginRight: "80px",
                    textAlign: "right",
                  }}
                  type="number"
                  placeholder="0"
                  value={point}
                  required
                  readOnly
                />
              )}
              {count % 2 == "1" && (
                <Input
                  style={{
                    width: "327px",
                    marginLeft: "-70px",
                    marginRight: "80px",
                    textAlign: "right",
                  }}
                  type="number"
                  placeholder="0"
                  onChange={onPointChange}
                  required
                />
              )}
              <div style={{ marginLeft: "-70px", marginTop: "3px" }}>P</div>
            </div>
            <div
              style={{
                display: "flex",
                float: "right",
                marginTop: "5px",
                marginRight: "20px",
              }}
            >
              {count % 2 == "0" && (
                <>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 1000)}
                  >
                    +1000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 5000)}
                  >
                    +5000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 10000)}
                  >
                    +10000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 50000)}
                  >
                    +50000
                  </Button>
                </>
              )}
              {count % 2 == "1" && (
                <>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 1000)}
                    disabled
                  >
                    +1000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 5000)}
                    disabled
                  >
                    +5000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 10000)}
                    disabled
                  >
                    +10000
                  </Button>
                  <Button
                    style={{ marginLeft: "4px" }}
                    size="small"
                    onClick={() => setPoint(point + 50000)}
                    disabled
                  >
                    +50000
                  </Button>
                </>
              )}
              <Button
                style={{ marginLeft: "4px" }}
                size="small"
                onClick={() => handleMove()}
              >
                직접입력
              </Button>
            </div>
            <div
              style={{
                borderTop: "1px solid #D9D9D9",
                marginTop: "50px",
                paddingTop: "10px",
              }}
              className={styles.charge_inside}
            >
              <div
                style={{
                  flex: "1",
                  textAlign: "right",
                  paddingRight: "255px",
                  marginTop: "17px",
                }}
              >
                충전 후 포인트 :
              </div>
              <Form.Item style={{ marginRight: "10px" }}>
                <Input
                  name="point"
                  style={{
                    marginTop: "10px",
                    marginLeft: "-70px",
                    marginRight: "80px",
                    textAlign: "right",
                    flex: "1",
                    color: "#0F31FF",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  type="number"
                  placeholder="0"
                  value={calcPoint(originPoint, point)}
                  readOnly
                />
              </Form.Item>
              <div style={{ marginLeft: "-70px", marginTop: "18px" }}>P</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {(point <= "0" || isNaN(point)) && (
                <Button
                  style={{ marginTop: "40px", width: "180px" }}
                  type="primary"
                  onClick={showModal}
                  disabled
                >
                  충전하기
                </Button>
              )}
              {point > "0" && (
                <Button
                  style={{ marginTop: "40px", width: "180px" }}
                  type="primary"
                  onClick={showModal}
                >
                  충전하기
                </Button>
              )}
              <Modal
                title="포인트 충전 확인"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                  <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item>
                      <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={handleOk}
                      >
                        충전
                      </Button>
                      ,
                      <Button key="back" onClick={handleCancel}>
                        취소
                      </Button>
                      ,
                    </Form.Item>
                  </Form>,
                ]}
              >
                <p>
                  <b>{point} P</b>를 충전하시겠습니까?
                </p>
                <div style={{ display: "flex" }}>
                  충전 후 잔액 :{" "}
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#0F31FF",
                      margin: "0px 5px 0px 5px",
                    }}
                  >
                    {calcPoint(originPoint, point)}
                  </div>
                  P
                </div>
              </Modal>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChargePoint;
