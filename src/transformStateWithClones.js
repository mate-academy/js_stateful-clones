'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyState = { ...state };

  const ACTION_CASES = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  for (const ACTION of actions) {
    const { type, extraData, keysToRemove } = ACTION;

    switch (type) {
      case ACTION_CASES.add:
        copyState = {
          ...copyState,
          ...extraData,
        };
        break;
      case ACTION_CASES.remove:
        keysToRemove.forEach((key) => {
          if (copyState.hasOwnProperty(key)) {
            delete copyState[key];
          }
        });
        break;
      case ACTION_CASES.clear:
        copyState = {};
        break;
      default:
        break;
    }
    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
