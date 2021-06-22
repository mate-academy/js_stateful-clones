'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const property in action.extraData) {
          stateCopy[property] = action.extraData[property];
        }
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateCopy[property];
        }
        break;
      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;
    }
    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
