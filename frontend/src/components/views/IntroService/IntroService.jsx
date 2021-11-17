import React from 'react'
import TitleBar from '@/components/common/TitleBar/TitleBar'
import Sider from '@/components/common/Sider/Sider'
import styles from '@/components/views/IntroService/IntroService.module.css'
import { Row, Col } from 'antd';

function IntroService() {
  return (
    <>
      <div className={styles.titlebox}>
        <TitleBar title_name="서비스 소개" />
      </div>
      <div className={styles.siderbox}>
        <Sider selected_key="서비스 소개" />
      </div>
      <div className={styles.container}>
        <center className={styles.text}>
          주차장의 자동화
        </center>
        <center className={styles.text1}>
          쉽고 편리하게 주차장의 주차 자리를 예약하고 이용할 수 있는 서비스를 제공합니다.
        </center>
        <div className={styles.box}>
          <Row>
            <Col xs={{ span: 5, offset: 5 }} lg={{ span: 5, offset: 2 }}>
            <img className={styles.img} src="/assets/IntroService/intro1.png"></img>
              <center className={styles.text2}>편리한 UI를 통한<br></br>주차 자리 선택</center>
            </Col>
            <Col xs={{ span: 5, offset: 5 }} lg={{ span: 5, offset: 2 }}>
            <img className={styles.img} src="/assets/IntroService/intro2.png"></img>
              <center className={styles.text2}>고객의 주차장 사용 기록을<br></br>예약 내역으로 제공</center>
            </Col>
            <Col xs={{ span: 5, offset: 5 }} lg={{ span: 5, offset: 2 }}>
            <img className={styles.img} src="/assets/IntroService/intro3.png"></img>
              <center className={styles.text2}>차량 번호 자동 인식을 통한<br></br>주차장 무인 출입 시스템</center>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default IntroService
