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
        result.push({});
        newState = {};
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete newState[action.keysToRemove[i]];
        }

        const tmp = {};

        Object.assign(tmp, newState);
        result.push(tmp);
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);

        const tmp1 = {};

        Object.assign(tmp1, newState);
        result.push(tmp1);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
