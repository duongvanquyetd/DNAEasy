// filepath: d:\ki 5\SWPBP\DNAEasy\FrontEnd_DNAEasy\src\component\page\ManageService.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined } from '@ant-design/icons';
import Header from '../Header';
import Footer from '../Footer';
import '../css/ManageService.css';
import { useNavigate } from 'react-router-dom';
import { GetALlServies, getServiceById } from '../../service/service';//, createService, updateService, deleteService

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fetch services on component mount
  useEffect(() => {
    console.log('ManageService component mounted');
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await GetALlServies();
      console.log('Services fetched:', response.data);
      if (response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      message.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalServices = services.length;
  const totalValue = services.reduce((sum, service) => sum + (service.price || 0), 0);
  const averagePrice = totalServices > 0 ? totalValue / totalServices : 0;
  const premiumServices = services.filter(service => (service.price || 0) > 1000000).length;

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
          }} />
          <span style={{ fontWeight: 600, color: '#333' }}>{text}</span>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.serviceName.toLowerCase().includes(value.toLowerCase()) ||
        record.type.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag 
          color="blue" 
          style={{ 
            borderRadius: '6px', 
            fontWeight: 500,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white'
          }}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <span style={{ fontWeight: 600, color: '#52c41a' }}>
            {new Intl.NumberFormat('vi-VN').format(price)}
          </span>
        </div>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag 
          color="green" 
          style={{ 
            borderRadius: '6px', 
            fontWeight: 500,
            background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
            border: 'none',
            color: 'white'
          }}
        >
          Active
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              style={{ color: '#667eea' }}
            />
          </Tooltip>
          <Tooltip title="Edit Service">
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              size="small"
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete Service">
            <Button 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              size="small"
            >
              Delete
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    console.log('Add button clicked');
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
      await deleteService(id);
      message.success('Service deleted successfully');
      setServices(services.filter(service => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
      message.error('Failed to delete service');
    }
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          if (editingService) {
            // Update existing service
            const response = await updateService(editingService.id, values);
            if (response.data) {
              const updatedService = response.data;
              setServices(services.map(service => 
                service.id === editingService.id ? updatedService : service
              ));
              message.success('Service updated successfully');
            }
          } else {
            // Create new service
            const response = await createService(values);
            if (response.data) {
              const newService = response.data;
              setServices([...services, newService]);
              message.success('Service created successfully');
            }
          }
          setIsModalVisible(false);
          form.resetFields();
        } catch (error) {
          console.error('Error saving service:', error);
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
        <div className="debug-text">
          Service Management Dashboard
        </div>
        
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px'
              }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Total Services</span>}
                value={totalServices}
                prefix={<AppstoreOutlined style={{ color: '#667eea' }} />}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px'
              }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Total Value</span>}
                value={totalValue}
                prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                formatter={(value) => new Intl.NumberFormat('vi-VN').format(value)}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px'
              }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Average Price</span>}
                value={averagePrice}
                prefix={<DollarOutlined style={{ color: '#faad14' }} />}
                formatter={(value) => new Intl.NumberFormat('vi-VN').format(Math.round(value))}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px'
              }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Premium Services</span>}
                value={premiumServices}
                prefix={<TrophyOutlined style={{ color: '#ff6b6b' }} />}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>

        <div className="manage-service-header debug-header">
          <h1>Manage Services</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="add-service-btn"
          >
            Add New Service
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={services}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} services`,
          }}
        />

        <Modal
          title={editingService ? "Edit Service" : "Add New Service"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
          width={800}
          okText={editingService ? "Update" : "Create"}
          cancelText="Cancel"
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="serviceName"
                  label="Service Name"
                  rules={[{ required: true, message: 'Please input the service name!' }]}
                >
                  <Input placeholder="Enter service name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please input the type!' }]}
                >
                  <Input placeholder="Enter service type" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="price"
              label="Price (VND)"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber
                className="full-width-input"
                placeholder="Enter price"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={0}
              />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter service description" />
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
                  <div className="upload-text">Upload</div>
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