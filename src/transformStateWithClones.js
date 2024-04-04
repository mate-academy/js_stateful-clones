'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateObject = { ...state };
  const stateArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateObject, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateObject[key];
        }

        break;

      case 'clear':
        stateObject = {};

        break;
    }

    stateArray.push({ ...stateObject });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
