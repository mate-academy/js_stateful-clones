'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClones = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClones, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClones[key];
        }
        break;

      case 'clear':
        stateClones = {};
        break;

      default:
        throw new Error('add correct state');
    }

    stateHistory.push({ ...stateClones });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
