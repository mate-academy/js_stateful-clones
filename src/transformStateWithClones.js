'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfState = [];
  let modifyState = { ...state };

  for (const taskToDo of actions) {
    if (taskToDo.type === 'addProperties') {
      modifyState = { ...modifyState, ...taskToDo.extraData };
    }

    if (taskToDo.type === 'removeProperties') {
      modifyState = { ...modifyState };

      for (const key of taskToDo.keysToRemove) {
        delete modifyState[key];
      }
    }

    if (taskToDo.type === 'clear') {
      modifyState = {};
    }

    arrayOfState.push({ ...modifyState });
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
