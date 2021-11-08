function HashMap(size) {
  this.storage = [];
  this.size = size;
  this.hash = function (key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  };
};

HashMap.prototype.put = function (key, value) {
  let index = this.hash(key);
  if (!this.storage[index]) this.storage[index] = [];
  this.storage[index].push([key, value]);
  return this;
};

HashMap.prototype.remove = function (key) {
  let index = this.hash(key);
  if (!this.storage[index]) return false;
  for (let array of this.storage[index]) {
    if (array[0] === key) {
      const storageIndex = this.storage[index].indexOf(array);
      this.storage[index].splice(storageIndex, 1);
      return true;
    }
  }
}

HashMap.prototype.contains = function (key) {
  let index = this.hash(key);
  let hasKey = false;
  if (!this.storage[index]) return false;
  for (let array of this.storage[index]) {
    hasKey = array[0] === key ? true : false;
  }
  return hasKey;
}

HashMap.prototype.get = function (key) {
  let index = this.hash(key);
  if (!this.storage[index]) return undefined;
  for (let array of this.storage[index]) {
    if (array[0] === key) return array[1];
  }
}

HashMap.prototype.keys = function () {
  let keyList = [];
  this.storage.forEach((array) => {
    keyList.push(array[0]);
  })
  return keyList;
};

HashMap.prototype.isEmpty = function () {
  console.log(this.storage);
};

let map = new HashMap(5);

map.put("time", "AM 10:10");
map.put("location", "Seoul");
map.put("1", 1);
map.put("2", 2);
map.put("3", 3);
console.log("is 2 in map ?", map.contains("2"));
console.log("Is 2 in map? then delete 2! ", map.remove("2"));
console.log("After delete 2, is 2 in map ? ", map.contains("2"));
console.log("Regardless is 3 in map ? ", map.contains("3"));
console.log("keys in map : ", map.keys());

let map1 = new HashMap();
console.log(map.isEmpty());
console.log(map1.isEmpty());
