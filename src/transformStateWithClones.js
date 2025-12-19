'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const history = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateClone, key.extraData);
        break;
      case 'removeProperties':
        for (const keyDel of key.keysToRemove) {
          delete stateClone[keyDel];
        }
        break;
      case 'clear':
        for (const keyDel in stateClone) {
          delete stateClone[keyDel];
        }
        break;
      default:
        break;
    }
    history.push({ ...stateClone });
  }

  return history;
}

module.exports = transformStateWithClones;
