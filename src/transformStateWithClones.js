'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyClones = [];
  const currentSt = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const i in currentSt) {
          delete currentSt[i];
        }
        break;

      case 'addProperties':
        Object.assign(currentSt, extraData);
        break;

      case 'removeProperties':
        for (const i of keysToRemove) {
          if (currentSt[i]) {
            delete currentSt[i];
          }
        }
        break;
      default:
        throw new Error(`unexpected action ${action}`);
    }

    historyClones.push({ ...currentSt });
  }

  return historyClones;
}

module.exports = transformStateWithClones;
