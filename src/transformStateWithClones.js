'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const resArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(copyState, extraData);
        break;
      }

      case 'clear': {
        copyState = {};
        break;
      }

      case 'removeProperties': {
        for (const remove of keysToRemove) {
          delete copyState[remove];
        }
        break;
      }
    }

    resArr.push({ ...copyState });
  }

  return resArr;
}

module.exports = transformStateWithClones;
