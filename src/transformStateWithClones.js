'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const vers = [];
  let result = { ...state };
  let ver = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        ver = { ...Object.assign(result, action.extraData) };
        vers.push(ver);
        break;

      case 'removeProperties':
        ver = { ...removeProperties(result, action.keysToRemove) };
        vers.push(ver);
        break;

      case 'clear':
        result = {};
        ver = {};
        vers.push(ver);
        break;

      default:
        return `Something goes wrong! Check: State:${state}. Action:${actions}`;
    }
  }

  return vers;
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
