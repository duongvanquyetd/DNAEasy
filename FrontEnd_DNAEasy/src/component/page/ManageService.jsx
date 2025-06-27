import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined, CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleOutlined, QuestionCircleOutlined, FileExcelOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import HeaderManager from '../HeaderManager';
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
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);

  const [sortColumn,setSortColumn] = useState(null);
  const [modesort,setModeSort]  =useState("asc")

  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', service: null });
  const [helpModal, setHelpModal] = useState(false);

  const [loading, setLoading] = useState(false);


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
    

    setConfirmModal({ open: true, type: 'delete', service: services.find(s => s.serviceId === id) });

  }

  function handleEdit(service) {
    setConfirmModal({ open: true, type: 'edit', service });
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
      setEdit(confirmModal.service);
      setCreateForm(true);
      form.setFieldsValue({
        serviceName: confirmModal.service.serviceName,
        typeService: confirmModal.service.typeService,
        price: confirmModal.service.price,
        description: confirmModal.service.serviceDescription,
        sampleCount: confirmModal.service.sample_count,
        imageUrls: confirmModal.service.imageUrls.map((url, idx) => ({
          uid: `${idx}`,
          name: url.split('/').pop(),
          status: 'done',
          url: url
        }))
      });
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


  return (
    <div className="manage-service-main-content">
      <HeaderManager />
      <div className="manage-header">
        <AppstoreOutlined style={{fontSize: 38, color: '#2563eb', marginRight: 16}} />
        <div>
          <h1 className="manage-title">Quản lý dịch vụ</h1>
          <div className="manage-subtitle-row" style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div className="manage-subtitle">Thêm, chỉnh sửa, tìm kiếm và quản lý các dịch vụ xét nghiệm một cách dễ dàng, chuyên nghiệp.</div>
            <QuestionCircleOutlined 
              onClick={() => setHelpModal(true)} 
              style={{color: '#2563eb', fontSize: 22, cursor: 'pointer', transition: 'color 0.2s'}} 
              className="subtitle-help-icon"
              title="Hướng dẫn sử dụng"
            />
          </div>
        </div>
      </div>

      <section className="filterSection">
        <form className="searchBar" onSubmit={(e) => { e.preventDefault(); }} >
          <input type="text" placeholder="What are you looking for?" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }} aria-label="Search services" />
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

      <div className="service-stats-row">
        <div className="service-stat-card">
          <AppstoreOutlined className="stat-icon" />
          <div className="stat-content">
            <div className="stat-label">Total Service</div>
            <div className="stat-value">{totalServices}</div>
          </div>
        </div>
        <div className="service-stat-card">
          <CheckCircleTwoTone twoToneColor="#52c41a" className="stat-icon" />
          <div className="stat-content">
            <div className="stat-label">Active</div>
            <div className="stat-value">{totalactive}</div>
          </div>
        </div>
        <div className="service-stat-card">
          <CloseCircleTwoTone twoToneColor="#ff4d4f" className="stat-icon" />
          <div className="stat-content">
            <div className="stat-label">Inactive</div>
            <div className="stat-value">{totalinactive}</div>
          </div>
        </div>
        <div className="service-stat-card">
          <DollarOutlined className="stat-icon" />
          <div className="stat-content">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">{totalValue} VND</div>
          </div>
        </div>
        <div className="service-stat-card">
          <TrophyOutlined className="stat-icon" />
          <div className="stat-content">
            <div className="stat-label">Avg Price</div>
            <div className="stat-value">{averagePrice} VND</div>
          </div>
        </div>
      </div>
      <div className="stats-divider"></div>
      {/* Filter và Action cùng hàng ngang */}
      <div className="filter-action-row">
        <div className="filter-bar-left">
          <form className="searchBar" onSubmit={(e) => { e.preventDefault(); }} >
            <span className="search-icon"><AppstoreOutlined /></span>
            <input type="text" placeholder="What are you looking for?" value={searchQuery.trim()} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }} aria-label="Search services" />
            <select name="category" aria-label="Select category" onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">All Services</option>
              <option value="civil">Civil Services</option>
              <option value="legal">Legal Services</option>

            </select>
            <button type="submit" className="searchBtn" aria-label="Search"><SearchOutlined /></button>
            <button className="primary-btn big-btn" onClick={() => setCreateForm(true)} type="button"><PlusOutlined style={{fontSize: '1.3rem'}} /> Create Service</button>
            <button className={`filter-btn ${active ? 'active' : ''} big-btn`} onClick={() => { setActive(true); setCurrentPage(1); }} type="button">
              Active Service
              <span className="badge big-badge">{totalactive}</span>
            </button>
            <button className={`filter-btn ${!active ? 'inactive' : ''} big-btn`} onClick={() => { setActive(false); setCurrentPage(1); }} type="button">
              Inactive Service
              <span className="badge big-badge">{totalinactive}</span>
            </button>
          </form>
        </div>
      </div>
      {/* End filter-action-row */}


      {/* Hiển thị số lượng kết quả */}
      <div className="result-count">Đã tìm thấy {totalServices || services.length} dịch vụ{totalPages > 1 ? `, trang ${currentPage}/${totalPages}` : ''}</div>


      <button onClick={() => setCreateForm(true)}>Create Service </button>

      <button onClick={()=>{setSortColumn(null);setModeSort(null)}}>No sort</button>
      {
        services && services.length > 0 && (
          <table className="service-table">
            <thead>
              <tr>
                <th >Image</th>
                <th onClick={()=> {setSortColumn('serviceName');setModeSort(modesort ==='asc' ? 'desc' :'asc')}}>Service Name</th>
                <th onClick={()=> {setSortColumn('typeService');setModeSort(modesort ==='asc' ? 'desc' :'asc')}}>Type</th>
                <th onClick={()=> {setSortColumn('sample_count');setModeSort(modesort ==='asc' ? 'desc' :'asc')}}>Number Sample</th>
                <th>Description</th>
                <th onClick={()=> {setSortColumn('servicePrice');setModeSort(modesort ==='asc' ? 'desc' :'asc')}}>Price (VND)</th>
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
                        <Tooltip title="Active">
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
          
        )
      }
      <div>
      <Modal
        title={edit ? "Edit Service " : "Create New Service"}
        visible={createform}
        onCancel={() => {
          setCreateForm(false);
          form.resetFields();
          setEdit(false);
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

      {/* Modal xác nhận */}
      <Modal
        open={confirmModal.open}
        onCancel={() => setConfirmModal({ open: false, type: '', service: null })}
        onOk={handleConfirmAction}
        okText="Xác nhận"
        cancelText="Hủy"
        title={
          <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            {confirmModal.type === 'delete' ? <ExclamationCircleOutlined style={{color: '#dc2626', fontSize: 28}} /> : <EditOutlined style={{color: '#2563eb', fontSize: 26}} />}
            {confirmModal.type === 'delete' ? 'Xác nhận xóa dịch vụ' : 'Xác nhận chỉnh sửa dịch vụ'}
          </span>
        }
        className="confirm-modal-custom"
      >
        <div style={{textAlign: 'center', fontSize: '1.08rem', color: '#334155', margin: '12px 0 0 0'}}>
          {confirmModal.type === 'delete' ? (
            <div>Bạn có chắc chắn muốn <b style={{color:'#dc2626'}}>xóa</b> dịch vụ "{confirmModal.service?.serviceName}" không?</div>
          ) : confirmModal.type === 'edit' ? (
            <div>Bạn có chắc chắn muốn <b style={{color:'#2563eb'}}>chỉnh sửa</b> dịch vụ "{confirmModal.service?.serviceName}" không?</div>
          ) : null}
        </div>
      </Modal>

      <Modal
        open={helpModal}
        onCancel={() => setHelpModal(false)}
        footer={null}
        title={<span style={{display:'flex',alignItems:'center',gap:8}}><QuestionCircleOutlined style={{color:'#2563eb',fontSize:24}}/>Hướng dẫn sử dụng trang quản lý dịch vụ</span>}
        className="help-modal-custom"
      >
        <ul style={{textAlign:'left',fontSize:'1.08rem',lineHeight:'1.7',margin:'18px 0'}}>
          <li><b>Tạo dịch vụ:</b> Bấm <span style={{color:'#2563eb'}}>Create Service</span> để thêm mới dịch vụ.</li>
          <li><b>Lọc & tìm kiếm:</b> Sử dụng ô tìm kiếm và bộ lọc để tìm dịch vụ nhanh chóng.</li>
          <li><b>Chỉnh sửa/xóa:</b> Bấm icon <EditOutlined style={{color:'#2563eb'}}/> hoặc <DeleteOutlined style={{color:'#dc2626'}}/> để sửa/xóa dịch vụ (có xác nhận).</li>
          <li><b>Hỗ trợ:</b> Bấm <QuestionCircleOutlined style={{color:'#2563eb'}}/> để xem hướng dẫn này bất cứ lúc nào.</li>
        </ul>
      </Modal>
         </div>
      {renderPagination(totalPages, currentPage, setCurrentPage)}
      <Footer />
    </div>
  );
};

export default ManageService;