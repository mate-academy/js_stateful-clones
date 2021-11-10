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

  for (const action of actions) {
    const stateCopy = { ...arrOfStates[arrOfStates.length - 1] };

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      arrOfStates.push(stateCopy);
    }

    if (action.type === 'clear') {
      arrOfStates.push({});
    }

    if (action.type === 'removeProperties') {
      for (const elem of action.keysToRemove) {
        if (stateCopy.hasOwnProperty(elem)) {
          delete stateCopy[elem];
        }
      }

      arrOfStates.push(stateCopy);
    }
  }

  arrOfStates.shift();

  return arrOfStates;
}

module.exports = transformStateWithClones;
