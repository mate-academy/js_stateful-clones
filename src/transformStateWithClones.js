'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = JSON.parse(JSON.stringify(state));
  const states = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'addProperties') {
      Object.assign(currentState, extraData);
    } else if (type === 'removeProperties') {
      for (let j = 0; j < keysToRemove.length; j++) {
        if (currentState.hasOwnProperty(keysToRemove[j])) {
          delete currentState[keysToRemove[j]];
        }
      }
    } else if (type === 'clear') {
      currentState = {};
    }
    states.push(JSON.parse(JSON.stringify(currentState)));
  };

  return states;
}

module.exports = transformStateWithClones;
