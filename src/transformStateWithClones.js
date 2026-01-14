'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    let addedItem = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        addedItem = {
          ...addedItem,
          ...action.extraData,
        };
        stateCopy = addedItem;
        break;

      case 'removeProperties':
        addedItem = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete addedItem[key];
        }
        stateCopy = addedItem;

        break;

      case 'clear':
        addedItem = {};
        stateCopy = addedItem;

        break;

      default:
        addedItem = { ...state };
    }

    result.push(addedItem);
  }

  return result;
}

module.exports = transformStateWithClones;
