function createData(customerID, name, carNumber, carType, point, totalFee) {
    return { customerID, name, carNumber, carType, point, totalFee };
}

export const rows = [
    createData('aaa', '김건우', '12가 3456', '경차', 250, 25000),
    createData('bbb', '강동연', '78나 9101', '소형차', 200, 1000),
    createData('ccc', '강혜원', '11다 1213', '중형차', 5000, 55000),
    createData('ddd', '이태규', '14라 1516', '대형차', 400, 36000),
    createData('eee', '장수아', '18마 1920', '경차', 1200, 22000),
];