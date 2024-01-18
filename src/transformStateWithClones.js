'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const arr = [];

  for (const object of actions) {
    const { type, extraData, keysToRemove } = object;

    switch (type) {
      case 'addProperties':
        stateClone = {
          ...stateClone, ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        };
        break;

      case 'clear' :
        stateClone = {};
        break;
    }

    arr.push({ ...stateClone });
  }

  return arr;
}

module.exports = transformStateWithClones;
