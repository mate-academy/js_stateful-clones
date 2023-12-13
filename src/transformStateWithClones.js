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

  for (let i = 0; i < actions.length; i++) {
    const ACTION = actions[i];

    switch (ACTION.type) {
      case ACTION_CASES.add:
        copyState = Object.assign({}, copyState, ACTION.extraData);
        break;
      case ACTION_CASES.remove:
        for (let j = 0; j < ACTION.keysToRemove.length; j++) {
          const key = ACTION.keysToRemove[j];

          if (copyState.hasOwnProperty(key)) {
            delete copyState[key];
          }
        }
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
