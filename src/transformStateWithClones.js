'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const stages = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        clone = {};
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'addProperties':
        Object.assign(clone, act.extraData);
        break;
    }
    stages.push({ ...clone });
  }

  return stages;
}

module.exports = transformStateWithClones;
