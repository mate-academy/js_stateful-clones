'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  let copy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        copy = {};
    }
    arrayResult.push({ ...copy });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
