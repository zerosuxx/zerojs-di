module.exports = class InstantiableError extends TypeError {
    constructor(className, maxLength = 20) {
        const type = typeof className;
        const serviceString = className + '';
        const msg = `(${type})"${serviceString.substring(0, maxLength)}${serviceString.length > maxLength ? '...' : ''}" not instantiable!`;
        super(msg);
    }
};