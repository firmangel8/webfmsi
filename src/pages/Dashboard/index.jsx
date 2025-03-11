import { Col, Row, Typography, Card, Flex, Table } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import {
  CoffeeOutlined,
  IdcardOutlined,
  ProductOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Divider } from "antd/lib";
import EChart from "../../components/chart/Echart";
import { formatCurrency } from "../../utils/math";
const { Title, Text } = Typography;

const dataSource = [
  {
    key: "Jan",
    months: "Jan",
    orders: 1200,
    total_income: 1200000,
  },
  {
    key: "Feb",
    months: "Feb",
    orders: 3000,
    total_income: 1000000,
  },
  {
    key: "Mar",
    months: "Mar",
    orders: 5000,
    total_income: 5000000,
  },
  {
    key: "Apr",
    months: "Apr",
    orders: 3000,
    total_income: 1000000,
  },
  {
    key: "May",
    months: "May",
    orders: 3000,
    total_income: 3000000,
  },
  {
    key: "June",
    months: "June",
    orders: 5000,
    total_income: 5000000,
  },
];

const columns = [
  {
    title: "Month",
    dataIndex: "months",
    key: "months",
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
    render: (value, record) => formatCurrency(record?.orders),
  },
  {
    title: "Total Income.",
    dataIndex: "total_income",
    key: "total_income",
    render: (value, record) => formatCurrency(record?.total_income),
  },
];

function Dashboard() {
  const cardDashboard = (icon, label, value) => {
    return (
      <div>
        <Flex align="center">
          <div style={{ marginRight: "15px" }}>{icon}</div>
          <div>
            <Title level={1} type={"primary"} style={{ marginBottom: 0 }}>
              {value}
            </Title>
            <Text type="secondary">{label}</Text>
          </div>
        </Flex>
      </div>
    );
  };
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} sm={24} lg={12} xl={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <Flex justify="flex-start">
              {cardDashboard(
                <UnorderedListOutlined
                  style={{ fontSize: "64px", color: "#47c363" }}
                />,
                "Categories",
                3,
              )}
              <div style={{ marginRight: "150px" }}></div>
              {cardDashboard(
                <IdcardOutlined
                  style={{ fontSize: "64px", color: "#fc544b" }}
                />,
                "Members",
                24,
              )}
            </Flex>
            <Divider />
            <Flex justify="flex-start">
              {cardDashboard(
                <ShoppingCartOutlined
                  style={{ fontSize: "64px", color: "#6777ef" }}
                />,
                "Orders",
                120,
              )}
              <div style={{ marginRight: "150px" }}></div>
              {cardDashboard(
                <ProductOutlined
                  style={{ fontSize: "64px", color: "#3abaf4" }}
                />,
                "Products",
                24,
              )}
            </Flex>
            <Divider />
            <Flex justify="flex-start">
              {cardDashboard(
                <TagsOutlined style={{ fontSize: "64px", color: "#ffa426" }} />,
                "Discounts",
                120,
              )}
              <div style={{ marginRight: "150px" }}></div>
              {cardDashboard(
                <CoffeeOutlined style={{ fontSize: "64px", color: "#000" }} />,
                "Charges",
                24,
              )}
            </Flex>
            <Divider />
            <div className="h-full col-content p-20">
              <div className="ant-muse">
                <Text>Built by SIFORS dev. teams</Text>
                <Title level={5}>
                  Content Management Systems by WebfmSI.com
                </Title>
                <Paragraph className="lastweek mb-36">
                  See the progress graph from your store.
                </Paragraph>
              </div>
              <div className="card-footer">
                <a className="icon-move-right" href="/finance" target="_blank">
                  Also you able to see the Finance Reporting
                  {<RightOutlined />}
                </a>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12} sm={24} lg={12} xl={12} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <EChart />
            <Divider />
            <Table
              size="small"
              dataSource={dataSource}
              columns={columns}
              pagination={{
                pageSize: 3,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
