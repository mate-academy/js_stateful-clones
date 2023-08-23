'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [{ ...state }];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      resultArray.push(
        Object.assign(
          { ...resultArray[resultArray.length - 1] },
          action.extraData
        )
      );
    }

    if (action.type === 'removeProperties') {
      const newState = { ...resultArray[resultArray.length - 1] };

      for (const key of action.keysToRemove) {
        if (newState[key]) {
          delete newState[key];
        }
      }

      resultArray.push(newState);
    }

    if (action.type === 'clear') {
      resultArray.push({});
    }
  }

  return resultArray.slice(1);
}

module.exports = transformStateWithClones;
