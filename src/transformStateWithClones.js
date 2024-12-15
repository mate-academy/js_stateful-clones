'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = {};

  Object.assign(stateCopy, state);

  for (const key of actions) {
    switch (key.type) {
      case `addProperties`: {
        Object.assign(stateCopy, key.extraData);

        break;
      }

      case `removeProperties`: {
        for (const property of key.keysToRemove) {
          delete stateCopy[property];
        }

        break;
      }

      case `clear`: {
        for (const property in stateCopy) {
          delete stateCopy[property];
        }

        break;
      }

      default:
        break;
    }

    const newObj = structuredClone(stateCopy);

    stateHistory.push(newObj);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
