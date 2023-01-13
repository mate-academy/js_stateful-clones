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

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < keysToRemove.length; j++) {
          if (currentState.hasOwnProperty(keysToRemove[j])) {
            delete currentState[keysToRemove[j]];
          }
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }
    states.push(JSON.parse(JSON.stringify(currentState)));
  }

  return states;
}

module.exports = transformStateWithClones;
