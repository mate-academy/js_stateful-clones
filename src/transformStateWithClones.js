'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const likeState = { ...state };
  let copyObj = {};
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          likeState[key] = actions[i].extraData[key];
        }
        copyObj = { ...likeState };
        result.push(copyObj);
        break;
      case 'removeProperties':
        for (let item = 0; item < actions[i].keysToRemove.length; item++) {
          delete likeState[actions[i].keysToRemove[item]];
        }
        copyObj = { ...likeState };
        result.push(copyObj);
        break;
      case 'clear':
        for (const item in likeState) {
          delete likeState[item];
        }
        copyObj = { ...likeState };
        result.push(copyObj);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
