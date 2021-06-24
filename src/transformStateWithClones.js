'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(copyState, i.extraData);
        break;

      case 'removeProperties':
        for (const key of i.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    const allIterations = { ...copyState };

    result.push(allIterations);
  }

  return result;
}

module.exports = transformStateWithClones;
