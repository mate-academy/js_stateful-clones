'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_ADD = 'addProperties';
  const ACTION_REMOVE = 'removeProperties';
  const ACTION_CLEAR = 'clear';

  let stateClone = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case ACTION_ADD:
        Object.assign(stateClone, action.extraData);
        break;

      case ACTION_REMOVE:
        for (const properties of action.keysToRemove) {
          delete stateClone[properties];
        }
        break;

      case ACTION_CLEAR:
        stateClone = {};
        break;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
