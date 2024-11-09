class ErrorMessage {
  static get NOT_FOUND() {
    return "Resource not found";
  }

  static get UNAUTHORIZED() {
    return "Unauthorized access";
  }

  static get FORBIDDEN() {
    return "Forbidden access";
  }

  static get BAD_REQUEST() {
    return "Bad request";
  }

  static get INTERNAL_SERVER_ERROR() {
    return "Internal server error";
  }

  static get CUSTOM_ERROR() {
    return (message) => message;
  }


}

module.exports = ErrorMessage;
