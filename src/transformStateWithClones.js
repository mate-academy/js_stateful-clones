'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionOfState = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case 'clear' :
        newState = {};
        break;
      default:
        break;
    }
    versionOfState.push({ ...newState });
  }

  return versionOfState;
}

module.exports = transformStateWithClones;
