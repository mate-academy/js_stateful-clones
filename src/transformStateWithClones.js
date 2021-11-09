'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const allStateVersions = [];
  const newState = { ...state };

  for (const obj in actions) {
    const type = actions[obj].type;

    if (type === 'addProperties') {
      const addProp = actions[obj].extraData;

      for (const prop in addProp) {
        newState[prop] = addProp[prop];
      }
      allStateVersions.push({ ...newState });
    }

    if (type === 'removeProperties') {
      const keys = actions[obj].keysToRemove;

      for (const key in keys) {
        delete newState[keys[key]];
      }
      allStateVersions.push({ ...newState });
    }

    if (type === 'clear') {
      for (const prop in newState) {
        delete newState[prop];
      }
      allStateVersions.push({ ...newState });
    }
  }

  return allStateVersions;
}

module.exports = transformStateWithClones;
