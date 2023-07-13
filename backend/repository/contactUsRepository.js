import ContactUs from "../models/contactUsModels.js";

class ContactUsRepository {
    async addMessage(data) {
        const newMessage = await ContactUs.create(data);
        return newMessage;
    }
    async listMessages() {
        const messages = await ContactUs.find();
        return messages;
    }
    async findMessage(data) {
        const message = await ContactUs.findOne({ _id: data.id });
        return message;
    }
    async updateReadStatus(data) {
        const findMessage = await ContactUs.findOne({ _id: data.id });
        if (findMessage) {
            findMessage.read = data.status;
            findMessage.updated_at = Date.now();
            const message = await findMessage.save();
            return message;
        }
        else {
            return null;
        }
    }
    async deleteMessage(data) {
        const findMessage = await ContactUs.findOne({ _id: data.id });
        if(findMessage){
            const deleteMessage = await ContactUs.findOneAndDelete({_id:data.id});
            return deleteMessage;
        }
        else{
            return null;
        }
    }
}

export default ContactUsRepository;