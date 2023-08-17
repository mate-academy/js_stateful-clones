'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];

  for (let i = 0; i < actions.length; i++) {
    let temp = null;

    if (i === 0) {
      temp = { ...state };
    } else {
      temp = { ...res[i - 1] };
    }

    switch (actions[i].type) {
      case 'clear':
        temp = {};
        break;

      case 'addProperties':
        for (const addKey in actions[i].extraData) {
          temp[addKey] = actions[i].extraData[addKey];
        }
        break;

      case 'removeProperties':
        if (Object.keys(temp).length === 1) {
          temp = {};
        } else {
          for (const rmKey of actions[i].keysToRemove) {
            if (temp.hasOwnProperty(rmKey)) {
              delete temp[rmKey];
            }
          }
        }
        break;

      default:
        break;
    }

    res.push({ ...temp });
  }

  return res;
}

module.exports = transformStateWithClones;
