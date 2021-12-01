import React, { useState, useEffect } from "react";
import { Button, Menu, Dropdown, Select } from "antd";
import styles from "@monitoring/Monitoring.module.css";
import ParkingLot from "@/components/views/Monitoring/sections/AdminParkingLot";
import Sider from "@/components/common/Sider/Sider";
import TitleBar from "@titleBar/TitleBar";
import { DownOutlined } from "@ant-design/icons";
import { USER_SERVER } from "@/Config.js";

function Monitoring() {
  const { Option } = Select;
  const [floor, setFloor] = useState("B1");

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setFloor(value);
  };

  return (
    <div className={styles.container}>
      <TitleBar title_name="주차장 관리" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 모니터링</div>
        <Select
          defaultValue="B1"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="B1">B1</Option>
          <Option value="B2">B2</Option>
          <Option value="B3">B3</Option>
        </Select>
        <div className={styles.parking_lot_table}>
          <ParkingLot selected_floor={floor} />
        </div>
      </div>
    </div>
  );
}

export default Monitoring;
