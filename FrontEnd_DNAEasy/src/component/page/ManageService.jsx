// filepath: d:\ki 5\SWPBP\DNAEasy\FrontEnd_DNAEasy\src\component\page\ManageService.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Header from '../Header';
import Footer from '../Footer';
import '../css/ManageService.css';

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => new Intl.NumberFormat('vi-VN').format(price),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Add your delete API call here
      message.success('Service deleted successfully');
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      message.error('Failed to delete service');
    }
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          if (editingService) {
            // Add your update API call here
            const updatedService = { ...editingService, ...values };
            setServices(services.map(service => 
              service.id === editingService.id ? updatedService : service
            ));
            message.success('Service updated successfully');
          } else {
            // Add your create API call here
            const newService = { 
              id: Date.now(),
              ...values
            };
            setServices([...services, newService]);
            message.success('Service created successfully');
          }
          setIsModalVisible(false);
        } catch (error) {
          message.error('Operation failed');
        } finally {
          setLoading(false);
        }
      });
  };

  return (
    <div className="manage-service">
      <Header />
      <div className="manage-service-content">
        <div className="manage-service-header">
          <h1>Manage Services</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add New Service
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={services}
          rowKey="id"
          loading={loading}
        />

        <Modal
          title={editingService ? "Edit Service" : "Add New Service"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[{ required: true, message: 'Please input the service name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please input the type!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price (VND)"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="images"
              label="Images"
            >
              <Upload
                listType="picture-card"
                multiple
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default ManageService;