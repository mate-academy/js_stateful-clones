'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTIONS = {
    ADD_PROPERTIES: 'addProperties',
    REMOVE_PROPERTIES: 'removeProperties',
    CLEAR: 'clear',
  };

  const fixedState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case ACTIONS.ADD_PROPERTIES:
        Object.assign(fixedState, action.extraData);
        break;

      case ACTIONS.REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete fixedState[key];
        }
        break;

      case ACTIONS.CLEAR:
        for (const key in fixedState) {
          delete fixedState[key];
        }
        break;
      default:
        throw new Error('Error handing');
    }
    resultArray.push({ ...fixedState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
