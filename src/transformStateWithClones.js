'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const clonesArr = [];

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'clear') {
        for (const prop in clone) {
          delete clone[prop];
        }
      }

      if (key === 'type') {
        continue;
      } else if (key === 'extraData') {
        Object.assign(clone, action[key]);
      } else if (key === 'keysToRemove') {
        for (const prop in action[key]) {
          delete clone[action[key][prop]];
        }
      } else {
        return clone;
      }
    }

    clonesArr.push({ ...clone });
  }

  return clonesArr;
}

module.exports = transformStateWithClones;
