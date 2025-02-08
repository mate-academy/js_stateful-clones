'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const states = [{ ...state }];

  let countOperations = 0;

  for (const { type, ...keys } of actions) {
    let newState = { ...states[states.length - 1] };

    switch (type) {
      case 'addProperties':
        newState = Object.assign(newState, keys.extraData);

        if (countOperations === 0) {
          states[states.length - 1] = newState;
        } else {
          states.push(newState);
        }

        countOperations++;
        break;
      case 'removeProperties':
        for (const key of keys.keysToRemove) {
          delete newState[key];
        }

        if (countOperations === 0) {
          states[states.length - 1] = newState;
        } else {
          states.push(newState);
        }

        countOperations++;
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        if (countOperations === 0) {
          states[states.length - 1] = newState;
        } else {
          states.push(newState);
        }

        countOperations++;
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
