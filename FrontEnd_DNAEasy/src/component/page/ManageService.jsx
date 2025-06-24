
import React, { useState, useEffect, use } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageService.css';
import { useNavigate } from 'react-router-dom';
import { ActiveSerive, CreateService, DeleteService, GetALlServies, getServiceById, Report, SearchAndGet, UpdateService } from '../../service/service';//, createService, updateService, deleteService

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [form] = Form.useForm();
  const [totalServices, setTotalservice] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [averagePrice, setAvaragePrice] = useState('');
  const [totalactive, setTotalactive] = useState('');
  const [totalinactive, setTotalInActive] = useState('')
  const [createform, setCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [edit, setEdit] = useState(false)
  const [error, setError] = useState('');
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);


  // Fetch services on component mount
  useEffect(() => {


    Report().then((response) => {
      console.log(response.data)
      setTotalservice(response.data.count)
      setTotalValue(response.data.totalamount)
      setAvaragePrice(response.data.avgamount)
      setTotalInActive(response.data.inactive)
      setTotalactive(response.data.active)
    })
    console.log('ManageService component mounted');

  }, []);

  useEffect(() => {

    SearchAndGet({ keywordSearch: searchQuery, keywordType: category }, currentPage, pagesize, active).then((response) => {
      setTotalPages(response.data.totalPages)
      setServices(response.data.content)
      console.log("Response", response.data)
    }).catch((error) => {
      console.log("Error", error)
    })


  }, [currentPage, searchQuery, category, active])
  const renderPagination = (total, current, setPage) => (
    <div className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`page-button ${i === current ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );


  function handleActive(id) {
    ActiveSerive(id).then((response) => {
      console.log("Acctive Successfully", response.data);
      setSearchQuery((pre) => pre + " ")
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  function handleDelete(id) {
    DeleteService(id).then((response) => {
      console.log("Delete SuccessFully", response.data)
      setSearchQuery((pre) => pre + " ")
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  function handleCreateAndEdit(values) {

    const formdata = new FormData();
    const createService = {

      serviceName: values.serviceName,
      serviceDescription: values.description,
      servicePrice: values.price,
      typeService: values.typeService,
      sample_count: values.sampleCount

    }
    formdata.append("service", new Blob([JSON.stringify(createService)], { type: "application/json" }))
    if (values.imageUrls) {
      values.imageUrls.forEach(file => {
        formdata.append("file", file.originFileObj); // vi dung thu vien ant nen .originFileObj moi la File that su duoi BE moi nhan dc
      });
    }
    console.log("Create data", createService)
    console.log("Image service", values.imageUrls)
    if (edit) {

      formdata.append("removeimg", new Blob([JSON.stringify(removeUrls)], { type: "application/json" }))
      UpdateService(edit.serviceId, formdata).then((response) => {
        console.log("Update SuccessFully ", response.data)
        setEdit(false);
        setSearchQuery((pre) => pre + " ")
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        setError('');

      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
        setError(error.response?.data?.error)
      })
    }
    else {
      CreateService(formdata).then((response) => {
        console.log("Create Service Succesfully ", response.data)
        setCurrentPage(totalPages)
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        setError('');
      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
        setError(error.response?.data?.error)
      })
    }


  }
  return (
    <div>
      <div>
        <p> Total Service:{totalServices}</p>
        <p>Total Service Active:{totalactive}</p>
        <p>Total Service InActive:{totalinactive}</p>
        <p>TotalPrice:{averagePrice}VND</p>
        <p>AvragePrice:{totalValue}VND</p>

      </div>
      <section className="filterSection">
        <form className="searchBar" onSubmit={(e) => { e.preventDefault(); }} >
          <input type="text" placeholder="What are you looking for?" value={searchQuery.trim()} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }} aria-label="Search services" />
          <select name="category" aria-label="Select category" onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="">All Services</option>
            <option value="civil">Civil Services</option>
            <option value="legal">Legal Services</option>
          </select>
          <button type="submit" className="searchBtn" aria-label="Search">Search</button>
        </form>
      </section>

      <button onClick={() => { setActive(true), setCurrentPage(1) }}>Active Service</button>
      <button onClick={() => { setActive(false), setCurrentPage(1) }}>InActive Service</button>


      <button onClick={() => setCreateForm(true)}>Create Service  </button>
      {
        services && services.length > 0 && (
          <table className="service-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Service Name</th>
                <th>Type</th>
                <th>Number Sample</th>
                <th>Description</th>
                <th>Price (VND)</th>
                <th>Action</th>

                {/* Thêm các cột khác nếu cần */}
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr key={service.serviceId || idx}>
                  <td>
                    {service.imageUrls && service.imageUrls.length > 0 ? (
                      <img
                        src={service.imageUrls[0]}
                        alt={service.serviceName}
                        style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }}
                      />
                    ) : (
                      <img
                        src="https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                        alt="default"
                        style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, opacity: 0.5 }}
                      />
                    )}
                  </td>
                  <td>{service.serviceName}</td>
                  <td>{service.typeService}</td>
                  <td>{service.sample_count}</td>
                  <td>
                    <Tooltip title="View Conten">
                      <EyeOutlined onClick={() => setViewContent(service)} style={{ cursor: 'pointer', fontSize: 18 }} />
                    </Tooltip>
                  </td>

                  <td>{service.price?.toLocaleString('vi-VN') || ''}</td>
                  <td>
                    {service.active ? (
                      <button onClick={() => handleDelete(service.serviceId)
                      } >delete</button>

                    ) : (
                      <button onClick={() => handleActive(service.serviceId)}>Active</button>

                    )}

                    <button onClick={() => {
                      setEdit(service);
                      setCreateForm(true);
                      form.setFieldsValue({
                        serviceName: service.serviceName,
                        typeService: service.typeService,
                        price: service.price,
                        description: service.serviceDescription,
                        sampleCount: service.sample_count,
                        imageUrls: service.imageUrls.map((url, idx) => ({
                          uid: `${idx}`,
                          name: url.split('/').pop(),
                          status: 'done',
                          url: url
                        }))
                      });
                    }}>Edit</button>

                  </td>
                  {/* Thêm các trường khác nếu cần */}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      <Modal
        title={edit ? "Edit Service " : "Create New Service"}
        visible={createform}
        onCancel={() => {
          setCreateForm(false);
          form.resetFields();
          setEdit(false);
          setError('');
        }}
        width={1000}
        onOk={() => form.submit()} // Khi bấm OK thì gửi form
        okText={edit ? "Edit" : "Create"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log("Form data:", values);
            handleCreateAndEdit(values);
          }}
        >

          <Form.Item
            label="Service Name"
            name="serviceName"
            rules={[{ required: true, message: 'Please enter the service name' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Type of Service"
            name="typeService"
            rules={[{ required: true, message: 'Please select the type' }]}
          >
            <Select placeholder="Select a type">
              <Select.Option value="civil">Civil</Select.Option>
              <Select.Option value="legal">Legal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Price (VND)"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea
              rows={6}
              autoSize={{ minRows: 6, maxRows: 20 }}
              maxLength={5000}
              showCount
              placeholder="Input Description Service....."
            />
          </Form.Item>

          <Form.Item
            label="Sample Count"
            name="sampleCount"
            rules={[{ required: true, message: 'Please enter sample count' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Upload Images"
            name="imageUrls"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            rules={[{ required: !edit ? true : false, message: 'Please upload at least one image' }]}
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
              onRemove={(file) => {
                if (!file.originFileObj) {
                  setRemovedUrls(prev => [...prev, file.url]);
                }
                return true;
              }}
            >
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            </Upload>


          </Form.Item>
          {error && (
            <Form.Item>
              <div style={{ color: 'red' }}>{error}</div>
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title={
          <h2 style={{ color: '#1890ff', margin: 0 }}>
            {viewContent?.serviceName}
          </h2>
        }
        visible={!!viewContent}
        onCancel={() => setViewContent(null)}
        footer={null}
        width={1000}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <p style={{ whiteSpace: 'pre-line', fontSize: '18px', lineHeight: '1.8' }}>
          {viewContent?.serviceDescription}
        </p>
      </Modal>

      {renderPagination(totalPages, currentPage, setCurrentPage)}
    </div >
  );
};

export default ManageService;