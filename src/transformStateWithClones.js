'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {};
  const stateCloneArr = [];

  Object.assign(stateClone, state);

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateClone, key.extraData);
        break;
      case 'clear':
        for (const k in stateClone) {
          delete stateClone[k];
        }
        break;
      case 'removeProperties':
        for (const keys of key.keysToRemove) {
          delete stateClone[keys];
        }
        break;
    }
    stateCloneArr.push({ ...stateClone });
  }

  return stateCloneArr;
}

module.exports = transformStateWithClones;
