'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  let lastIndex;
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        statesArray.push({ ...currentState, ...action.extraData });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        statesArray.push(currentState);

        break;
      case 'clear':
        statesArray.push({});
    }

    lastIndex = statesArray.length - 1;
    currentState = { ...statesArray[lastIndex] };
  }

  return statesArray;
}

module.exports = transformStateWithClones;
