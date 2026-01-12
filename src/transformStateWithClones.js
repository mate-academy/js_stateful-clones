'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = state;

  for (const action of actions) {
    const stateCopy = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const elem of Object.keys(stateCopy)) {
          delete stateCopy[elem];
        }
        break;
    }

    stateHistory.push(stateCopy);
    prevState = stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
