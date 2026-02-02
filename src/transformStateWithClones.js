'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const arrayActions = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(currentState, { ...element.extraData });
        arrayActions.push({ ...currentState });
        break;
      case 'removeProperties':
        for (const key of element.keysToRemove) {
          delete currentState[key];
        }
        arrayActions.push({ ...currentState });
        break;
      case 'clear':
        for (const k in currentState) {
          delete currentState[k];
        }
        arrayActions.push({ ...currentState });
    }
  }

  return arrayActions;
}

module.exports = transformStateWithClones;
