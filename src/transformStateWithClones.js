'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const arrayOfCloneState = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties' :
        Object.assign(cloneState, actions[i].extraData);
        break;

      case 'removeProperties' :
        for (const key of actions[i].keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear' :
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        break;
    }
    arrayOfCloneState.push({ ...cloneState });
  }

  return arrayOfCloneState;
}

module.exports = transformStateWithClones;
