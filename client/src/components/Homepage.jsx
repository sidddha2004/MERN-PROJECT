import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    githubLink: '',
    thumbnail: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      const response = await axios.post('/api/projects', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Project added successfully');
      navigate('/viewProjects');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while adding the project');
    }
  };

  return (
    <div style={containerStyle}>
      <h1>This is the homepage</h1>
      <div style={formContainerStyle}>
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            required
            style={inputStyle}
          />
          <br />
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            placeholder="GitHub Repository Link"
            required
            style={inputStyle}
          />
          <br />
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <br />
          <button type="submit" style={buttonStyle}>Add Project</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={() => navigate('/viewProjects')} style={buttonStyle}>View Projects</button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  textAlign: 'center'
};

const formContainerStyle = {
  marginTop: '20px',
  textAlign: 'left'
};

const buttonContainerStyle = {
  marginTop: '20px'
};

const inputStyle = {
  display: 'block',
  width: '300px',
  margin: '10px auto',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default HomePage;
