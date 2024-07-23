'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finMass = [];
  let someObj = { ...state };

  for (const ch in actions) {
    if (actions[ch].type === 'addProperties') {
      Object.assign(someObj, actions[ch].extraData);
      finMass.push({ ...someObj });
    }

    if (actions[ch].type === 'removeProperties') {
      for (const cn of actions[ch].keysToRemove) {
        delete someObj[cn];
      }
      finMass.push({ ...someObj });
    }

    if (actions[ch].type === 'clear') {
      someObj = {};
      finMass.push({ ...someObj });
    }
  }

  return finMass;
}
module.exports = transformStateWithClones;
