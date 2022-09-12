'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const arrayActions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      copyState = Object.assign({}, copyState, action.extraData);
      arrayActions.push(copyState);
    }

    if (action.type === 'removeProperties') {
      copyState = { ...copyState };

      for (const property of action.keysToRemove) {
        delete copyState[property];
      }
      arrayActions.push(copyState);
    }

    if (action.type === 'clear') {
      copyState = {};
      arrayActions.push(copyState);
    }
  }

  return arrayActions;
}

module.exports = transformStateWithClones;
