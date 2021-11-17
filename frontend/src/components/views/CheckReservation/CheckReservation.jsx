import React, { useState, useEffect } from "react";
import styles from "@checkReservation/CheckReservation.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { Button, Row, Col, Modal } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ResvList } from "@checkReservation/sections/ResvList";
import {USER_SERVER} from "@/Config.js";

function CheckReservation() {
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

  useEffect(() => {
    fetch(`${USER_SERVER}/customer/getPersonalResv/`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title_name="예약 내역" />
      <div className={styles.ls}>
        <Sider selected_key="예약 내역" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>예약 내역</div>
        <div className={styles.paper}>
          {ResvList.map((item, idx) => (
            <Accordion key={idx} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  <b>NO. {item.resvID}</b>
                </div>
                {item.temp === "2" && (
                  <>
                    <span style={{ paddingLeft: "20px" }} />
                    <Button type="primary" size="small" onClick={showModal}>
                      예약 취소
                    </Button>
                    <Modal
                      title="예약 내역 취소"
                      visible={isModalVisible}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          취소
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                          확인
                        </Button>,
                      ]}
                    >
                      <div style={{ marginBottom: "20px" }}>
                        <div>해당 예약 건을 취소하시겠습니까?</div>
                        <div>
                          취소 시 수정 내역을 되돌릴 수 없으며, 환불은 포인트
                          충전으로 이뤄집니다.
                        </div>
                      </div>
                      <div style={{ paddingBottom: "5px", fontSize: "0.9em" }}>
                        주차 장소
                        <span style={{ paddingLeft: "67px" }}>{item.slot}</span>
                      </div>
                      <div style={{ paddingBottom: "5px", fontSize: "0.9em" }}>
                        이용시작일
                        <span style={{ paddingLeft: "60px" }}>
                          {item.startDate}
                        </span>
                      </div>
                      <div style={{ paddingBottom: "5px", fontSize: "0.9em" }}>
                        이용시작일
                        <span style={{ paddingLeft: "60px" }}>
                          {item.endDate}
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
                          {item.payment} P
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
                      <span style={{ paddingLeft: "67px" }}>{item.slot}</span>
                    </div>
                    <div style={{ paddingBottom: "5px" }}>
                      이용시작일
                      <span style={{ paddingLeft: "60px" }}>
                        {item.startDate}
                      </span>
                    </div>
                    <div style={{ paddingBottom: "5px" }}>
                      이용시작일
                      <span style={{ paddingLeft: "60px" }}>
                        {item.endDate}
                      </span>
                    </div>
                    <div style={{ paddingBottom: "5px" }}>
                      결제 금액
                      <span style={{ paddingLeft: "69px" }}>
                        {item.payment} P
                      </span>
                    </div>
                  </Col>
                  <Col span={6}>
                    {item.temp === "0" && (
                      <img
                        className={styles.car}
                        src="/assets/CheckReservation/expired.png"
                      />
                    )}
                    {item.temp === "1" && (
                      <img
                        className={styles.car}
                        src="/assets/CheckReservation/using.png"
                      />
                    )}
                    {item.temp === "2" && (
                      <img
                        className={styles.car}
                        src="/assets/CheckReservation/expected.png"
                      />
                    )}
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
