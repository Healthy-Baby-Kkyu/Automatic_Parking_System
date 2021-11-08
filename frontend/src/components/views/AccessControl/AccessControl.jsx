import React, { useState } from "react";
import styles from "@accessControl/AccessControl.module.css";
import { Modal, Button } from "antd";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";

function AccessControl() {
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

  return (
    <div className={styles.container}>
      <TitleBar title_name="주차장 관리" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 접근 제어</div>
        <Button type="primary" onClick={showModal} className={styles.checkBtn}>
          현 상황 체크
        </Button>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          className={styles.wrapper}
        >
          <div className={styles.modal_div}>
            <img
              className={styles.checkimg}
              src="/assets/AccessControl/check_on.png"
              style={{ paddingRight: "5px" }}
            />
            <img
              className={styles.checkimg}
              src="/assets/AccessControl/deny_off.png"
              style={{ paddingLeft: "5px" }}
            />
          </div>
          <div className={styles.car_num}>[50더 7979]</div>
          <div className={styles.description}>
            차량을 예약 목록에서 확인하였습니다.
          </div>
        </Modal>
        <div style={{ paddingTop: "30px" }}>
          <div className={styles.cur_video}>
            <img src="/assets/AccessControl/car1.jpg" />
          </div>

          <div className={styles.paper}>
            <div style={{ paddingBottom: "30px" }}>차단기 수동 조작</div>
            <img src="/assets/AccessControl/open_btn.png" />
            <img src="/assets/AccessControl/close_btn.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessControl;
