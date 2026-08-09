'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultActionsArr = [];

  for (let i = 0; i <= actions.length - 1; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);
        resultActionsArr.push({ ...stateClone });
        break;
      case 'removeProperties':
        actions[i].keysToRemove.forEach((key) => delete stateClone[key]);
        resultActionsArr.push({ ...stateClone });
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        resultActionsArr.push({ ...stateClone });
        break;
    }
  }

  return resultActionsArr;
}

module.exports = transformStateWithClones;
