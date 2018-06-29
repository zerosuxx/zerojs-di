module.exports = class ResolverChain {
    constructor(resolvers) {
        this._resolvers = resolvers || [];
    }

    add(resolver) {
        this._resolvers.push(resolver);
        return this;
    }

    resolve(name) {
        for(let resolvedName of this._getIterator(name)) {
            name = resolvedName;
        }
        return name;
    }

    _getIterator(name) {
        let index = 0;
        const ctx = this;
        const next = function() {
            const done = index >= ctx._resolvers.length;
            const resolvedName = !done ? ctx._resolvers[index].resolve(name) : null;
            const value = resolvedName || name;
            
            index = resolvedName ? ctx._resolvers.length : index + 1;

            return {
                value,
                done
            };
        };
        return {
            [Symbol.iterator]() {
                return {
                    next
                }
            }
        };
    }
};