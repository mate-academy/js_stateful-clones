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
    switch (action.type) {
      case 'addProperties':
        result.push({
          ...stateCopy,
          ...action.extraData,
        });

        stateCopy = result[result.length - 1];
        break;
      case 'removeProperties':
        const newItem = {
          ...stateCopy,
        };

        for (const keyToRemove of action.keysToRemove) {
          delete newItem[keyToRemove];
        }
        result.push(newItem);
        stateCopy = result[result.length - 1];
        break;

      case 'clear':
        const addedItem = {};

        result.push(addedItem);
        stateCopy = result[result.length - 1];
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
