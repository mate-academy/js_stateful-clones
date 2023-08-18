'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let temp = { ...state };

  for (let i = 0; i < actions.length; i++) {
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
        for (const rmKey of actions[i].keysToRemove) {
          if (temp.hasOwnProperty(rmKey)) {
            delete temp[rmKey];
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
