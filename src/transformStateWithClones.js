'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const results = [];

  actions.forEach(action => {
    let result;

    if (!results.length) {
      result = {
        ...state,
      };
    } else {
      result = { ...results[results.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.keys(action.extraData).forEach(dataKey => {
          result[dataKey] = action.extraData[dataKey];
        });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(keyRemove => {
          delete result[keyRemove];
        });

        break;
      case 'clear':
        for (const key in result) {
          delete result[key];
        }
        break;
      default:
        break;
    }
    results.push(result);
  });

  return results;
}

module.exports = transformStateWithClones;
