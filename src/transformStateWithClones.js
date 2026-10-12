'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let lastHistory = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        lastHistory = Object.assign({}, lastHistory, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          const { [key]: _, ...rest } = lastHistory;

          lastHistory = rest;
        }
        break;
      case 'clear':
        lastHistory = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push({ ...lastHistory });
  }

  return history;
}

module.exports = transformStateWithClones;
