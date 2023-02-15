'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateChanged = {
    ...state,
  };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const [prop, value] of Object.entries(obj.extraData)) {
          stateChanged[prop] = value;
        };
        break;

      case 'removeProperties':
        for (const prop of obj.keysToRemove) {
          delete stateChanged[prop];
        };
        break;

      case 'clear':
        for (const prop in stateChanged) {
          delete stateChanged[prop];
        };
        break;
    }
    result.push({ ...stateChanged });
  };

  return result;
}

module.exports = transformStateWithClones;
