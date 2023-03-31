'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = [];
  const newstate = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newstate, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (newstate.hasOwnProperty(key)) {
            delete newstate[key];
          }
        }
        break;

      case 'clear':
        for (const key in newstate) {
          if (newstate.hasOwnProperty(key)) {
            delete newstate[key];
          }
        }
        break;
    }
    copyState.push({ ...newstate });
  }

  return copyState;
}

module.exports = transformStateWithClones;
