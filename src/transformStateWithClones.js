'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const clones = [];

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`:
        Object.assign(stateCopy, action.extraData);
        break;

      case `removeProperties`:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case `clear`:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    clones.push({ ...stateCopy });
  }

  return clones;
}

module.exports = transformStateWithClones;
