import React from "react";
import 'antd/dist/antd.css';
import styles from '@/components/views/Header/Header.module.css'
import { Button, Select } from 'antd';
const { Option } = Select;

function Header() {
  function button1Click(e){
    window.location.href = '/IntroService'
  }
  function button2Click(e){
    window.location.href = '/ReservationPage'
  }
  function button3Click(e){
    window.location.href = '/CustomerResv'
  }
  return (
    <>
      <img className = {styles.logo} src = '/assets/logo/logo.png'></img>
      <Button className = {styles.Button} type="text" onClick = {button1Click}>서비스 소개</Button>
      <Button className = {styles.Button} type="text" onClick = {button2Click}>주차 예약</Button>
      <Button className = {styles.Button} type="text" onClick = {button3Click}>예약 내역</Button>
      <Select className = {styles.Settings} defaultValue="Settings">
          <Option value="MyPage">MyPage</Option>
          <Option value="Logout">Logout</Option>
      </Select>
    </>
  );
}

export default Header;
