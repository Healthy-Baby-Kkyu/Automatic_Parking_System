import React from "react";
import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons';
import styles from "@footer/Footer.module.css";

function Footer() {
  return (
    <div className={styles.Footer}>
      <center><GithubOutlined/></center>
    </div>
  );
}

export default Footer;
