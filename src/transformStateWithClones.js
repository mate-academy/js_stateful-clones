'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArray = [];
  let changedObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(changedObject, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete changedObject[key]);
        break;

      case 'clear':
        changedObject = {};
        break;
    }

    historyArray.push({ ...changedObject });
  }

  return historyArray;
}

module.exports = transformStateWithClones;
