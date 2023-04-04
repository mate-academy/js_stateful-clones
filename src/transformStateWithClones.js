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

    switch (i.type) {
      case 'addProperties':
        Object.assign(ToPush, i.extraData);
        break;
      case 'removeProperties':
        for (const key of i.keysToRemove) {
          delete ToPush[key];
        }
        break;
      case 'clear':
        for (const key in variableObj) {
          delete ToPush[key];
        }
        break;
    }

    variableObj = { ...ToPush };
    result.push(ToPush);
  }

  return result;
}

module.exports = transformStateWithClones;
