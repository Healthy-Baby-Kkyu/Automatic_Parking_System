import React from "react";
import { useHistory } from "react-router";
import styles from '@/components/views/MainPage/MainPage.module.css'
import { Row, Col } from 'antd';

function MainPage() {
  const UserID = 'admin'; // null | admin | userId
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };

  return (
    <div className={styles.main}>
     <div className={styles.intro}>
      {/* <img className={styles.img} src="/assets/MainPage/introMain.jpg"></img> */}
      <h1
       className={styles.textOn}>AUTOMATIC PARKING SYSTEM</h1>
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
      <Row style={{left:"50px;"}}>
        <Col xs={{ span: 5, offset: 5 }} lg={{ span: 6, offset: 2 }} >
          { UserID=='admin'?
            <><img className={styles.img} src="/assets/MainPage/img4.png" onClick={()=>movePage("/customerInfos")}/>
            <div className={styles.text2} style={{padding:"0px 0px 0px 20px"}}>고객 관리</div>
            <center className={styles.text3}>고객 정보 및 고객 예약 정보를<br></br> 관리합니다.</center></>:
            <><img className={styles.img} src="/assets/MainPage/img1.png" onClick={()=>movePage("/introService")}/>
            <center className={styles.text2}>서비스 소개</center>
            <center className={styles.text3}>웹 사이트 이용 방법을<br></br> 안내합니다.</center></>
          }
          
        </Col>
        <Col xs={{ span: 5, offset: 5 }} lg={{ span: 6, offset: 2 }} >
          { !UserID ? 
            <img 
            className={styles.img} 
            src="/assets/MainPage/img2.png" 
            onClick={() => alert('로그인이 필요한 서비스입니다!')}
            />:
            ( UserID=='admin'?
            <><img 
              className={styles.img} 
              src="/assets/MainPage/img2.png" 
              onClick={()=>movePage("/monitoring")}
            />
            <div className={styles.text2} style={{padding:"0px 0px 0px 12px"}}>주차장 관리</div>
            <center className={styles.text3}>주차장 모니터링, 주차장 접근을<br></br>제어합니다.</center></>:
            <><img 
              className={styles.img} 
              src="/assets/MainPage/img2.png" 
              onClick={()=>movePage("/reservationPage")}
            />
            <center className={styles.text2}>주차 예약</center>
            <center className={styles.text3}>원활한 주차장 이용을 위해<br></br>미리 예약을 진행합니다.</center></>
            )
            
          }
          
        </Col>
        <Col xs={{ span: 5, offset: 5 }} lg={{ span: 6, offset: 2 }} >
          {!UserID ?
          <img 
          className={styles.img} 
          src="/assets/MainPage/img3.png" 
          onClick={() => alert('로그인이 필요한 서비스입니다!')}
          />
          :
          ( UserID=='admin'?
          <><img 
            className={styles.img} 
            src="/assets/MainPage/img5.png" 
            onClick={()=>movePage("/statistics")}
          />
          <div className={styles.text2}>주차장 사용 통계</div>
          <center className={styles.text3}>주차장 사용 통계 확인이 <br></br> 가능합니다.</center></>:
          <><img 
            className={styles.img} 
            src="/assets/MainPage/img3.png" 
            onClick={()=>movePage("/checkReservation")}
          />
          <center className={styles.text2}>예약 내역</center>
          <center className={styles.text3}>가입된 회원의 예약 내역<br></br> 확인이 가능합니다.</center></>
          )
          }
        </Col>
      </Row>
     </div>
    </div>
  );
}

export default MainPage;
