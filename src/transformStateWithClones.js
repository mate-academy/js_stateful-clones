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

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const tmpState = Object.assign(transState, action.extraData);

      resultArr.push(tmpState);
      transState = { ...tmpState };
    }

    if (action.type === 'removeProperties') {
      const tmpState = transState;

      for (const key in tmpState) {
        if (action.keysToRemove.includes(key)) {
          delete tmpState[key];
        }
      }
      resultArr.push(tmpState);
      transState = { ...tmpState };
    }

    if (action.type === 'clear') {
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
