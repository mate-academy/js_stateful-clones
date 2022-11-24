'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(currentState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete currentState[key];
      }
    }

    if (obj.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    result.push(Object.assign({}, currentState));
  }

  return result;
}

module.exports = transformStateWithClones;
