import Joi from 'joi';

class FindMessageRequest {
    static schema = Joi.object({
        id: Joi.string().required(),
    });
    constructor(data) {
        this.data = data;
    }

    validate() {
        const { error, value } = FindMessageRequest.schema.validate(this.data);
        if (error) {
            throw new Error(error.details[0].message)
        }
        return value;
    }
}

export default FindMessageRequest;