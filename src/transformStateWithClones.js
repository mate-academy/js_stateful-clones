'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateСhanges = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKeys of action.keysToRemove) {
          if (stateClone.hasOwnProperty(removeKeys)) {
            delete stateClone[removeKeys];
          }
        }
        break;

      case 'clear':
        for (const removeProperties in stateClone) {
          delete stateClone[removeProperties];
        }
        break;

      default:
        break;
    }

    stateСhanges.push(Object.assign({}, stateClone));
  }

  return stateСhanges;
}

module.exports = transformStateWithClones;
