'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState };
      Object.assign(newState, action.extraData);

      result.push(newState);
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      for (const item of action.keysToRemove) {
        delete newState[item];
      }
      result.push(newState);
    }

    if (action.type === 'clear') {
      newState = { ...newState };
      newState = {};
      result.push(newState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
