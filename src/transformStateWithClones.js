'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const num in copy) {
          delete copy[num];
        };
        newArr.push({ ...copy });
        break;

      case 'addProperties':
        Object.assign(copy, action.extraData);
        newArr.push({ ...copy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        newArr.push({ ...copy });
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
