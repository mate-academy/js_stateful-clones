'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let curState = state;

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties': {
        newState = { ...curState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        newState = { ...curState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default: {
        throw new Error(`Unknow action type: ${action.type}`);
      }
    }

    results.push(newState);
    curState = newState;
  }

  return results;
}

module.exports = transformStateWithClones;
