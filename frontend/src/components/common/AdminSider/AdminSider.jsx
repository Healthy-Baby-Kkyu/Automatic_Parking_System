import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import styles from "@adminSider/AdminSider.module.css";
import { useHistory } from "react-router";
import GroupIcon from "@mui/icons-material/Group";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function AdminSider({ selected_key }) {
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  const [key, setKey] = useState(currentURL.substr(1, currentURL.length));
  const { Sider } = Layout;
  const history = useHistory();
  const admin_url = [
    "/customerInfos",
    "/customerResv",
    "/monitoring",
    "/accessControl",
    "/statistics",
  ];
  const movePage = (url) => {
    history.push(url);
  };

  useEffect(() => {
    setCurrentURL(window.location.pathname);
    setKey(currentURL.substr(1, currentURL.length));
    // setKey(selected_key);
  }, []);

  return (
    <div className={styles.sider}>
      <Sider trigger={null} width={200}>
        <Menu
          defaultSelectedKeys={key}
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item
            key="customerInfos"
            icon={<GroupIcon />}
            onClick={() => movePage(admin_url[0])}
          >
            고객 정보 조회
          </Menu.Item>
          <Menu.Item
            key="customerResv"
            icon={<ListAltIcon />}
            onClick={() => movePage(admin_url[1])}
          >
            고객 예약 조회
          </Menu.Item>
          <Menu.Item
            key="monitoring"
            icon={<DirectionsCarIcon />}
            onClick={() => movePage(admin_url[2])}
          >
            주차장 모니터링
          </Menu.Item>
          <Menu.Item
            key="accessControl"
            icon={<LocalParkingIcon />}
            onClick={() => movePage(admin_url[3])}
          >
            주차장 접근 제어
          </Menu.Item>
          <Menu.Item
            key="statistics"
            icon={<EqualizerIcon />}
            onClick={() => movePage(admin_url[4])}
          >
            주차장 사용 통계
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}

export default AdminSider;
