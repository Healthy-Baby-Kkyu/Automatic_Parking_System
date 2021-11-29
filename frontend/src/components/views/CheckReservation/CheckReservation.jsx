import React, { useState, useEffect } from "react";
import styles from "@checkReservation/CheckReservation.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { Button, Row, Col, Modal } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { USER_SERVER } from "@/Config.js";

function CheckReservation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listData, setListData] = useState();
  const showModal = (item) => {
    console.log(item);
    setIsModalVisible(true);
  };

  useEffect(() => {
    console.log(new Date());
    fetch(`${USER_SERVER}/customer/getPersonalResv/`, {
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
        setListData(response.data);
      });
  }, []);

  function modifyDateFormat(date) {
    date = date.replace("T", " ");
    date = date.replace("Z", "");
    date = date.substr(0, 16);
    return date;
  }

  const handleOk = (item) => {
    console.log(item);
    setIsModalVisible(false);
    fetch(`${USER_SERVER}/customer/cancelResv/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: "-1",
        resvID: item.reservation_id,
        price: item.price,
        session_id: window.localStorage.getItem("id"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("예약이 취소되었습니다.");
        window.location.replace("/checkReservation");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <TitleBar title_name="예약 내역" />
      <div className={styles.ls}>
        <Sider selected_key="예약 내역" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>예약 내역</div>
        <div className={styles.paper}>
          {listData &&
            listData.map((item, idx) => (
              <Accordion key={idx} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>
                    <b>NO. {item.reservation_id}</b>
                  </div>
                  {new Date(item.start_date) > new Date() &&
                    item.state !== "-1" && (
                      <>
                        <span style={{ paddingLeft: "20px" }} />
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => showModal(item)}
                        >
                          예약 취소
                        </Button>
                        <Modal
                          title="예약 내역 취소"
                          visible={isModalVisible}
                          footer={[
                            <Button key="back" onClick={handleCancel}>
                              취소
                            </Button>,
                            <Button
                              key="submit"
                              type="primary"
                              onClick={() => handleOk(item)}
                            >
                              확인
                            </Button>,
                          ]}
                        >
                          <div style={{ marginBottom: "20px" }}>
                            <div>해당 예약 건을 취소하시겠습니까?</div>
                            <div>
                              취소 시 수정 내역을 되돌릴 수 없으며, 환불은
                              포인트 충전으로 이뤄집니다.
                            </div>
                          </div>
                          <div
                            style={{ paddingBottom: "5px", fontSize: "0.9em" }}
                          >
                            주차 장소
                            <span style={{ paddingLeft: "67px" }}>
                              {item.parking_slot_id.substr(0, 2) +
                                "층 " +
                                item.parking_slot_id.substr(
                                  2,
                                  item.parking_slot_id.length
                                )}
                            </span>
                          </div>
                          <div
                            style={{ paddingBottom: "5px", fontSize: "0.9em" }}
                          >
                            이용시작일
                            <span style={{ paddingLeft: "60px" }}>
                              {modifyDateFormat(item.start_date)}
                            </span>
                          </div>
                          <div
                            style={{ paddingBottom: "5px", fontSize: "0.9em" }}
                          >
                            이용종료일
                            <span style={{ paddingLeft: "60px" }}>
                              {modifyDateFormat(item.end_date)}
                            </span>
                          </div>
                          <div
                            style={{
                              paddingBottom: "5px",
                              fontSize: "0.9em",
                              color: "#5172FF",
                            }}
                          >
                            환불 예정 금액
                            <span style={{ paddingLeft: "42px" }}>
                              {item.price} P
                            </span>
                          </div>
                        </Modal>
                      </>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                  <Row gutter={[8, 8]}>
                    <Col span={16}>
                      <div style={{ paddingBottom: "5px" }}>
                        주차 장소
                        <span style={{ paddingLeft: "67px" }}>
                          {item.parking_slot_id.substr(0, 2) +
                            "층 " +
                            item.parking_slot_id.substr(
                              2,
                              item.parking_slot_id.length
                            )}
                        </span>
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        이용시작일
                        <span style={{ paddingLeft: "60px" }}>
                          {modifyDateFormat(item.start_date)}
                        </span>
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        이용종료일
                        <span style={{ paddingLeft: "60px" }}>
                          {modifyDateFormat(item.end_date)}
                        </span>
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        결제 금액
                        <span style={{ paddingLeft: "69px" }}>
                          {item.price} P
                        </span>
                      </div>
                    </Col>
                    <Col span={6}>
                      {item.state === "-1" && (
                        <img
                          className={styles.car}
                          src="/assets/CheckReservation/cancel.png"
                        />
                      )}
                      {item.state !== "-1" &&
                        (new Date(item.end_date) < new Date() ? (
                          <img
                            className={styles.car}
                            src="/assets/CheckReservation/expired.png"
                          />
                        ) : new Date(item.start_date) > new Date() ? (
                          <img
                            className={styles.car}
                            src="/assets/CheckReservation/expected.png"
                          />
                        ) : (
                          <img
                            className={styles.car}
                            src="/assets/CheckReservation/using.png"
                          />
                        ))}
                    </Col>
                    <Col span={2} />
                  </Row>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CheckReservation;
