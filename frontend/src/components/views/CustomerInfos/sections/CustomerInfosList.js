function createData(customerID, name, carNumber, carType, point) {
  return { customerID, name, carNumber, carType, point };
}

export const rows = [
  createData("aaa", "김건우", "12가 3456", "경차", 250),
  createData("bbb", "강동연", "78나 9101", "소형차", 200),
  createData("ccc", "강혜원", "11다 1213", "중형차", 5000),
  createData("ddd", "이태규", "14라 1516", "대형차", 400),
  createData("eee", "장수아", "18마 1920", "경차", 1200),
];
