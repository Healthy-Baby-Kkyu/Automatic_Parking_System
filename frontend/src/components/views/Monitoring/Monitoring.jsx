import React from "react";
import { Button, Menu, Dropdown } from "antd";
import styles from "@monitoring/Monitoring.module.css";
import ParkingLot from "@/components/views/Monitoring/sections/AdminParkingLot";
import Sider from "@/components/common/Sider/Sider";
import TitleBar from "@titleBar/TitleBar";
import { DownOutlined } from "@ant-design/icons";

function Monitoring() {
  const menu = (
    <Menu>
      <Menu.Item key="b2">B2</Menu.Item>
      <Menu.Item key="b3">B3</Menu.Item>
      <Menu.Item key="add">
        <Button size="small">층 추가</Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <TitleBar title_name="관리자 페이지" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 모니터링</div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button size="large">
            B1
            <span style={{ paddingRight: "60px" }} />
            <DownOutlined />
          </Button>
        </Dropdown>
        <div className={styles.parking_lot_table}>
          <ParkingLot />
        </div>
      </div>
    </div>
  );
}

export default Monitoring;
