'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = Object.assign({}, state);
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(cloneState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const arrElem of obj.keysToRemove) {
        delete cloneState[arrElem];
      }
    }

    if (obj.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
