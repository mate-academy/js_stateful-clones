'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/* function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          cloneState = { ...cloneState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          cloneState = { ...cloneState };

          for (const key of action.keysToRemove) {
            delete cloneState[key];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          cloneState = {};
        }
        break;
    }
  }
  result.push({ ...cloneState });

  return result;
} */

function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const result = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        if (typeof i.extraData === 'object') {
          Object.assign(cloneState, i.extraData);
        }
        result.push({ ...cloneState });
        break;

      case 'removeProperties':
        for (const key of i.keysToRemove) {
          delete cloneState[key];
        }
        result.push({ ...cloneState });
        break;

      case 'clear':
        cloneState = {};
        result.push({ ...cloneState });
        break;

      default:
        return 'Unknown action type';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
