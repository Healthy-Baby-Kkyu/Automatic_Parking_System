import React,{useState, useEffect} from "react";
import { useHistory } from "react-router";
import 'antd/dist/antd.css';
import styles from '@/components/views/Header/Header.module.css'
import { Button, Select } from 'antd';
const { Option } = Select;

function Header() {
  const [UserID, setUserID] = useState( localStorage.getItem('id'));

  //const UserID = 'admin'; // null | admin | userId
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };
  
  const logout = (url) => {
    setUserID("");
    history.push(url);
  };

  return (
    <div className={styles.container}>
      <img className = {styles.logo} src = '/assets/logo/logo.png' onClick={() => movePage("/mainPage")}></img>
      { UserID =='admin'?
      <Button className = {styles.Button} type="text" onClick={() => movePage("/customerInfos")}>고객 관리</Button>:
      <Button className = {styles.Button} type="text" onClick={() => movePage("/introService")}>서비스 소개</Button>
      }
      { !UserID ?
      <Button className = {styles.Button} type="text" disabled="disabled">주차 예약</Button>:
      ( UserID =='admin'?
        <Button className = {styles.Button} type="text" onClick={() => movePage("/monitoring")}>주차장 관리</Button>:
        <Button className = {styles.Button} type="text" onClick={() => movePage("/reservationPage")}>주차 예약</Button>
      )
      }
      { !UserID ?
      <Button className = {styles.Button} type="text" disabled ="disabled">예약 내역</Button>:
      ( UserID =='admin'?
      <Button className = {styles.Button} type="text" onClick={() => movePage("/statistics")}>주차장 사용 통계</Button> :
      <Button className = {styles.Button} type="text" onClick={() => movePage("/checkReservation")}>예약 내역</Button>
      )
      }

      { !UserID ? 
      <>
        <Button className={styles.btn} onClick={()=>movePage("/signUp")}>SIGN UP</Button>
        <Button className={styles.btn} style={{left:"20px"}} onClick={()=>movePage("/")}>SIGN IN</Button>
      </> : 
      ( UserID =='admin'?
      <>
        <Select className = {styles.Settings} defaultValue="Settings">
          <Option value="Logout"><div onClick={() => logout("/")}>Logout</div></Option>
        </Select>
        <div className={styles.userID}><i>{UserID}</i> 님 환영합니다! </div>
      </>:
      <>
      <Select className = {styles.Settings} defaultValue="Settings">
        <Option value="myPage"><div onClick={() => movePage("/personalInfo")}>MyPage</div></Option>
        <Option value="Logout"><div onClick={() => logout("/")}>Logout</div></Option>
      </Select>
      <div className={styles.userID}><i>{UserID}</i> 님 환영합니다! </div>
      </>
      )
      }
    </div>
  );
}

export default Header;
