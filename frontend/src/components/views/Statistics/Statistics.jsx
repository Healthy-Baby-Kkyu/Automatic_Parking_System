import React from "react";
import styles from "@statistics/Statistics.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";

function Statistics() {
  return (
    <div className={styles.container}>
      <TitleBar title_name="주차장 사용 통계" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 사용 통계" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 사용 통계</div>
      </div>
    </div>
  );
}

export default Statistics;
