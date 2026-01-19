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
        history.push(nextState);
        currentState = { ...nextState };
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          if (Object.prototype.hasOwnProperty.call(nextState, key)) {
            delete nextState[key];
          }
        }
        history.push(nextState);
        currentState = { ...nextState };
        break;
      case 'clear':
        nextState = {};
        history.push(nextState);
        currentState = { ...nextState };
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
