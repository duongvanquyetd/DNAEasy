
import React, { useState, useEffect, use } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Card, Row, Col, Statistic, Tag, Tooltip, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, DollarOutlined, AppstoreOutlined, TrophyOutlined } from '@ant-design/icons';
import DynamicHeader from '../DynamicHeader';
import Footer from '../Footer';
import '../css/ManageService.css';
import { ActiveBlog, CreateBlog, DeleteBlogs, MangerReportBlog, SearchByTitleAndCatagery, UpdateBlog } from '../../service/Blog';

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();



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
  useEffect(() => {
    MangerReportBlog().then((response) => {
      console.log("Manager Report Blog", response.data)
      setTotalInActive(response.data.totalblogActive)
      setTotalactive(response.data.totalblogInactive)
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
    ActiveBlog(id).then((response) => {
      console.log("Acctive Successfully", response.data);
      setSearchQuery((pre) => pre + " ")
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  function handleDelete(id) {
    DeleteBlogs(id).then((response) => {
      console.log("Delete SuccessFully", response.data)
      setSearchQuery((pre) => pre + " ")
    }).catch((error) => {
      console.log("Error", error)
    })
  }

  function handleCreateAndEdit(values) {

    const formdata = new FormData();
    const createBlogs = {

      blogTitle: values.blogTitle,
      blogContent: values.blogContent,
      blogType: values.blogType,


    }
    formdata.append("blog", new Blob([JSON.stringify(createBlogs)], { type: "application/json" }))
    if (values.imageUrls) {
      values.imageUrls.forEach(file => {
        formdata.append("file", file.originFileObj); // vi dung thu vien ant nen .originFileObj moi la File that su duoi BE moi nhan dc
      });
    }
    console.log("Create data", createBlogs)
    console.log("Image service", values.imageUrls)
    if (edit) {

      formdata.append("removeimg", new Blob([JSON.stringify(removeUrls)], { type: "application/json" }))
      UpdateBlog(edit.blogId, formdata).then((response) => {
        console.log("Update SuccessFully ", response.data)
        setEdit(false);
        setSearchQuery((pre) => pre + " ")
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        setError('');

      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
        setError(error.response?.data?.error)
      })
    }
    else {
      CreateBlog(formdata).then((response) => {
        console.log("Create Service Succesfully ", response.data)
        setCurrentPage(totalPages)
        setCreateForm(false);       // Ẩn form
        form.resetFields();
        setError('');
      }).catch((error) => {
        console.log("Erorr", error.response?.data?.error)
        setError(error.response?.data?.error)
      })
    }


  }
  return (
    <div>
      <div>
        <p>Total Blog:{totalactive + totalinactive}</p>
        <p>Total Service Active:{totalactive}</p>
        <p>Total Service InActive:{totalinactive}</p>


      </div>


      <section className="blogFilter">
        <form className="blogSearchBar" onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
        }}>
          <input
            type="text"
            placeholder="Search blog posts..."
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search blog posts"
          />
          <select
            name="category"
            aria-label="Select blog category"
            onChange={(e) => { setCategory(e.target.value); }}
            value={category || ''}
          >
            <option value="">All Categories</option>
            {blogs.length > 0 && (
              blogs.map((blog) => (
                <option key={blog.blogType} value={blog.blogType}>
                  {blog.blogType}
                </option>
              ))

            )}


          </select>
          <button type="submit" className="blogSearchBar button" aria-label="Search">
            Search
          </button>
        </form>
      </section>
      <button onClick={() => { setActive(true), setCurrentPage(1) }}>Active Blogs</button>
      <button onClick={() => { setActive(false), setCurrentPage(1) }}>InActive Blogs</button>


      <button onClick={() => setCreateForm(true)}>Create Blog  </button>
      <button onClick={() => { setSortColumn(null); setModeSort(null) }}>No sort</button>
      {
        blogs && blogs.length > 0 && (
          <table className="service-table">
            <thead>
              <tr>
                <th  >Blogs image</th>
                <th onClick={() => { setSortColumn('blogTitle'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>Blog Title</th>
                <th onClick={() => { setSortColumn('blogType'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>Blog type</th>
                <th >Blog content</th>
                <th onClick={() => { setSortColumn('createDate'); setModeSort(modesort === 'asc' ? 'desc' : 'asc') }}>Create Date</th>
                <th>Action</th>

                {/* Thêm các cột khác nếu cần */}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, idx) => (
                <tr key={blog.blogId || idx}>
                  <td>
                    {blog.blogimage && blog.blogimage.length > 0 ? (
                      <img
                        src={blog.blogimage[0]}
                        alt={blog.blogTitle}
                        style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }}
                      />
                    ) : (
                      <img
                        src="https://th.bing.com/th/id/OIP.TdX9D7lAgnLjiFIgHvflfAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                        alt="default"
                        style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, opacity: 0.5 }}
                      />
                    )}
                  </td>
                  <td>{blog.blogTitle}</td>
                  <td>{blog.blogType}</td>
                  <td>
                    <Tooltip title="View Content">
                      <EyeOutlined onClick={() => setViewContent(blog)} style={{ cursor: 'pointer', fontSize: 18 }} />
                    </Tooltip>
                  </td>

                  <td>{blog.createDate}</td>

                  <td>
                    {blog.active ? (
                      <button onClick={() => handleDelete(blog.blogId)
                      } >Delete</button>

                    ) : (
                      <button onClick={() => handleActive(blog.blogId)}>Active</button>

                    )}

                    <button onClick={() => {
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
                    }}>Edit</button>

                  </td>
                  {/* Thêm các trường khác nếu cần */}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      <Modal
        title={edit ? "Edit Service " : "Create New Service"}
        visible={createform}
        onCancel={() => {
          setCreateForm(false);
          form.resetFields();
          setEdit(false);
          setError('');
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
            label="Blog  Title"
            name="blogTitle"
            rules={[{ required: true, message: 'Please enter the Blog title' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Blog Type"
            name="blogType"
            rules={[{ required: true, message: 'Please select the Blog type' }]}
          >
            <Input />
          </Form.Item>



          <Form.Item
            label="Blog Content"
            name="blogContent"
            rules={[{ required: true, message: 'Please enter the Blog Content' }]}
          >
            <Input.TextArea
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
              <div style={{ color: 'red' }}>{error}</div>
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title={
          <h2 style={{ color: '#1890ff', margin: 0 }}>
            {viewContent?.blogTitle}
          </h2>
        }
        visible={!!viewContent}
        onCancel={() => setViewContent(null)}
        footer={null}
        width={1200}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <p style={{ whiteSpace: 'pre-line', fontSize: '18px', lineHeight: '1.8' }}>
          {viewContent?.blogContent}
        </p>
      </Modal>


      {renderPagination(totalPages, currentPage, setCurrentPage)}
    </div >
  );
};

export default ManageBlog;