function HashMap(size = 23) {
  this.hashStorage = new Array(size);
  this.size = size;

  this.hash = function (key) {
    let hashValue = 0;
    let primeNumber = 13;
    key.split('').forEach((keyValue) => {
      hashValue += primeNumber * keyValue.charCodeAt();
    });
    hashValue = hashValue % this.size;
    return hashValue;
  };
};

HashMap.prototype.put = function (key, value) {
  let index = this.hash(key);
  if (!this.hashStorage[index]) this.hashStorage[index] = [];
  this.hashStorage[index].push([key, value]);
  return this;
};

HashMap.prototype.remove = function (key) {
  let index = this.hash(key);
  if (!this.hashStorage[index]) return false;
  for (let array of this.hashStorage[index]) {
    if (array[0] === key) {
      const storageIndex = this.hashStorage[index].indexOf(array);
      this.hashStorage[index].splice(storageIndex, 1);
      return true;
    }
  }
}

HashMap.prototype.contains = function (key) {
  let index = this.hash(key);
  let hasKey = false;
  if (!this.hashStorage[index]) return false;
  this.hashStorage[index].forEach((arrayList) => {
    arrayList.forEach((array) => {
      if (array[0] === key) {
        hasKey = true;
      }
    });
  });
  return hasKey;
}

HashMap.prototype.get = function (key) {
  let index = this.hash(key);
  if (!this.hashStorage[index]) return undefined;
  for (let array of this.hashStorage[index]) {
    if (array[0] === key) return array[1];
  }
}

HashMap.prototype.isEmpty = function () {
  return this.hashStorage.length ? false : true;
}

HashMap.prototype.keys = function () {
  let keyList = [];
  this.hashStorage.forEach((ArrayList) => {
    ArrayList.forEach((array) => {
      if (array[0]) keyList.push(array[0]);
    });
  });
  return keyList;
};

HashMap.prototype.replace = function (key, value) {
  let index = this.hash(key);
  if (!this.hashStorage[index]) return false;
  this.hashStorage[index].forEach((array) => {
    if(array[0] === key) {
      array[1] = value;
      return;
    }
  });
};

HashMap.prototype.size = function () {
  return this.hashStorage.length;
};

HashMap.prototype.clear = function () {
  this.hashStorage = [];
};

let map = new HashMap(5);

map.put("time", "AM 10:10");
map.put("location", "Seoul");
map.put("1", 1);
map.put("2", 2);
map.put("3", 3);


/*
// examples
console.log("is 2 in map ?", map.contains("2"));
console.log("Is 3 in map? then delete 3! ", map.remove("3"));
console.log("Regardless is 3 in map ? ", map.contains("3"));
console.log(map.get("1"));
console.log(map.get("2"));
console.log("keys in map : ", map.keys());
console.log(map.isEmpty());
//map.clear();
//console.log(map.isEmpty());
console.table(map.hashStorage);
map.replace("1", "일");
console.table(map.hashStorage);
console.log(map.size);
*/
