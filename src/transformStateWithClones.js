'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const arrReturn = [];

  const pushNewStToArr = () => arrReturn.push({ ...newState });

  for (const { type, keysToRemove, extraData } of actions) {
    switch (type) {
      case 'clear':
        for (const keyInNewState in newState) {
          delete newState[keyInNewState];
        }

        pushNewStToArr();
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete newState[keyToRemove];
        }

        pushNewStToArr();
        break;

      case 'addProperties':
        Object.assign(newState, extraData);
        pushNewStToArr();
        break;
    }
  }

  return arrReturn;
}

module.exports = transformStateWithClones;
