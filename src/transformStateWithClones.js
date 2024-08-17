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

  for (const i in actions) {
    switch (actions[i].type) {
      case 'clear':
        currentState = {};
        history.push(currentState);
        break;

      case 'addProperties':
        const propertiesToAdd = actions[i].extraData;

        currentState = Object.assign({}, currentState, propertiesToAdd);
        history.push(currentState);
        break;

      case 'removeProperties':
        currentState = Object.assign({}, currentState);

        actions[i].keysToRemove.forEach((key) => {
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
