'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);

        break;
    }

    switch (action.type) {
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        break;
    }

    switch (action.type) {
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
    }

    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
