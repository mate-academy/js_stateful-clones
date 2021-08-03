'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateFinal = [];
  const stateClone = { ...state };

  for (const oneAction of actions) {
    const { type, extraData, keysToRemove } = oneAction;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const oneToRemove of keysToRemove) {
          delete stateClone[oneToRemove];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    stateFinal.push({ ...stateClone });
  }

  return stateFinal;
}

module.exports = transformStateWithClones;
