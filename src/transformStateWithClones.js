'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        if (resultArr.length === 0) {
          resultArr.push(Object.assign({ ...state }, actions[i].extraData));
        } else {
          resultArr.push(Object.assign({ ...resultArr[resultArr.length - 1] },
            actions[i].extraData));
        }

        break;

      case 'removeProperties':
        if (resultArr.length === 0) {
          resultArr.push({ ...state });
        } else {
          resultArr.push({ ...resultArr[resultArr.length - 1] });
        }

        for (const action of actions[i].keysToRemove) {
          delete resultArr[resultArr.length - 1][action];
        };

        break;

      case 'clear':
        if (resultArr.length === 0) {
          resultArr.push({ ...state });
        } else {
          resultArr.push({ ...resultArr[resultArr.length - 1] });
        }

        Object.keys(resultArr[resultArr.length - 1]).forEach(key => {
          delete resultArr[resultArr.length - 1][key];
        });

        break;

      default:
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
