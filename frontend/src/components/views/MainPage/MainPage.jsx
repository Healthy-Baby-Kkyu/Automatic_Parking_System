import React from "react";
import styles from '@/components/views/MainPage/MainPage.module.css'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

function MainPage() {
  return (
    <div className={styles.main}>
     <div className={styles.intro}>
      <img className={styles.img} src="/assets/MainPage/introMain.jpg"></img>
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
      <div className={styles.rbox1}>
        <AssignmentOutlinedIcon className={styles.icons}/>
      </div>
      <div className={styles.rbox2}>
        <DirectionsCarFilledOutlinedIcon className={styles.icons}/>
      </div>
      <div className={styles.rbox3}>
        <FactCheckOutlinedIcon className={styles.icons}/>
      </div>
     </div>
    </div>
  );
}

export default MainPage;
