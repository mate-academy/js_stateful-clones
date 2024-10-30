'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const act of actions) {
    newState = { ...newState };

    switch (act.type) {
      case 'addProperties':
        for (const date in act.extraData) {
          newState[date] = act.extraData[date];
        }
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
    }
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
