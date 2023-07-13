import Joi from "joi";

class AddMessageRequest {
    static schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        country_code: Joi.string().pattern(/^\d{1,3}$/).required().messages({
            'string.pattern.base': 'Invalid country code format',
            'any.required': 'Country code is required',
        }),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Invalid phone number format. It should consist of 8 to 15 digits',
            'any.required': 'Phone number is required',
        }),
        message: Joi.string().required(),
    })

    constructor(data) {
        this.data = data;
    }
    validate() {
        const { error, value } = AddMessageRequest.schema.validate(this.data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        
        return value;
    }
}

export default AddMessageRequest;