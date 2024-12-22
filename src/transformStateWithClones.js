'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalStates = [];
  const stateCopy = {};

  Object.assign(stateCopy, state);

  for (const step of actions) {
    switch (step.type) {
      case 'addProperties':
        Object.assign(stateCopy, step.extraData);
        break;
      case 'removeProperties':
        for (const key of step.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }

    finalStates.push(Object.assign({}, stateCopy));
  }

  return finalStates;
}

module.exports = transformStateWithClones;
