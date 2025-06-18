import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Header from '../Header';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { useNavigate } from 'react-router-dom';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Published Date',
      dataIndex: 'publishDate',
      key: 'publishDate',
      sorter: (a, b) => new Date(a.publishDate) - new Date(b.publishDate),
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
      // Add your delete API call here
      message.success('Blog deleted successfully');
      setBlogs(blogs.filter(blog => blog.id !== id));
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
            // Add your update API call here
            const updatedBlog = { ...editingBlog, ...values };
            setBlogs(blogs.map(blog => 
              blog.id === editingBlog.id ? updatedBlog : blog
            ));
            message.success('Blog updated successfully');
          } else {
            // Add your create API call here
            const newBlog = { 
              id: Date.now(),
              ...values,
              publishDate: new Date().toISOString()
            };
            setBlogs([...blogs, newBlog]);
            message.success('Blog created successfully');
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
    <div className="manage-blog">
      <Header />
      <div className="manage-blog-content">
        <div className="manage-blog-header">
          <h1>Manage Blogs</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add New Blog
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={blogs}
          rowKey="id"
          loading={loading}
        />

        <Modal
          title={editingBlog ? "Edit Blog" : "Add New Blog"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: 'Please input the author!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: 'Please input the content!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default ManageBlog;