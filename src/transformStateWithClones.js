'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfStates = [];

  arrOfStates.push(state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const stateCopy = { ...arrOfStates[arrOfStates.length - 1] };

      for (const action in actions[i].extraData) {
        stateCopy[action] = actions[i].extraData[action];
      }

      arrOfStates.push(stateCopy);
    }

    if (actions[i].type === 'clear') {
      const stateCopy = { ...arrOfStates[arrOfStates.length - 1] };

      for (const key in stateCopy) {
        delete stateCopy[key];
      }

      arrOfStates.push(stateCopy);
    }

    if (actions[i].type === 'removeProperties') {
      const stateCopy = { ...arrOfStates[arrOfStates.length - 1] };

      for (const key in stateCopy) {
        for (const elem of actions[i].keysToRemove) {
          if (elem === key) {
            delete stateCopy[key];
          }
        }
      }

      arrOfStates.push(stateCopy);
    }
  }

  arrOfStates.shift();

  return arrOfStates;
}

module.exports = transformStateWithClones;
