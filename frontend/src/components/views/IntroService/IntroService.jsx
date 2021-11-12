import React from 'react'
import TitleBar from '@/components/common/TitleBar/TitleBar'
import Sider from '@/components/common/Sider/Sider'
import styles from '@/components/views/IntroService/IntroService.module.css'

function IntroService() {
  return (
    <>
      <div className={styles.titlebox}>
        <TitleBar title_name="서비스 소개" />
      </div>
      <div className={styles.siderbox}>
        <Sider selected_key="서비스 소개" />
      </div>
      <div className={styles.box}>
        <div className={styles.text}>
          주차장의 자동화
        </div>
        <div className={styles.text1}>
          쉽고 편리하게 주차장의 주차 자리를 예약하고 이용할 수 있는 서비스를 제공합니다.
        </div>
        <div style={{display:'flex'}}>
          <img className={styles.img1} src="/assets/IntroService/intro1.png"></img>
          <img className={styles.img2} src="/assets/IntroService/intro2.png"></img>
          <img className={styles.img3} src="/assets/IntroService/intro3.png"></img>
        </div>
      </div>
    </>
  )
}

export default IntroService
