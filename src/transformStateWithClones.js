'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clone = [];
  const copyState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(copyState, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
    }

    clone.push({ ...copyState });
  }

  return clone;
}
module.exports = transformStateWithClones;
