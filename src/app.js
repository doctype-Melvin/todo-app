//Adds methods to local storage to store objects
Storage.prototype.setObj = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObj = function (key) {
    let value = this.getItem(key);
    return value && JSON.parse(value);
}

const createObj = () => {
    console.log(localStorage)
}