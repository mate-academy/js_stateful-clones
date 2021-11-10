'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let newState = { ...state };

  for (const todo of actions) {
    switch (todo.type) {
      case 'addProperties':
        Object.assign(newState, todo.extraData);
        break;
      case 'removeProperties':
        for (const removeKeys of todo.keysToRemove) {
          delete newState[removeKeys];
        };
        break;
      case 'clear':
        newState = {};
    }
    history.push({ ...newState });
  }

  return history;
}

module.exports = transformStateWithClones;
