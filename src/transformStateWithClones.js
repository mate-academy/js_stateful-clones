'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const currentState = { ...state };

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties' :
        Object.assign(currentState, prop.extraData);
        break;

      case 'removeProperties' :
        for (const key of prop.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear' :
        for (const key in currentState) {
          delete currentState[key];
        }
    }

    stateClones.push({ ...currentState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
