'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const verions = [];
  let result = { ...state };
  let version = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        version = { ...Object.assign(result, action.extraData) };
        verions.push(version);
        break;

      case 'removeProperties':
        version = { ...removeProperties(result, action.keysToRemove) };
        verions.push(version);
        break;

      case 'clear':
        result = {};
        version = {};
        verions.push(version);
        break;

      default:
        return `Something goes wrong! Check: State:${state}. Action:${actions}`;
    }
  }

  return verions;
}

function removeProperties(obj, prop) {
  for (const i of prop) {
    if (obj[i]) {
      delete obj[i];
    }
  }

  return obj;
}

module.exports = transformStateWithClones;
