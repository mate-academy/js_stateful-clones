'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  // create a deep copy of the "state" object to modify its properties
  let stateCopy = structuredClone(state);
  // maintain a list of state history in order to return it at the end
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const currentAction = actions[i];

    /*
    if the current action is to add properties to the state object, go ahead and
    store the object contained in "currentAction.extraData" into the "dataToAdd"
    variable to make it easier to traverse the object and add its properties to
    the state object
    */
    if (currentAction.type === 'addProperties') {
      const dataToAdd = currentAction.extraData;

      for (const key in dataToAdd) {
        stateCopy[key] = dataToAdd[key];
      }
    }

    /*
    if the current action is to delete properties from the state object, go
    ahead and store the array of keys to remove into "dataToRemove", and then
    traverse the array and take the current key and remove it from the state
    object
    */
    if (currentAction.type === 'removeProperties') {
      const dataToRemove = currentAction.keysToRemove;

      for (let j = 0; j < dataToRemove.length; j++) {
        delete stateCopy[dataToRemove[j]];
      }
    }

    /*
    if the current action is to clear all of the properties contained in the
    state object, go ahead and set "stateCopy" to an empty object, which will
    delete all of its properties
    */
    if (currentAction.type === 'clear') {
      stateCopy = {};
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
