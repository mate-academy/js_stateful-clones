'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfStates = [{ ...state }];

  for (const { type, extraData, keysToRemove } of actions) {
    const stateCopy = { ...arrOfStates[arrOfStates.length - 1] };

    switch (type) {
      case 'addProperties': {
        Object.assign(stateCopy, extraData);
        arrOfStates.push(stateCopy);

        break;
      }

      case 'clear': {
        arrOfStates.push({});

        break;
      }

      case 'removeProperties': {
        for (const elem of keysToRemove) {
          delete stateCopy[elem];
        }

        arrOfStates.push(stateCopy);
      }
    }
  }

  arrOfStates.shift();

  return arrOfStates;
}

module.exports = transformStateWithClones;
