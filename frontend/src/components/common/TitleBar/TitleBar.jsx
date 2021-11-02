import React from "react";
import styles from "@titleBar/TitleBar.module.css";

function TitleBar({ title_name }) {
  return (
    <div>
      <div className={styles.page_title}>
        <div className={styles.vertical_line} />
        <div className={styles.title}>{title_name}</div>
      </div>
    </div>
  );
}

export default TitleBar;
