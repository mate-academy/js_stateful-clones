'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resArrObj = [];
  // eslint-disable-next-line standard/object-curly-even-spacing
  const copyState = { ...state };

  for (const keys of actions) {
    const { type, extraData, keysToRemove } = keys;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        resArrObj.push({ ...copyState });
        break;
      case 'removeProperties':
        for (const values of keysToRemove) {
          delete copyState[values];
        }
        resArrObj.push({ ...copyState });
        break;
      case 'clear':
        for (const values in copyState) {
          delete copyState[values];
        }
        resArrObj.push({});
        break;
    }
  }

  return resArrObj;
}

module.exports = transformStateWithClones;
