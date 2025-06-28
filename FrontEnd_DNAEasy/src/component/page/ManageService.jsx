import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select, Spin, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined, CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleOutlined, QuestionCircleOutlined, FileExcelOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined, ReloadOutlined, CloseCircleFilled, LeftOutlined, RightOutlined, CheckOutlined, PauseOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import HeaderManager from '../HeaderManager';
import Footer from '../Footer';
import '../css/ManageService.css';
import { ActiveSerive, CreateService, DeleteService, GetALlServies, Report, SearchAndGet, UpdateService } from '../../service/service';

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
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);

  const [sortColumn,setSortColumn] = useState(null);
  const [modesort,setModeSort]  =useState("asc")

  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', service: null });
  const [helpModal, setHelpModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [pendingEditValues, setPendingEditValues] = useState(null);

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
    })
    console.log('ManageService component mounted');
  }, []);

  useEffect(() => {


    SearchAndGet({ keywordSearch: searchQuery, keywordType: category }, currentPage, pagesize, active,sortColumn,modesort).then((response) => {

      setTotalPages(response.data.totalPages)
      setServices(response.data.content)
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      message.error('Lỗi khi tải dữ liệu!');
    })



  }, [currentPage, searchQuery, category, active,sortColumn,modesort])

  const renderPagination = (total, current, setPage) => (
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

  function handleActive(id) {
    ActiveSerive(id).then((response) => {
      console.log("Acctive Successfully", response.data);
      setSearchQuery((pre) => pre + " ")
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  function handleDelete(id) {
    setConfirmModal({ open: true, type: 'delete', service: services.find(s => s.serviceId === id) });
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
      imageUrls: service.imageUrls.map((url, idx) => ({
        uid: `${idx}`,
        name: url.split('/').pop(),
        status: 'done',
        url: url
      }))
    });
  }

  function handleConfirmAction() {
    if (confirmModal.type === 'delete') {
      DeleteService(confirmModal.service.serviceId).then(() => {
        setSearchQuery((pre) => pre + " ")
        message.success('Dịch vụ đã được xóa thành công!');
      }).catch((error) => {
        console.log("Error", error)
      })
    } else if (confirmModal.type === 'edit') {
      if (pendingEditValues) {
        handleCreateAndEdit(pendingEditValues);
        setPendingEditValues(null);
      }
    }
    setConfirmModal({ open: false, type: '', service: null });
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
      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
      })
    }
    else {
      CreateService(formdata).then((response) => {
        console.log("Create Service Succesfully ", response.data)
        setCurrentPage(totalPages)
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        message.success('Dịch vụ đã được tạo thành công!');
      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
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
    return () => {};
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

  return (
    <div className="manage-service-main-content">
            <HeaderManager />
            <div className="manage-header">
              <AppstoreOutlined style={{fontSize: 38, color: '#2563eb', marginRight: 16}} />
              <div>
                <h1 className="manage-title">Service Management</h1>
                <div className="manage-subtitle-row" style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <div className="manage-subtitle">
                    Easily add, edit, search, and manage your DNA test services in a professional way.
                  </div>
                  <QuestionCircleOutlined 
                    onClick={() => setHelpModal(true)} 
                    style={{color: '#2563eb', fontSize: 22, cursor: 'pointer', transition: 'color 0.2s'}} 
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
                  style={{ width: 260 }}
                >
                  <Input
                    placeholder="What are you looking for?"
                    allowClear
                    style={{
                      height: 44,
                      borderRadius: 30,
                      background: '#fff',
                      color: '#222',
                      border: '1.5px solid #e0e7ef',
                      fontSize: 5,
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
                  <PlusOutlined style={{fontSize: '1rem', marginRight: 6}} />
                  Create Service
                </button>
                <button className={`filter-btn small-btn ${active ? 'active' : ''}`} onClick={() => { setActive(true); setCurrentPage(1); }} type="button">
                  <CheckOutlined style={{fontSize: '1rem', marginRight: 6}} />
                  Active Service
                  <span className="badge small-badge">{totalactive}</span>
                </button>
                <button className={`filter-btn small-btn ${!active ? 'inactive' : ''}`} onClick={() => { setActive(false); setCurrentPage(1); }} type="button">
                  <PauseOutlined style={{fontSize: '1rem', marginRight: 6}} />
                  Inactive Service
                  <span className="badge small-badge">{totalinactive}</span>
                </button>
              </form>
            </div>
            {/* End filter-action-row */}
      
            <div className="pagination-desc" style={{ textAlign: 'center', color: '#64748b', marginBottom: 8 }}>
              Page {currentPage} of {totalPages}. Each page shows up to {pagesize} services.
            </div>
      
            {
              services && services.length > 0 && (
                <Spin spinning={loading} tip="Loading data...">
                  <table className="service-table">
                    <thead>
                       <tr>
                <th >Image</th>
                <th onClick={()=> {
                  if (sortColumn === 'serviceName') {
                    setModeSort(modesort === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortColumn('serviceName');
                    setModeSort('asc');
                  }
                }}
                style={{ cursor: 'pointer' }}
                >
                  Service Name
                  {sortColumn === 'serviceName' && (
                    <span style={{ marginLeft: '8px' }}>
                      {modesort === 'asc' ? <ArrowUpOutlined style={{ color: '#2563eb' }} /> : <ArrowDownOutlined style={{ color: '#2563eb' }} />}
                    </span>
                  )}
                </th>
                <th onClick={()=> {
                  if (sortColumn === 'typeService') {
                    setModeSort(modesort === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortColumn('typeService');
                    setModeSort('asc');
                  }
                }}
                style={{ cursor: 'pointer' }}
                >
                  Type
                  {sortColumn === 'typeService' && (
                    <span style={{ marginLeft: '8px' }}>
                      {modesort === 'asc' ? <ArrowUpOutlined style={{ color: '#2563eb' }} /> : <ArrowDownOutlined style={{ color: '#2563eb' }} />}
                    </span>
                  )}
                </th>
                <th onClick={()=> {
                  if (sortColumn === 'sample_count') {
                    setModeSort(modesort === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortColumn('sample_count');
                    setModeSort('asc');
                  }
                }}
                style={{ cursor: 'pointer' }}
                >
                  Number Sample
                  {sortColumn === 'sample_count' && (
                    <span style={{ marginLeft: '8px' }}>
                      {modesort === 'asc' ? <ArrowUpOutlined style={{ color: '#2563eb' }} /> : <ArrowDownOutlined style={{ color: '#2563eb' }} />}
                    </span>
                  )}
                </th>
                <th>Description</th>
                <th onClick={()=> {
                  if (sortColumn === 'servicePrice') {
                    setModeSort(modesort === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortColumn('servicePrice');
                    setModeSort('asc');
                  }
                }}
                style={{ cursor: 'pointer' }}
                >
                  Price (VND)
                  {sortColumn === 'servicePrice' && (
                    <span style={{ marginLeft: '8px' }}>
                      {modesort === 'asc' ? <ArrowUpOutlined style={{ color: '#2563eb' }} /> : <ArrowDownOutlined style={{ color: '#2563eb' }} />}
                    </span>
                  )}
                </th>
                <th>Action</th>

                {/* Thêm các cột khác nếu cần */}
              </tr>
                    </thead>
                    <tbody>
                      {services.map((service, idx) => (
                        <tr key={service.serviceId || idx} className="service-row">
                          <td>
                            {service.imageUrls && service.imageUrls.length > 0 ? (
                              <img
                                src={service.imageUrls[0]}
                                alt={service.serviceName}
                                className="service-img"
                                style={{ cursor: 'pointer' }}
                                onClick={() => openImageModal(service.imageUrls, 0)}
                              />
                            ) : (
                              <img
                                src="https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                                alt="default"
                                className="service-img default"
                              />
                            )}
                          </td>
                          <td>{service.serviceName}</td>
                          <td>{service.typeService}</td>
                          <td>{service.sample_count}</td>
                          <td>
                            <Tooltip title="View Content">
                              <EyeOutlined onClick={() => setViewContent(service)} className="action-icon view" />
                            </Tooltip>
                          </td>
                          <td>{service.price?.toLocaleString('vi-VN') || ''}</td>
                          <td>
                            {service.active ? (
                              <Tooltip title="Delete">
                                <DeleteOutlined onClick={() => handleDelete(service.serviceId)} className="action-icon delete" />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Activate">
                                <CheckCircleTwoTone twoToneColor="#52c41a" onClick={() => handleActive(service.serviceId)} className="action-icon active" />
                              </Tooltip>
                            )}
                            <Tooltip title="Edit">
                              <EditOutlined onClick={() => handleEdit(service)} className="action-icon edit" />
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Spin>
              )
            }
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
                  if (edit) {
                    setPendingEditValues(values);
                    setConfirmModal({ open: true, type: 'edit', service: edit });
                  } else {
                    handleCreateAndEdit(values);
                  }
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
      
            {/* Confirm Modal */}
            <Modal
              open={confirmModal.open}
              onCancel={() => setConfirmModal({ open: false, type: '', service: null })}
              onOk={handleConfirmAction}
              okText="Confirm"
              cancelText="Cancel"
              title={
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                  {confirmModal.type === 'delete' ? <ExclamationCircleOutlined style={{color: '#dc2626', fontSize: 28}} /> : <EditOutlined style={{color: '#2563eb', fontSize: 26}} />}
                  {confirmModal.type === 'delete' ? 'Confirm delete service' : 'Confirm edit service'}
                </span>
              }
              className="confirm-modal-custom"
            >
              <div style={{textAlign: 'center', fontSize: '1.08rem', color: '#334155', margin: '12px 0 0 0'}}>
                {confirmModal.type === 'delete' ? (
                  <div>Are you sure you want to <b style={{color:'#dc2626'}}>delete</b> the service "{confirmModal.service?.serviceName}"?</div>
                ) : confirmModal.type === 'edit' ? (
                  <div>Are you sure you want to <b style={{color:'#2563eb'}}>edit</b> the service "{confirmModal.service?.serviceName}"?</div>
                ) : null}
              </div>
            </Modal>
      
            <Modal
              open={helpModal}
              onCancel={() => setHelpModal(false)}
              footer={null}
              title={<span style={{display:'flex',alignItems:'center',gap:8}}><QuestionCircleOutlined style={{color:'#2563eb',fontSize:24}}/>Service Management Guide</span>}
              className="help-modal-custom"
            >
              <ul style={{textAlign:'left',fontSize:'1.08rem',lineHeight:'1.7',margin:'18px 0'}}>
                <li><b>Create service:</b> Click <span style={{color:'#2563eb'}}>Create Service</span> to add a new service.</li>
                <li><b>Filter & search:</b> Use the search box and filters to quickly find services.</li>
                <li><b>Edit/Delete:</b> Click the <EditOutlined style={{color:'#2563eb'}}/> or <DeleteOutlined style={{color:'#dc2626'}}/> icon to edit/delete a service (with confirmation).</li>
                <li><b>Help:</b> Click <QuestionCircleOutlined style={{color:'#2563eb'}}/> to view this guide at any time.</li>
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
                    onClick={() => setImageModal({ open: false, images: [], current: 0 })}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 10,
                      background: 'rgba(37,99,235,0.18)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 38,
                      height: 38,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px #2563eb44',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.18)'}
                    aria-label="Close"
                  >
                    <CloseCircleFilled style={{ fontSize: 30, color: '#fff' }} />
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
            {renderPagination(totalPages, currentPage, setCurrentPage)}
            <Footer />
    </div>
  );
};

export default ManageService;