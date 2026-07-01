'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentStateReference = state;

  for (const action of actions) {
    let nextState = { ...currentStateReference };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(nextState);

    currentStateReference = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
