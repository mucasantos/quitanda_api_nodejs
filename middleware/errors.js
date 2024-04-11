module.exports = (error, req, res, next) => {

    console.log(error)

    const message = error.message;
    const status = error.statusCode || 500;
    const data = error.data;
    res.status(status).json({ error: message, data: data })
}