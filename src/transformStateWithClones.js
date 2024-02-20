'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = { ...state };

  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(resultState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const properties of action.keysToRemove) {
        if (properties in resultState) {
          delete resultState[properties];
        }
      }
    } else if (action.type === 'clear') {
      for (const key in resultState) {
        delete resultState[key];
      }
    }
    result.push({ ...resultState });
  }

  return result;
}
module.exports = transformStateWithClones;
