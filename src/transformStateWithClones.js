'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const res = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(copyState, obj.extraData);
      res.push(Object.assign({}, copyState));
    } else if (obj.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      res.push(Object.assign({}, copyState));
    } else if (obj.type === 'removeProperties') {
      for (const keyToRemove of obj.keysToRemove) {
        delete copyState[keyToRemove];
      }
      res.push(Object.assign({}, copyState));
    }
  }

  return res;
}

module.exports = transformStateWithClones;
