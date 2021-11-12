import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5172FF",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function createData(customerID, name, carNumber, carType, point, totalFee) {
    return { customerID, name, carNumber, carType, point, totalFee };
}

const rows = [
    createData('aaa', '김건우', '12가 3456', '경차', 250, 25000),
    createData('bbb', '강동연', '78나 9101', '소형차', 200, 1000),
    createData('ccc', '강혜원', '11다 1213', '중형차', 5000, 55000),
    createData('ddd', '이태규', '14라 1516', '대형차', 400, 36000),
    createData('eee', '장수아', '18마 1920', '경차', 1200, 22000),
];

function CustomerInfosTable() {
    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">고객 ID</StyledTableCell>
                        <StyledTableCell align="left">이름</StyledTableCell>
                        <StyledTableCell align="left">차 번호</StyledTableCell>
                        <StyledTableCell align="left">차종</StyledTableCell>
                        <StyledTableCell align="left">포인트</StyledTableCell>
                        <StyledTableCell align="left">누적 이용금액</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.customerID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.customerID}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.carNumber}</StyledTableCell>
                            <StyledTableCell align="left">{row.carType}</StyledTableCell>
                            <StyledTableCell align="left">{row.point} P</StyledTableCell>
                            <StyledTableCell align="left">{row.totalFee} 원</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomerInfosTable
