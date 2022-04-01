'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const NewState = [];

  for (let index = 0; index < actions.length; index++) {
    switch (actions[index].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[index].extraData);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties' :
        for (const key of actions[index].keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    NewState.push({ ...stateCopy });
  }

  return NewState;
}

module.exports = transformStateWithClones;
