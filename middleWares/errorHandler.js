const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Handle different types of errors
    let errorMessage = err.message;
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
    } else if (err.name === 'CastError') {
        statusCode = 400;
        errorMessage = 'Invalid ID format';
    }

    const errorResponse = {
        success: false,
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;