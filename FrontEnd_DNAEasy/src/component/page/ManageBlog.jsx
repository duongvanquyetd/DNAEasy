import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Card, Row, Col, Statistic, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { useNavigate } from 'react-router-dom';
import { GetALlBlog } from '../../service/Blog';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await GetALlBlog();
      if (response.data) {
        setBlogs(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  // Statistics
  const totalBlogs = blogs.length;
  const totalAuthors = new Set(blogs.map(blog => blog.author || '-')).size;
  const latestBlog = blogs.reduce((latest, blog) => {
    if (!latest) return blog;
    return new Date(blog.date || blog.publishDate) > new Date(latest.date || latest.publishDate) ? blog : latest;
  }, null);

  const columns = [
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
          <span style={{ fontWeight: 600, color: '#333' }}>{text || <span style={{ color: '#bbb' }}>—</span>}</span>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => (record.title || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'AUTHOR',
      dataIndex: 'author',
      key: 'author',
      render: (author) => (
        <Tag color="blue" style={{ borderRadius: '6px', fontWeight: 500, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', color: 'white' }}>{author || <span style={{ color: '#fff' }}>—</span>}</Tag>
      ),
    },
    {
      title: 'PUBLISHED DATE',
      dataIndex: 'publishDate',
      key: 'publishDate',
      sorter: (a, b) => new Date(a.publishDate || 0) - new Date(b.publishDate || 0),
      render: (date) => date ? new Date(date).toLocaleDateString() : <span style={{ color: '#bbb' }}>—</span>,
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Blog">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
              size="small"
              style={{ minWidth: 80, fontWeight: 600 }}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete Blog">
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.id || record.blogId)}
              size="small"
              style={{ minWidth: 80, fontWeight: 600 }}
            >
              Delete
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingBlog(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    form.setFieldsValue(blog);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // TODO: Add your delete API call here
      message.success('Blog deleted successfully');
      setBlogs(blogs.filter(blog => (blog.id || blog.blogId) !== id));
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          if (editingBlog) {
            // TODO: Add your update API call here
            const updatedBlog = { ...editingBlog, ...values };
            setBlogs(blogs.map(blog => (blog.id || blog.blogId) === (editingBlog.id || editingBlog.blogId) ? updatedBlog : blog));
            message.success('Blog updated successfully');
          } else {
            // TODO: Add your create API call here
            const newBlog = {
              id: Date.now(),
              ...values,
              publishDate: new Date().toISOString(),
            };
            setBlogs([...blogs, newBlog]);
            message.success('Blog created successfully');
          }
          setIsModalVisible(false);
          form.resetFields();
        } catch (error) {
          message.error('Operation failed');
        } finally {
          setLoading(false);
        }
      });
  };

  return (
    <div className="manage-blog">
      <DynamicHeader />
      <div className="manage-blog-content">
        <div className="debug-text">Blog Management Dashboard</div>
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px' }}>
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Total Blogs</span>}
                value={totalBlogs}
                prefix={<AppstoreOutlined style={{ color: '#667eea' }} />}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px' }}>
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Total Authors</span>}
                value={totalAuthors}
                prefix={<UserOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px' }}>
              <Statistic
                title={<span style={{ color: 'white', fontSize: '14px' }}>Latest Blog</span>}
                value={latestBlog ? latestBlog.title : 'N/A'}
                prefix={<CalendarOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: 'white', fontSize: '18px', fontWeight: 'bold', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              />
            </Card>
          </Col>
        </Row>
        <div className="manage-blog-header debug-header">
          <h1>Manage Blogs</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            className="add-service-btn"
            style={{ fontWeight: 600, fontSize: 16 }}
          >
            Add New Blog
          </Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={blogs}
          rowKey={record => record.id || record.blogId}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} blogs`,
          }}
        />
        <Modal
          title={editingBlog ? "Edit Blog" : "Add New Blog"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
          width={800}
          okText={editingBlog ? "Update" : "Create"}
          cancelText="Cancel"
          className="manage-service-modal"
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please input the title!' }]}
                >
                  <Input placeholder="Enter blog title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="author"
                  label="Author"
                  rules={[{ required: true, message: 'Please input the author!' }]}
                >
                  <Input placeholder="Enter author name" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: 'Please input the content!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter blog content" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default ManageBlog;