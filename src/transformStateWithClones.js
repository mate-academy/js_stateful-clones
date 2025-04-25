'use strict';

/**
 * Write a transformStateWithClones function that takes a
 * state object and an actions array, applies each action
 * to the previos state to calculate the next state, and
 * returns an array with states recieved after each action.

Each action is an object describing state changes. D
epending on a value of its type property you should do the next:

clear - create an empty state object;
addProperties - add all key: value pairs given in extraData
property to the new state;
removeProperties - remove all keys given in the keysToRemove
array from the state. (ignore not existing)
IMPORTANT! DON'T modify the initial state object in any way!
 *
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = Object.assign({}, stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = Object.assign({}, stateCopy);

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: '${action.type}'`);
    }

    newStates.push({ ...stateCopy });
  }

  return newStates;
}

module.exports = transformStateWithClones;
