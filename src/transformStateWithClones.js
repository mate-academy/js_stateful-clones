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

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      currentState = {};
      history.push(currentState);
    }

    if (actions[i].type === 'addProperties') {
      const add = actions[i].extraData;

      currentState = Object.assign({}, currentState, add);
      history.push(currentState);
    }

    if (actions[i].type === 'removeProperties') {
      currentState = Object.assign({}, currentState);

      actions[i].keysToRemove.forEach((key) => {
        delete currentState[key];
      });
      history.push(currentState);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
