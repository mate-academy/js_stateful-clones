'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = Object.assign({}, state);
  const cloneArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      default:
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }
    cloneArr.push({ ...cloneState });
  }

  return cloneArr;
}

module.exports = transformStateWithClones;
