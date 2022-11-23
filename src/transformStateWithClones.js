'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (let i = 0; i <= actions.length - 1; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(stateClone, actions[i].extraData);
      result.push({ ...stateClone });
    }

    if (actions[i].type === 'removeProperties') {
      for (const value of actions[i].keysToRemove) {
        if (value in stateClone) {
          delete stateClone[value];
        }
      }
      result.push({ ...stateClone });
    }

    if (actions[i].type === 'clear') {
      result.push({});
      stateClone = {};
    }
  }

  return result;
}
module.exports = transformStateWithClones;
