'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const solution = [];
  let input = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(input, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete input[keyToRemove];
        }
        break;

      case 'clear':
        input = {};
        break;
    }
    solution.push({ ...input });
  }

  return solution;
}

module.exports = transformStateWithClones;
