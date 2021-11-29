import React, { useState, useEffect } from "react";
import styles from "@customerResv/CustomerResv.module.css";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import Sider from "@sider/Sider";
import { Button, Input, Row, Col, Modal, Select, Form } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { USER_SERVER } from "@/Config.js";

function CustomerResv() {
  const { Option } = Select;
  const [resvList, setResvList] = useState();
  const [tmpList, setTmpList] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (item) => {
    setIsModalVisible(false);
    fetch(`${USER_SERVER}/master/cancelResv/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: -1,
        reservation_id: item.reservation_id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("예약이 취소되었습니다.");
        window.location.replace("/customerResv");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const compareCurrentBefore = (element) => {
    return new Date(element.end_date) < new Date();
  };

  const compareCurrent = (element) => {
    return (
      new Date(element.start_date) <= new Date() &&
      new Date() <= new Date(element.end_date)
    );
  };

  const compareCurrentAfter = (element) => {
    return new Date(element.start_date) > new Date();
  };

  const handleChangeSort = (value) => {
    switch (value) {
      case "전체 예약":
        setTmpList(resvList);
        break;
      case "지난 예약":
        setTmpList(resvList.filter(compareCurrentBefore));
        break;
      case "진행 중인 예약":
        setTmpList(resvList.filter(compareCurrent));
        break;
      case "진행 예정 예약":
        setTmpList(resvList.filter(compareCurrentAfter));
        break;
    }
  };
  const onFinish = (values) => {
    if (values.search_input === "") {
      setTmpList(resvList);
      return;
    }
    switch (values.search_type) {
      case "예약 번호":
        setTmpList(
          resvList.filter(
            (value) => value.reservation_id === parseInt(values.search_input)
          )
        );
        break;
      case "주차 장소": // 주차 장소 검색은 slotID로만 가능 (예: E5)
        setTmpList(
          resvList.filter(
            (value) =>
              value.parking_slot_id.substr(-2, value.parking_slot_id.length) ===
              values.search_input
          )
        );
        break;
      case "이용시작일":
        setTmpList(
          resvList.filter((value) => value.start_date === values.search_input)
        );
        break;
      case "예약자 ID":
        setTmpList(
          resvList.filter((value) => value.user_id === values.search_input)
        );
        break;
      case "":
        setTmpList(resvList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const handleChangeSearch = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    console.log(new Date());
    fetch(`${USER_SERVER}/master/getCustomerResv/`)
      .then((response) => response.json())
      .then((response) => {
        setResvList(response);
        setTmpList(response);
        console.log(response);
      });
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title_name="고객 관리" />
      <div className={styles.ls}>
        <Sider selected_key="고객 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>고객 예약 조회</div>
        <div style={{ float: "left" }}>
          <Select
            defaultValue="전체 예약"
            style={{ width: 130 }}
            onChange={handleChangeSort}
          >
            <Option value="전체 예약">전체 예약</Option>
            <Option value="지난 예약">지난 예약</Option>
            <Option value="진행 중인 예약">진행 중인 예약</Option>
            <Option value="진행 예정 예약">진행 예정 예약</Option>
          </Select>
        </div>
        <div>
          <Form
            name="search-place"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className={styles.search_form}>
              <Form.Item name="search">
                <Input.Group compact>
                  <Form.Item name="search_type">
                    <Select
                      defaultValue="예약 번호"
                      style={{ width: 100 }}
                      onChange={handleChangeSearch}
                    >
                      <Option value="예약 번호">예약 번호</Option>
                      <Option value="주차 장소">주차 장소</Option>
                      <Option value="이용시작일">이용시작일</Option>
                      <Option value="예약자 ID">예약자 ID</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="search_input">
                    <Input
                      style={{ width: "200px", marginLeft: "10px" }}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: "10px" }}
                    >
                      검색
                    </Button>
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className={styles.paper}>
          {tmpList &&
            tmpList.map((item, idx) => (
              <Accordion key={idx} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>
                    <b>NO. {item.reservation_id}</b>
                  </div>
                  {new Date(item.start_date) > new Date() && (
                    <>
                      <span style={{ paddingLeft: "20px" }} />
                      &nbsp;
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
                          <div>해당 고객의 예약 건을 취소하시겠습니까?</div>
                          <div style={{ fontSize: "0.9em" }}>
                            <b>[주의]</b> 예약 취소 행위는 고객의 요청에
                            의해서만 진행되어야 합니다.
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
                            {item.start_date}
                          </span>
                        </div>
                        <div
                          style={{ paddingBottom: "5px", fontSize: "0.9em" }}
                        >
                          이용종료일
                          <span style={{ paddingLeft: "60px" }}>
                            {item.end_date}
                          </span>
                        </div>
                        <div
                          style={{
                            paddingBottom: "5px",
                            fontSize: "0.9em",
                            color: "red",
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
                        예약자 ID
                        <span style={{ paddingLeft: "67px" }}>
                          {item.user_id}
                        </span>
                      </div>
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
                          {item.start_date}
                        </span>
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        이용시작일
                        <span style={{ paddingLeft: "60px" }}>
                          {item.end_date}
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
                      {new Date(item.end_date) < new Date() ? (
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
