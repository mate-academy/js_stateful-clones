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
    const action = actions[i];
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = Object.assign({}, prevState, action.extraData);
        break;

      case 'removeProperties':
        nextState = Object.assign({}, prevState);

        for (const k of action.keysToRemove) {
          delete nextState[k];
        }
        break;

      case 'clear':
        nextState = {};
        break;
      default:
        continue;
    }

    history.push(nextState);
    prevState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
