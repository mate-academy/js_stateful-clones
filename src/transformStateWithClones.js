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

  actions.forEach((action) => {
    if (action.type === 'clear') {
      changedObject = {};
      historyArray.push({ ...changedObject });
    }

    if (action.type === 'addProperties') {
      Object.assign(changedObject, action.extraData);
      historyArray.push({ ...changedObject });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete changedObject[key]);
      historyArray.push({ ...changedObject });
    }
  });

  return historyArray;
}

module.exports = transformStateWithClones;
