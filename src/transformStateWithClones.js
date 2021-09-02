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
    if (action.type === 'addProperties') {
      newstate = {
        ...newstate,
        ...action.extraData,
      };
      finishArr.push({ ...newstate });
    };

    if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete newstate[prop];
      };
      finishArr.push({ ...newstate });
    };

    if (action.type === 'clear') {
      newstate = {};
      finishArr.push({ ...newstate });
    };
  };

  return finishArr;
};

module.exports = transformStateWithClones;
