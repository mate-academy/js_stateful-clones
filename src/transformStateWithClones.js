'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'addProperties') {
      newState = {
        ...state, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}
module.exports = transformStateWithClones;
