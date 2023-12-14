'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const initialStateClone = { ...state };

  const clonedStates = [];

  for (const action of actions) {
    const currentStateClone = clonedStates.length > 0
      ? { ...clonedStates[clonedStates.length - 1] }
      : { ...initialStateClone };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateClone, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentStateClone[key]);
        break;
      case 'clear':
        Object.keys(currentStateClone).forEach(key =>
          delete currentStateClone[key]);
        break;
      default:
    }

    clonedStates.push(currentStateClone);
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
