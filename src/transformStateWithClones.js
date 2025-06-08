'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;
      case 'clear':
        currentState = {};
        break;
    }
    history.push(JSON.parse(JSON.stringify(currentState)));
  }

  return history;
}

module.exports = transformStateWithClones;
