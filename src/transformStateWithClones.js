'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear' :
        Object.keys(stateCopy).forEach(key => {
          delete stateCopy[key];
        });
        break;

      default:
        return 'Error';
    }

    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
