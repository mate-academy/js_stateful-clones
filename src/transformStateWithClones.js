'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const states = [];
  let currentState = state;

  for (const { operation, properties } of transforms) {
    currentState = { ...currentState };

    switch (operation) {
      case ('addProperties'):
        currentState = {
          ...currentState,
          ...properties,
        };
        break;

      case ('removeProperties'):
        for (const property of properties) {
          delete currentState[property];
        }
        break;

      case ('clear'):
        currentState = {};
        break;
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
