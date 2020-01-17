class AppError extends Error {
    constructor(status, code, message, target, source) {
    // Calling parent constructor of base Error class.
      super(message);
  
      this.target = target || 'common';
  
      this.source = source || {};
  
      const constructorName = this.constructor.name;
  
      this.code = code || constructorName.toLowerCase();
  
      // `500` is the default value if not specified.
      this.status = status || 500;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    toJson() {
      return {
        code: this.code,
        target: this.target,
        message: this.message,
        source: this.source,
      };
    }
  }
  
  module.exports = AppError;
  