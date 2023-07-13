import Joi from 'joi';

class UpdateReadRequest {
    static schema = Joi.object({
        id: Joi.string().required(),
        status: Joi.boolean().required(),
    })
    constructor(data) {
        this.data = data;
    }

    validate() {
        const { error, value } = UpdateReadRequest.schema.validate(this.data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }
}

export default UpdateReadRequest;