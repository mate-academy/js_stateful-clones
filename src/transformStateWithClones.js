'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let stateCopy = { ...state };

  for (const action of actions) {
    let currentState = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }

    result.push({ ...currentState });

    stateCopy = { ...currentState };
  }

  return result;
}

module.exports = transformStateWithClones;
