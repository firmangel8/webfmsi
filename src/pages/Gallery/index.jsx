import { Col, Row, Typography, Card, List, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { getData } from "../../utils/api";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const { Title, Text } = Typography;

const Gallery = () => {
  const [dataSources, setDataSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataNatures();
  }, []);

  const getDataNatures = () => {
    setIsLoading(true);
    getData("/api/v1/natures")
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          setDataSources(resp);
        } else {
          console.log("cant fetch data");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={23} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>List of Natures</Title>
            <Text style={{ fontSize: "12pt" }}>Add content here..</Text>
            {dataSources?.length > 0 && !isLoading ? (
              <List
                grid={{ gutter: 16, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                dataSource={dataSources ?? []}
                renderItem={(item) => (
                  <List.Item key={item?.id}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={item?.url_photo} />}
                    >
                      <Card.Meta
                        title={item?.name_natures}
                        description={item?.description}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active />
            ) : (
              "tidak ada data"
            )}

            {/* {dataSources?.length > 0 && !isLoading ? (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
                dataSource={dataSources ?? []}
                renderItem={(item) => (
                  <List.Item key={item?.id}>
                    <Card
                      cover={
                        <img
                          src={`${item?.url_photo}`}
                          alt="categories-image"
                        />
                      }
                    >
                      <Card.Meta
                        avatar={<CheckCircleIcon />}
                        title={<Text>{item?.name_natures}</Text>}
                        description={<Text>{item?.description}</Text>}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active />
            ) : (
              "Data tidak ada"
            )} */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
