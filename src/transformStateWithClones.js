'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArr = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          copyState[key] = value;
        }
        break;
      case 'removeProperties':
        for (const key of Object.values(keysToRemove)) {
          if (key in copyState) {
            delete copyState[key];
          }
        }
        break;
      default:
        copyState = {};
        break;
    }
    resArr.push({ ...copyState });
  }

  return resArr;
};

module.exports = transformStateWithClones;
