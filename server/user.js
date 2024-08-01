import mongoose from 'mongoose';

// Schema for user model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/ // Optional: Ensure email follows your institute's pattern
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Optional: Minimum password length
    },
    typeOfUser: {  
        type: String,
        enum: ['Student', 'Admin'],
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Creating model for the schema
const User = mongoose.model('User', UserSchema);

// Exporting the model
export default User;
