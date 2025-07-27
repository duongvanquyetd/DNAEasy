import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined, CheckCircleOutlined, CloseCircleOutlined, BookOutlined, QuestionCircleOutlined, SearchOutlined, ArrowUpOutlined, ArrowDownOutlined, SortAscendingOutlined, SortDescendingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageBlog.css';
import { ActiveBlog, CreateBlog, DeleteBlogs, MangerReportBlog, SearchByTitleAndCatagery, UpdateBlog } from '../../service/Blog';
import dayjs from 'dayjs';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();
  const [toast, setToast] = useState(null);



  const [totalactive, setTotalactive] = useState('');
  const [totalinactive, setTotalInActive] = useState('')

  const [createform, setCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [edit, setEdit] = useState(false)
  const [error, setError] = useState('');
  const [removeUrls, setRemovedUrls] = useState([]);
  const [active, setActive] = useState(true);
  const [viewContent, setViewContent] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [modesort, setModeSort] = useState("asc")
  const [preview, setPreview] = useState({ open: false, images: [], current: 0 });
  const previewInterval = useRef(null);
  const [helpModal, setHelpModal] = useState(false);
  useEffect(() => {
    MangerReportBlog().then((response) => {
      console.log("Manager Report Blog", response.data)
      setTotalInActive(response.data.totalblogInactive)
      setTotalactive(response.data.totalblogActive)
    }).catch((error) => {
      console.log("Error get Report Blog", error)
    })
  }, []);

  useEffect(() => {

    SearchByTitleAndCatagery({ keywordSearch: searchQuery, keywordType: category }, currentPage, pagesize, active, sortColumn, modesort).then((response) => {
      setTotalPages(response.data.totalPages)
      setBlogs(response.data.content)
      console.log("Response", response.data)
    }).catch((error) => {
      console.log("Error", error)
    })


  }, [currentPage, searchQuery, category, active,sortColumn,modesort])

  useEffect(() => {
    if (preview.open && preview.images.length > 1) {
      previewInterval.current = setInterval(() => {
        setPreview(prev => ({ ...prev, current: (prev.current + 1) % prev.images.length }));
      }, 5000);
      return () => clearInterval(previewInterval.current);
    }
    return () => clearInterval(previewInterval.current);
  }, [preview.open, preview.images.length]);

  const renderPagination = (total, current, setPage) => {
    if (!total || total <= 0) return null;
    return (
      <div className="custom-pagination">
        <button
          className="page-rect"
          onClick={() => setPage(current - 1)}
          disabled={current === 1}
        >
          <LeftOutlined style={{ marginRight: 6 }} /> Previous
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            className={`page-box${i === current ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-current={i === current ? 'page' : undefined}
          >
            {i}
          </button>
        ))}
        <button
          className="page-rect"
          onClick={() => setPage(current + 1)}
          disabled={current === total}
        >
          Next <RightOutlined style={{ marginLeft: 6 }} />
        </button>
      </div>
    );
  };


  function handleActive(id) {
    ActiveBlog(id)
      .then(() => {
        setToast({ type: 'success', message: 'Activate blog successfully!' });
        setSearchQuery((pre) => pre + " ");
        MangerReportBlog().then((response) => {
          setTotalInActive(response.data.totalblogInactive);
          setTotalactive(response.data.totalblogActive);
        });
        setTimeout(() => setToast(null), 1500);
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Activate blog failed!' });
        setTimeout(() => setToast(null), 2000);
      });
  } 

  function handleDelete(id) {
    DeleteBlogs(id)
      .then(() => {
        setToast({ type: 'success', message: 'Delete blog successfully!' });
        setSearchQuery((pre) => pre + " ");
        MangerReportBlog().then((response) => {
          setTotalInActive(response.data.totalblogInactive);
          setTotalactive(response.data.totalblogActive);
        });
        setTimeout(() => setToast(null), 1500);
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Delete blog failed!' });
        setTimeout(() => setToast(null), 2000);
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
    if (edit) {
      formdata.append("removeimg", new Blob([JSON.stringify(removeUrls)], { type: "application/json" }));
      UpdateBlog(edit.blogId, formdata)
        .then(() => {
          setToast({ type: 'success', message: 'Update blog successfully!' });
          setEdit(false);
          setSearchQuery((pre) => pre + " ");
          setCreateForm(false);
          form.resetFields();
          setError('');
          setTimeout(() => setToast(null), 1500);
        })
        .catch((error) => {
          setToast({ type: 'error', message: 'Update blog failed!' });
          setError(error.response?.data?.error);
           setTimeout(() => setToast(null), 2000);
        });
    } else {
      CreateBlog(formdata)
        .then(() => {
          setToast({ type: 'success', message: 'Create blog successfully!' });
          setCurrentPage(totalPages);
          setCreateForm(false);
          form.resetFields();
          setError('');
          // setTimeout(() => setToast(null), 1500);
        })
        .catch((error) => {
          setToast({ type: 'error', message: 'Create blog failed!' });
          setError(error.response?.data?.error);
          // setTimeout(() => setToast(null), 2000);
        });
    }
  }
  // Hàm trả về icon sort kiểu AZ trắng
  const getSortAZIcon = (column) => {
    const iconStyle = { color: '#fff', fontSize: 18, verticalAlign: 'middle', marginRight: 2 };
    if (sortColumn === column) {
      return modesort === 'asc' ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 6 }}>
          <SortAscendingOutlined style={iconStyle} />
        </span>
      ) : (
        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 6 }}>
          <SortDescendingOutlined style={iconStyle} />
        </span>
      );
    }
    // Khi chưa sort, vẫn hiện icon mờ
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 6, opacity: 0.5 }}>
        <SortDescendingOutlined style={iconStyle} />
      </span>
    );
  };
  return (
    <>
      <DynamicHeader />
      
      {toast && (
        <div className={`toast-notification ${toast.type === 'error' ? 'error' : ''}`}>
          {toast.message}
        </div>
      )}
      <div className="manage-blog-container">
        {/* Blog Management Header */}
        <div className="manage-blog-header">
          <BookOutlined style={{fontSize: 38, color: '#1e3a8a', marginRight: 16}} />
          <div>
            <h1 className="manage-blog-title">Blog Management</h1>
            <div className="manage-blog-subtitle-row" style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div className="manage-blog-subtitle">
                Easily add, edit, search, and manage your blogs in a professional way.
              </div>
              <QuestionCircleOutlined 
                style={{color: '#1e3a8a', fontSize: 22, cursor: 'pointer', transition: 'color 0.2s'}} 
                title="User Guide" 
                onClick={() => setHelpModal(true)}
              />
            </div>
          </div>
        </div>
        <div className="manage-blog-stats-row">
          <div className="manage-blog-stats-card">
            <AppstoreOutlined style={{ fontSize: 28, color: '#1890ff', marginBottom: 6 }} />
            <span className="manage-blog-stats-label">Total Blog</span>
            <span className="manage-blog-stats-value">{totalactive + totalinactive}</span>
          </div>
          <div className="manage-blog-stats-card">
            <CheckCircleOutlined style={{ fontSize: 28, color: '#52c41a', marginBottom: 6 }} />
            <span className="manage-blog-stats-label">Active</span>
            <span className="manage-blog-stats-value manage-blog-stats-active">{totalactive}</span>
          </div>
          <div className="manage-blog-stats-card">
            <CloseCircleOutlined style={{ fontSize: 28, color: '#ff4d4f', marginBottom: 6 }} />
            <span className="manage-blog-stats-label">Inactive</span>
            <span className="manage-blog-stats-value manage-blog-stats-inactive">{totalinactive}</span>
          </div>
        </div>
        <section className="manage-blog-filter-section">
          <form className="manage-blog-search-bar" onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}>
            <Input
              className="manage-blog-search-input"
              type="text"
              placeholder="Search blog posts..."
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog posts"
              prefix={<i className="anticon anticon-search" />}
            />
            <Select
              className="manage-blog-category-select"
              aria-label="Select blog category"
              onChange={(value) => setCategory(value)}
              value={category || ''}
              allowClear
              placeholder="All Categories"
              style={{ minWidth: 180 }}
            >
              <Select.Option value="">All Categories</Select.Option>
              {blogs.length > 0 && (
                blogs.map((blog) => (
                  <Select.Option key={blog.blogType} value={blog.blogType}>
                    {blog.blogType}
                  </Select.Option>
                ))
              )}
            </Select>
            <Button htmlType="submit" className="manage-blog-search-btn" type="primary">
              Search
            </Button>
          </form>
        </section>
        <div className="manage-blog-action-row">
          <Button className="manage-blog-action-btn" type={active ? "primary" : "default"} onClick={() => { setActive(true); setCurrentPage(1); }}>Active Blogs</Button>
          <Button className="manage-blog-action-btn" type={!active ? "primary" : "default"} onClick={() => { setActive(false); setCurrentPage(1); }}>Inactive Blogs</Button>
          <Button className="manage-blog-action-btn manage-blog-create-btn" type="primary" icon={<PlusOutlined />} onClick={() => setCreateForm(true)}>Create Blog</Button>
          <Button className="manage-blog-action-btn" onClick={() => { setSortColumn(null); setModeSort(null); }}>No sort</Button>
        </div>
        {
          blogs && blogs.length > 0 ? (
            <table className="manage-blog-table">
              <thead>
                <tr>
                  <th>Blogs image</th>
                  <th onClick={() => { setSortColumn('blogTitle'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>
                    Blog Title {getSortAZIcon('blogTitle')}
                  </th>
                  <th onClick={() => { setSortColumn('blogType'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>
                    Blog type {getSortAZIcon('blogType')}
                  </th>
                  <th>Blog content</th>
                  <th onClick={() => { setSortColumn('createDate'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>
                    Create Date {getSortAZIcon('createDate')}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, idx) => (
                  <tr key={blog.blogId ? `blog-${blog.blogId}` : `idx-${idx}`} className="manage-blog-table-row">
                    <td>
                      {blog.blogimage && blog.blogimage.length > 0 ? (
                        <img
                          className="manage-blog-img"
                          src={blog.blogimage[0]}
                          alt={blog.blogTitle}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setPreview({ open: true, images: blog.blogimage, current: 0 });
                          }}
                        />
                      ) : (
                        <img
                          className="manage-blog-img manage-blog-img-default"
                          src="https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                          alt="default"
                        />
                      )}
                    </td>
                    <td>{blog.blogTitle}</td>
                    <td>{blog.blogType}</td>
                    <td>
                      <Tooltip title="View Content">
                        <EyeOutlined onClick={() => setViewContent(blog)} className="manage-blog-view-icon" />
                      </Tooltip>
                    </td>
                    <td>{dayjs(blog.createDate).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <div className="manage-blog-action-group">
                        {blog.active ? (
                          <Tooltip title="Delete blog">
                            <Popconfirm
                              title="Delete Blog"
                              description={
                                <div>
                                  <p>Are you sure you want to delete this blog?</p>
                                  <p style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                                    "{blog.blogTitle}"
                                  </p>
                                  <p style={{ fontSize: '12px', color: '#999' }}>
                                    This action cannot be undone.
                                  </p>
                                </div>
                              }
                              onConfirm={() => handleDelete(blog.blogId)}
                              onCancel={() => message.info('Delete operation cancelled')}
                              okText="Yes, Delete"
                              cancelText="Cancel"
                              okType="danger"
                              placement="topRight"
                              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                              className="manage-blog-popconfirm"
                            >
                              <Button className="manage-blog-action-btn manage-blog-delete-btn" size="small" icon={<DeleteOutlined />}>Delete</Button>
                            </Popconfirm>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate blog">
                            <Button className="manage-blog-action-btn manage-blog-active-btn" size="small" icon={<CheckCircleOutlined />} onClick={() => handleActive(blog.blogId)}>Active</Button>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit blog">
                          <Button className="manage-blog-action-btn manage-blog-edit-btn" size="small" icon={<EditOutlined />} onClick={() => {
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
                                url: url
                              }))
                            });
                          }}>Edit</Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <SearchOutlined style={{ fontSize: 48, color: '#a3aed6', marginBottom: 12 }} />
              <div style={{ fontSize: 20, color: '#888', fontWeight: 600, marginBottom: 6 }}>
                No blogs found matching your search.
              </div>
              <div style={{ fontSize: 15, color: '#bbb' }}>
                Try adjusting your search keyword or filter.
              </div>
            </div>
          )
        }
        <Modal
          className="manage-blog-modal"
          title={edit ? "Edit Blog" : "Create New Blog"}
          open={createform}
          onCancel={() => {
            setCreateForm(false);
            form.resetFields();
            setEdit(false);
            setError('');
          }}
          width={700}
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
              label="Blog Title"
              name="blogTitle"
              rules={[{ required: true, message: 'Please enter the Blog title' }]}
            >
              <Input className="manage-blog-form-input" />
            </Form.Item>
            <Form.Item
              label="Blog Type"
              name="blogType"
              rules={[{ required: true, message: 'Please select the Blog type' }]}
            >
              <Input className="manage-blog-form-input" />
            </Form.Item>
            <Form.Item
              label="Blog Content"
              name="blogContent"
              rules={[{ required: true, message: 'Please enter the Blog Content' }]}
            >
              <Input.TextArea
                className="manage-blog-form-textarea"
                rows={6}
                autoSize={{ minRows: 6, maxRows: 20 }}
                maxLength={5000}
                showCount
                placeholder="Input content Blog....."
              />
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
            {error && (
              <Form.Item>
                <div className="manage-blog-form-error">{error}</div>
              </Form.Item>
            )}
          </Form>
        </Modal>
        <Modal
          className="manage-blog-modal-view"
          title={
            <h2 className="manage-blog-modal-title">
              {viewContent?.blogTitle}
            </h2>
          }
          open={!!viewContent}
          onCancel={() => setViewContent(null)}
          footer={null}
          width={800}
          bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
          <p className="manage-blog-modal-content">
            {viewContent?.blogContent}
          </p>
        </Modal>
        <Modal
          open={preview.open}
          footer={null}
          onCancel={() => setPreview({ open: false, images: [], current: 0 })}
          className="manage-blog-image-preview-modal"
          centered
          width={900}
          bodyStyle={{ textAlign: 'center', padding: 0, background: 'transparent' }}
          closable={false}
        >
          {preview.images.length > 0 && (
            <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
              <img
                src={preview.images[preview.current]}
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
                className="custom-close-btn"
                onClick={() => setPreview({ open: false, images: [], current: 0 })}
                aria-label="Close"
                style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
              >
                <span style={{ fontSize: 32, color: '#222', fontWeight: 700, lineHeight: 1 }}>×</span>
              </button>
              {preview.images.length > 1 && (
                <>
                  <button
                    onClick={() => setPreview(prev => ({ ...prev, current: (prev.current - 1 + prev.images.length) % prev.images.length }))}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(24,144,255,0.18)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      fontSize: 26,
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                    aria-label="Previous image"
                  >&#8592;</button>
                  <button
                    onClick={() => setPreview(prev => ({ ...prev, current: (prev.current + 1) % prev.images.length }))}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(24,144,255,0.18)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      fontSize: 26,
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                    aria-label="Next image"
                  >&#8594;</button>
                </>
              )}
              {/* Số thứ tự ảnh */}
              <div style={{
                margin: '18px 0 8px 0',
                color: '#222',
                fontWeight: 600,
                fontSize: 18,
                textAlign: 'center',
                textShadow: '0 2px 8px #000a'
              }}>
                {preview.current + 1} / {preview.images.length}
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
                {preview.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    onClick={() => setPreview(prev => ({ ...prev, current: idx }))}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: idx === preview.current ? '3px solid #1890ff' : '2px solid #fff',
                      boxShadow: idx === preview.current ? '0 0 12px #1890ff88, 0 2px 8px #1890ff22' : '0 1px 4px #0002',
                      cursor: 'pointer',
                      opacity: idx === preview.current ? 1 : 0.7,
                      transition: 'all 0.2s',
                      background: idx === preview.current ? '#e0e7ff' : '#23272f'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </Modal>
        <div className="manage-blog-pagination-row">
          {renderPagination(totalPages, currentPage, setCurrentPage)}
        </div>
      </div>
      <div className="manage-blog-footer">
        <Footer />
      </div>
      <Modal
        open={helpModal}
        onCancel={() => setHelpModal(false)}
        footer={null}
        title={
          <span style={{display:'flex',alignItems:'center',gap:8}}>
            <QuestionCircleOutlined style={{color:'#1e3a8a',fontSize:24}}/>
            Blog Management Guide
          </span>
        }
        className="help-modal-custom"
      >
        <ul style={{textAlign:'left',fontSize:'1.08rem',lineHeight:'1.7',margin:'18px 0'}}>
          <li><b>Create blog:</b> Click <span style={{color:'#1e3a8a'}}>Create Blog</span> to add a new blog.</li>
          <li><b>Filter & search:</b> Use the search box and filters to quickly find blogs.</li>
          <li><b>Edit/Delete:</b> Click the <EditOutlined style={{color:'#1e3a8a'}}/> or <DeleteOutlined style={{color:'#dc2626'}}/> icon to edit/delete a blog (with confirmation).</li>
          <li><b>Help:</b> Click <QuestionCircleOutlined style={{color:'#1e3a8a'}}/> to view this guide at any time.</li>
        </ul>
      </Modal>
    </>
  );
};

export default ManageBlog;