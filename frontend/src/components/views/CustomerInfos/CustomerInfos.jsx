import React, { useState, useEffect } from "react";
import styles from "@/components/views/CustomerInfos/CustomerInfos.module.css";
import TitleBar from "@/components/common/TitleBar/TitleBar";
import Sider from "@sider/Sider";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import { Button, Input, Select, Form } from "antd";
import { USER_SERVER } from "@/Config.js";

function CustomerInfos() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5172FF",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const { Option } = Select;
  const [tmpData, setTmpData] = useState();
  const [listData, setListData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    console.log("Success:", values);

    if (values.search_input === "") {
      setTmpData(listData);
      return;
    }

    let car;
    let user;
    let temp_data = [];

    switch (values.search_type) {
      case "고객 ID":
        user = listData.user.filter((value) => value.user_id === values.search_input)
        car = [];
        for (let i = 0; i < user.length; i++) {
          let temp_car = listData.car.filter((value) => value.user_id === user[i].user_id);
          let temp_obj = Object.assign({}, temp_car[0]);
          car.push(temp_obj)
        }
        Object.assign(temp_data, { user }, { car });
        setTmpData(temp_data);
        setPage(0);
        break;
      case "이름":
        user = listData.user.filter((value) => value.user_name === values.search_input)
        console.log(user);
        car = [];
        for (let i = 0; i < user.length; i++) {
          let temp_car = listData.car.filter((value) => value.user_id === user[i].user_id);
          let temp_obj = Object.assign({}, temp_car[0]);
          car.push(temp_obj)
        }
        Object.assign(temp_data, { user }, { car });
        setTmpData(temp_data);
        setPage(0);
        break;
      case "차 번호":
        car = listData.car.filter((value) => value.car_number === values.search_input)
        user = [];
        for (let i = 0; i < car.length; i++) {
          let temp_user = listData.user.filter((value) => value.user_id === car[i].user_id);
          let temp_obj = Object.assign({}, temp_user[0]);
          user.push(temp_obj)
        }
        Object.assign(temp_data, { user }, { car });
        setTmpData(temp_data);
        setPage(0);
        break;
      case "차종":
        car = listData.car.filter((value) => value.car_type === values.search_input)
        user = [];
        for (let i = 0; i < car.length; i++) {
          let temp_user = listData.user.filter((value) => value.user_id === car[i].user_id);
          let temp_obj = Object.assign({}, temp_user[0]);
          user.push(temp_obj)
        }
        Object.assign(temp_data, { user }, { car });
        setTmpData(temp_data);
        setPage(0);
        break;
      case "":
        setTmpData(listData);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    fetch(`${USER_SERVER}/master/getCustomerInfos/`)
      .then((response) => response.json())
      .then((response) => {
        const findAdminInUser = response.user.find(function(item) {
          return item.user_id === "admin";
        })
        const findAdminInCar = response.car.find(function(item) {
          return item.user_id === "admin";
        })
        response.user.splice(response.user.indexOf(findAdminInUser), 1);
        response.car.splice(response.car.indexOf(findAdminInCar), 1);
        setListData(response);
        setTmpData(response);
      });
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar title_name="고객 관리" />
      <div className={styles.ls}>
        <Sider selected_key="고객 관리" />
      </div>
      <div className={styles.rs}>
        <div className={styles.subtitle}>고객 정보 조회</div>
        <div style={{ width: "900px", marginLeft: "510px", marginTop:"-10px" }}>
          <Form
            name="search-place"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="search">
              <Input.Group compact>
                <Form.Item
                  name="search_type"
                  rules={[
                    { required: true, message: "검색 종류를 설정해주세요" },
                  ]}
                >
                  <Select
                    style={{ width: "100px", marginRight: "10px", marginLeft: "65px" }}
                    onChange={handleChange}
                    placeholder="고객 ID"
                  >
                    <Option value="고객 ID">고객 ID</Option>
                    <Option value="이름">이름</Option>
                    <Option value="차 번호">차 번호</Option>
                    <Option value="차종">차종</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="search_input">
                  <Input style={{ width: "200px" }} allowClear />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: "10px" }}
                  >
                    검색
                  </Button>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.paper}>
          <div style={{ display: "flex", marginBottom: "7px" }}>
            <div style={{ fontWeight: "bold", marginRight: "5px" }}>
              검색 결과
            </div>
            <div style={{ fontWeight: "bold", color: "#0F31FE" }}>
              {tmpData && tmpData.user.length}
            </div>
            <div>명</div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">고객 ID</StyledTableCell>
                  <StyledTableCell align="left">이름</StyledTableCell>
                  <StyledTableCell align="left">차 번호</StyledTableCell>
                  <StyledTableCell align="left">차종</StyledTableCell>
                  <StyledTableCell align="left">포인트</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tmpData &&
                  tmpData.car.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.user_id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {tmpData.user[page * rowsPerPage + idx].user_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.car_number}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.car_type}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {tmpData.user[page * rowsPerPage + idx].point} P
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {tmpData && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tmpData.user.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerInfos;
