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
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);
        result.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const value of actions[i].keysToRemove) {
          if (value in stateClone) {
            delete stateClone[value];
          }
        }
        result.push({ ...stateClone });
        break;

      case 'clear':
        result.push({});
        stateClone = {};
    }
  }

  return result;
}
module.exports = transformStateWithClones;
