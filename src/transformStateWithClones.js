'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};
        history.push(currentState);
        break;

      case 'addProperties':
        currentState = Object.assign({}, currentState, extraData);
        history.push(currentState);
        break;

      case 'removeProperties':
        currentState = Object.assign({}, currentState);

        keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        history.push(currentState);
        break;

      default:
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
