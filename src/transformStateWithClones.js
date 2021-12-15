'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete stateClone[keyRemove];
        };
        break;

      case 'clear':
        for (const keyClear in stateClone) {
          delete stateClone[keyClear];
        };
        break;

      default:
        return null;
    };

    clones.push({ ...stateClone });
  };

  return clones;
}

module.exports = transformStateWithClones;
