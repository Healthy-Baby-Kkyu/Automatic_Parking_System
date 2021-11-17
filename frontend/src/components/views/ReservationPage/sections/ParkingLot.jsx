import React, { Fragment, useState, useEffect } from "react";
import styles from "@reservationPage/ReservationPage.module.css";
import { Button, Popover } from "antd";
import { ParkingLotData } from "@monitoring/sections/ParkingLotData";

function ParkingLot({ getSelectedData, selectedFloor }) {
  const sections = ["A", "B", "C", "D", "E"];
  const states = ["Available", "Unavailable"];
  const [parkingLotData, setParkingLotData] = useState();

  const onSelected = (param, idx) => {
    getSelectedData(sections[idx] + param.slotID);
    // console.log(sections[idx] + param.slotID);
  };

  const content_available_slot = (index, param, idx) => (
    <>
      <div style={{ marginBottom: "10px" }}>- State : {states[index]}</div>
      <span style={{ paddingLeft: "60px" }} />
      <Button
        type="primary"
        size="small"
        onClick={() => onSelected(param, idx)}
      >
        Select
      </Button>
      &nbsp;
      <Button size="small">Cancel</Button>
    </>
  );
  const content_slot = (index, param) => <div>- State : {states[index]}</div>;

  const renderSwitch = (param, idx, idx2) => {
    switch (param.slot_state) {
      case "1": // 주차 가능
        return (
          <Popover
            content={() => content_available_slot(0, param, idx)}
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
  const create2DArray = (rows, columns) => {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
      arr[i] = new Array(columns);
    }
    return arr;
  };

  useEffect(() => {
    let tmp = ParkingLotData.filter((value) => value.floor === selectedFloor);
    let result = create2DArray(5, 10);
    let idx = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        result[i][j] = tmp[idx];
        idx++;
      }
    }
    setParkingLotData(result);
  }, [selectedFloor]);
  return (
    <div>
      <p />{" "}
      <table>
        <tbody>
          {parkingLotData &&
            parkingLotData.map((section, idx) => (
              <tr key={idx}>
                {parkingLotData &&
                  parkingLotData[idx].map((slot, idx2) => (
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
