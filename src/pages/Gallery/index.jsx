import {
  Col,
  Row,
  Typography,
  Card,
  List,
  Skeleton,
  Divider,
  FloatButton,
  Drawer,
  Form,
  Input,
  Button,
  Select,
  notification,
} from "antd";
const { Title, Text } = Typography;
const { Option } = Select;
import { getData, sendData } from "../../utils/api";
import { useState, useEffect } from "react";
import { CustomerServiceOutlined } from "@ant-design/icons";

const Gallery = () => {
  const [api, contextHolder] = notification.useNotification();
  const [dataSources, setDataSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [form] = Form.useForm();

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: "Notification Title",
      description: msg,
    });
  };

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

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleSubmit = () => {
    // eksekusi disini
    let nameOfNatures = form.getFieldValue("name_of_natures");
    let descriptionOfNatures = form.getFieldValue("description_of_natures");

    let endpoint = "/api/v1/natures";
    let formData = new FormData();
    formData.append("name_natures", nameOfNatures);
    formData.append("description", descriptionOfNatures);

    sendData(endpoint, formData)
      .then((resp) => {
        if (resp?.datas) {
          setIsOpenDrawer(false);
          openNotificationWithIcon("success", "Berhasil menambahkan data");
          getDataGallery();
        } else {
          openNotificationWithIcon("error", "Gagal Menambahkan data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderDrawer = () => {
    return (
      <Drawer
        width={"550px"}
        title="Form Input Natures"
        onClose={onCloseDrawer}
        open={isOpenDrawer}
        extra={
          <>
            <Button type="primary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name of natures"
            name="name_of_natures"
            rules={[{ required: true, message: "Name of natures must filled" }]}
          >
            <Input placeholder="eg. Mountain" />
          </Form.Item>
          <Form.Item
            label="Description of natures"
            name="description_of_natures"
          >
            <Input.TextArea placeholder="eg. Mountain" rows={3} />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  return (
    <div className="layout-content">
      {contextHolder}
      <FloatButton
        shape="circle"
        type="primary"
        icon={<CustomerServiceOutlined />}
        onClick={() => handleDrawer()}
      />
      {renderDrawer()}

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
