'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {

  const finMass = [];
  let stateCopy = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      Object.assign(stateCopy, actions[action].extraData);
      finMass.push({ ...stateCopy });
    }

    if (actions[action].type === 'removeProperties') {
      for (const removeKey of actions[action].keysToRemove) {
        delete stateCopy[removeKey];
      }
      finMass.push({ ...stateCopy });
    }

    if (actions[action].type === 'clear') {
      stateCopy = {};
      finMass.push({ ...stateCopy });
    }
  }

  return finMass;
}
module.exports = transformStateWithClones;
