'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massiv = [];
  let curState = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      curState = { ...curState, ...key.extraData };
    } else if (key.type === 'removeProperties') {
      curState = { ...curState };

      for (const key2 of key.keysToRemove) {
        delete curState[key2];
      }
    } else if (key.type === 'clear') {
      curState = {};
    }
    massiv.push({ ...curState });
  }

  return massiv;
}

module.exports = transformStateWithClones;
