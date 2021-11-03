import React, { Fragment, useState } from "react";
import styles from "@reservationPage/ReservationPage.module.css";
import { Button, Popover } from "antd";
import { parkingLotData } from "@monitoring/sections/ParkingLotData";

function ParkingLot({ getSelectedData }) {
  const sections = ["A", "B", "C", "D", "E"];
  const states = ["Available", "Unavailable"];

  const onSelected = () => {
    getSelectedData(1);
  };

  const content_available_slot = (index, param) => (
    <>
      <p>- State : {states[index]}</p>
      <span style={{ paddingLeft: "60px" }} />
      <Button type="primary" size="small" onClick={onSelected}>
        Select
      </Button>
      &nbsp;
      <Button size="small">Cancel</Button>
    </>
  );
  const content_slot = (index, param) => <div>- State : {states[index]}</div>;

  const renderSwitch = (param, idx) => {
    switch (param.state) {
      case "1": // 주차 가능
        return (
          <Popover
            content={() => content_available_slot(0, param)}
            title={sections[idx] + param.slotID}
          >
            <td style={{ backgroundColor: "#5172FF" }}> </td>
          </Popover>
        );
      case "2": // 예약 완료
      case "3": // 주차 중
        return (
          <Popover
            content={() => content_slot(1, param)}
            title={sections[idx] + param.slotID}
          >
            <td style={{ backgroundColor: "#D9D9D9" }}> </td>
          </Popover>
        );
      case "0": // Empty
      default:
        // 접근 불가
        return <td style={{ backgroundColor: "#FFFFFF" }}> </td>;
    }
  };

  return (
    <div>
      <p />{" "}
      <table>
        <tbody>
          {parkingLotData.map((section, idx) => (
            <tr key={idx}>
              {parkingLotData[idx].map((slot, idx2) => (
                <Fragment key={sections[idx] + idx2}>
                  {renderSwitch(slot, idx)}
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.squares}>
        <div>
          <div
            className={styles.small_square}
            style={{ backgroundColor: "#bfbfbf" }}
          />
          <span style={{ paddingRight: "20px" }} />
          주차 불가
        </div>
        <div>
          <div
            className={styles.small_square}
            style={{ backgroundColor: "#5172FF" }}
          />
          <span style={{ paddingRight: "20px" }} />
          주차 가능
        </div>
      </div>
    </div>
  );
}

export default ParkingLot;
