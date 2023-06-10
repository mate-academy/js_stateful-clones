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

  for (const instr of actions) {
    const { type, extraData, keysToRemove } = instr;

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          copyState[key] = value;
        }
        resArr.push({ ...copyState });
        break;
      case 'removeProperties':
        for (const key of Object.values(keysToRemove)) {
          if (key in copyState) {
            delete copyState[key];
          }
        }
        resArr.push({ ...copyState });
        break;
      case 'clear':
        copyState = {};
        resArr.push({ ...copyState });
        break;
    }
  }

  return resArr;
};

module.exports = transformStateWithClones;
