'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      if (arr.length === 0) {
        const obj = Object.assign({}, state);

        for (const prop in obj) {
          delete obj[prop];
        }

        arr.push(obj);
      } else {
        const obj = Object.assign({}, arr[arr.length - 1]);

        for (const prop in obj) {
          delete obj[prop];
        }

        arr.push(obj);
      }
    }

    if (action.type === 'addProperties') {
      if (arr.length === 0) {
        const obj = Object.assign({}, state);

        Object.assign(obj, action.extraData);

        arr.push(obj);
      } else {
        const obj = Object.assign({}, arr[arr.length - 1]);

        Object.assign(obj, action.extraData);

        arr.push(obj);
      }
    }

    if (action.type === 'removeProperties') {
      if (arr.length === 0) {
        const obj = Object.assign({}, state);

        for (const prop of action.keysToRemove) {
          delete obj[prop];
        }

        arr.push(obj);
      } else {
        const obj = Object.assign({}, arr[arr.length - 1]);

        for (const prop of action.keysToRemove) {
          delete obj[prop];
        }

        arr.push(obj);
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
