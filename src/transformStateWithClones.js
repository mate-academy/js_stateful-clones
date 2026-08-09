'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultActionsArr = [];

  for (let i = 0; i <= actions.length - 1; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;
      case 'removeProperties':
        actions[i].keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        break;
    }
    resultActionsArr.push({ ...stateCopy });
  }

  return resultActionsArr;
}

module.exports = transformStateWithClones;
