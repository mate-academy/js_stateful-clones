'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsHistory = [];

  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    const actionType = {
      clear: 'clear',
      addProperties: 'addProperties',
      removeProperties: 'removeProperties',
    };

    switch (type) {
      case actionType.clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case actionType.addProperties:
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case actionType.removeProperties:
        keysToRemove.forEach(element => delete stateCopy[element]);
        break;

      default:
        return 'invalid action';
    }

    actionsHistory.push({ ...stateCopy });
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
