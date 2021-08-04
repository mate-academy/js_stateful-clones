'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const objectOfCloneState = [];

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
    objectOfCloneState[i] = cloneState;
    cloneState = { ...objectOfCloneState[i] };
  }

  return objectOfCloneState;
}

module.exports = transformStateWithClones;
