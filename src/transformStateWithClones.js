'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = Object.assign({}, state);
  const tableResult = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        // copyState = Object.assign(copyState, actions[i].extraData);
        copyState = {
          ...copyState,
          ...actions[i].extraData,
        };
        tableResult.push(Object.assign({}, copyState));
        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          for (const keys in copyState) {
            if (actions[i].keysToRemove[j] === keys) {
              delete copyState[keys];
            }
          }
        }
        tableResult.push(copyState);
        break;
      default:
        copyState = {};
        tableResult.push(copyState);
    }
  }

  return tableResult;
}

module.exports = transformStateWithClones;
