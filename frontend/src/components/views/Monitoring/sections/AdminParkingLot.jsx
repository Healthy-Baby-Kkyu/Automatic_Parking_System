import React, { Fragment, useState } from "react";
import styles from "@monitoring/Monitoring.module.css";
import { Button, Popover } from "antd";
import { parkingLotData } from "@monitoring/sections/ParkingLotData";

function ParkingLot() {
  const sections = ["A", "B", "C", "D", "E"];
  const states = ["Empty", "주차 가능", "예약 완료", "주차 중"];

  const content_empty = (
    <div>
      <p>새 슬롯을 추가하시겠습니까?</p>
      <span style={{ paddingLeft: "80px" }} />
      <Button type="primary" size="small">
        Add
      </Button>
      &nbsp;
      <Button size="small">Cancel</Button>
    </div>
  );

  const content_slot = (index, param) => (
    <div>
      <p>
        <div>- State : {states[index]}</div>
        <div>- Booker : user</div>
      </p>
      <Button type="primary" size="small">
        Edit
      </Button>
      &nbsp;
      <Button type="primary" size="small">
        Delete
      </Button>
      <span style={{ paddingLeft: "60px" }} />
      <Button size="small">Cancel</Button>
    </div>
  );

  const renderSwitch = (param, idx) => {
    switch (param.state) {
      case "0": // Empty
        return (
          <Popover content={content_empty} title={sections[idx] + param.slotID}>
            <td style={{ backgroundColor: "#F2F2F2" }}> </td>
          </Popover>
        );
      case "1": // 주차 가능
        return (
          <Popover
            content={() => content_slot(1, param)}
            title={sections[idx] + param.slotID}
          >
            <td style={{ backgroundColor: "#BFBFBF" }}> </td>
          </Popover>
        );
      case "2": // 예약 완료
        return (
          <Popover
            content={() => content_slot(2, param)}
            title={sections[idx] + param.slotID}
          >
            <td style={{ backgroundColor: "#E6F2FF" }}> </td>
          </Popover>
        );
      case "3": // 주차 중
        return (
          <Popover
            content={() => content_slot(3, param)}
            title={sections[idx] + param.slotID}
          >
            <td style={{ backgroundColor: "#5172FF" }}> </td>
          </Popover>
        );
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
          주차 가능
        </div>
        <div>
          <div
            className={styles.small_square}
            style={{ backgroundColor: "#E6F2FF" }}
          />
          <span style={{ paddingRight: "20px" }} />
          예약 완료
        </div>
        <div>
          <div
            className={styles.small_square}
            style={{ backgroundColor: "#5172FF" }}
          />
          <span style={{ paddingRight: "20px" }} />
          주차 중
        </div>
        <div>
          <div
            className={styles.small_square}
            style={{ backgroundColor: "#F2F2F2" }}
          />
          <span style={{ paddingRight: "20px" }} />
          Empty
        </div>
      </div>
    </div>
  );
}

export default ParkingLot;
