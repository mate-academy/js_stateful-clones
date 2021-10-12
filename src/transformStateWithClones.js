'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  for (const i of actions) {
    let item = {};

    if (arr[0] === undefined) {
      item = { ...state };
    } else {
      item = { ...arr[arr.length - 1] };
    };

    if (i.type === 'addProperties') {
      Object.assign(item, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const x in i.keysToRemove) {
        delete item[i.keysToRemove[x]];
      }
    }

    if (i.type === 'clear') {
      for (const x in item) {
        delete item[x];
      }
    }

    arr.push(item);
  }

  return arr;
}

module.exports = transformStateWithClones;
