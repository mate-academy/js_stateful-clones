'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear' :
        for (const property in copyState) {
          delete copyState[property];
        }
        break;

      default :
        return null;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
