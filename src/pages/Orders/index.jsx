import { Col, Row, Typography, Card, Table } from "antd";
const { Title, Text } = Typography;

const dataAnnual = [
  {
    product: "Bag",
    qty: 1200,
    total: 1200000,
  },
  {
    product: "Shoes",
    qty: 2400,
    total: 2400000,
  },
];

const dataMonthly = [
  {
    product: "Bag",
    qty: 100,
    total: 100000,
  },
  {
    product: "Shoes",
    qty: 200,
    total: 200000,
  },
];

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

const Orders = () => {
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col sm={12} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>Annual Orders</Title>
            <Text style={{ fontSize: "12pt" }}>Data orders in annual..</Text>
            <Table dataSource={dataAnnual} columns={columns} />
          </Card>
        </Col>
        <Col sm={12} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>Monthly Orders</Title>
            <Text style={{ fontSize: "12pt" }}>Data Orders in monthly..</Text>
            <Table dataSource={dataMonthly} columns={columns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Orders;
