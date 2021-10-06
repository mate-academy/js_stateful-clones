'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copyOfState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const key in copyOfState) {
          if (copyOfState.hasOwnProperty(key)) {
            delete copyOfState[key];
          }
        }
        break;
      default:
        return 'ha ha ha';
    }

    result.push({ ...copyOfState });
  };

  return result;
}

module.exports = transformStateWithClones;
