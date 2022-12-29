'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  let stateNew = { ...state };
  const stateChanges = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateNew, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateNew[key];
        };
        break;
      case 'clear':
        stateNew = {};
        break;
      default:
        throw new Error('function dot found');
    }

    stateChanges.push({ ...stateNew });
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
