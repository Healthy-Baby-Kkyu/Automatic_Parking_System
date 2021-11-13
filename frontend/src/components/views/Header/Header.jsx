import React from "react";
import { useHistory } from "react-router";
import 'antd/dist/antd.css';
import styles from '@/components/views/Header/Header.module.css'
import { Button, Select } from 'antd';
const { Option } = Select;

function Header() {
  const UserID = '';
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };

  return (
    <>
      <img className = {styles.logo} src = '/assets/logo/logo.png' onClick={() => movePage("/mainPage")}></img>
      <Button className = {styles.Button} type="text" onClick={() => movePage("/introService")}>서비스 소개</Button>
      <Button className = {styles.Button} type="text" onClick={() => movePage("/reservationPage")}>주차 예약</Button>
      <Button className = {styles.Button} type="text" onClick={() => movePage("/checkReservation")}>예약 내역</Button>'
      <Select className = {styles.Settings} defaultValue="Settings">
          <Option value="myPage"><div onClick={() => movePage("/personalInfo")}>MyPage</div></Option>
          <Option value="Logout"><div onClick={() => movePage("/")}>Logout</div></Option>
      </Select>
    </>
  );
}

export default Header;
