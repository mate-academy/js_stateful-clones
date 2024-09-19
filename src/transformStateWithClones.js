'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrToReturn = [];
  // copying state
  let stateCopy = { ...state };

  // iterate throught actions array
  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      // Add to already existing state extraData.
      stateCopy = { ...stateCopy, ...extraData };
    }

    if (type === 'removeProperties') {
      // This one is easy to understand actually
      for (const key of keysToRemove) {
        delete stateCopy[key];
      }
    }

    // Reset stateCopy, like IPhone
    if (type === 'clear') {
      stateCopy = {};
    }

    arrToReturn.push({ ...stateCopy });
  }

  return arrToReturn;
}

module.exports = transformStateWithClones;
