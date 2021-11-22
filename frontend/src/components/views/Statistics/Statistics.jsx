import React, {useEffect} from "react";
import styles from "@statistics/Statistics.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { Row, Col } from 'antd';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function Statistics() {
  useEffect(() => {
    fetch(`${USER_SERVER}/master/statistics/`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  const resv_data = [
    {
      name: 'Mon', cancel: 4000, total: 2400, amt: 2400,
    },
    {
      name: 'Tue', cancel: 3000, total: 1398, amt: 2210,
    },
    {
      name: 'Wed', cancel: 2000, total: 9800, amt: 2290,
    },
    {
      name: 'Thu', cancel: 2780, total: 3908, amt: 2000,
    },
    {
      name: 'Fri', cancel: 1890, total: 4800, amt: 2181,
    },
    {
      name: 'Sat', cancel: 2390, total: 3800, amt: 2500,
    },
    {
      name: 'Sun', cancel: 3490, total: 4300, amt: 2100,
    },
  ];
  const resvRate_data = [
    {
      name: '00:00', slot: 4000, reservation: 2400, amt: 2400,
    },
    {
      name: '03:00', slot: 3000, reservation: 1398, amt: 2210,
    },
    {
      name: '06:00', slot: 2000, reservation: 9800, amt: 2290,
    },
    {
      name: '09:00', slot: 2780, reservation: 3908, amt: 2000,
    },
    {
      name: '12:00', slot: 1890, reservation: 4800, amt: 2181,
    },
    {
      name: '15:00', slot: 2390, reservation: 3800, amt: 2500,
    },
    {
      name: '18:00', slot: 3490, reservation: 4300, amt: 2100,
    },
    {
      name: '21:00', slot: 3490, reservation: 4300, amt: 2100,
    },
    {
      name: '24:00', slot: 3490, reservation: 4300, amt: 2100,
    },
  ];
  return (
    <div className={styles.container}>
      <TitleBar title_name="주차장 사용 통계" />
      <div className={styles.ls}>
        <Sider selected_key="주차장 사용 통계" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>주차장 사용 통계</div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div className={styles.cols}>
              <img className={styles.icons} src="/assets/Statistics/people.png"/>
              <div className={styles.text}>Total users</div>
              <div className={styles.numbers}>1000</div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className={styles.cols}>
              <img className={styles.icons} src="/assets/Statistics/reservation.png"/>
              <div className={styles.text}>Monthly reservation</div>
              <div className={styles.numbers}>1000</div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className={styles.cols}>
              <img className={styles.icons} src="/assets/Statistics/visitor.png"/>
              <div className={styles.text}>Today visitors</div>
              <div className={styles.numbers}>1000</div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className={styles.cols}>
              <img className={styles.icons} src="/assets/Statistics/parking.png"/>
              <div className={styles.text}>Today Usage rate</div>
              <div className={styles.numbers}>100%</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
          <BarChart
            width={500}
            height={300}
            data={resv_data}
            margin={{
              top: 10, right: 60, left: -10, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="cancel" fill="#8884d8" />
            <Bar type="monotone" dataKey="total" fill="#82ca9d"/>
          </BarChart>
          </Col>

          <Col span={12}>
          <LineChart
            width={500}
            height={300}
            data={resvRate_data}
            margin={{
              top: 10, right: 40, left: 10, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reservation" stroke="#8884d8"  />
            <Line type="monotone" dataKey="slot" stroke="#82ca9d" />
          </LineChart>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Statistics;
