'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        copyState = Object.assign({}, copyState, action.extraData);
        break;
      case 'removeProperties':
        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          if (copyState.hasOwnProperty(key)) {
            delete copyState[key];
          }
        }
        break;
      case 'clear':
        copyState = {};
        break;
      default:
        break;
    }
    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
