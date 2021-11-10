'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const allStateVersions = [];
  let newState = { ...state };

  for (const action in actions) {
    const type = actions[action].type;

    switch (type) {
      case 'addProperties': {
        const addProp = actions[action].extraData;

        for (const prop in addProp) {
          newState[prop] = addProp[prop];
        };

        allStateVersions.push({ ...newState });
        break;
      }

      case 'removeProperties': {
        const keys = actions[action].keysToRemove;

        for (const key in keys) {
          delete newState[keys[key]];
        }
        allStateVersions.push({ ...newState });
        break;
      }

      case 'clear': {
        newState = {};
        allStateVersions.push({ ...newState });
        break;
      }
    }
  }

  return allStateVersions;
}

module.exports = transformStateWithClones;
