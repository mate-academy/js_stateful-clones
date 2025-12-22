'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = state;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const action = actions[i];

      const nextState = Object.assign({}, prevState, action.extraData);

      history.push(nextState);

      prevState = nextState;
    }

    if (actions[i].type === 'removeProperties') {
      const nextState = Object.assign({}, prevState);
      const action = actions[i];

      for (const k of action.keysToRemove) {
        delete nextState[k];
      }

      history.push(nextState);

      prevState = nextState;
    }

    if (actions[i].type === 'clear') {
      const nextState = {};

      history.push(nextState);

      prevState = nextState;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
