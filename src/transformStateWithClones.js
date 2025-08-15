'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let ArchiveOfState = [];
  let currentState = { ...state };

  for (let action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case ('clear'):
        stateCopy = {};
        break;

      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);
        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

    default:
       throw new Error('Unknown action type')
    }
    ArchiveOfState.push(stateCopy);
    currentState = stateCopy;

  }
  return ArchiveOfState

}

module.exports = transformStateWithClones;
