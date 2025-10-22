'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  const stateCopy = { ...state };

  for (const a in actions) {
    if (actions[a].type === 'addProperties') {
      for (const add in actions[a].extraData) {
        stateCopy[add] = actions[a].extraData[add];
      }
      newState.push({ ...stateCopy });
    } else if (actions[a].type === 'removeProperties') {
      for (const rem of actions[a].keysToRemove) {
        delete stateCopy[rem];
      }
      newState.push({ ...stateCopy });
    } else {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      newState.push({ ...stateCopy });
    }
  }

  return newState;
}

module.exports = transformStateWithClones;
