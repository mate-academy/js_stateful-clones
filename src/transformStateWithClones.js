'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(stateCopy)
          .forEach(key => delete stateCopy[key]);
        transformedStates.push({ ...stateCopy });
        break;

      case 'addProperties':
        for (const data in action.extraData) {
          stateCopy[data] = action.extraData[data];
        }
        transformedStates.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        transformedStates.push({ ...stateCopy });
        break;

      default:
        transformedStates.push({ ...stateCopy });

        return { ...stateCopy };
    }
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
