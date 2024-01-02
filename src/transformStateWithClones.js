'use strict';

const ACTION_CASES = {
  ADD_PROPERTIES: 'addProperties',
  REMOVE_PROPERTIES: 'removeProperties',
  CLEAR: 'clear',
};

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @returns {Object[]}
 */
function transformStateWithClones(state, actions) {
  const initialStateClone = { ...state };

  function handleAction(currentStateClone, action) {
    switch (action.type) {
      case ACTION_CASES.ADD_PROPERTIES:
        Object.assign(currentStateClone, action.extraData);
        break;
      case ACTION_CASES.REMOVE_PROPERTIES:
        for (const keyToRemove of action.keysToRemove) {
          delete currentStateClone[keyToRemove];
        }
        break;
      case ACTION_CASES.CLEAR:
        for (const key in currentStateClone) {
          if (currentStateClone.hasOwnProperty(key)) {
            delete currentStateClone[key];
          }
        }
        break;
      default:
    }
  }

  const clonedStates = [];

  for (const action of actions) {
    const currentStateClone = clonedStates.length > 0
      ? { ...clonedStates[clonedStates.length - 1] }
      : { ...initialStateClone };

    handleAction(currentStateClone, action);

    clonedStates.push(currentStateClone);
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
