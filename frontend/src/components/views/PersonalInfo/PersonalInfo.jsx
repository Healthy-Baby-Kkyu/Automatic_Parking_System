import React, {useEffect} from 'react'
import { useHistory } from "react-router";
import { Button, DatePicker, Space } from "antd"
import Sider from "@/components/common/Sider/Sider"
import TitleBar from '@/components/common/TitleBar/TitleBar'
import styles from "./PersonalInfo.module.css"
import moment from 'moment';
import {USER_SERVER} from "@/Config.js";

function PrivateInfo() {
    const history = useHistory();
    const movePage = (url) => {
        history.push(url);
    };
    const dateFormat = 'YYYY-MM-DD';

    useEffect(() => {
        fetch(`${USER_SERVER}/customer/chargePoint/`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          });
      }, []);

    return (
        <div className={styles.container}>
            <TitleBar title_name="마이 페이지" />
            <div className={styles.ls}>
                <Sider selected_key="마이 페이지" />
            </div>
            <div className={styles.rs}>
                <div className={styles.info_header}>
                    <div className={styles.subtitle}>개인 정보</div>
                    <Button style={{ float: "right" }}
                        size="small"
                        onClick={() => movePage("/EditPersonalInfo")}>
                        개인 정보 수정
                    </Button>
                </div>
                <div className={styles.info1}>
                    <div className={styles.info1_inside}>
                        <div style={{ textAlign: "left", paddingRight: "40px", marginLeft: "100px" }}>
                            <img src="/assets/PersonalInfo/user.png" style={{ height: "70px", width: "70px" }}></img>
                        </div>
                        <div style={{ textAlign: "left", borderRight: "1px dotted #D9D9D9", paddingRight: "80px" }}>
                            <div style={{ display: "flex", flexDirection: "row", fontSize: "15px", width:"170px" }}>
                                <div style={{ marginBottom: "5px" }}>user1</div>
                                <div>님 안녕하세요.</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", fontSize: "12px" }}>
                                <div style={{ marginRight: "5px" }}>누적 결제 금액 : </div>
                                <div>0</div>
                                <div>원</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info1_inside}>
                        <div style={{ textAlign: "center" }}>
                            <div>
                                포인트
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold" }}>
                                <div style={{ marginRight:"5px"}}>10,000</div>
                                <div>P</div>
                            </div>
                        </div>
                        <Button style={{ marginTop: "25px", marginLeft: "40px" }}
                            size="small"
                            onClick={() => movePage("/chargePoint")}>
                            포인트 충전
                        </Button>
                    </div>
                </div>

                <div className={styles.info2}>
                    <div className={styles.info2_inside}>
                        <div style={{ marginRight: "100px", marginBottom: "15px" }}>휴대폰 번호</div>
                        <div>010-1234-5678</div>
                    </div>
                    <div className={styles.info2_inside}>
                        <div style={{ marginLeft: "46px", marginRight: "100px", paddingTop: "5px" }}>생일</div>
                        <DatePicker defaultValue={moment('2001-02-10', dateFormat)} disabled />
                    </div>
                </div>

                <div style={{width:"900px"}} className={styles.subtitle}>차량 정보</div>
                <div className={styles.carInfo}>
                    <div className={styles.info2_inside}>
                        <div style={{ marginBottom: "15px", marginLeft: "32px", marginRight: "80px" }}>차종</div>
                        <div>소형차</div>
                    </div>
                    <div className={styles.info2_inside}>
                        <div style={{ marginRight: "80px" }}>차량 번호</div>
                        <div>123마 1234</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PrivateInfo
