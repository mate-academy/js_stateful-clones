'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actionions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actionions) {
  const states = [];
  const stateCopy = { ...state };

  for (const action of actionions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error();
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
