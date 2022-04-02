'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let tempState = state;

  for (let i = 0; i < actions.length; i++) {
    for (const keys in actions[i]) {
      switch (actions[i][keys]) {
        case 'addProperties':
          if (result[i - 1]) {
            tempState = result[i - 1];
          }

          result.push(Object.assign({}, tempState));

          for (const data in actions[i].extraData) {
            result[i][data] = actions[i].extraData[data];
          }
          break;

        case 'removeProperties':
          if (result[i - 1]) {
            tempState = result[i - 1];
          }

          result.push(Object.assign({}, tempState));

          for (const remove of actions[i].keysToRemove) {
            delete result[i][remove];
          }
          break;

        case 'clear':
          result.push({});
          break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
