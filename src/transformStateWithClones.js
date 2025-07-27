'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const newState = { ...state };

  for (const elem of actions) {
    if (elem.type === 'addProperties') {
      Object.assign(newState, elem.extraData);
    }

    if (elem.type === 'removeProperties') {
      for (const subElem of elem.keysToRemove) {
        delete newState[subElem];
      }
    }

    if (elem.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    res.push({ ...newState });
  }

  return res;
}

module.exports = transformStateWithClones;
