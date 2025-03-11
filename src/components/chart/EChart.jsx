import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChartData from "./EChartData";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChartData.options}
          series={eChartData.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Stat. Transaction</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
