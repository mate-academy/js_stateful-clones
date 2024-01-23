'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayHistory = [ { ...state } ];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(arrayHistory[i], actions[i].extraData);
        break;
      case 'removeProperties':
        for (const j of actions[i].keysToRemove) {
          delete arrayHistory[i][j];
        }
        break;
      case 'clear':
        for (const t in arrayHistory[i]) {
          delete arrayHistory[i][t];
        }
        break;
    }
    arrayHistory.push({ ...arrayHistory[i] });
  }

  arrayHistory.pop();

  return arrayHistory;
}

module.exports = transformStateWithClones;
