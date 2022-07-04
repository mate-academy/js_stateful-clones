'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const e of actions) {
    if (e.type === 'addProperties') {
      Object.assign(newState, e.extraData);
    }

    if (e.type === 'removeProperties') {
      for (const propRemove of e.keysToRemove) {
        delete newState[propRemove];
      }
    }

    if (e.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    result.push(Object.assign({}, newState));
  }

  return result;
}

module.exports = transformStateWithClones;
