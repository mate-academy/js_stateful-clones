'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateVersions = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, keysToRemove);
        break;
      default:
        clear(stateCopy);
    }
    stateVersions.push(stateCopy);
    stateCopy = { ...stateCopy };
  }

  return stateVersions;
}

function removeProperties(obj, arr) {
  for (const property of arr) {
    delete obj[property];
  }
}

function clear(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
