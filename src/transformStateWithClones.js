'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const obj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete obj[prop];
        }
        break;
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }

    res.push(Object.assign({}, obj));
  }

  return res;
}

module.exports = transformStateWithClones;
