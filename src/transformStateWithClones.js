'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectStates = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        };
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    objectStates.push({ ...newState });
  }

  return objectStates;
}

module.exports = transformStateWithClones;
