'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let itemOfResult = { ...state };

  for (const action of actions) {
    itemOfResult = { ...itemOfResult };

    switch (action.type) {
      case 'addProperties': Object.assign(itemOfResult, action.extraData);
        break;

      case 'removeProperties': const keysResult = Object.keys(itemOfResult);

        for (const key of action.keysToRemove) {
          if (keysResult.includes(key)) {
            delete itemOfResult[key];
            keysResult.splice(keysResult.indexOf(key), 1);
          }
        }
        break;

      case 'clear': itemOfResult = {};
        break;

      default: itemOfResult = {};
    }

    result.push(itemOfResult);
  }

  return result;
}

module.exports = transformStateWithClones;
