'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let obj = Object.assign({}, state);

  for (const action of actions) {
    obj = Object.assign({}, obj, action.extraData);

    if (action.type === 'addProperties') {
      res.push(obj);
    }

    if (action.type === 'removeProperties') {
      for (const removeElement of action.keysToRemove) {
        delete obj[removeElement];
      }

      res.push(obj);
    }

    if (action.type === 'clear') {
      obj = {};
      res.push(obj);
    }
  }

  return res;
}

module.exports = transformStateWithClones;
