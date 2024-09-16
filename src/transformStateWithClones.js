'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versions = [];
  const stateCopy = { ...state };
  let version = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        version = { ...addProperties(stateCopy, action.extraData) };
        versions.push(version);
        break;

      case 'removeProperties':
        version = { ...removeProperties(stateCopy, action.keysToRemove) };
        versions.push(version);
        break;

      default:
        version = { ...clearObj(stateCopy) };
        versions.push(version);
    }
  }

  return versions;
}

function addProperties(obj, data) {
  Object.assign(obj, data);

  return obj;
}

function removeProperties(obj, properies) {
  for (const prop of properies) {
    if (obj[prop]) {
      delete obj[prop];
    }
  }

  return obj;
}

function clearObj(obj) {
  const objKeys = Object.keys(obj);

  objKeys.forEach(key => {
    delete obj[key];
  });

  return obj;
}

module.exports = transformStateWithClones;
