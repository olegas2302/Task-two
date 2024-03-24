function deepCopy(obj, copiedObjects = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (copiedObjects.has(obj)) {
        return copiedObjects.get(obj);
    }

    let clonedObj = Array.isArray(obj) ? [] : {};

    copiedObjects.set(obj, clonedObj);

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] instanceof Date) {
                clonedObj[key] = new Date(obj[key]);
            } else if (obj[key] instanceof Map) {
                clonedObj[key] = new Map(obj[key]);
            } else if (obj[key] instanceof Set) {
                clonedObj[key] = new Set(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                clonedObj[key] = deepCopy(obj[key], copiedObjects);
            } else {
                clonedObj[key] = obj[key];
            }
        }
    }

    if (Object.getPrototypeOf(obj) !== null) {
        Object.setPrototypeOf(clonedObj, Object.getPrototypeOf(obj));
    }

    return clonedObj;
}

const obj = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4]
    },
    e: new Date(),
    f: new Map([[1, 'one'], [2, 'two']]),
    g: new Set([1, 2, 3])
};

const copiedObj = deepCopy(obj);
console.log(copiedObj);