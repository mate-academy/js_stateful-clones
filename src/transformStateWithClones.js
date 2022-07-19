'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = {
    ...state,
  };

  const result = [];

  for (const action in actions) {
    const object = actions[action];
    let resultOfLoop = {};

    for (const key in object) {
      if (object[key] === 'addProperties') {
        resultOfLoop = Object.assign(cloneState, object['extraData']);
      }

      if (object[key] === 'removeProperties') {
        const deleteValue = object['keysToRemove'];

        if (typeof (deleteValue) === 'undefined') {
          Object.assign(resultOfLoop, cloneState);
        } else {
          for (const i of deleteValue) {
            delete cloneState[i];
            resultOfLoop = cloneState;
          }
        }
      }

      if (object[key] === 'clear') {
        for (const i in cloneState) {
          delete cloneState[i];
          resultOfLoop = cloneState;
        }
      }
    }

    const copy = {
      ...resultOfLoop,
    };

    result.push(copy);
  }

  return result;
}

module.exports = transformStateWithClones;
