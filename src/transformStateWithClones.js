'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const resArr = [];

  for (let i = 0; i < actions.length; i++) {
    const { type } = actions[i];

    switch (type) {
      case 'addProperties':
        const { extraData } = actions[i];

        for (const key in extraData) {
          newObj[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        const { keysToRemove } = actions[i];

        for (let j = 0; j < keysToRemove.length; j++) {
          delete newObj[keysToRemove[j]];
        }
        break;

      case 'clear':
        newObj = {};
        break;
    }
    resArr.push({ ...newObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
