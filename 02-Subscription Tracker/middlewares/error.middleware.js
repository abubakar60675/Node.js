const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error("Global Error", err);

    // Mongoose Bad ObjectId
    if (err.name === "CastError") {
      //   error = new ErrorResponse("Invalid ID", 400);
      const message = "Resource Not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose Duplicate Key
    if (err.code === 11000) {
      //   error = new ErrorResponse("Duplicate Key", 400);
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
      //   error = new ErrorResponse("Validation Error", 400);
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });

    // const statusCode = err.statusCode || 500;
    // const message = err.message || "Internal Server Error";

    // res.status(statusCode).json({
    //   success: false,
    //   statusCode,
    //   message,
    //   stack: process.env.NODE_ENV === "development" ? err.stack : {},
    // });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
