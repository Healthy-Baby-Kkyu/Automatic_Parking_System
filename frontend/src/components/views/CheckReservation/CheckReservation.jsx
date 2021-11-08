import React, { useEffect } from "react";
import styles from "@checkReservation/CheckReservation.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { Button, Row, Col } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ResvList } from "@checkReservation/sections/ResvList";

function CheckReservation() {
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
                    <Button type="primary" size="small">
                      예약 수정
                    </Button>
                    &nbsp;
                    <Button type="primary" size="small">
                      예약 취소
                    </Button>
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
