'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATES = [];
  let copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copy = {};
        break;
      case 'addProperties':
        copy = { ...action.extraData };
        break;
      case 'removeProperties':
        copy = { ...copy };

        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;
      default:
        break;
    }

    STATES.push(copy);
  }

  return STATES;
}

module.exports = transformStateWithClones;
