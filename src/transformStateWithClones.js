'use strict';

/**
 * @param {Object} result
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const solution = [];
  let result = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(result, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete result[key];
        }
        break;

      case 'clear':
        result = {};
        break;
    }

    solution.push({ ...result });
  }

  return solution;
}

module.exports = transformStateWithClones;
