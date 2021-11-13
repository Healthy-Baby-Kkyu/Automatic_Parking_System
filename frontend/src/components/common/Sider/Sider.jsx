import React, { Fragment, useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import styles from "@sider/Sider.module.css";
import { useHistory } from "react-router";
import GroupIcon from "@mui/icons-material/Group";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CarRentalIcon from "@mui/icons-material/CarRental";

function Sider({ selected_key }) {
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  const [key, setKey] = useState(currentURL.substr(1, currentURL.length));
  const { Sider } = Layout;
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "서비스 소개":
        return (
          <Menu.Item
            key="introService"
            icon={<ImportContactsIcon />}
            onClick={() => movePage("/introService")}
          >
            서비스 소개
          </Menu.Item>
        );
      case "주차 예약":
        return (
          <Menu.Item
            key="reservationPage"
            icon={<CarRentalIcon />}
            onClick={() => movePage("/reservationPage")}
          >
            주차 예약
          </Menu.Item>
        );
      case "예약 내역":
        return (
          <Menu.Item
            key="checkReservation"
            icon={<ListAltIcon />}
            onClick={() => movePage("/checkReservation")}
          >
            예약 내역
          </Menu.Item>
        );
      case "마이 페이지":
        return (
          <>
            <Menu.Item
              key="personalInfo"
              icon={<PermIdentityIcon />}
              onClick={() => movePage("/personalInfo")}
            >
              개인 정보
            </Menu.Item>
            <Menu.Item
              key="editPersonalInfo"
              icon={<PermContactCalendarIcon />}
              onClick={() => movePage("/editPersonalInfo")}
            >
              개인 정보 수정
            </Menu.Item>
            <Menu.Item
              key="chargePoint"
              icon={<MonetizationOnIcon />}
              onClick={() => movePage("/chargePoint")}
            >
              포인트 충전
            </Menu.Item>
          </>
        );
      case "고객 관리":
        return (
          <>
            <Menu.Item
              key="customerInfos"
              icon={<GroupIcon />}
              onClick={() => movePage("/customerInfos")}
            >
              고객 정보 조회
            </Menu.Item>
            <Menu.Item
              key="customerResv"
              icon={<ListAltIcon />}
              onClick={() => movePage("/customerResv")}
            >
              고객 예약 조회
            </Menu.Item>
          </>
        );
      case "주차장 관리":
        return (
          <>
            <Menu.Item
              key="monitoring"
              icon={<DirectionsCarIcon />}
              onClick={() => movePage("/monitoring")}
            >
              주차장 모니터링
            </Menu.Item>
            <Menu.Item
              key="accessControl"
              icon={<LocalParkingIcon />}
              onClick={() => movePage("/accessControl")}
            >
              주차장 접근 제어
            </Menu.Item>
          </>
        );
      case "주차장 사용 통계":
        return (
          <Menu.Item
            key="statistics"
            icon={<EqualizerIcon />}
            onClick={() => movePage("statistics")}
          >
            주차장 사용 통계
          </Menu.Item>
        );
    }
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
          <Fragment>{renderSwitch(selected_key)}</Fragment>
        </Menu>
      </Sider>
    </div>
  );
}

export default Sider;
