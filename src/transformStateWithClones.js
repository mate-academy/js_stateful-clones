'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = {
    ...state,
  };

  for (const types of actions) {
    switch (types.type) {
      case 'addProperties':
        Object.assign(stateClone, types.extraData);
        break;

      case 'removeProperties':
        for (const keys of types.keysToRemove) {
          delete stateClone[keys];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    result.push({
      ...stateClone,
    });
  }

  return result;
}

module.exports = transformStateWithClones;
