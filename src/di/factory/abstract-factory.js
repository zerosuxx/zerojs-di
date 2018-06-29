module.exports = class AbstractFactory extends Function {
    constructor(resolverChain = null) {
        super('...args', 'return this.__call__(...args)');
        this._resolverChain = resolverChain;
        return this.bind(this);
    }
    
    __call__(container, className, args = null) {
        
    }
    
    _resolveClassName(className) {
        return this._resolverChain ? this._resolverChain.resolve(className) : className;
    }
};