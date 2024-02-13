'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case `removeProperties`:
        for (const propToBeRemoved of keysToRemove) {
          delete stateClone[propToBeRemoved];
        };
        break;

      case `clear`:
        for (const elementOfState in stateClone) {
          delete stateClone[elementOfState];
        }
        break;

      default:
        throw new Error('Data is not valid');
    }
    stateHistory.push(Object.assign({}, stateClone));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
