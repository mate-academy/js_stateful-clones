'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  let changes = {};
  const result = [];

  for (const actionsKeys of actions) {
    switch (actionsKeys.type) {
      case 'addProperties':
        Object.assign(copyState, actionsKeys.extraData);

        changes = { ...copyState };
        break;
      case 'removeProperties':
        for (const key of actionsKeys.keysToRemove) {
          delete copyState[key];
        }

        changes = { ...copyState };
        break;
      case 'clear':
        for (const key2 in copyState) {
          delete copyState[key2];
        }

        changes = { ...copyState };
        break;
    }
    result.push(changes);
  }

  return result;
}

module.exports = transformStateWithClones;
