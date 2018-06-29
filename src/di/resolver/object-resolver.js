module.exports = class ObjectResolver {
    constructor(repository) {
        this._repository = repository;
    }

    resolve(service) {
        return this._repository[service];
    }
};