'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let currentState = state;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      array.push(currentState);
    }

    if (action.type === 'removeProperties') {
      currentState = Object.keys(currentState).reduce((acc, key) => {
        if (!action.keysToRemove.includes(key)) {
          acc[key] = currentState[key];
        }

        return acc;
      }, {});
      array.push(currentState);
    }

    if (action.type === 'clear') {
      currentState = {};
      array.push(currentState);
    }
  }

  return array;
}

module.exports = transformStateWithClones;
