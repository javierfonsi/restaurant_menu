const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
        stack: err.stack

    })
}

module.exports = { globalErrorHandler }