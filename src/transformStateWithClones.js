'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const listOfNewStates = [];

  const oneAction = (task) => {
    switch (task.type) {
      case 'addProperties':
        Object.assign(newState, task.extraData);
        break;
      case 'removeProperties':
        task.keysToRemove.forEach((key) => delete newState[key]);
        break;
      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
    }

    listOfNewStates.push({ ...newState });
  };

  actions.forEach(oneAction);

  return listOfNewStates;
}

module.exports = transformStateWithClones;
