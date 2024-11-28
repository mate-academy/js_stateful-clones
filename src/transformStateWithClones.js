'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { extraData, type, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;
    }

    states.push({ ...stateClone });
  }

  return states;
}

module.exports = transformStateWithClones;
