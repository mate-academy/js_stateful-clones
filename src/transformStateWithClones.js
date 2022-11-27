'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clonesState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonesState, action.extraData);
        break;

      case 'removeProperties':
        for (const n of action.keysToRemove) {
          delete clonesState[n];
        }
        break;

      case 'clear':
        for (const key in clonesState) {
          delete clonesState[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...clonesState });
  }

  return result;
}

module.exports = transformStateWithClones;
