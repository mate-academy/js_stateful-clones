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
        versionOfState.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        versionOfState.push({ ...newState });
        break;

      case 'clear' :
        newState = {};
        versionOfState.push({ ...newState });
        break;
      default:
        break;
    }
  }

  return versionOfState;
}

module.exports = transformStateWithClones;
