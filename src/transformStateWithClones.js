'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (true) {
      case actions[i].type === 'addProperties':
        Object.assign(copy, actions[i].extraData);
        break;

      case actions[i].type === 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete copy[actions[i].keysToRemove[j]];
        };

        break;

      default:
        copy = {};
    }

    resultArray.push({
      ...copy,
    });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
