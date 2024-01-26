'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
//
  let newObj = {
    ...state,
  };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete newObj[prop];
        }
        break;

      case 'clear':
        newObj = {};
        break;
    }
    newArray.push({ ...newObj });
  }

  return newArray;
}

module.exports = transformStateWithClones;
