import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.js';
import projectRoutes from './project.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
