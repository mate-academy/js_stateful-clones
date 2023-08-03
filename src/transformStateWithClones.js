'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const dataOfState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        dataOfState.push({ ...stateCopy });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        dataOfState.push({ ...stateCopy });
        break;

      case 'clear':
        Object.keys(stateCopy).forEach(key => {
          delete stateCopy[key];
        });
        dataOfState.push({ ...stateCopy });
        break;

      default:
        return 'incorect data';
    }
  }

  return dataOfState;
}

module.exports = transformStateWithClones;
