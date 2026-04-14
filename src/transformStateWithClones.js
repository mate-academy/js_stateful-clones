'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let currensState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currensState = {};
        res.push(currensState);
        break;

      case 'addProperties':
        currensState = { ...currensState, ...action.extraData };
        res.push(currensState);
        break;

      case 'removeProperties':
        const nextState = { ...currensState };

        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        currensState = nextState;
        res.push(currensState);
        break;

      default:
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
