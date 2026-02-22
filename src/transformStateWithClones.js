'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(states, actions) {
  // write code here
  const hystory = [];
  const tempor = { ...states };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(tempor, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const t of i.keysToRemove) {
        delete tempor[t];
      }
    }

    if (i.type === 'clear') {
      for (const key in tempor) {
        delete tempor[key];
      }
    }
    hystory.push({ ...tempor });
  }

  return hystory;
}

module.exports = transformStateWithClones;
