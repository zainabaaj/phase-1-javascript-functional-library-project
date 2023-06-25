
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i], i, collection);
        }
    } else {
        for (let key in collection) {
            callback(collection[key], key, collection);
        }
    }
    return collection;
}

function myMap(collection, callback) {
    const result = [];
    myEach(collection, function (value, key, collection) {
        result.push(callback(value, key, collection));
    });
    return result;
}

function myReduce(collection, callback, acc) {
    myEach(collection, function (value, key, collection) {
        if (acc === undefined) {
            acc = value;
        } else {
            acc = callback(acc, value, collection);
        }
    });
    return acc;
}

function myFind(collection, predicate) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (predicate(collection[i])) {
                return collection[i];
            }
        }
    } else {
        const keys = Object.keys(collection);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (predicate(collection[key])) {
                return collection[key];
            }
        }
    }
}

function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
            result.push(value);
        }
    });
    return result;
}

function mySize(collection) {
    if (Array.isArray(collection)) {
        return collection.length;
    } else {
        return Object.keys(collection).length;
    }
}

function myFirst(array, n) {
    if (n === undefined) {
        return array[0];
    } else {
        return array.slice(0, n);
    }
}

function myLast(array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    } else {
        return array.slice(-n);
    }
}

function mySortBy(array, callback) {
    return array.slice().sort(function (a, b) {
        const aValue = callback(a);
        const bValue = callback(b);
        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    });
}

function myFlatten(array, shallow, newArr = []) {
    if (!Array.isArray(array)) {
        newArr.push(array);
    } else if (shallow) {
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                for (let j = 0; j < array[i].length; j++) {
                    newArr.push(array[i][j]);
                }
            } else {
                newArr.push(array[i]);
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            myFlatten(array[i], false, newArr);
        }
    }
    return newArr;
}

function myKeys(object) {
    return myMap(object, function (value, key) {
        return key;
    });
}
function myValues(object) {
    return myMap(object, function (value) {
        return value;
    });
}
