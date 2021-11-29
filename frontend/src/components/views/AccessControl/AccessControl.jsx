import React, { useEffect, useState } from "react";
import styles from "@accessControl/AccessControl.module.css";
import { Modal, Button } from "antd";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { USER_SERVER } from "@/Config.js"

function AccessControl() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [random_num, setRandom] = useState(Math.floor(Math.random() * 5) + 1);

  const car_data = [
    ['/assets/AccessControl/1_input.png','/assets/AccessControl/1_result.png','222머 8018'],
    ['/assets/AccessControl/2_input.png','/assets/AccessControl/2_result.png','123가 4568'],
    ['/assets/AccessControl/3_input.png','/assets/AccessControl/3_result.png','32두 4150'],
    ['/assets/AccessControl/4_input.png','/assets/AccessControl/4_result.png','26차 2861'],
    ['/assets/AccessControl/5_input.png','/assets/AccessControl/5_result.png','50머 7979'],
  ];

  const onFinish = () => {
    console.log("success");
    if (random_num !==0 ){
    fetch(`${USER_SERVER}/master/checkCar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car_number : car_data[random_num-1][2]
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setIsReserved(response.data.result);
    });
  }
  };

  const showModal = () => {
    setIsModalVisible(true);
    onFinish();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const alert = (cmd) => {
    if (cmd == 'open'){
      window.alert("차단기가 열렸습니다.");
    }
    else {
      window.alert("차단기가 닫힙니다. ");
    }
  }

  return (
    <div className={styles.container}>
      <TitleBar title_name="주차장 관리" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 접근 제어</div>
        <Button className={styles.ctrbtn} type="primary" danger onClick={() => alert('close')}>close</Button>
        <Button className={styles.ctrbtn} type="primary" onClick={()=>alert('open')}>open</Button>
        <Button className={styles.checkBtn} type="default" onClick={showModal}>
          차량 번호 조회
        </Button>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          className={styles.wrapper}
        >
          {isReserved==true ? 
          <><div className={styles.modal_div}>
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
            {random_num !== 0 && <img className={styles.OCR_img} src = {car_data[random_num-1][1]}/>}
            {random_num !== 0 && <div className={styles.car_num}>[{car_data[random_num-1][2]}]</div>}
            <div className={styles.description}>
              차량을 예약 목록에서 확인하였습니다.
          </div></>:
          <><div className={styles.modal_div}>
            <img
              className={styles.checkimg}
              src="/assets/AccessControl/check_off.png"
              style={{ paddingRight: "5px" }}
            />
            <img
              className={styles.checkimg}
              src="/assets/AccessControl/deny_on.png"
              style={{ paddingLeft: "5px" }}
            />
            </div>
            {random_num !== 0 && <img className={styles.OCR_img} src = {car_data[random_num-1][1]}/>}
            {random_num !== 0 && <div className={styles.car_num}>[{car_data[random_num-1][2]}]</div>}
            <div className={styles.description}>
              예약 목록에 없는 차량입니다.
          </div></>
          }
        </Modal>
        
        <div style={{ paddingTop: "30px" }}>
          <div className={styles.cur_video}>
            <img src= {random_num !== 0 && car_data[random_num-1][0]}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessControl;
