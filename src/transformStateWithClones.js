'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const upgState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(upgState, action.extraData);
        result.push({ ...upgState });
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete upgState[key];
        } result.push({ ...upgState });
        break;

      case 'clear' :
        for (const key in upgState) {
          delete upgState[key];
        }
        result.push({ ...upgState });
        break;

      default:
        throw new Error('Error');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
