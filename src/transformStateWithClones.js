'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneArr = [];
  const clone = {};

  for (const key in state) {
    clone[key] = state[key];
  }

  for (const act of actions) {
    for (const type in act) {
      if (act[type] === 'addProperties') {
        Object.assign(clone, act.extraData);

        const stampClone = {};

        for (const key in clone) {
          stampClone[key] = clone[key];
        }

        cloneArr.push(stampClone);
      } else if (act[type] === 'removeProperties') {
        const stateKeys = Object.keys(clone);

        for (const key of act.keysToRemove) {
          for (const stateKey of stateKeys) {
            if (key === stateKey) {
              delete clone[stateKey];
            }
          }
        }

        const stampClone = {};

        for (const key in clone) {
          stampClone[key] = clone[key];
        }

        cloneArr.push(stampClone);
      } else if (act[type] === 'clear') {
        for (const key in clone) {
          delete clone[key];
        };

        const stampClone = {};

        for (const key in clone) {
          stampClone[key] = clone[key];
        }

        cloneArr.push(stampClone);
      }
    }
  }

  return cloneArr;
}

module.exports = transformStateWithClones;
