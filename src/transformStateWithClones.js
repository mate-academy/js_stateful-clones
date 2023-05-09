'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        stateArr.push({ ...clonedState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        stateArr.push({ ...clonedState });
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        stateArr.push({ ...clonedState });
        break;

      default:
        throw new Error('wrong action type');
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
