'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const st = { ...state };

  const historyArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(st, action.extraData);

        historyArr.push({ ...st });
        break;
      }

      case 'removeProperties': {
        for (const keysToRemove of action.keysToRemove) {
          delete st[keysToRemove];
        }
        historyArr.push({ ...st });
        break;
      }

      case 'clear': {
        for (const key in st) {
          delete st[key];
        }
        historyArr.push({ ...st });
        break;
      }
    }
  }

  return historyArr;
}

module.exports = transformStateWithClones;
