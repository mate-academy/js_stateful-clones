'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalState = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties'
      && action.hasOwnProperty('extraData')):
        currentState = {
          ...currentState, ...action.extraData,
        };
        finalState.push({ ...currentState });
        break;

      case (action.type === 'removeProperties'
      && action.hasOwnProperty('keysToRemove')):
        const newState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }

        currentState = newState;
        finalState.push({ ...currentState });
        break;

      case (action.type === 'clear'):
        currentState = {};
        finalState.push({ ...currentState });
        break;
    }
  }

  return finalState;
}

module.exports = transformStateWithClones;
