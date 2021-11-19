import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "@monitoring/Monitoring.module.css";
import { Button, Popover, message } from "antd";
import { ParkingLotData } from "@monitoring/sections/ParkingLotData";
import { USER_SERVER } from "@/Config";

function ParkingLot({ selected_floor }) {
  const history = useHistory();
  const sections = ["A", "B", "C", "D", "E"];
  const states = ["Empty", "주차 가능", "예약 완료", "주차 중"];
  const [parkingLotData, setParkingLotData] = useState();
  const [hovered, setHovered] = useState(false);

  const hide = () => {
    setHovered(false);
  };

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };

  const addParkingSlot = (item) => {
    let value = item.floor + item.section + item.slotID;
    fetch(`${USER_SERVER}/admin/addSlot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot_state: "1",
        parking_slot_id: value,
      }),
    }).then((response) => {
      console.log(response);
    });
  };

  const content_empty = (item) => (
    <div>
      <div style={{ marginBottom: "10px" }}>새 슬롯을 추가하시겠습니까?</div>
      <span style={{ paddingLeft: "80px" }} />
      <Button type="primary" size="small" onClick={() => addParkingSlot(item)}>
        Add
      </Button>
      &nbsp;
      <Button size="small" onClick={hide}>
        Cancel
      </Button>
    </div>
  );

  const clickDeleteButton = () => {
    message.info("고객 예약 내역 페이지로 이동합니다.");
    history.push("/checkReservation");
  };

  const content_slot = (index, param) => (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <div>- State : {states[index]}</div>
        <div>- Booker : user</div>
      </div>
      &nbsp;
      <Button type="primary" size="small" onClick={clickDeleteButton}>
        Delete
      </Button>
      <span style={{ paddingLeft: "60px" }} />
      <Button size="small">Cancel</Button>
    </div>
  );

  const renderSwitch = (param, idx) => {
    switch (param.slot_state) {
      case "0": // Empty
        return (
          <Popover
            content={content_empty(param)}
            title={param.section + param.slotID}
          >
            <td style={{ backgroundColor: "#F2F2F2" }}> </td>
          </Popover>
        );
      case "1": // 주차 가능
        return (
          <Popover
            content={() => content_slot(1, param)}
            title={param.section + param.slotID}
          >
            <td style={{ backgroundColor: "#BFBFBF" }}> </td>
          </Popover>
        );
      case "2": // 예약 완료
        return (
          <Popover
            content={() => content_slot(2, param)}
            title={param.section + param.slotID}
          >
            <td style={{ backgroundColor: "#E6F2FF" }}> </td>
          </Popover>
        );
      case "3": // 주차 중
        return (
          <Popover
            content={() => content_slot(3, param)}
            title={param.section + param.slotID}
          >
            <td style={{ backgroundColor: "#5172FF" }}> </td>
          </Popover>
        );
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
    let tmp = ParkingLotData.filter((value) => value.floor === selected_floor);
    let result = create2DArray(5, 10);
    let idx = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        result[i][j] = tmp[idx];
        idx++;
      }
    }
    setParkingLotData(result);
  }, [selected_floor]);

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
