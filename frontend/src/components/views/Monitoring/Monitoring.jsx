import React from "react";
import { Button, Menu, Dropdown } from "antd";
import styles from "@monitoring/Monitoring.module.css";
import ParkingLot from "@/components/views/Monitoring/sections/AdminParkingLot";
import AdminSider from "@adminSider/AdminSider";
import TitleBar from "@titleBar/TitleBar";
import { DownOutlined } from "@ant-design/icons";

function Monitoring() {
  const menu = (
    <Menu>
      <Menu.Item>B2</Menu.Item>
      <Menu.Item>B3</Menu.Item>
      <Menu.Item>
        <Button size="small">층 추가</Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.container}>
      <TitleBar title_name="관리자 페이지" />
      <div className={styles.ls}>
        <AdminSider selected_key={3} />
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
