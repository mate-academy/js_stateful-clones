'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newActions = [];
  const newState = { ...state };

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties' :
        Object.assign(newState, value.extraData);
        break;
      case 'removeProperties' :
        for (const value2 of value.keysToRemove) {
          delete newState[value2];
        };
        break;
      case 'clear' :
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    newActions.push({ ...newState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
