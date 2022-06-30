export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database with version 1
    const request = window.indexedDB.open('shop-shop', 1);

    // create variables to hold reference to the database, transaction, and object store
    let db, tx, store;

    // if version has changed/ if it's the first time the DB is used, run the method
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set primary key to the _id
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log('there was an error');
    };

    // on database open success
    request.onsuccess = function (e) {
      // save a reference of the DB to the 'db' variable
      db = request.result;
      // open a transaction do whatever we pass into 'storename'
      tx = db.transaction(storeName, 'readwrite');
      // save a  reference to that object store
      store = tx.objectStore(storeName);
      // if there's any errors
      db.onerror = function (e) {
        console.log('error', e);
      };
      // check the value of the method
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when the transaction is complete
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
