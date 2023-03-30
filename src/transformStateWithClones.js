'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(property)) {
            delete stateCopy[property];
          }
        }
        break;
      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;
      default:
        throw new Error('Invalid type value');
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
