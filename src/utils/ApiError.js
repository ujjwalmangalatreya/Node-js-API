class ApiError {
    constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
    ) {
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
    }
}

module.exports = { ApiError };
