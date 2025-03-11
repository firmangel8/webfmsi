import { CheckCircleIcon } from "@heroicons/react/16/solid";
import ReactPlayer from "react-player";
import {
  Col,
  Row,
  Typography,
  Card,
  List,
  Skeleton,
  Input,
  notification,
  FloatButton,
  Drawer,
  Form,
  Button,
  Popconfirm,
  Divider,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import { getData, sendData, deleteData } from "../../utils/api";
import { ellipsisGenerator } from "../../utils/ui";

const { Title, Text } = Typography;

const dataDummy = [
  { key: 1, title: "John", description: "The boy with blue hat" },
  { key: 2, title: "Jean", description: "The girl with red hat" },
  { key: 3, title: "Foo", description: "The mysterious person in the class" },
  { key: 4, title: "Romeo", description: "The boy with golden hairs" },
  { key: 5, title: "Juliet", description: "The girl with golden hairs" },
];

const Gallery = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState([]);
  const [searchTextList, setSearchTextList] = useState("");

  const [isDrawer, setIsDrawer] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    getDataGallery();
    getDataDummy();
  }, []);

  const getDataDummy = () => {
    setDataList(dataDummy);
  };

  const showAlert = (status, title, description) => {
    api[status]({
      message: title,
      description: description,
    });
  };

  const getDataGallery = (isNoLoading) => {
    if (!isNoLoading) {
      setIsLoading(true);
    }

    getData("/api/natures")
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          setDataSource(resp);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  let dataSourceFiltered = dataSource.filter((item) => {
    return (
      item?.name_natures.toLowerCase().includes(searchText) ||
      item?.description.toLowerCase().includes(searchText)
    );
  });

  const handleSearchList = (e) => {
    setSearchTextList(e.toLowerCase());
  };

  let dataListFiltered = dataList.filter((item) => {
    return item?.title.toLowerCase().includes(searchTextList);
  });

  // const handleDrawer = () => {
  //   setIsDrawer(true);
  // };

  const handleDrawer = () => {
    setIsDrawer(true);
    console.log("handle drawer here");
  };

  const onCloseDrawer = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer(false);
  };

  const handleDrawerEdit = (record) => {
    setIsDrawer(true);
    setIsEdit(true);
    setIdSelected(record?.id);
    form.setFieldValue("name_natures", record?.name_natures);
    form.setFieldValue("description", record?.description);

    // filled form here
  };

  const handleSubmit = () => {
    let nameNatures = form.getFieldValue("name_natures");
    let description = form.getFieldValue("description");

    //mengirim data ke API
    let formData = new FormData();
    formData.append("name_natures", nameNatures);
    formData.append("description", description);

    let url = isEdit ? `/api/natures/${idSelected}` : "/api/natures";

    sendData(url, formData)
      .then((resp) => {
        if (resp) {
          showAlert(
            "success",
            "Data terkirim",
            "Sukses mengirim data, data tersimpan",
          );
          form.resetFields();
          getDataGallery();
          onCloseDrawer();
        } else {
          showAlert("error", "Pengiriman gagal", "Data tidak bisa disimpan");
        }
      })
      .catch((err) => {
        console.log(err);
        showAlert("error", "Pengiriman Gagal", "Data tidak dapat dikirim!");
      });
  };
  // const handleSubmit = () => {
  //   let nameNatures = form.getFieldValue("name_natures");
  //   let description = form.getFieldValue("description");

  //   let formData = new FormData();
  //   formData.append("name_natures", nameNatures);
  //   formData.append("description", description);

  //   let url = "/api/natures";
  //   sendData(url, formData)
  //     .then((resp) => {
  //       if (resp?.datas) {
  //         showAlert("success", "Data terkirim", "Data berhasil tersimpan");;
  //         getDataGallery();
  //         onCloseDrawer;
  //       } else {
  //         showAlert("error", "Gagal terkirim", "Data tidak berhasil dikirim");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       showAlert("error", "Gagal terkirim", "Koneksi ke api tidak berhasil");
  //     });
  // };

  const drawerSection = () => {
    return (
      <Drawer
        title={"Add Data"}
        onClose={onCloseDrawer}
        open={isDrawer}
        width={"680px"}
        // style={{ width: "900px" }}
        extra={
          <Button type="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        }
      >
        <ReactPlayer url="https://youtu.be/YFmV_MRSD7M?si=yInY8hPWNulesxFj" />
        <Divider />
        <Form layout="vertical" name="natures_form" form={form}>
          <Form.Item name="name_natures" label="Name of natures" required>
            <Input placeholder="eg. Mountain" />
          </Form.Item>
          <Form.Item name="description" label="Description of natures" required>
            <Input.TextArea rows={4} placeholder="eg. Mountain" />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  const confirmDelete = (record_id) => {
    let url = `/api/natures/${record_id}`;
    let params = new URLSearchParams();
    params.append("id", record_id);
    deleteData(url, params)
      .then((resp) => {
        if (resp?.status == 200) {
          showAlert("success", "Data deleted", "Data berhasil terhapus");
          getDataGallery(true);
          form.resetFields();
          onCloseDrawer();
        } else {
          showAlert("error", "Failed", "Data gagal terhapus");
        }
      })
      .catch((err) => {
        console.log(err);
        showAlert("error", "Failed", "Data gagal terhapus");
      });
  };

  let dataListFilters = dataList?.filter((item) => {
    return (
      item?.title.toLowerCase().includes(searchTextList) ||
      item?.description.toLowerCase().includes(searchTextList)
    );
  });

  return (
    <div className="layout-content">
      {contextHolder}
      <Row gutter={[24, 0]}>
        <Col xs={23} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <FloatButton
              type="primary"
              tooltip={<div>Add gallery</div>}
              icon={<PlusCircleOutlined />}
              onClick={() => handleDrawer()}
            />

            {/* {drawerSection()}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search here"
              allowClear
              size="large"
              onChange={(e) => handleSearchList(e.target.value)}
            />

            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={dataListFilters}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[{item?.title}]</Typography.Text>{" "}
                  {item?.description}
                </List.Item>
              )}
            /> */}

            <Title>Natures Gallery</Title>
            <Text style={{ fontSize: "12pt" }}>List of natures</Text>
            <Input
              prefix={<SearchOutlined />}
              placeholder="input search text"
              className="header-search"
              allowClear
              size="large"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {dataSource?.length > 0 && !isLoading ? (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
                dataSource={dataSourceFiltered ?? []}
                renderItem={(item) => (
                  <List.Item key={item?.id}>
                    <Card
                      cover={
                        <img
                          src={`${item?.url_photo}`}
                          alt="categories-image"
                        />
                      }
                      actions={[
                        <EditOutlined
                          key={item?.id}
                          onClick={() => handleDrawerEdit(item)}
                        />,
                        <SearchOutlined
                          key={item?.id}
                          onClick={() => handleDrawerEdit(item)}
                        />,
                        <Popconfirm
                          key={item?.id}
                          title="Delete the task"
                          description={`Are you sure to delete ${item?.name_natures} ?`}
                          okText="Yes"
                          onConfirm={() => confirmDelete(item?.id)}
                          cancelText="No"
                        >
                          <DeleteOutlined key={item?.id} />
                        </Popconfirm>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<CheckCircleIcon />}
                        title={
                          <Text type={searchText?.length > 0 && "danger"}>
                            {item?.name_natures}
                          </Text>
                        }
                        description={
                          <Text ellipsis={ellipsisGenerator(item?.description)}>
                            {item?.description}
                          </Text>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active />
            ) : (
              "Data tidak ada"
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
