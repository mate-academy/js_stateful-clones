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

  const addActionToArr = () => {
    resultActionsArr.push({ ...stateCopy });
  };

  for (let i = 0; i <= actions.length - 1; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        addActionToArr();
        break;
      case 'removeProperties':
        actions[i].keysToRemove.forEach((key) => delete stateCopy[key]);
        addActionToArr();
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        addActionToArr();
        break;

      default:
        break;
    }
  }

  return resultActionsArr;
}

module.exports = transformStateWithClones;
