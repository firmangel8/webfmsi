import { Col, Row, Typography, Card, Table, Divider } from "antd";
import { useEffect, useState } from "react";

import { getDataPrivate } from "../../utils/api";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Publication Year",
    dataIndex: "publication_year",
    key: "publication_year",
  },
];

const Books = () => {
  const [dataSources, setDataSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/books/read")
      .then((resp) => {
        setIsLoading(false);
        if (resp?.datas) {
          setDataSources(resp?.datas);
        } else {
          setErrMsg("Cant fetch data");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg("Data fetched failed");
        console.log(err);
      });
  };

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={23} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>Books Page</Title>
            <Text style={{ fontSize: "12pt" }}>
              Get Data list of the books. Demonstrate use JWT to retrieve the
              private endpoints.
            </Text>
            <Divider />
            <Table
              dataSource={dataSources}
              columns={columns}
              rowKey={"book_id"}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Books;
