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

  for (const act of actions) {
    let nextState = { ...currentState };

    switch (act.type) {
      case 'addProperties':
        Object.assign(nextState, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          if (Object.prototype.hasOwnProperty.call(nextState, key)) {
            delete nextState[key];
          }
        }
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        return 'Eror...';
    }
    history.push(nextState);
    currentState = { ...nextState };
  }

  return history;
}

module.exports = transformStateWithClones;
