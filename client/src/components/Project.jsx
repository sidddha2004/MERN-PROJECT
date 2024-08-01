import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        projectName: '',
        githubLink: '',
        thumbnail: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/projects', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/projects', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage(response.data.message);
            setProjects([...projects, response.data.project]);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage(response.data.message);
            setProjects(projects.filter((project) => project._id !== id));
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/projects/${id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage(response.data.message);
            setProjects(projects.map((project) => (project._id === id ? response.data.project : project)));
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Project</h2>
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" required />
                <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Repository Link" required />
                <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" required />
                <button type="submit">Add Project</button>
                {message && <p>{message}</p>}
            </form>
            <div>
                <h2>Your Projects</h2>
                {projects.map((project) => (
                    <div key={project._id}>
                        <h3>{project.projectName}</h3>
                        <p>{project.githubLink}</p>
                        <p><img src={project.thumbnail} alt={project.projectName} /></p>
                        <button onClick={() => handleEdit(project._id)}>Edit</button>
                        <button onClick={() => handleDelete(project._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Project;
