'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    if (i !== 0) {
      const { ...stateClone } = stateClones[i - 1];

      stateClones[i] = { ...stateClone };
    }

    switch (actions[i].type) {
      case 'addProperties': {
        const { extraData } = actions[i];

        for (const addKey in extraData) {
          stateClones[i][addKey] = extraData[addKey];
        }

        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = actions[i];

        for (const removeKey of keysToRemove) {
          delete stateClones[i][removeKey];
        }

        break;
      }

      case 'clear':
        stateClones[i] = {};
        break;

      default:
        return 'error';
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
