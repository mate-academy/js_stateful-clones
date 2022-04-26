'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      arr[i] = { ...state };
    } else {
      arr[i] = { ...arr[i - 1] };
    }

    const currentArr = arr[i];
    const currentAction = actions[i];

    switch (currentAction.type) {
      case 'addProperties':
        Object.assign(currentArr, currentAction.extraData);
        break;

      case 'removeProperties':
        for (const key of currentAction.keysToRemove) {
          delete currentArr[key];
        }
        break;

      case 'clear':
        for (const key in currentArr) {
          delete currentArr[key];
        }
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
