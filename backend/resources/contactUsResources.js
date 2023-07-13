const contactUsResource = (data) => {
    return {
        _id: data._id,
        email: data.email,
        country_code: data.country_code,
        phone: data.phone,
        message: data.message,
        read: data.read,
        created_at: data.created_at,
        updated_at: data.updated_at
    }
}

export default contactUsResource;