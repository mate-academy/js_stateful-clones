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
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
