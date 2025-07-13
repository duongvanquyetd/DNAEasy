import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select, Spin, AutoComplete, Typography, Divider, Badge, Avatar, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined, CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleOutlined, QuestionCircleOutlined, FileExcelOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, ReloadOutlined, LeftOutlined, RightOutlined, CheckOutlined, PauseOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageService.css';
import { ActiveSerive, CanModifi, CreateService, DeleteService, GetALlServies, Report, SearchAndGet, UpdateService } from '../../service/service';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [form] = Form.useForm();
  const [toast, setToast] = useState(null);
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
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [modesort, setModeSort] = useState("asc")

  const [helpModal, setHelpModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [imageModal, setImageModal] = useState({ open: false, images: [], current: 0 });
  const slideshowRef = useRef(null);

  const [searchOptions, setSearchOptions] = useState([]);

  // Fetch services on component mount
  useEffect(() => {
    Report().then((response) => {
      console.log(response.data)
      setTotalservice(response.data.count)
      setTotalValue(response.data.totalamount)
      setAvaragePrice(response.data.avgamount)
      setTotalInActive(response.data.inactive)
      setTotalactive(response.data.active)
    }).catch((error) => {
      console.log("Error fetching report:", error);
      message.error('Failed to load service statistics');
    });
    console.log('ManageService component mounted');
  }, [searchQuery]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('Fetching services with params:', {
        searchQuery,
        category,
        currentPage,
        pagesize,
        active,
        sortColumn,
        modesort
      });

      try {
        const response = await SearchAndGet(
          { keywordSearch: searchQuery, keywordType: category },
          currentPage,
          pagesize,
          active,
          sortColumn,
          modesort
        );

        console.log('API Response:', response.data);
        setTotalPages(response.data.totalPages);

        const serviceList = response.data.content;

        const fullService = await Promise.all(
          serviceList.map(async (s) => {
            const canmodifile = await CanModifi(s.serviceId);
            return {
              ...s,
              canmodifi: canmodifile.data
            };
          })
        );

        setServices(fullService); // Bạn cần đảm bảo có setServices() trong state
      } catch (error) {
        console.log("Error fetching services:", error);
        message.error('Error loading data!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, category, active, sortColumn, modesort]);
  const renderPagination = (total, current, setPage) => {
    if (!total || total <= 0) return null;

    return (
      <div className="pagination" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', margin: '18px 0' }}>
        <button
          className="page-button"
          onClick={() => setPage(current - 1)}
          disabled={current === 1}
          style={{ opacity: current === 1 ? 0.5 : 1 }}
        >
          <LeftOutlined /> Previous
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            className={`page-button ${i === current ? 'active' : ''}`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => setPage(current + 1)}
          disabled={current === total}
          style={{ opacity: current === total ? 0.5 : 1 }}
        >
          Next <RightOutlined />
        </button>
      </div>
    );
  };

  function handleActive(id) {
    ActiveSerive(id).then((response) => {
      console.log("Active Successfully", response.data);
      setToast({ type: 'success', message: 'Service activated successfully!' });
      setSearchQuery((pre) => pre + " ")
      setTimeout(() => setToast(null), 1500);
    }).catch((error) => {
      console.log("Error", error)
      setToast({ type: 'error', message: 'Error activating service!' });
      setTimeout(() => setToast(null), 2000);
    })
  }

  function handleDelete(id) {
    DeleteService(id)
      .then(() => {
        setSearchQuery((pre) => pre + " ");
        setToast({ type: 'success', message: 'Service deleted successfully!' });
        setTimeout(() => setToast(null), 1500);
      })
      .catch((error) => {
        console.log("Error", error);
        setToast({ type: 'error', message: 'Error deleting service!' });
        setTimeout(() => setToast(null), 2000);
      });
  }

  function handleEdit(service) {
    setEdit(service);
    setCreateForm(true);
    form.setFieldsValue({
      serviceName: service.serviceName,
      typeService: service.typeService,
      price: service.price,
      description: service.serviceDescription,
      sampleCount: service.sample_count,
      imageUrls: service.imageUrls?.map((url, idx) => ({
        uid: `${idx}`,
        name: url.split('/').pop(),
        status: 'done',
        url: url
      })) || []
    });
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
    if (values.imageUrls && values.imageUrls.length > 0) {
      values.imageUrls.forEach(file => {
        if (file.originFileObj) {
          formdata.append("file", file.originFileObj);
        }
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
        setToast({ type: 'success', message: 'Service updated successfully!' });
        setTimeout(() => setToast(null), 1500);
      }).catch((error) => {
        console.log("Error", error.response?.data?.error)
        setToast({ type: 'error', message: 'Error updating service!' });
        setTimeout(() => setToast(null), 2000);
      })
    }
    else {
      CreateService(formdata).then((response) => {
        console.log("Create Service Succesfully ", response.data)
        setCurrentPage(totalPages)
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        setToast({ type: 'success', message: 'Service created successfully!' });
        setTimeout(() => setToast(null), 1500);
      }).catch((error) => {
        console.log("Error", error.response?.data?.error)
        setToast({ type: 'error', message: 'Error creating service!' });
        setTimeout(() => setToast(null), 2000);
      })
    }
  }

  const openImageModal = (images, idx) => {
    setImageModal({ open: true, images, current: idx });
  };

  const nextImage = () => {
    setImageModal((prev) => ({
      ...prev,
      current: (prev.current + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    setImageModal((prev) => ({
      ...prev,
      current: (prev.current - 1 + prev.images.length) % prev.images.length
    }));
  };

  useEffect(() => {
    if (imageModal.open && imageModal.images.length > 1) {
      slideshowRef.current = setInterval(() => {
        setImageModal((prev) => ({
          ...prev,
          current: (prev.current + 1) % prev.images.length
        }));
      }, 25000);
      return () => clearInterval(slideshowRef.current);
    }
    return () => { };
  }, [imageModal.open, imageModal.images.length]);

  useEffect(() => {
    if (imageModal.open) {
      document.body.classList.add('blurred-bg');
    } else {
      document.body.classList.remove('blurred-bg');
    }
    return () => document.body.classList.remove('blurred-bg');
  }, [imageModal.open]);

  // Hàm fetch gợi ý dịch vụ (giả lập, có thể thay bằng API thực tế)
  const fetchServiceSuggestions = async (value) => {
    if (!value) {
      setSearchOptions([]);
      return;
    }
    // Lọc local, có thể thay bằng gọi API
    const filtered = services
      .filter(s => s.serviceName.toLowerCase().includes(value.toLowerCase()))
      .map(s => ({ value: s.serviceName }));
    setSearchOptions(filtered);
  };

  const handleSearch = () => {
    // Thực hiện tìm kiếm với searchQuery
    setCurrentPage(1);
    // Có thể gọi API hoặc filter local tuỳ logic hiện tại
  };

  const getSortIcon = (columnName) => {
    if (sortColumn === columnName) {
      return modesort === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />;
    }
    return null;
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrls',
      key: 'image',
      width: 100,
      render: (images, record) => (
        <Avatar
          size={60}
          shape="square"
          src={images && images.length > 0 ? images[0] : "https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"}
          alt={record.serviceName}
          style={{ borderRadius: 8, cursor: 'pointer' }}
          onClick={() => images && images.length > 0 && openImageModal(images, 0)}
        />
      ),
    },
    {
      title: (
        <Space>
          <AppstoreOutlined />
          Service Name
          {getSortIcon('serviceName')}
        </Space>
      ),
      dataIndex: 'serviceName',
      key: 'name',
      sorter: true,
      render: (text) => (
        <Text strong style={{ fontSize: 14 }}>
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <FilterOutlined />
          Type
          {getSortIcon('typeService')}
        </Space>
      ),
      dataIndex: 'typeService',
      key: 'type',
      sorter: true,
      render: (text) => (
        <Tag color="blue" style={{ borderRadius: 6 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: (
        <Space>
          <TrophyOutlined />
          Sample Count
          {getSortIcon('sample_count')}
        </Space>
      ),
      dataIndex: 'sample_count',
      key: 'sampleCount',
      sorter: true,
      render: (text) => (
        <Text type="secondary">
          {text}
        </Text>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'serviceDescription',
      key: 'description',
      width: 80,
      render: (text, record) => (
        <Tooltip title="View Content">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setViewContent(record)}
            style={{ color: '#1890ff' }}
          />
        </Tooltip>
      ),
    },
    {
      title: (
        <Space>
          <DollarOutlined />
          Price (VND)
          {getSortIcon('servicePrice')}
        </Space>
      ),
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      render: (text) => (
        <Text strong style={{ color: '#52c41a' }}>
          {text?.toLocaleString('vi-VN') || ''}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      width: 100,
      render: (active) => (
        <Badge
          status={active ? 'success' : 'default'}
          text={active ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          
          {record.active && record.canmodifi ? (
            
            <Popconfirm
              title="Delete Service"
              description={
                <div>
                  <p>Are you sure you want to delete this service?</p>
                  <p style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                    "{record.serviceName}"
                  </p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    This action cannot be undone.
                  </p>
                </div>
              }
              onConfirm={() => {
                console.log("Delete confirmed for service:", record.serviceName, "ID:", record.serviceId);
                handleDelete(record.serviceId);
              }}
              onCancel={() => {
                console.log("Delete cancelled for service:", record.serviceName);
                message.info("Delete operation cancelled");
              }}
              okText="Yes, Delete"
              cancelText="Cancel"
              okType="danger"
              placement="topRight"
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                title="Delete Service"
              />
            </Popconfirm>
          ) :  !record.active && (
            <Popconfirm
              title="Activate Service"
              description={
                <div>
                  <p>Are you sure you want to activate this service?</p>
                  <p style={{ fontWeight: 'bold', color: '#52c41a' }}>
                    "{record.serviceName}"
                  </p>
                </div>
              }
              onConfirm={() => {
                console.log("Activate confirmed for service:", record.serviceName, "ID:", record.serviceId);
                handleActive(record.serviceId);
              }}
              onCancel={() => {
                console.log("Activate cancelled for service:", record.serviceName);
                message.info("Activate operation cancelled");
              }}
              okText="Yes, Activate"
              cancelText="Cancel"
              okType="primary"
              placement="topRight"
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            >
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                size="small"
                style={{ color: '#52c41a' }}
                title="Activate Service"
              />
            </Popconfirm>
          )}
         { record.canmodifi && (
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              style={{ color: '#1890ff' }}
              title="Edit Service"
              onClick={() => {
                console.log("Edit clicked for service:", record.serviceName, "ID:", record.serviceId);
                handleEdit(record);
              }}
            />

          )}

        </Space>
      ),
    },
  ];

  return (
    <div className="manage-service-main-content">
      <DynamicHeader />

      {toast && (
        <div className={`toast-notification ${toast.type === 'error' ? 'error' : ''}`}>
          {toast.message}
        </div>
      )}
      <div className="manage-header">
        <AppstoreOutlined style={{ fontSize: 38, color: '#2563eb', marginRight: 16 }} />
        <div>
          <h1 className="manage-title">Service Management</h1>
          <div className="manage-subtitle-row" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="manage-subtitle">
              Easily add, edit, search, and manage your DNA test services in a professional way.
            </div>
            <QuestionCircleOutlined
              onClick={() => setHelpModal(true)}
              style={{ color: '#2563eb', fontSize: 22, cursor: 'pointer', transition: 'color 0.2s' }}
              className="subtitle-help-icon"
              title="User Guide"
            />
          </div>
        </div>
      </div>
      <div className="service-stats-row">
        <div className="service-stat-card stat-center">
          <AppstoreOutlined className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">TOTAL SERVICES</span>
            <span className="stat-value">{totalServices}</span>
          </div>
        </div>
        <div className="service-stat-card stat-center">
          <CheckCircleTwoTone twoToneColor="#52c41a" className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">ACTIVE</span>
            <span className="stat-value">{totalactive}</span>
          </div>
        </div>
        <div className="service-stat-card stat-center">
          <CloseCircleTwoTone twoToneColor="#ff4d4f" className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">INACTIVE</span>
            <span className="stat-value">{totalinactive}</span>
          </div>
        </div>
        <div className="service-stat-card stat-center">
          <DollarOutlined className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">TOTAL VALUE</span>
            <span className="stat-value">{Number(totalValue).toLocaleString('vi-VN', { maximumFractionDigits: 0 })} <span className="stat-unit">VND</span></span>
          </div>
        </div>
        <div className="service-stat-card stat-center">
          <TrophyOutlined className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">AVG PRICE</span>
            <span className="stat-value">{Number(averagePrice).toLocaleString('vi-VN', { maximumFractionDigits: 0 })} <span className="stat-unit">VND</span></span>
          </div>
        </div>
      </div>
      <div className="stats-divider"></div>
      {/* Filter and Action Row */}
      <div className="filter-action-row">
        <form className="searchBar" onSubmit={(e) => { e.preventDefault(); handleSearch(); }} >
          <AutoComplete
            options={searchOptions}
            value={searchQuery}
            onSelect={val => { setSearchQuery(val); setCurrentPage(1); handleSearch(); }}
            onSearch={fetchServiceSuggestions}
            onChange={val => { setSearchQuery(val); setCurrentPage(1); fetchServiceSuggestions(val); }}
            style={{ width: 300 }}
          >
            <Input
              placeholder="What are you looking for?"
              allowClear
              style={{
                borderRadius: 30,
                background: '#fff',
                color: '#222',
                border: '1.5px solid #e0e7ef',
                boxShadow: '0 2px 12px rgba(30,58,138,0.04)'

              }}
              suffix={
                <SearchOutlined
                  style={{ color: '#2563eb', fontSize: 22, cursor: 'pointer' }}
                  onClick={handleSearch}
                />
              }
            />
          </AutoComplete>
          <select name="category" aria-label="Select category" onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="">All Services</option>
            <option value="civil">Civil Services</option>
            <option value="legal">Legal Services</option>
          </select>
          <Tooltip title="Reset sorting">
            <button
              type="button"
              onClick={() => { setSortColumn(null); setModeSort('asc'); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: 22,
                margin: '0 8px',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                outline: 'none'
              }}
              tabIndex={0}
            >
              <ReloadOutlined />
            </button>
          </Tooltip>
          <button className="primary-btn small-btn" onClick={() => setCreateForm(true)} type="button">
            <PlusOutlined style={{ fontSize: '1rem', marginRight: 6 }} />
            Create Service
          </button>
          <button className={`filter-btn small-btn ${active ? 'active' : ''}`} onClick={() => {
            console.log('Active button clicked, setting active to true');
            setActive(true);
            setCurrentPage(1);
          }} type="button">
            <CheckOutlined style={{ fontSize: '1rem', marginRight: 6 }} />
            Active Service
            <span className="badge small-badge">{totalactive}</span>
          </button>
          <button className={`filter-btn small-btn ${!active ? 'inactive' : ''}`} onClick={() => {
            console.log('Inactive button clicked, setting active to false');
            setActive(false);
            setCurrentPage(1);
          }} type="button">
            <PauseOutlined style={{ fontSize: '1rem', marginRight: 6 }} />
            Inactive Service
            <span className="badge small-badge">{totalinactive}</span>
          </button>
        </form>
      </div>
      {/* End filter-action-row */}

      <div className="pagination-desc" style={{ textAlign: 'center', color: '#64748b', marginBottom: 8 }}>
        Page {currentPage} of {totalPages || 0}. Each page shows up to {pagesize} services.
      </div>

      <Spin spinning={loading} tip="Loading data...">
        <Card>
          <Table
            columns={columns}
            dataSource={services || []}
            rowKey="serviceId"
            loading={loading}
            pagination={false}
            locale={{
              emptyText: (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                    {active ? 'No active services found' : 'No inactive services found'}
                  </p>
                  <p style={{ fontSize: '14px', color: '#999' }}>
                    Try adjusting your search criteria or create a new service.
                  </p>
                </div>
              )
            }}
            onChange={(pagination, filters, sorter) => {
              if (sorter.field) {
                setSortColumn(sorter.field === 'price' ? 'servicePrice' : sorter.field);
                setModeSort(sorter.order === 'ascend' ? 'asc' : 'desc');
              }
            }}
            scroll={{ x: 800 }}
          />

          {totalPages > 1 && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              {renderPagination(totalPages, currentPage, setCurrentPage)}
            </div>
          )}
        </Card>
      </Spin>
      <div>
        <Modal
          title={edit ? "Edit Service" : "Create New Service"}
          open={createform}
          onCancel={() => {
            setCreateForm(false);
            form.resetFields();
            setEdit(false);
          }}
          width={1000}
          onOk={() => form.submit()}
          okText={edit ? "Edit" : "Create"}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
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
                placeholder="Input service description..."
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
          </Form>
        </Modal>
        <Modal
          title={
            <h2 style={{ color: '#1890ff', margin: 0 }}>
              {viewContent?.serviceName}
            </h2>
          }
          open={!!viewContent}
          onCancel={() => setViewContent(null)}
          footer={null}
          width={1000}
          bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          <p style={{ whiteSpace: 'pre-line', fontSize: '18px', lineHeight: '1.8' }}>
            {viewContent?.serviceDescription}
          </p>
        </Modal>

        <Modal
          open={helpModal}
          onCancel={() => setHelpModal(false)}
          footer={null}
          title={<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><QuestionCircleOutlined style={{ color: '#2563eb', fontSize: 24 }} />Service Management Guide</span>}
          className="help-modal-custom"
        >
          <ul style={{ textAlign: 'left', fontSize: '1.08rem', lineHeight: '1.7', margin: '18px 0' }}>
            <li><b>Create service:</b> Click <span style={{ color: '#2563eb' }}>Create Service</span> to add a new service.</li>
            <li><b>Filter & search:</b> Use the search box and filters to quickly find services.</li>
            <li><b>Edit/Delete:</b> Click the <EditOutlined style={{ color: '#2563eb' }} /> or <DeleteOutlined style={{ color: '#dc2626' }} /> icon to edit/delete a service (with confirmation).</li>
            <li><b>Help:</b> Click <QuestionCircleOutlined style={{ color: '#2563eb' }} /> to view this guide at any time.</li>
          </ul>
        </Modal>

        <Modal
          className="service-image-modal"
          open={imageModal.open}
          onCancel={() => setImageModal({ open: false, images: [], current: 0 })}
          footer={null}
          width={900}
          centered
          bodyStyle={{ textAlign: 'center', padding: 0, background: 'transparent' }}
          closable={false}
        >
          {imageModal.images.length > 0 && (
            <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
              <img
                src={imageModal.images[imageModal.current]}
                alt="service"
                style={{
                  maxWidth: '100%',
                  maxHeight: 500,
                  objectFit: 'contain',
                  borderRadius: 12,
                  background: 'transparent',
                  margin: '0 auto',
                  display: 'block',
                  border: 'none'
                }}
              />
              <button
                className="custom-close-btn"
                onClick={() => setImageModal({ open: false, images: [], current: 0 })}
                aria-label="Close"
              >
                <span style={{ fontSize: 32, color: '#222', fontWeight: 700, lineHeight: 1 }}>×</span>
              </button>
              {imageModal.images.length > 1 && (
                <>
                  <button
                    onClick={() => { clearInterval(slideshowRef.current); prevImage(); }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(37,99,235,0.18)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      fontSize: 26,
                      cursor: 'pointer',
                      zIndex: 2,
                      boxShadow: '0 2px 8px #2563eb44',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.18)'}
                    aria-label="Previous image"
                  >&#8592;</button>
                  <button
                    onClick={() => { clearInterval(slideshowRef.current); nextImage(); }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(37,99,235,0.18)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      fontSize: 26,
                      cursor: 'pointer',
                      zIndex: 2,
                      boxShadow: '0 2px 8px #2563eb44',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.18)'}
                    aria-label="Next image"
                  >&#8594;</button>
                </>
              )}
              {/* Số thứ tự ảnh */}
              <div style={{
                margin: '18px 0 8px 0',
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                textAlign: 'center',
                textShadow: '0 2px 8px #000a'
              }}>
                {imageModal.current + 1} / {imageModal.images.length}
              </div>
              {/* Thumbnails */}
              <div className="thumbnail-row" style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 14,
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxWidth: 738,
                margin: '0 auto',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '12px 0',
                boxShadow: '0 2px 12px #0002',
                overflowX: 'auto',
                scrollbarWidth: 'thin'
              }}>
                {imageModal.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    onClick={() => { clearInterval(slideshowRef.current); setImageModal((prev) => ({ ...prev, current: idx })); }}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: idx === imageModal.current ? '3px solid #2563eb' : '2px solid #fff',
                      boxShadow: idx === imageModal.current ? '0 0 12px #2563eb88, 0 2px 8px #2563eb22' : '0 1px 4px #0002',
                      cursor: 'pointer',
                      opacity: idx === imageModal.current ? 1 : 0.7,
                      transition: 'all 0.2s',
                      background: idx === imageModal.current ? '#e0e7ff' : '#23272f'
                    }}
                    onMouseOver={e => e.currentTarget.style.border = '3px solid #60a5fa'}
                    onMouseOut={e => e.currentTarget.style.border = idx === imageModal.current ? '3px solid #2563eb' : '2px solid #fff'}
                  />
                ))}
              </div>
            </div>
          )}
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default ManageService;