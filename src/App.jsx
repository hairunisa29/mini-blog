/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Hello World",
      content:
        "Jeon Wonwoo is the lead rapper and sub-vocalist of the boy group SEVENTEEN under Pledis Entertainment. He is also a member of the group's rap unit.",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [isUpdate, setIsUpdate] = useState({
    id: null,
    status: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let duplicatePosts = [...posts];

    if (isUpdate.status) {
      duplicatePosts.forEach((post) => {
        if (post.id === isUpdate.id) {
          post.title = formData.title;
          post.content = formData.content;
        }
      });

      setIsUpdate({
        id: null,
        status: false,
      });
    } else {
      duplicatePosts.push({
        id: posts.length + 1,
        title: formData.title,
        content: formData.content,
      });
    }

    setPosts(duplicatePosts);

    setFormData({
      title: "",
      content: "",
    });
  };

  const onClickEdit = (id) => {
    let duplicatePosts = [...posts];
    const foundData = duplicatePosts.find((post) => post.id === id);

    setIsUpdate({
      id: id,
      status: true,
    });

    setFormData({
      title: foundData.title,
      content: foundData.content,
    });
  };

  const onClickDelete = (id) => {
    let duplicatePosts = [...posts];
    const filteredData = duplicatePosts.filter((post) => post.id !== id);
    setPosts(filteredData);
  };

  const onClickCancel = () => {
    setIsUpdate({
      id: null,
      status: false,
    });
  };

  return (
    <>
      <h2 className="text-center">Mini Blog</h2>

      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            name="title"
            className="form-control"
            id="title"
            placeholder="Insert blog title..."
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            className="form-control"
            name="content"
            rows="4"
            cols="50"
            placeholder="Insert blog content..."
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        {!isUpdate.status && (
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        )}

        {isUpdate.status && (
          <div className="d-flex justify-content-between gap-3">
            <button className="btn btn-success w-50" type="submit">
              Save
            </button>
            <button className="btn btn-danger w-50" onClick={onClickCancel}>
              Cancel
            </button>
          </div>
        )}
      </form>

      <div className="row mt-3">
        {posts.map((post) => (
          <Blog
            data={post}
            key={post.id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ))}
      </div>
    </>
  );
}

function Blog({ data, onClickEdit, onClickDelete }) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">{data.content}</p>
          <div className="d-flex justify-content-between gap-3">
            <button
              className="btn btn-outline-success w-50"
              onClick={() => onClickEdit(data.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger w-50"
              onClick={() => onClickDelete(data.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
