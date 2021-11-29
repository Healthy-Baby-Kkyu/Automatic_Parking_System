import React, { useEffect, useState } from "react";
import styles from "@accessControl/AccessControl.module.css";
import { Modal, Button } from "antd";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { USER_SERVER } from "@/Config.js"

function AccessControl() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [carID, setCarID] = useState('[50더 7979]');
  const [imgNum, setImgNum] = useState();

  useEffect(() => {
    fetch(`${USER_SERVER}/master/accessControl/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: window.localStorage.getItem('id'), //admin
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            //isReserved, carID 받아와서 set하기
        });
  }, [])

  const onFinish = (values) => {
    console.log("Success:", values);

    fetch(`${USER_SERVER}/master/accessControl/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgNum: values.imgNum, //이미지 번호 넘기기
        user_id: values.userID,
        session_id: window.localStorage.getItem("id"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
      });
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
        <Button type="default" onClick={showModal} className={styles.checkBtn}>
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
          <div className={styles.car_num}>{carID}</div>
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
          {/* <div className={styles.car_num}>[50더 7979]</div> */}
          <div className={styles.description}>
            예약 목록에 없는 차량입니다.
          </div></>
          }
        </Modal>
        
        <div style={{ paddingTop: "30px" }}>
          <div className={styles.cur_video}>
            <img src="/assets/AccessControl/car1.jpg" />
          </div>
          {/* <div className={styles.paper}>
            <div style={{ paddingBottom: "30px", float:"left" }}>차단기 수동 조작</div>
            <img src="/assets/AccessControl/open_btn.png" onClick={()=>alert('open')}/>
            <img src="/assets/AccessControl/close_btn.png" onClick={()=>alert('close')}/>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AccessControl;
