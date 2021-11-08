import React, { useState } from 'react'
import Sider from "@/components/common/Sider/Sider"
import TitleBar from "@/components/common/TitleBar/TitleBar"
import { Button, Input, InputNumber } from "antd"
import styles from "@/components/views/ChargePoint/ChargePoint.module.css"


function ChargePoint() {

    const [count, setCount] = useState(0)

    const [value, setValue] = useState(0)

    function handleMove() {
        setCount(count + 1);
        setValue(0)
    }

    return (
        <div className={styles.container}>
            <TitleBar title_name="마이 페이지" />
            <div className={styles.ls}>
                <Sider selected_key="마이 페이지" />
            </div>
            <div className={styles.rs}>
                <div className={styles.charge_header}>
                    <div className={styles.subtitle}>포인트 충전</div>
                </div>
                <form></form>
                <div className={styles.charge_main}>
                    <div className={styles.charge_inside}>
                        <div style={{ flex: "1", textAlign: "right", paddingRight: "350px" }}>나의 보유 포인트 :</div>
                        <div style={{ flex: "1" }}>45000</div>
                        <div style={{ marginLeft: "-70px" }}>P</div>
                    </div>
                    <div style={{ marginTop: "50px" }} className={styles.charge_inside}>
                        <div style={{ flex: "1", textAlign: "right", paddingRight: "131px" }}>충전 포인트 :</div>
                        <div style={{ paddingRight: "80px", marginTop: "3px" }}>+</div>
                        {count % 2 == "0" && (
                            <input style={{ width: "327px", marginLeft: "-70px", marginRight: "80px", textAlign: "right" }}
                                type="number"
                                placeholder="0"
                                value={value}
                                required
                                disabled
                            />
                        )}
                        {count % 2 == "1" && (
                            <input style={{ width: "327px", marginLeft: "-70px", marginRight: "80px", textAlign: "right" }}
                                type="number"
                                placeholder="0"
                                required />
                        )}
                        <div style={{ marginLeft: "-70px", marginTop: "3px" }}>P</div>
                    </div>
                    <div style={{ display: "flex", float: "right", marginTop: "4px", marginRight: "20px" }}>
                        {count % 2 == "0" && (
                            <>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 1000)}>+1000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 5000)}>+5000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 10000)}>+10000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 50000)}>+50000</Button>
                            </>
                        )}
                        {count % 2 == "1" && (
                            <>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 1000)} disabled>+1000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 5000)} disabled>+5000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 10000)} disabled>+10000</Button>
                                <Button style={{ marginLeft: "4px" }} size="small" onClick={() => setValue(value + 50000)} disabled>+50000</Button>
                            </>
                        )}
                        <Button style={{ marginLeft: "4px" }} size="small" onClick={() => handleMove()}>직접입력</Button>
                    </div>
                    <div style={{ borderTop: "1px solid #D9D9D9", marginTop: "50px", paddingTop: "10px" }} className={styles.charge_inside}>
                        <div style={{ flex: "1", textAlign: "right", paddingRight: "350px" }}>충전 후 포인트 :</div>
                        <div style={{ flex: "1", color: "#0F31FF", fontWeight: "bold" }}>45000</div>
                        <div style={{ marginLeft: "-70px" }}>P</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
                        <Button style={{ marginTop: "40px", width: "180px" }} type="primary" htmlType="submit">충전하기</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChargePoint
