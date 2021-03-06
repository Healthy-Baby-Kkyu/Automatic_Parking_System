import React, {useEffect, useState} from "react";
import styles from "@statistics/Statistics.module.css";
import TitleBar from "@titleBar/TitleBar";
import Sider from "@sider/Sider";
import { Row, Col } from 'antd';
import { USER_SERVER } from "@/Config.js";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { padding } from '@mui/system';

function getCurrentWeek() { 
  const day = new Date();  
  var weekago = new Date(day.setDate(day.getDate() - 6));
  day.setTime(weekago); 
  const result = [day.toISOString().slice(5, 10).replace('-','/')]; 
  for (let i = 1; i < 7; i++) { 
    day.setTime(day.getTime() + 86400000); 
    result.push(day.toISOString().slice(5, 10).replace('-','/')); 
  } 
  return result; 
}


function Statistics() {
  const result = getCurrentWeek();
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);
  const [dailyVisitors, setDailyVisitors] = useState(0);
  const [slotRate, setSlotRate] = useState(0);
  const [weekly_visitors, setWeeklyVisitors] = useState([0,0,0,0,0,0,0]);
  const [weekly_canceler, setWeeklyCanceler] = useState([0,0,0,0,0,0,0]);
  const [resv_time, setResvTime] = useState([0,0,0,0,0,0,0,0]);
  const [resv_slot, setResvSlot] = useState([0,0,0,0,0,0,0,0]);

  useEffect(() => {
    fetch(`${USER_SERVER}/master/statistics/`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setTotalUsers(response.data.total_users - 1);
        setMonthlyVisitors(response.data.monthly_visitors);
        setDailyVisitors(response.data.daily_visitors);
        setSlotRate(response.data.slot_rate);
        //setSlotRate(70);
        setWeeklyVisitors(response.data.weekly_visitors);
        //setWeeklyVisitors([70,80,30,90,70,40,80]);
        setWeeklyCanceler(response.data.weekly_canceler);
        //setWeeklyCanceler([5,10,15,2,14,8,9]);
        setResvTime(response.data.resv_slot);
        //setResvTime([70,80,30,90,70,40,80,10,40]);
        setResvSlot(response.data.resv_time);
        //setResvSlot([70,80,30,90,70,40,80,10,40]);
      });
  }, []);

  const resv_data = [
    {
      name: result[0], cancel: weekly_canceler[0], total: weekly_visitors[0], 
    },
    {
      name: result[1], cancel: weekly_canceler[1], total: weekly_visitors[1], 
    },
    {
      name: result[2], cancel: weekly_canceler[2], total: weekly_visitors[2], 
    },
    {
      name: result[3], cancel: weekly_canceler[3], total: weekly_visitors[3], 
    },
    {
      name: result[4], cancel: weekly_canceler[4], total: weekly_visitors[4], 
    },
    {
      name: result[5], cancel: weekly_canceler[5], total: weekly_visitors[5], 
    },
    {
      name: result[6], cancel: weekly_canceler[6], total: weekly_visitors[6], 
    },
  ];
  const resvRate_data = [
    {
      name: '00:00', slot: resv_slot[0], reservation: resv_time[0], 
    },
    {
      name: '03:00', slot: resv_slot[1], reservation: resv_time[1], 
    },
    {
      name: '06:00', slot: resv_slot[2], reservation: resv_time[2], 
    },
    {
      name: '09:00', slot: resv_slot[3], reservation: resv_time[3], 
    },
    {
      name: '12:00', slot: resv_slot[4], reservation: resv_time[4], 
    },
    {
      name: '15:00', slot: resv_slot[5], reservation: resv_time[5], 
    },
    {
      name: '18:00', slot: resv_slot[6], reservation: resv_time[6], 
    },
    {
      name: '21:00', slot: resv_slot[7], reservation: resv_time[7], 
    },
  ];
  return (
    <div className={styles.container}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div className={styles.cols}>
            <img className={styles.icons} src="/assets/Statistics/people.png"/>
            <div className={styles.text}>Total users</div>
            <div className={styles.numbers}>{totalUsers}</div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className={styles.cols}>
            <img className={styles.icons} src="/assets/Statistics/reservation.png"/>
            <div className={styles.text}>Monthly reservation</div>
            <div className={styles.numbers}>{monthlyVisitors}</div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className={styles.cols}>
            <img className={styles.icons} src="/assets/Statistics/visitor.png"/>
            <div className={styles.text}>Daily reservation</div>
            <div className={styles.numbers}>{dailyVisitors}</div>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className={styles.cols}>
            <img className={styles.icons} src="/assets/Statistics/parking.png"/>
            <div className={styles.text}>Current Slot Usage rate</div>
            <div className={styles.numbers} style={{width:"180px", margin:"0px 0px 0px 35px"}}>{slotRate.toFixed(1)}%</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
        <div style={{margin:"0px 0px 0px 20px", fontSize:"1.2em"}}>
          <img className={styles.imgGraph} src="/assets/Statistics/bargraph.png"/>
          <div className={styles.textGraph}>Statistics Of Users For Last Week </div>
        </div>
        <BarChart
          width={550}
          height={350}
          data={resv_data}
          margin={{
            top: 30, right: 0, left: 0, bottom: -20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="total" fill="#8884d8" />
          <Bar type="monotone" dataKey="cancel" fill="#82ca9d"/>
        </BarChart>
        </Col>

        <Col span={12}>
        <div style={{margin:"0px 0px 0px 30px", fontSize:"1.2em"}}>
          <img className={styles.imgGraph} src="/assets/Statistics/linegraph.png"/>
          <div className={styles.textGraph}>Statistics Of Reservations By Time </div>
        </div>
        <LineChart
          width={550}
          height={350}
          data={resvRate_data}
          margin={{
            top: 30, right: 0, left: 0, bottom: -20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reservation" stroke="#8884d8" />
          <Line type="monotone" dataKey="slot" stroke="#82ca9d" />
        </LineChart>
        </Col>
      </Row>
    </div>
  );
}

export default Statistics;
