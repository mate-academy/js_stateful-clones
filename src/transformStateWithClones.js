'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allActionsArr = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        if (extraData) {
          Object.assign(stateCopy, extraData);
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error('Wrong action type');
    }

    allActionsArr.push({ ...stateCopy });
  }

  return allActionsArr;
}

module.exports = transformStateWithClones;
