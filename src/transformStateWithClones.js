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
  const stateClone = {};

  Object.assign(stateClone, state);

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        {
          const { extraData } = action;

          Object.assign(stateClone, extraData);

          addToArray(results, stateClone);
        }
        break;

      case 'removeProperties':
        {
          const { keysToRemove } = action;

          for (const key of keysToRemove) {
            delete stateClone[key];
          }

          addToArray(results, stateClone);
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }

        addToArray(results, stateClone);
        break;
    }
  }

  return results;
}

module.exports = transformStateWithClones;

function addToArray(array, object) {
  array.push({ ...object });
}
