import mongoose from 'mongoose';

const contactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // Regular expression for basic email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format',
        },
    },
    country_code:{
        type: String,
        required:true,
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                //check phone length is 10 or not
                return value > 1111111111 && value < 9999999999;
            },
            message: 'Please provide a valid 10-digit phone number.'
        }
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        validate: {
            validator: function (value) {
                return typeof value === 'boolean';
            },
            message: 'Only boolean values are allowed.'
        },
        default: () => false,
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now() //set current date as default
    },
    updated_at: {
        type: Date,
        default: () => Date.now()
    }
})

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;