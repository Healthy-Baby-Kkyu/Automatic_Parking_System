import React from "react";
import styles from "@monitoring/Monitoring.module.css";
import ParkingLot from "@monitoring/sections/ParkingLot";

function Monitoring() {
  return (
    <div className={styles.container}>
      <ParkingLot />
      MonitoringPage
    </div>
  );
}

export default Monitoring;
