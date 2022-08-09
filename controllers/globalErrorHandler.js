const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500 //agregado 
    res.status(statusCode).json({
        statusCode,
        status: err.status,
        message: err.message,
        stack: err.stack

    })
}

module.exports = { globalErrorHandler }