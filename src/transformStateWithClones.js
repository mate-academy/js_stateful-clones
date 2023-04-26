'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finishArr = [];
  let newstate = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newstate = {
          ...newstate,
          ...action.extraData,
        };
        finishArr.push({ ...newstate });
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete newstate[prop];
        };
        finishArr.push({ ...newstate });
        break;

      case 'clear':
        newstate = {};
        finishArr.push({ ...newstate });
        break;
    };
  }

  return finishArr;
};

module.exports = transformStateWithClones;
