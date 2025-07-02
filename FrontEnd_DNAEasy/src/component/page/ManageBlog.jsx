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
  AutoComplete,
  Skeleton,
  Empty,
  Progress,
  Alert,
  Tabs,
  Spin
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
  CloseCircleFilled,
  StarOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  GlobalOutlined,
  BookOutlined,
  PictureOutlined,
  TagsOutlined,
  HeartOutlined,
  TagOutlined
} from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { ActiveBlog, CreateBlog, DeleteBlogs, MangerReportBlog, SearchByTitleAndCatagery, UpdateBlog } from '../../service/Blog';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [modesort, setModeSort] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [imageModal, setImageModal] = useState({ open: false, images: [], current: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const slideshowRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [createform, setCreateForm] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    categories: {},
    recentActivity: []
  });

  useEffect(() => {
    setStatsLoading(true);
    MangerReportBlog().then((response) => {
      console.log("Manager Report Blog", response.data);
      setStats({
        total: response.data.totalblogActive + response.data.totalblogInactive,
        active: response.data.totalblogActive,
        inactive: response.data.totalblogInactive,
        categories: response.data.categories || {},
        recentActivity: response.data.recentActivity || []
      });
    }).catch((error) => {
      console.log("Error get Report Blog", error);
      message.error('Failed to load blog statistics');
    }).finally(() => {
      setStatsLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { keywordSearch: searchQuery, keywordType: category };
    SearchByTitleAndCatagery(params, currentPage, pagesize, active, sortColumn, modesort)
      .then((response) => {
        setTotalPages(response.data.totalPages || 1); // Default to 1 if undefined
        setBlogs(response.data.content || []);
        const uniqueCategories = [...new Set((response.data.content || []).map(blog => blog.blogType))];
        setCategories(uniqueCategories);
        console.log("Response", response.data);
        console.log("Blogs loaded:", response.data.content);
        console.log("Categories available:", uniqueCategories);
      })
      .catch((error) => {
        console.log("Error", error);
        message.error('Failed to load blogs');
        setBlogs([]);
        setTotalPages(1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, searchQuery, category, active, sortColumn, modesort]);

  const fetchBlogSuggestions = async (value) => {
    if (!value || value.length < 2) {
      setSearchOptions([]);
      return;
    }
    const filtered = blogs
      .filter(blog => blog.blogTitle.toLowerCase().includes(value.toLowerCase()))
      .map(blog => ({
        value: blog.blogTitle,
        label: <div>{blog.blogTitle}</div>
      }));
    setSearchOptions(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const openImageModal = (images, idx) => {
    setImageModal({ open: true, images: images || [], current: idx || 0 });
  };

  const nextImage = () => {
    setImageModal((prev) => ({
      ...prev,
      current: (prev.current + 1) % (prev.images.length || 1)
    }));
  };

  const prevImage = () => {
    setImageModal((prev) => ({
      ...prev,
      current: (prev.current - 1 + (prev.images.length || 1)) % (prev.images.length || 1)
    }));
  };

  useEffect(() => {
    if (imageModal.open && imageModal.images.length > 1) {
      slideshowRef.current = setInterval(() => {
        setImageModal((prev) => ({
          ...prev,
          current: (prev.current + 1) % prev.images.length
        }));
      }, 30000);
      return () => clearInterval(slideshowRef.current);
    }
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
    <div className="manage-blog-pagination" role="navigation" aria-label="Blog pagination">
      {current > 1 && (
        <button
          className="manage-blog-page-button"
          onClick={() => setPage(current - 1)}
          aria-label="Previous page"
        >
          ←
        </button>
      )}
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`manage-blog-page-button ${i === current ? 'active' : ''}`}
          onClick={() => setPage(i)}
          aria-label={`Page ${i}`}
          aria-current={i === current ? 'page' : undefined}
        >
          {i}
        </button>
      ))}
      {current < total && (
        <button
          className="manage-blog-page-button"
          onClick={() => setPage(current + 1)}
          aria-label="Next page"
        >
          →
        </button>
      )}
    </div>
  );

  function handleActive(id) {
    console.log("Attempting to activate blog with ID:", id);
    ActiveBlog(id).then((response) => {
      console.log("Active Successfully", response.data);
      message.success({
        content: 'Blog activated successfully!',
        duration: 3,
        style: { marginTop: '20vh' },
      });
      setBlogs(prevBlogs => prevBlogs.map(blog => 
        blog.blogId === id ? { ...blog, active: true } : blog
      ));
      setStats(prev => ({
        ...prev,
        active: prev.active + 1,
        inactive: prev.inactive - 1,
      }));
      setCurrentPage(1);
    }).catch((error) => {
      console.log("Error", error);
      message.error({
        content: 'Failed to activate blog. Please try again.',
        duration: 3,
        style: { marginTop: '20vh' },
      });
    });
  }

  function reloadStats() {
    setStatsLoading(true);
    MangerReportBlog().then((response) => {
      setStats({
        total: response.data.totalblogActive + response.data.totalblogInactive,
        active: response.data.totalblogActive,
        inactive: response.data.totalblogInactive,
        categories: response.data.categories || {},
        recentActivity: response.data.recentActivity || []
      });
    }).catch(() => {
      message.error('Failed to load blog statistics');
    }).finally(() => {
      setStatsLoading(false);
    });
  }

  function handleDelete(id) {
    console.log("Attempting to delete blog with ID:", id);
    DeleteBlogs(id).then((response) => {
      console.log("Delete Successfully", response.data);
      message.success({
        content: 'Blog deleted successfully!',
        duration: 3,
        style: { marginTop: '20vh' },
      });
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.blogId !== id));
      reloadStats();
      setCurrentPage(1);
    }).catch((error) => {
      console.log("Error", error);
      message.error({
        content: 'Failed to delete blog. Please try again.',
        duration: 3,
        style: { marginTop: '20vh' },
      });
    });
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
        <Tooltip title={images && images.length > 0 ? `View ${images.length} image(s)` : 'No images'}>
          <Avatar
            size={64}
            shape="square"
            src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/64x64?text=No+Image"}
            alt={record.blogTitle}
            style={ { 
              borderRadius: 12, 
              cursor: 'pointer',
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onClick={() => images && images.length > 0 && openImageModal(images, 0)}
          />
        </Tooltip>
      ),
    },
    {
      title: (
        <Space>
          <FileTextOutlined style={{color:'#fff'}} />
          <span style={{color:'#fff'}}>Blog Title</span>
          {getSortIcon('blogTitle')}
        </Space>
      ),
      dataIndex: 'blogTitle',
      key: 'title',
      sorter: true,
      render: (text, record) => (
        <div>
          <Text strong style={{ fontSize: 15, color: '#1e293b' }}>
            {text}
          </Text>
          {record.blogContent && (
            <Paragraph 
              ellipsis={{ rows: 2, tooltip: record.blogContent }}
              style={{ 
                fontSize: 12, 
                color: '#fff', 
                margin: '4px 0 0 0',
                lineHeight: 1.4
              }}
            >
              {record.blogContent}
            </Paragraph>
          )}
        </div>
      ),
    },
    {
      title: (
        <Space>
          <TagsOutlined style={{color:'#fff'}} />
          <span style={{color:'#fff'}}>Category</span>
          {getSortIcon('blogType')}
        </Space>
      ),
      dataIndex: 'blogType',
      key: 'type',
      sorter: true,
      render: (text) => (
        <Tag 
          color="blue" 
          style={{ 
            borderRadius: 8,
            padding: '4px 12px',
            fontWeight: 600,
            fontSize: 12
          }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: <span style={{color:'#fff'}}>Content</span>,
      dataIndex: 'blogContent',
      key: 'content',
      width: 80,
      render: (text, record) => (
        <Tooltip title="View full content">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setViewContent(record)}
            style={{ 
              color: '#2563eb',
              fontSize: 16,
              height: 40,
              width: 40,
              borderRadius: 8
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: (
        <Space>
          <CalendarOutlined style={{color:'#fff'}} />
          <span style={{color:'#fff'}}>Created Date</span>
          {getSortIcon('createDate')}
        </Space>
      ),
      dataIndex: 'createDate',
      key: 'date',
      sorter: true,
      render: (text) => (
        <div>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {text}
          </Text>
        </div>
      ),
    },
    {
      title: <span style={{color:'#fff'}}>Status</span>,
      dataIndex: 'active',
      key: 'status',
      width: 100,
      render: (active) => (
        <Badge
          status={active ? 'success' : 'default'}
          text={
            <span style={{ 
              fontWeight: 600,
              fontSize: 12,
              color: active ? '#10b981' : '#64748b'
            }}>
              {active ? 'Active' : 'Inactive'}
            </span>
          }
        />
      ),
    },
    {
      title: <span style={{color:'#fff'}}>Actions</span>,
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          {record.active ? (
            <Popconfirm
              title="Delete Blog"
              description={
                <div>
                  <p>Are you sure you want to delete this blog?</p>
                  <p style={{ fontWeight: 'bold', color: '#ef4444' }}>
                    "{record.blogTitle}"
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>This action cannot be undone.</p>
                </div>
              }
              onConfirm={() => handleDelete(record.blogId)}
              onCancel={() => message.info("Delete operation cancelled")}
              okText="Yes, Delete"
              cancelText="Cancel"
              okType="danger"
              placement="topRight"
              icon={<DeleteOutlined style={{ color: '#ef4444' }} />}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                title="Delete Blog"
                style={{ borderRadius: 8, height: 32, width: 32 }}
                loading={loading}
              />
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Activate Blog"
              description={
                <div>
                  <p>Are you sure you want to activate this blog?</p>
                  <p style={{ fontWeight: 'bold', color: '#10b981' }}>
                    "{record.blogTitle}"
                  </p>
                </div>
              }
              onConfirm={() => handleActive(record.blogId)}
              onCancel={() => message.info("Activate operation cancelled")}
              okText="Yes, Activate"
              cancelText="Cancel"
              okType="primary"
              placement="topRight"
              icon={<CheckCircleOutlined style={{ color: '#10b981' }} />}
            >
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                size="small"
                style={{ color: '#10b981', borderRadius: 8, height: 32, width: 32 }}
                title="Activate Blog"
                loading={loading}
              />
            </Popconfirm>
          )}
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: '#2563eb', borderRadius: 8, height: 32, width: 32 }}
            title="Edit Blog"
            onClick={() => {
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
    CreateBlog(formdata)
      .then(() => {
        message.success({
          content: 'Tạo blog thành công!',
          duration: 3,
          style: { marginTop: '20vh', fontSize: 18, zIndex: 9999 }
        });
        setCreateForm(false);
        form.resetFields();
        setCurrentPage(1);
      })
      .catch((error) => {
        message.error('Tạo blog thất bại!');
        console.log('CreateBlog error:', error);
      });
  }

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      <DynamicHeader />
      
      {console.log('Render - blogs length:', blogs.length)}
      {console.log('Render - categories:', categories)}
      {console.log('Render - category state:', category)}
      
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            borderRadius: 12,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOutlined style={{ fontSize: 24, color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Blog Management
            </div>
            <Text type="secondary" style={{ fontSize: 14, marginTop: 4, display: 'block' }}>
              Manage and organize your blog content efficiently
            </Text>
          </div>
        </Title>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Skeleton loading={statsLoading} active>
              <Statistic
                title="Total Blogs"
                value={stats.total}
                prefix={<FileTextOutlined style={{ color: '#2563eb' }} />}
                valueStyle={{ color: '#2563eb', fontSize: 28, fontWeight: 700 }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Skeleton loading={statsLoading} active>
              <Statistic
                title="Active Blogs"
                value={stats.active}
                prefix={<CheckCircleOutlined style={{ color: '#10b981' }} />}
                valueStyle={{ color: '#10b981', fontSize: 28, fontWeight: 700 }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Skeleton loading={statsLoading} active>
              <Statistic
                title="Inactive Blogs"
                value={stats.inactive}
                prefix={<StopOutlined style={{ color: '#f59e0b' }} />}
                valueStyle={{ color: '#f59e0b', fontSize: 28, fontWeight: 700 }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Skeleton loading={statsLoading} active>
              <Statistic
                title="Categories"
                value={Object.keys(stats.categories).length}
                prefix={<TagsOutlined style={{ color: '#8b5cf6' }} />}
                valueStyle={{ color: '#8b5cf6', fontSize: 28, fontWeight: 700 }}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24, borderRadius: 16 }}>
        <div className="filter-action-row">
          <form className="searchBar" onSubmit={e => { e.preventDefault(); handleSearch(); }} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            gap: 50,
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            width: '800',
            maxWidth: 1000,
            margin: '0 auto',
            overflow: 'visible',
          }}>
            <AutoComplete
              options={searchOptions}
              value={searchQuery}
              onSelect={val => { setSearchQuery(val); setCurrentPage(1); handleSearch(); }}
              onSearch={fetchBlogSuggestions}
              onChange={val => { setSearchQuery(val); setCurrentPage(1); fetchBlogSuggestions(val); }}
              style={{ width: 500 }}
            >
              <Input
                placeholder="Find for title..."
                allowClear
                style={{
                  borderRadius: 30,
                  background: '#fff',
                  color: '#222',
                  border: '1.5px solid #e0e7ef',
                  boxShadow: '0 2px 12px rgba(30,58,138,0.04)',
                  gap: 30,
                  minWidth: 400,
                }}
                suffix={
                  <SearchOutlined
                    style={{ color: '#2563eb', fontSize: 22, cursor: 'pointer' }}
                    onClick={handleSearch}
                  />
                }
                onPressEnter={handleSearch}
              />
            </AutoComplete>
            <select 
              name="category" 
              aria-label="Chọn thể loại" 
              onChange={e => setCategory(e.target.value)} 
              value={category}
              style={{
                borderRadius: 30,
                border: '1.5px solid #e0e7ef',
                height: 44,
                minWidth: 200,
                padding: '0 16px',
                fontSize: 15,
                background: '#fff',
                color: '#222',
                marginLeft: 8
              }}
            >
              <option value="">ALL CATERGORY</option>
              {categories && categories.length > 0 && categories.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => { 
                setSortColumn(null); 
                setModeSort('asc'); 
                setSearchQuery('');
                setCategory('');
                setCurrentPage(1);
              }}
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
                outline: 'none',
                height: 44
              }}
              tabIndex={0}
              title="Reset bộ lọc"
            />
            <Button 
              className="primary-btn small-btn"
              onClick={() => setCreateForm(true)} 
              type="button"
              style={{
                borderRadius: 40,
                height: 54,
                fontWeight: 600,
                fontSize: 15,
                marginLeft: 3,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 12px rgba(30,58,138,0.04)'
              }}
            >
              <PlusOutlined style={{fontSize: '1rem', marginRight: 6}} />
              Create Blog
            </Button>
          </form>
        </div>

        <Tabs
          className="custom-tabs"
          activeKey={activeTab}
          items={[
            {
              key: 'active',
              label: (
                <span
                  style={{
                    background: activeTab === 'active' ? '#22c55e' : 'none',
                    color: '#222',
                    borderRadius: 20,
                    padding: '6px 24px',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <CheckCircleOutlined />
                  <span>Active</span>
                  <span
                    style={{
                      background: 'transparent',
                      color: '#222',
                      fontWeight: 700,
                      marginLeft: 4
                    }}
                  >
                    {stats.active}
                  </span>
                </span>
              ),
            },
            {
              key: 'inactive',
              label: (
                <span
                  style={{
                    background: activeTab === 'inactive' ? '#ef4444' : 'none',
                    color: '#222',
                    borderRadius: 20,
                    padding: '6px 24px',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <StopOutlined />
                  <span>Inactive</span>
                  <span
                    style={{
                      background: 'transparent',
                      color: '#222',
                      fontWeight: 700,
                      marginLeft: 4
                    }}
                  >
                    {stats.inactive}
                  </span>
                </span>
              ),
            },
          ]}
          onChange={(key) => {
            setActiveTab(key);
            setActive(key === 'active');
            setCurrentPage(1);
          }}
        />
      </Card>

      <div className="pagination-desc">
        <Space>
          <InfoCircleOutlined />
          Page {currentPage} of {totalPages} • Showing {blogs.length} blogs per page
        </Space>
      </div>

      <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
        <Table
          className="blog-table"
          columns={columns}
          dataSource={blogs.filter(blog => activeTab === 'active' ? blog.active : !blog.active)}
          rowKey="blogId"
          loading={loading}
          pagination={false}
          onChange={(pagination, filters, sorter) => {
            if (sorter.field) {
              setSortColumn(sorter.field);
              setModeSort(sorter.order === 'ascend' ? 'asc' : 'desc');
            }
          }}
          scroll={{ x: 1000 }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    No blogs found
                    {searchQuery && ` for "${searchQuery}"`}
                  </span>
                }
              />
            )
          }}
        />
        {totalPages > 1 && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            {renderPagination(totalPages, currentPage, setCurrentPage)}
          </div>
        )}
      </Card>

      <Modal
        title={
          <Space>
            <FileTextOutlined />
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              {viewContent?.blogTitle}
            </span>
          </Space>
        }
        open={!!viewContent}
        onCancel={() => setViewContent(null)}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{ marginBottom: 20 }}>
            <Space wrap>
              <Tag color="blue" style={{ borderRadius: 8, padding: '6px 12px' }}>
                {viewContent?.blogType}
              </Tag>
              <Text type="secondary" style={{ fontSize: 14 }}>
                <CalendarOutlined style={{ marginRight: 6 }} />
                {viewContent?.createDate}
              </Text>
            </Space>
          </div>
          <Divider />
          <div style={{ 
            whiteSpace: 'pre-line', 
            fontSize: 16, 
            lineHeight: 1.8,
            color: '#1e293b',
            fontFamily: 'Inter, sans-serif'
          }}>
            {viewContent?.blogContent}
          </div>
        </div>
      </Modal>

      <Modal
        className="service-image-modal"
        open={imageModal.open}
        onCancel={() => setImageModal({ open: false, images: [], current: 0 })}
        footer={null}
        width={1000}
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
                maxHeight: 600,
                objectFit: 'contain',
                borderRadius: 16,
                background: 'transparent',
                margin: '0 auto',
                display: 'block',
                border: 'none',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            />
            <button
              onClick={() => setImageModal({ open: false, images: [], current: 0 })}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                background: 'rgba(37,99,235,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.9)'}
              aria-label="Close"
            >
              <CloseCircleFilled style={{ fontSize: 24, color: '#fff' }} />
            </button>
            {imageModal.images.length > 1 && (
              <>
                <button
                  onClick={() => { clearInterval(slideshowRef.current); prevImage(); }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 16,
                    transform: 'translateY(-50%)',
                    background: 'rgba(37,99,235,0.9)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.9)'}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={() => { clearInterval(slideshowRef.current); nextImage(); }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: 16,
                    transform: 'translateY(-50%)',
                    background: 'rgba(37,99,235,0.9)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.9)'}
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              zIndex: 10
            }}>
              {imageModal.current + 1} / {imageModal.images.length}
            </div>
            {imageModal.images.length > 1 && (
              <div style={{ 
                marginTop: 20,
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 12,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 800,
                margin: '20px auto 0',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                overflowX: 'auto',
                scrollbarWidth: 'thin'
              }}>
                {imageModal.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    onClick={() => { 
                      clearInterval(slideshowRef.current); 
                      setImageModal((prev) => ({ ...prev, current: idx })); 
                    }}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: idx === imageModal.current ? '3px solid #2563eb' : '2px solid rgba(255,255,255,0.3)',
                      boxShadow: idx === imageModal.current ? '0 0 16px rgba(37,99,235,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      opacity: idx === imageModal.current ? 1 : 0.7,
                      transition: 'all 0.3s ease',
                      background: idx === imageModal.current ? '#e0e7ff' : 'transparent'
                    }}
                    onMouseOver={e => e.currentTarget.style.border = '3px solid #60a5fa'}
                    onMouseOut={e => e.currentTarget.style.border = idx === imageModal.current ? '3px solid #2563eb' : '2px solid rgba(255,255,255,0.3)'}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title={
          <Space>
            <PlusOutlined />
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              Create New Blog
            </span>
          </Space>
        }
        open={createform}
        onCancel={() => {
          setCreateForm(false);
          form.resetFields();
        }}
        width={900}
        onOk={() => form.submit()}
        okText="Create Blog"
        cancelText="Cancel"
        okButtonProps={{ 
          style: { 
            borderRadius: 8,
            fontWeight: 600,
            height: 40
          } 
        }}
        cancelButtonProps={{ 
          style: { 
            borderRadius: 8,
            height: 40
          } 
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateAndEdit}
          style={{ marginTop: 16 }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label={
                  <Space>
                    <FileTextOutlined />
                    Blog Title
                  </Space>
                }
                name="blogTitle"
                rules={[{ required: true, message: 'Please enter the blog title' }]}
              >
                <Input 
                  placeholder="Enter an engaging blog title" 
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <Space>
                    <TagsOutlined />
                    Blog Category
                  </Space>
                }
                name="blogType"
                rules={[{ required: true, message: 'Please select the blog category' }]}
              >
                <Input 
                  placeholder="Enter blog category" 
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={
              <Space>
                <BookOutlined />
                Blog Content
              </Space>
            }
            name="blogContent"
            rules={[{ required: true, message: 'Please enter the blog content' }]}
          >
            <Input.TextArea
              rows={10}
              placeholder="Write your engaging blog content here..."
              maxLength={5000}
              showCount
              style={{ borderRadius: 8, fontSize: 14 }}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                <PictureOutlined />
                Upload Images
              </Space>
            }
            name="imageUrls"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            rules={[{ required: true, message: 'Please upload at least one image' }]}
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
              style={{ borderRadius: 8 }}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', background: '#f4f8ff', marginTop: '40px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default ManageBlog;