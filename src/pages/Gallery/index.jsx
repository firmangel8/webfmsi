import { Col, Row, Typography, Card, List, Skeleton, Divider } from "antd";
const { Title, Text } = Typography;
import { getData } from "../../utils/api";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [dataSources, setDataSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataGallery();
  }, []);

  const getDataGallery = () => {
    setIsLoading(true);
    getData("/api/v1/natures")
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          setDataSources(resp);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={23} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>List of The Natures</Title>
            <Text style={{ fontSize: "12pt" }}>Add content here..</Text>
            <Divider />
            {isLoading && dataSources?.length <= 0 ? (
              <Skeleton active />
            ) : (
              <List
                grid={{ gutter: 16, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
                dataSource={dataSources}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      hoverable
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
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
