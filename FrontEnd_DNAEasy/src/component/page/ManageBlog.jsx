import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Tooltip, Badge, Space, Button, message, Segmented, Select, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, CheckCircleTwoTone, StopOutlined, SearchOutlined, AppstoreOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseCircleTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { ActiveBlog, CreateBlog, DeleteBlogs, MangerReportBlog, SearchByTitleAndCatagery, UpdateBlog } from '../../service/Blog';
import HeaderManager from '../HeaderManager';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();

  const [totalactive, setTotalactive] = useState('');
  const [totalinactive, setTotalInActive] = useState('');

  const [createform, setCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [edit, setEdit] = useState(false);
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [helpModal, setHelpModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', blog: null });
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    MangerReportBlog().then((response) => {
      console.log("Manager Report Blog", response.data);
      setTotalInActive(response.data.totalblogActive);
      setTotalactive(response.data.totalblogInactive);
    }).catch(() => {
      console.log("Error get Report Blog");
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    SearchByTitleAndCatagery({ keywordSearch: searchQuery, keywordType: category }, currentPage, pagesize, active).then((response) => {
      setTotalPages(response.data.totalPages);
      setBlogs(response.data.content);
      setAllCategories(prev => {
        const types = response.data.content.map(blog => blog.blogType);
        return Array.from(new Set([...prev, ...types]));
      });
      setLoading(false);
    }).catch(() => {
      message.error('Lỗi khi tải dữ liệu!');
      setLoading(false);
    });
  }, [currentPage, searchQuery, category, active]);

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
    ActiveBlog(id).then(() => {
      message.success('Kích hoạt blog thành công!');
      setSearchQuery((pre) => pre + " ");
    }).catch(() => {
      message.error('Có lỗi khi kích hoạt blog!');
    });
  }

  function handleDelete(id) {
    setConfirmModal({ open: true, type: 'delete', blog: blogs.find((b) => b.blogId === id) });
  }

  function handleCreateAndEdit(values) {
    const formdata = new FormData();
    const createBlogs = {
      blogTitle: values.blogTitle,
      blogContent: values.blogContent,
      blogType: values.blogType,
    };
    formdata.append("blog", new Blob([JSON.stringify(createBlogs)], { type: "application/json" }));
    if (values.imageUrls) {
      values.imageUrls.forEach((file) => {
        formdata.append("file", file.originFileObj);
      });
    }
    if (edit) {
      formdata.append("removeimg", new Blob([JSON.stringify(removeUrls)], { type: "application/json" }));
      UpdateBlog(edit.blogId, formdata).then(() => {
        setEdit(false);
        setSearchQuery((pre) => pre + " ");
        setCreateForm(false);
        form.resetFields();
        message.success('Blog đã được cập nhật thành công!');
      }).catch(() => {
        message.error('Có lỗi xảy ra!');
      });
    } else {
      CreateBlog(formdata).then(() => {
        setCurrentPage(totalPages);
        setCreateForm(false);
        form.resetFields();
        message.success('Blog đã được tạo thành công!');
      }).catch(() => {
        message.error('Có lỗi xảy ra!');
      });
    }
  }

  function getSortedBlogs() {
    let sorted = [...blogs];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  }

  function handleConfirmAction() {
    if (confirmModal.type === 'delete') {
      DeleteBlogs(confirmModal.blog.blogId).then(() => {
        setSearchQuery((pre) => pre + " ");
        message.success('Blog đã được xóa thành công!');
      });
    } else if (confirmModal.type === 'edit') {
      setEdit(confirmModal.blog);
      setCreateForm(true);
      form.setFieldsValue({
        blogTitle: confirmModal.blog.blogTitle,
        blogContent: confirmModal.blog.blogContent,
        blogType: confirmModal.blog.blogType,
        imageUrls: confirmModal.blog.blogimage.map((url, idx) => ({
          uid: `${idx}`,
          name: url.split('/').pop(),
          status: 'done',
          url: url,
        })),
      });
    }
    setConfirmModal({ open: false, type: '', blog: null });
  }

  return (
    <div className="manage-blog">
      <HeaderManager />
      <div className="blog-content-wrapper">
        <div className="manage-header">
          <AppstoreOutlined className="header-icon" />
          <div>
            <h1 className="manage-title">Quản lý Blog</h1>
            <div className="manage-subtitle-row">
              <div className="manage-subtitle">
                Thêm, chỉnh sửa, tìm kiếm và quản lý các bài viết blog một cách dễ dàng, chuyên nghiệp.
              </div>
              <QuestionCircleOutlined onClick={() => setHelpModal(true)} 
                style={{color: '#2563eb', fontSize: 22, cursor: 'pointer', transition: 'color 0.2s'}} 
                className="subtitle-help-icon"
                title="Hướng dẫn sử dụng"/>
            </div>
          </div>
        </div>
        <div className="blog-stats-row">
          <div className="blog-stat-card total">
            <AppstoreOutlined className="stat-icon" />
            <div className="stat-label">Total Blog</div>
            <div className="stat-value">{totalactive + totalinactive}</div>
          </div>
          <div className="blog-stat-card active">
            <CheckCircleTwoTone twoToneColor="#52c41a" className="stat-icon" />
            <div className="stat-label">Active</div>
            <div className="stat-value">{totalactive}</div>
          </div>
          <div className="blog-stat-card inactive">
            <StopOutlined className="stat-icon inactive" />
            <div className="stat-label">Inactive</div>
            <div className="stat-value">{totalinactive}</div>
          </div>
        </div>
        <div className="blog-controls">
          <form className="blog-searchBar" onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); }}>
            <Input
              prefix={<SearchOutlined />}
              type="text"
              placeholder="Tìm kiếm blog..."
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog posts"
            />
            <Select
              placeholder="Type"
              onChange={(val) => setCategory(val)}
              value={category || undefined}
              allowClear
            >
              <Select.Option value="">Tất cả Blog</Select.Option>
              {allCategories.map((type) => (
                <Select.Option key={type} value={type}>{type}</Select.Option>
              ))}
            </Select>
            <Button htmlType="submit" type="primary" icon={<SearchOutlined />} className="blog-searchBtn">
              Tìm kiếm
            </Button>
            <div className="blog-filter-group">
              <button
                type="button"
                className={`blog-filterBtn${active ? ' active' : ''}`}
                onClick={() => { setActive(true); setCurrentPage(1); }}
              >
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 20, marginRight: 8 }}>●</span> Active
                <span className="blog-badge">{totalactive}</span>
              </button>
              <button
                type="button"
                className={`blog-filterBtn${!active ? ' active' : ''}`}
                onClick={() => { setActive(false); setCurrentPage(1); }}
              >
                <span style={{ color: '#dc2626', fontWeight: 700, fontSize: 20, marginRight: 8 }}>●</span> Inactive
                <span className="blog-badge">{totalinactive}</span>
              </button>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="blog-createBtn"
              onClick={() => setCreateForm(true)}
            >
              Tạo Blog mới
            </Button>
          </form>
        </div>
        <Spin spinning={loading} tip="Đang tải dữ liệu...">
          {blogs && blogs.length > 0 && (
            <table className="blog-table blog-table-custom">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th onClick={() => handleSort('blogTitle')}>Tiêu đề {sortConfig.key==='blogTitle' ? (sortConfig.direction==='asc'?<ArrowUpOutlined />:<ArrowDownOutlined />):null}</th>
                  <th>Thể loại</th>
                  <th>Mô tả</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {getSortedBlogs().map((blog, idx) => (
                  <tr key={blog.blogId || idx} className="blog-row">
                    <td>
                      {blog.blogimage && blog.blogimage.length > 0 ? (
                        <img src={blog.blogimage[0]} alt={blog.blogTitle} className="service-img" />
                      ) : (
                        <img
                          src="https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                          alt="default"
                          className="service-img default"
                        />
                      )}
                    </td>
                    <td className="blog-title-cell">{blog.blogTitle}</td>
                    <td className="blog-type-cell">{blog.blogType}</td>
                    <td className="blog-desc-cell">
                      <Tooltip title="Xem chi tiết">
                        <EyeOutlined onClick={() => setViewContent(blog)} className="blog-action-icon view" />
                      </Tooltip>
                      <span>
                        {blog.blogContent && blog.blogContent.length > 50 ? blog.blogContent.slice(0, 50) + '...' : blog.blogContent}
                      </span>
                    </td>
                    <td>
                      {blog.active ? <Badge color="green" text="Active" /> : <Badge color="gray" text="Inactive" />}
                    </td>
                    <td>
                      <Space>
                        <Tooltip title="Sửa">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                              setEdit(blog);
                              setCreateForm(true);
                              form.setFieldsValue({
                                blogTitle: blog.blogTitle,
                                blogContent: blog.blogContent,
                                blogType: blog.blogType,
                                imageUrls: blog.blogimage.map((url, idx) => ({
                                  uid: `${idx}`,
                                  name: url.split('/').pop(),
                                  status: 'done',
                                  url: url,
                                })),
                              });
                            }}
                            className="blog-action-icon edit"
                          />
                        </Tooltip>
                        {blog.active ? (
                          <Tooltip title="Xóa">
                            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(blog.blogId)} className="blog-action-icon delete" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Kích hoạt">
                            <Button
                              type="primary"
                              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                              onClick={() => handleActive(blog.blogId)}
                              className="blog-action-icon active"
                            />
                          </Tooltip>
                        )}
                      </Space>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Spin>
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
          className="modal-custom"
        >
          <Form form={form} layout="vertical" onFinish={(values) => { console.log("Form data:", values); handleCreateAndEdit(values); }}>
            <Form.Item label="Blog Title" name="blogTitle" rules={[{ required: true, message: 'Please enter the Blog title' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Blog Type" name="blogType" rules={[{ required: true, message: 'Please select the Blog type' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Blog Content" name="blogContent" rules={[{ required: true, message: 'Please enter the Blog Content' }]}>
              <Input.TextArea rows={6} autoSize={{ minRows: 6, maxRows: 20 }} maxLength={5000} showCount placeholder="Input content Blog....." />
            </Form.Item>
            <Form.Item
              label="Upload Images"
              name="imageUrls"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
              rules={[{ required: !edit ? true : false, message: 'Please upload at least one image' }]}
            >
              <Upload listType="picture-card" multiple beforeUpload={() => false} onRemove={(file) => { if (!file.originFileObj) { setRemovedUrls((prev) => [...prev, file.url]); } return true; }}>
                <div>
                  <UploadOutlined />
                  <div>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={<h2 className="view-modal-title">{viewContent?.blogTitle}</h2>}
          open={!!viewContent}
          onCancel={() => setViewContent(null)}
          footer={null}
          width={1200}
          className="view-modal"
        >
          <p className="view-modal-content">{viewContent?.blogContent}</p>
        </Modal>
        <Modal
          title={
            <span className="confirm-modal-title">
              {confirmModal.type === 'delete' ? <CloseCircleTwoTone twoToneColor="#dc2626" /> : <EditOutlined />}
              {confirmModal.type === 'delete' ? 'Xác nhận xóa blog' : 'Xác nhận chỉnh sửa blog'}
            </span>
          }
          open={confirmModal.open}
          onCancel={() => setConfirmModal({ open: false, type: '', blog: null })}
          onOk={handleConfirmAction}
          okText="Xác nhận"
          cancelText="Hủy"
          className="confirm-modal-custom"
        >
          <div className="confirm-modal-content">
            {confirmModal.type === 'delete' ? (
              <div>Bạn có chắc chắn muốn <b style={{ color: '#dc2626' }}>xóa</b> blog "{confirmModal.blog?.blogTitle}" không?</div>
            ) : confirmModal.type === 'edit' ? (
              <div>Bạn có chắc chắn muốn <b style={{ color: '#2563eb' }}>chỉnh sửa</b> blog "{confirmModal.blog?.blogTitle}" không?</div>
            ) : null}
          </div>
        </Modal>
        <Modal    
          open={helpModal}
          onCancel={() => setHelpModal(false)}
          footer={null}
          title={<span className="help-modal-title"><QuestionCircleOutlined />Hướng dẫn sử dụng trang quản lý blog</span>}
          className="help-modal-custom"
        >
          <ul className="help-modal-content">
            <li><b>Tạo blog:</b> Bấm <span style={{ color: '#2563eb' }}>Tạo Blog mới</span> để thêm mới bài viết.</li>
            <li><b>Lọc & tìm kiếm:</b> Sử dụng ô tìm kiếm và bộ lọc để tìm blog nhanh chóng.</li>
            <li><b>Chỉnh sửa/xóa:</b> Bấm icon <EditOutlined style={{ color: '#2563eb' }} /> hoặc <DeleteOutlined style={{ color: '#dc2626' }} /> để sửa/xóa blog (có xác nhận).</li>
            <li><b>Hỗ trợ:</b> Bấm <QuestionCircleOutlined style={{ color: '#2563eb' }} /> để xem hướng dẫn này bất cứ lúc nào.</li>
          </ul>
        </Modal>
        {renderPagination(totalPages, currentPage, setCurrentPage)}
      </div>
      <Footer />
    </div>
  );
};

export default ManageBlog;