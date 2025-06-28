import React, { useState, useEffect, useRef } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  Upload, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Tag, 
  Tooltip, 
  Select,
  Typography,
  Divider,
  Badge,
  Avatar,
  message,
  Popconfirm,
  AutoComplete
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  UploadOutlined, 
  EyeOutlined, 
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FileTextOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StopOutlined,
  ReloadOutlined,
  CheckOutlined,
  PauseOutlined,
  CloseCircleFilled
} from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { ActiveBlog, CreateBlog, DeleteBlogs, MangerReportBlog, SearchByTitleAndCatagery, UpdateBlog } from '../../service/Blog';

const { Title, Text } = Typography;
const { Search } = Input;

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();
  const [totalactive, setTotalactive] = useState(0);
  const [totalinactive, setTotalInActive] = useState(0);
  const [createform, setCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [modesort, setModeSort] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [imageModal, setImageModal] = useState({ open: false, images: [], current: 0 });
  const slideshowRef = useRef(null);

  useEffect(() => {
    MangerReportBlog().then((response) => {
      console.log("Manager Report Blog", response.data);
      setTotalactive(response.data.totalblogActive);
      setTotalInActive(response.data.totalblogInactive);
    }).catch((error) => {
      console.log("Error get Report Blog", error);
      message.error('Failed to load blog statistics');
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    SearchByTitleAndCatagery({ keywordSearch: searchQuery, keywordType: category }, currentPage, pagesize, active, sortColumn, modesort)
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setBlogs(response.data.content);
        console.log("Response", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
        message.error('Failed to load blogs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, searchQuery, category, active, sortColumn, modesort]);

  // Fetch blog suggestions for AutoComplete
  const fetchBlogSuggestions = async (value) => {
    if (!value) {
      setSearchOptions([]);
      return;
    }
    // Filter local blogs for suggestions
    const filtered = blogs
      .filter(blog => blog.blogTitle.toLowerCase().includes(value.toLowerCase()))
      .map(blog => ({ value: blog.blogTitle }));
    setSearchOptions(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

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

  const renderPagination = (total, current, setPage) => (
    <div className="manage-blog-pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`manage-blog-page-button ${i === current ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );

  function handleActive(id) {
    console.log("Attempting to activate blog with ID:", id);
    ActiveBlog(id).then((response) => {
      console.log("Active Successfully", response.data);
      message.success({
        content: 'Blog activated successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      setSearchQuery((pre) => pre + " ");
    }).catch((error) => {
      console.log("Error", error);
      message.error({
        content: 'Failed to activate blog. Please try again.',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
    });
  }

  function handleDelete(id) {
    console.log("Attempting to delete blog with ID:", id);
    DeleteBlogs(id).then((response) => {
      console.log("Delete Successfully", response.data);
      message.success({
        content: 'Blog deleted successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      setSearchQuery((pre) => pre + " ");
    }).catch((error) => {
      console.log("Error", error);
      message.error({
        content: 'Failed to delete blog. Please try again.',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
    });
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
      values.imageUrls.forEach(file => {
        formdata.append("file", file.originFileObj);
      });
    }
    
    console.log("Create data", createBlogs);
    console.log("Image service", values.imageUrls);
    
    if (edit) {
      formdata.append("removeimg", new Blob([JSON.stringify(removeUrls)], { type: "application/json" }));
      UpdateBlog(edit.blogId, formdata).then((response) => {
        console.log("Update Successfully ", response.data);
        message.success('Blog updated successfully');
        setEdit(false);
        setSearchQuery((pre) => pre + " ");
        setCreateForm(false);
        form.resetFields();
        setError('');
      }).catch((error) => {
        console.log("Error", error.response?.data?.error);
        setError(error.response?.data?.error);
        message.error('Failed to update blog');
      });
    } else {
      CreateBlog(formdata).then((response) => {
        console.log("Create Blog Successfully ", response.data);
        message.success('Blog created successfully');
        setCurrentPage(totalPages);
        setCreateForm(false);
        form.resetFields();
        setError('');
      }).catch((error) => {
        console.log("Error", error.response?.data?.error);
        setError(error.response?.data?.error);
        message.error('Failed to create blog');
      });
    }
  }

  const getSortIcon = (columnName) => {
    if (sortColumn === columnName) {
      return modesort === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />;
    }
    return null;
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'blogimage',
      key: 'image',
      width: 100,
      render: (images, record) => (
        <Avatar
          size={60}
          shape="square"
          src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/60x60?text=No+Image"}
          alt={record.blogTitle}
          style={{ borderRadius: 8, cursor: 'pointer' }}
          onClick={() => images && images.length > 0 && openImageModal(images, 0)}
        />
      ),
    },
    {
      title: (
        <Space>
          <FileTextOutlined />
          Blog Title
          {getSortIcon('blogTitle')}
        </Space>
      ),
      dataIndex: 'blogTitle',
      key: 'title',
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
          Category
          {getSortIcon('blogType')}
        </Space>
      ),
      dataIndex: 'blogType',
      key: 'type',
      sorter: true,
      render: (text) => (
        <Tag color="blue" style={{ borderRadius: 6 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'blogContent',
      key: 'content',
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
          <CalendarOutlined />
          Created Date
          {getSortIcon('createDate')}
        </Space>
      ),
      dataIndex: 'createDate',
      key: 'date',
      sorter: true,
      render: (text) => (
        <Text type="secondary">
          {text}
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
          {record.active ? (
            <Popconfirm
              title="Delete Blog"
              description={
                <div>
                  <p>Are you sure you want to delete this blog?</p>
                  <p style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                    "{record.blogTitle}"
                  </p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    This action cannot be undone.
                  </p>
                </div>
              }
              onConfirm={() => {
                console.log("Delete confirmed for blog:", record.blogTitle, "ID:", record.blogId);
                handleDelete(record.blogId);
              }}
              onCancel={() => {
                console.log("Delete cancelled for blog:", record.blogTitle);
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
                title="Delete Blog"
              />
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Activate Blog"
              description={
                <div>
                  <p>Are you sure you want to activate this blog?</p>
                  <p style={{ fontWeight: 'bold', color: '#52c41a' }}>
                    "{record.blogTitle}"
                  </p>
                </div>
              }
              onConfirm={() => {
                console.log("Activate confirmed for blog:", record.blogTitle, "ID:", record.blogId);
                handleActive(record.blogId);
              }}
              onCancel={() => {
                console.log("Activate cancelled for blog:", record.blogTitle);
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
                title="Activate Blog"
              />
            </Popconfirm>
          )}

          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: '#1890ff' }}
            title="Edit Blog"
            onClick={() => {
              console.log("Edit clicked for blog:", record.blogTitle, "ID:", record.blogId);
              setEdit(record);
              setCreateForm(true);
              form.setFieldsValue({
                blogTitle: record.blogTitle,
                blogContent: record.blogContent,
                blogType: record.blogType,
                imageUrls: record.blogimage?.map((url, idx) => ({
                  uid: `${idx}`,
                  name: url.split('/').pop(),
                  status: 'done',
                  url: url
                })) || []
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f7fa', minHeight: '100vh' }}>
      <DynamicHeader />
      
      {/* Header Section */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          Blog Management
        </Title>
        <Text type="secondary">Manage and organize your blog content efficiently</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Blogs"
              value={totalactive + totalinactive}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Blogs"
              value={totalactive}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Inactive Blogs"
              value={totalinactive}
              prefix={<StopOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filter Section - Improved */}
      <div className="filter-action-row">
        <form className="searchBar" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <AutoComplete
            options={searchOptions}
            value={searchQuery}
            onSelect={val => { setSearchQuery(val); setCurrentPage(1); handleSearch(); }}
            onSearch={fetchBlogSuggestions}
            onChange={val => { setSearchQuery(val); setCurrentPage(1); fetchBlogSuggestions(val); }}
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
          
          <select 
            name="category" 
            aria-label="Select category" 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
            style={{
              height: 58,
              minWidth: 210,
              maxWidth: 400,
              fontSize: '0.8rem',
              border: '1.5px solid #e0e7ef',
              borderRadius: 28,
              padding: '0 22px',
              background: '#fff',
              color: '#222'
            }}
          >
            <option value="">All Categories</option>
            {blogs.length > 0 && blogs.map((blog) => (
              <option key={blog.blogType} value={blog.blogType}>
                {blog.blogType}
              </option>
            ))}
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
            Create Blog
          </button>
          
          <button className={`filter-btn small-btn ${active ? 'active' : ''}`} onClick={() => { setActive(true); setCurrentPage(1); }} type="button">
            <CheckOutlined style={{fontSize: '1rem', marginRight: 6}} />
            Active Blogs
            <span className="badge small-badge">{totalactive}</span>
          </button>
          
          <button className={`filter-btn small-btn ${!active ? 'inactive' : ''}`} onClick={() => { setActive(false); setCurrentPage(1); }} type="button">
            <PauseOutlined style={{fontSize: '1rem', marginRight: 6}} />
            Inactive Blogs
            <span className="badge small-badge">{totalinactive}</span>
          </button>
        </form>
      </div>

      {/* Pagination Description */}
      <div className="pagination-desc" style={{ textAlign: 'center', color: '#64748b', marginBottom: 8 }}>
        Page {currentPage} of {totalPages}. Each page shows up to {pagesize} blogs.
      </div>

      {/* Blog Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="blogId"
          loading={loading}
          pagination={false}
          onChange={(pagination, filters, sorter) => {
            if (sorter.field) {
              setSortColumn(sorter.field);
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

      {/* Create/Edit Modal */}
      <Modal
        title={
          <Space>
            {edit ? <EditOutlined /> : <PlusOutlined />}
            {edit ? "Edit Blog" : "Create New Blog"}
          </Space>
        }
        open={createform}
        onCancel={() => {
          setCreateForm(false);
          form.resetFields();
          setEdit(false);
          setError('');
        }}
        width={800}
        onOk={() => form.submit()}
        okText={edit ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateAndEdit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Blog Title"
                name="blogTitle"
                rules={[{ required: true, message: 'Please enter the blog title' }]}
              >
                <Input placeholder="Enter blog title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Blog Category"
                name="blogType"
                rules={[{ required: true, message: 'Please select the blog category' }]}
              >
                <Input placeholder="Enter blog category" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Blog Content"
            name="blogContent"
            rules={[{ required: true, message: 'Please enter the blog content' }]}
          >
            <Input.TextArea
              rows={8}
              placeholder="Write your blog content here..."
              maxLength={5000}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Upload Images"
            name="imageUrls"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            rules={[{ required: !edit, message: 'Please upload at least one image' }]}
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
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          
          {error && (
            <Form.Item>
              <Text type="danger">{error}</Text>
            </Form.Item>
          )}
        </Form>
      </Modal>

      {/* View Content Modal */}
      <Modal
        title={
          <Space>
            <FileTextOutlined />
            {viewContent?.blogTitle}
          </Space>
        }
        open={!!viewContent}
        onCancel={() => setViewContent(null)}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <Tag color="blue">{viewContent?.blogType}</Tag>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              <CalendarOutlined style={{ marginRight: 4 }} />
              {viewContent?.createDate}
            </Text>
          </div>
          <Divider />
          <div style={{ 
            whiteSpace: 'pre-line', 
            fontSize: '16px', 
            lineHeight: '1.8',
            color: '#333'
          }}>
            {viewContent?.blogContent}
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
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
              alt="blog"
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

      <Footer />
    </div>
  );
};

export default ManageBlog;