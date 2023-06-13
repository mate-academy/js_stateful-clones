'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfModifiedStates = [];
  const modifiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties') :
        Object.assign(modifiedState, action.extraData);

        break;

      case ('removeProperties') :
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case ('clear') :
        for (const key in modifiedState) {
          delete modifiedState[key];
        }

        break;

      default:
        throw Error(`Action type "${action.type}" is not found`);
    }

    arrOfModifiedStates.push({ ...modifiedState });
  }

  return arrOfModifiedStates;
}

module.exports = transformStateWithClones;
