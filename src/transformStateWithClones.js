'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (result.length > 0) {
          result.push(Object.assign({},
            result[result.length - 1],
            action.extraData));
          break;
        }
        result.push(Object.assign({}, state, action.extraData));
        break;

      case 'removeProperties':
        if (result.length > 0) {
          result.push(Object.assign({}, result[result.length - 1]));

          for (const key of action.keysToRemove) {
            delete result[result.length - 1][key];
          }
          break;
        }
        result.push(Object.assign({}, state));

        for (const key of action.keysToRemove) {
          delete result[result.length - 1][key];
        }
        break;

      case `clear`:
        result.push({});
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
