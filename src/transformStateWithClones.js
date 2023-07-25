'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let newState = JSON.parse(JSON.stringify(state));

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    arr.push(JSON.parse(JSON.stringify(newState)));
  }

  return arr;
}

module.exports = transformStateWithClones;
