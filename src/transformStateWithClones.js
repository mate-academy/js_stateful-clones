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
    if (key.type === 'addProperties') {
      Object.assign(stateClone, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const keyDel of key.keysToRemove) {
        delete stateClone[keyDel];
      }
    } else if (key.type === 'clear') {
      for (const keyDel in stateClone) {
        delete stateClone[keyDel];
      }
    }
    history.push({ ...stateClone });
  }

  return history;
}

module.exports = transformStateWithClones;
