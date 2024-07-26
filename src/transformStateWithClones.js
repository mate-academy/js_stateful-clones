'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = []; // создаем пустой массив
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };
      // для removeProperties мы должны создать копию. Перебираем элементы

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }
    newStates.push(currentState);
  }

  return newStates;
}

module.exports = transformStateWithClones;
