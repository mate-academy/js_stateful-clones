'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const objArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copy[key] = action.extraData[key];
        }
        objArr.push(Object.assign({}, copy));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }
        objArr.push(Object.assign({}, copy));
        break;
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        objArr.push(Object.assign({}, copy));
        break;
    }
  }

  return objArr;
}

module.exports = transformStateWithClones;
