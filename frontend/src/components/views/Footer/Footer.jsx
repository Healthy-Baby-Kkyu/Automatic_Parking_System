import React from "react";
import { useHistory } from "react-router";
import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons';
import styles from "@footer/Footer.module.css";

function Footer() {
  const history = useHistory();

  const movePage = (url) => {
    history.push(url);
  };

  return (
    <div className={styles.Footer}>
      <center>
        <GithubOutlined 
          className={styles.github} 
          onClick={()=>movePage("https://github.com/Healthy-Baby-Kkyu/Automatic_Parking_System")}
        />
      </center>
    </div>
  );
}

export default Footer;
