'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const results = [];
  let copyCurrent = { ...state };

  for (const action of actions) {
    let copy;

    if (action.type === 'addProperties') {
      copy = { ...copyCurrent };

      Object.assign(copy, action.extraData);
    } else if (action.type === 'removeProperties') {
      copy = { ...copyCurrent };

      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    } else if (action.type === 'clear') {
      copy = {};
    }
    results.push(copy);
    copyCurrent = copy;
  }

  return results;
}

module.exports = transformStateWithClones;
