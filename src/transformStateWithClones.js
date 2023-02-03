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
    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);

      res.push(Object.assign({}, obj));
    }

    if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete obj[remove];
      }

      res.push(Object.assign({}, obj));
    }

    if (action.type === 'clear') {
      for (const prop in obj) {
        delete obj[prop];
      }

      res.push({});
    }
  }

  return res;
}

module.exports = transformStateWithClones;
