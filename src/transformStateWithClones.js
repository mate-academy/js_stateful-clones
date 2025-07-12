'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const table = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete newState[remove];
      }
    } else if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    newState = { ...newState };
    table.push({ ...newState });
  }

  return table;
}

module.exports = transformStateWithClones;
