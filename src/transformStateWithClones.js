'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ACTION_ADD = 'addProperties';
  const ACTION_REM = 'removeProperties';
  const ACTION_CLR = 'clear';
  const copyState = [];
  let obj = { ...state };

  for (let i = 0; i < actions.length; ++i) {
    const curOper = actions[i].type;

    if (i > 0) {
      obj = { ...copyState[i - 1] };
    }

    switch (curOper) {
      case ACTION_ADD:
        const extraData = actions[i].extraData;

        for (const key in extraData) {
          obj[key.toString()] = extraData[key.toString()];
        }

        copyState.push(obj);
        break;

      case ACTION_REM:
        const keysToRemove = actions[i].keysToRemove;

        for (const iterator of keysToRemove) {
          delete obj[iterator.toString()];
        }

        copyState.push(obj);
        break;

      case ACTION_CLR:
        copyState.push({});
        break;

      default:

        break;
    }
  }

  return copyState;
}

module.exports = transformStateWithClones;
