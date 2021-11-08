import React from "react";
import styles from "@customerResv/CustomerResv.module.css";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import Sider from "@sider/Sider";
import { Button, Menu, Dropdown, Input, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ResvList } from "@checkReservation/sections/ResvList";

function CustomerResv() {
  const menu_category = (
    <Menu>
      <Menu.Item key="1">전체 예약</Menu.Item>
      <Menu.Item key="2">지난 예약</Menu.Item>
      <Menu.Item key="3">진행 중인 예약</Menu.Item>
      <Menu.Item key="4">진행 예정 예약</Menu.Item>
    </Menu>
  );

  const menu_search = (
    <Menu>
      <Menu.Item key="1">예약번호</Menu.Item>
      <Menu.Item key="2">주차장소</Menu.Item>
      <Menu.Item key="3">이용시작일</Menu.Item>
      <Menu.Item key="4">예약자 ID</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <TitleBar title_name="고객 관리" />
      <div className={styles.ls}>
        <Sider selected_key="고객 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>고객 예약 조회</div>
        <div>
          <Dropdown overlay={menu_category} placement="bottomLeft">
            <Button>
              전체 예약
              <DownOutlined />
            </Button>
          </Dropdown>
          <span style={{ paddingRight: "500px" }} />
          <Dropdown overlay={menu_search} placement="bottomLeft">
            <Button>
              예약번호
              <DownOutlined />
            </Button>
          </Dropdown>
          <span style={{ paddingRight: "10px" }} />
          <Input style={{ width: "20%" }} />
          <Button type="primary" style={{ marginLeft: "10px" }}>
            검색
          </Button>
        </div>
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

export default CustomerResv;
