'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let variableObj = { ...state };

  for (const i of actions) {
    const ToPush = { ...variableObj };

    if (i.type === 'addProperties') {
      Object.assign(ToPush, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete ToPush[key];
      }
    }

    if (i.type === 'clear') {
      for (const key in variableObj) {
        delete ToPush[key];
      }
    }

    variableObj = { ...ToPush };
    result.push(ToPush);
  }

  return result;
}

module.exports = transformStateWithClones;
