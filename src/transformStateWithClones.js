'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfObj = [];
  const copy = {};

  Object.assign(copy, state);

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(copy, act.extraData);
    }

    if (act.type === 'removeProperties') {
      const arr = act.keysToRemove;

      for (const key of arr) {
        delete copy[key];
      }
    }

    if (act.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    arrayOfObj.push({ ...copy });

    return arrayOfObj;
  }
}

module.exports = transformStateWithClones;
