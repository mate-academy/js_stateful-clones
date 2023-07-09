'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [state];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    let previousState = { ...stateArray[stateArray.length - 1] };

    switch (type) {
      case 'clear':
        Object.keys(previousState).forEach((key) => delete previousState[key]);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete previousState[key];
        }
        break;

      case 'addProperties':
        previousState = {
          ...previousState, ...extraData,
        };

        break;
    }

    stateArray.push(previousState);
  }

  return stateArray.slice(1);
}

module.exports = transformStateWithClones;
