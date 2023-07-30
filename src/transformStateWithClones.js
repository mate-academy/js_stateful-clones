'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const listOfStates = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateCopy, act.extraData);
        break;

      case 'removeProperties':
        for (const property of act.keysToRemove) {
          delete stateCopy[property];
        }
        break;

      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
    }

    listOfStates.push(Object.assign({}, stateCopy));
  }

  return listOfStates;
}

module.exports = transformStateWithClones;
