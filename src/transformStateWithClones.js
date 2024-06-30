'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        nextState = { ...stateCopy };

        for (const key of action.keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        break;
      case 'clear':
        nextState = {};
        break;
    }
    stateCopies.push(nextState);
    stateCopy = nextState;
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
