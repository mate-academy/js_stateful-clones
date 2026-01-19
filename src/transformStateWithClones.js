'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = state;
  const history = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...currentState };

        if (typeof action.extraData === 'object' && action.extraData !== null) {
          Object.assign(nextState, action.extraData);
        }
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      default:
        // ação desconhecida → apenas clona o estado
        nextState = { ...currentState };
        break;
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}
module.exports = transformStateWithClones;
