'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const states = [];
  const actionsReg = {
    ACTION_CLEAR: 'clear',
    ACTION_ADD: 'addProperties',
    ACTION_REMOVE: 'removeProperties',
  };

  for (const action of actions) {
    switch (action.type) {
      case (actionsReg.ACTION_CLEAR):
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case (actionsReg.ACTION_ADD):
        Object.assign(stateClone, action.extraData);
        break;

      case (actionsReg.ACTION_REMOVE):
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        }
        break;

      default:
        throw new Error('Unexpected action!');
    }
    states.push(Object.assign({}, stateClone));
  }

  return states;
}

module.exports = transformStateWithClones;
