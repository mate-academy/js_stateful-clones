'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let transState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      const tmpState = Object.assign(transState, obj.extraData);

      resultArr.push(tmpState);
      transState = { ...tmpState };
    }

    if (obj.type === 'removeProperties') {
      const tmpState = transState;

      for (const key in tmpState) {
        if (obj.keysToRemove.includes(key)) {
          delete tmpState[key];
        }
      }
      resultArr.push(tmpState);
      transState = { ...tmpState };
    }

    if (obj.type === 'clear') {
      const tmpState = transState;

      for (const key in tmpState) {
        delete tmpState[key];
      }
      resultArr.push(tmpState);
      transState = { ...tmpState };
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
