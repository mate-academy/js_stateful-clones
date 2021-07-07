'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let clonedState = { ...state };
  const states = [];

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties': {
        Object.assign(clonedState, properties);
        break;
      }

      case 'removeProperties': {
        for (const key of properties) {
          delete clonedState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;
      }
    }

    states.push(clonedState);
    clonedState = { ...clonedState };
  }

  return states;
}

module.exports = transformStateWithClones;
