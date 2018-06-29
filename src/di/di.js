const Factory = require('./factory/factory');

module.exports = class Di {
    constructor({services = {}, factories = {}, defaultFactory = null} = {}) {
        this._services = services;
        this._factories = factories;
        this._defaultFactory = defaultFactory || new Factory;
        this._factoryInstances = {};
        this._serviceInstances = {};
    }

    set(name, instance) {
        this._serviceInstances[name] = instance;
        return this;
    }

    get(name, args) {
        if(!this._serviceInstances[name]) {
            this._serviceInstances[name] = this.build(name, args);
        }
        return this._serviceInstances[name];
    }
    
    build(name, args) {
        let service = this.getService(name) || name;
        return this.getFactory(name).build(this, service, args);
    }
    
    has(name) {
        return this._factories[name] || this._services[name];
    }
    
    setService(name, service) {
        this._services[name] = service;
        return this;
    }

    getService(name) {
        return this._services[name];
    }

    setFactory(name, factory) {
        this._factories[name] = factory;
        return this;
    }

    getFactory(name) {
        if(!this._factories[name]) {
            return this._defaultFactory;
        }
        if(!this._factoryInstances[name]) {
            const factory = this._factories[name] || name;
            this._factoryInstances[name] = this._defaultFactory.build(this, factory);
        }
        return this._factoryInstances[name];
    }
};