import React ,{ useState } from "react";
import { useHistory } from "react-router";
import styles from '@/components/views/MainPage/MainPage.module.css'
import { Row, Col } from 'antd';
import Statistics from "@statistics/Statistics";

function MainPage() {
  const [UserID, setUserID] = useState(window.localStorage.getItem('id'));
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };

  return (
    <>
    { UserID !='admin' ? 
      <div className={styles.main}>
      <div className={styles.intro}>
        <img className={styles.mainImg} src="/assets/MainPage/main.jpg"></img>
        <h1 className={styles.textOn}>AUTOMATIC PARKING SYSTEM</h1>
      </div>
      <div className={styles.lbox}>
        <hr className={styles.line}></hr>
        <div className={styles.text}>
          해당 웹 사이트는 주차장 위치, 이용 요금, 운영 시간 등 <br/>
          정보를 확인한 후 미리 예약이 가능한 서비스를<br/>
          제공합니다.
        </div>
      </div>
      <div className={styles.rbox}>
        <Row style={{height:"250px"}}>
          <Col span={8} className={styles.Col}>
            <div onClick={()=>movePage("/introService")} >
              <center><img className={styles.img} src="/assets/MainPage/img1.png" /></center>
              <center className={styles.text2}>서비스 소개</center>
              <center className={styles.text3}>웹 사이트 이용 방법을<br></br> 안내합니다.</center>
            </div>
          </Col>
          <Col span={8} className={styles.Col}>
            <div onClick={!UserID ? () => alert('로그인이 필요한 서비스입니다!'):()=>movePage("/reservationPage")} >
              <center><img className={styles.img} src="/assets/MainPage/img2.png"/></center>
              <center className={styles.text2}>주차 예약</center>
              <center className={styles.text3}>원활한 주차장 이용을 위해<br></br>미리 예약을 진행합니다.</center>
            </div>
          </Col>
          <Col span={8} className={styles.Col}>
            <div onClick={ !UserID ? () => alert('로그인이 필요한 서비스입니다!') : ()=>movePage("/checkReservation")} >
              <center><img className={styles.img} src="/assets/MainPage/img3.png"/></center>
              <center className={styles.text2}>예약 내역</center>
              <center className={styles.text3}>가입된 회원의 예약 내역<br></br> 확인이 가능합니다.</center>
            </div>
          </Col>
        </Row>
      </div>
      </div>
      :<Statistics/>
    }
    </>
  );
}

export default MainPage;
