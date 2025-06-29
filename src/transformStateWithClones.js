'use strict';
/**  Write a transformStateWithClones function tha
 * t takes a state object and an actions array,
 * applies each action to the previos state to calculate the next
 *  state, and returns an array with states recieved after each action.

Each action is an object describing state changes.
Depending on a value of its type property you should do the next:

clear - create an empty state object;
addProperties - add all key: value pairs given in
 extraData property to the new state;
removeProperties - remove all keys given in the keysToRemove a */
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const el of actions) {
    if (el.type === 'addProperties') {
      currentState = { ...currentState, ...el.extraData };
    }

    if (el.type === 'removeProperties') {
      for (const key of el.keysToRemove) {
        delete currentState[key];
      }
    }

    if (el.type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}
module.exports = transformStateWithClones;
