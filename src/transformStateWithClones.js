'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let copy = { ...state };

  for (const action of actions) {
    for (const entry of Object.entries(action)) {
      if (entry[0] === 'extraData') {
        Object.assign(copy, entry[1]);
      }

      if (entry[0] === 'keysToRemove') {
        for (let i = 0; i < entry[1].length; i++) {
          delete copy[entry[1][i]];
        }
      }

      if (entry[1] === 'clear') {
        copy = {};
      }
    }

    allStates.push({ ...copy });
  }

  return allStates;
}

module.exports = transformStateWithClones;
