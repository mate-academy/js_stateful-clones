'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const initialStateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(initialStateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete initialStateCopy[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(initialStateCopy)) {
          delete initialStateCopy[key];
        }
        break;
    }
    stateClones.push({ ...initialStateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
