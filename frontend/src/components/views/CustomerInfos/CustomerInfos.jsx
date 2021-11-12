import React from 'react'
import styles from "@/components/views/CustomerInfos/CustomerInfos.module.css"
import TitleBar from "@/components/common/TitleBar/TitleBar";
import CustomerInfosTable from './sections/CustomerInfosTable';
import Sider from "@sider/Sider";
import { Button, Menu, Dropdown, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";

function CustomerInfos() {
    const menu_search = (
        <Menu>
            <Menu.Item key="1">고객 ID</Menu.Item>
            <Menu.Item key="2">이름</Menu.Item>
            <Menu.Item key="3">전화번호</Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.container}>
            <TitleBar title_name="고객 관리" />
            <div className={styles.ls}>
                <Sider selected_key="고객 관리" />
            </div>
            <div className={styles.rs}>
                <div className={styles.subtitle}>고객 정보 조회</div>
                <div style={{ width: "900px" }}>
                    <span style={{ paddingRight: "500px" }} />
                    <Dropdown overlay={menu_search} placement="bottomLeft">
                        <Button>
                            고객 ID
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                    <span style={{ paddingRight: "10px" }} />
                    <Input style={{ width: "20%" }} />
                    <Button type="primary" style={{ marginLeft: "10px" }}>
                        검색
                    </Button>
                </div>
                <div className={styles.paper}>
                    <div style={{display:"flex", marginBottom:"7px"}}>
                    <div style={{fontWeight:"bold", marginRight:"5px"}}>검색 결과</div>
                    <div style={{fontWeight:"bold", color:"#0F31FE"}}>5</div>
                    <div>명</div>
                    </div>
                    <CustomerInfosTable />
                </div>
            </div>
        </div>
    )
}

export default CustomerInfos
