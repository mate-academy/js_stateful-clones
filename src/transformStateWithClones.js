'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = {};

  Object.assign(newState, state);

  const result = [];

  for (const action of actions) {
    const expr = action.type;

    switch (expr) {
      case 'clear':
        newState = {};
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete newState[action.keysToRemove[i]];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
    }

    const tmp = {};

    Object.assign(tmp, newState);
    result.push(tmp);
  }

  return result;
}

module.exports = transformStateWithClones;
