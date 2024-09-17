'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        };
        break;
    }
    stateClones.push({ ...stateClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
