'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = Object.assign({}, state);
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    let next = Object.assign({}, prev);

    const nextStep = () => {
      stateHistory.push(next);
      prev = next;
    };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(next, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      }

      case 'clear': {
        next = {};
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    nextStep();
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
