'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const newState = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateClone, act.extraData);
        break;

      case 'removeProperties':
        for (const prop of act.keysToRemove) {
          delete stateClone[prop];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    newState.push({ ...stateClone });
  }

  return newState;
}

module.exports = transformStateWithClones;
