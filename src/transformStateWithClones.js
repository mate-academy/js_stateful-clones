'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrObj = [];
  let newState = structuredClone(state);

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(newState, act.extraData);
    }

    if (act.type === 'removeProperties') {
      for (const key of act.keysToRemove) {
        delete newState[key];
      }
    }

    if (act.type === 'clear' && Object.keys(newState).length !== 0) {
      newState = {};
    }
    arrObj.push(structuredClone(newState));
  }

  return arrObj;
}
module.exports = transformStateWithClones;
