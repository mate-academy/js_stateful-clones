'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clearState = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clearState, obj.extraData);

      result.push(Object.assign({}, clearState));
    }

    if (obj.type === 'removeProperties') {
      for (const value of obj.keysToRemove) {
        delete clearState[value];
      }

      result.push(Object.assign({}, clearState));
    }

    if (obj.type === 'clear') {
      for (const key in clearState) {
        delete clearState[key];
      }

      result.push(Object.assign({}, clearState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
