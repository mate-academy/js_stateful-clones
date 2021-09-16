'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newstate = { ...state };
  const stateclones = [];

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(newstate, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newstate[key];
        }
        break;

      case 'clear':
        for (const key in newstate) {
          delete newstate[key];
        }
        break;
    }
    stateclones.push({ ...newstate });
  }

  return stateclones;
}

module.exports = transformStateWithClones;
