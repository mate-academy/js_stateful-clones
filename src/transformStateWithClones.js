'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const logs = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }

        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
    }

    logs.push({ ...stateClone });
  }

  return logs;
}

module.exports = transformStateWithClones;
