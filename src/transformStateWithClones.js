'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  let currentState = { ...state };

  for (const { type, ...keys } of actions) {
    const typeReg = type.toLowerCase();

    switch (typeReg) {
      case 'addProperties'.toLowerCase():
        currentState = Object.assign(currentState, keys.extraData);

        break;
      case 'removeProperties'.toLowerCase():
        for (const key of keys.keysToRemove) {
          delete currentState[key];
        }

        break;
      case 'clear'.toLowerCase():
        for (const key in currentState) {
          delete currentState[key];
        }

        break;
    }

    states.push(currentState);

    currentState = { ...currentState };
  }

  return states;
}

module.exports = transformStateWithClones;
