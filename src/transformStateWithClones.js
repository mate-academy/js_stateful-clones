'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (stateHistory.length === 0) {
          stateHistory.push(Object.assign({}, state, action.extraData));
        } else {
          stateHistory.push(Object.assign(
            {}, stateHistory[stateHistory.length - 1], action.extraData)
          );
        }
        break;

      case 'removeProperties':
        if (stateHistory.length === 0) {
          stateHistory.push({ ...state });
        } else {
          stateHistory.push({ ...stateHistory[stateHistory.length - 1] });
        }

        for (const key of action.keysToRemove) {
          if (stateHistory[stateHistory.length - 1].hasOwnProperty(key)) {
            delete stateHistory[stateHistory.length - 1][key];
          }
        }
        break;

      case 'clear':
        stateHistory.push({});
        break;

      default:
        throw new Error('Type not supported');
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
