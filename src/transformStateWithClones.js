'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const k = [];

  for (const x of actions) {
    switch (x.type) {
      case 'addProperties':
        Object.assign(newState, x.extraData);
        break;

      case 'removeProperties': {
        for (const y of x.keysToRemove) {
          delete newState[y];
        }
        break;
      }

      case 'clear': {
        for (const z in newState) {
          delete newState[z];
        }
        break;
      }
    }

    k.push({ ...newState });
  }

  return k;
}

module.exports = transformStateWithClones;
