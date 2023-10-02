'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateResult = [];
  let stateObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateObject[key];
        }
        break;

      case 'clear':
        stateObject = {};
        break;

      default:
        return 'Invalid action.';
    }

    stateResult.push({ ...stateObject });
  }

  return stateResult;
}

module.exports = transformStateWithClones;
