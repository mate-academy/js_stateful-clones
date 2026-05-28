'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const fullHistory = [];
  let prev = state;

  for (const act of actions) {
    let history = { ...prev };

    switch (act.type) {
      case 'addProperties':
        for (const key in act.extraData) {
          history[key] = act.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete history[key];
        }
        break;
      case 'clear':
        history = {};
        break;
    }
    fullHistory.push(history);
    prev = history;
  }

  return fullHistory;
}

module.exports = transformStateWithClones;
