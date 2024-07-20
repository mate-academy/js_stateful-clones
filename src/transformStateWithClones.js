'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;
      case 'removeProperties':
        currentState = removeProp(currentState, action);
        break;
    }
    history.push(currentState);
  }

  function removeProp(obj, { keysToRemove }) {
    const result = { ...obj };

    for (const key of keysToRemove) {
      if (key in result) {
        delete result[key];
      }
    }

    return result;
  }

  return history;
}

module.exports = transformStateWithClones;
