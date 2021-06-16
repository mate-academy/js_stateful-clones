'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const Clone = {};
  const CloneArr = [];

  Object.assign(Clone, state);

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(Clone, key.extraData);
        break;
      case 'clear':
        for (const k in Clone) {
          delete Clone[k];
        }
        break;
      case 'removeProperties':
        for (const keys of key.keysToRemove) {
          delete Clone[keys];
        }
        break;
    }
    CloneArr.push({ ...Clone });
  }

  return CloneArr;
}

module.exports = transformStateWithClones;
