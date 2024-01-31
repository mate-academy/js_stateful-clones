'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stansAfterAction = [];
  let copyState = { ...state};

actions.forEach((action) => {
if (action.type === 'addProperties') {
Object.assign(copyState, action.extraData);
let doubleCopyState = { ...copyState};
stansAfterAction.push(doubleCopyState);
}
if (action.type === 'removeProperties') {
  action.keysToRemove.forEach(key => delete copyState[key]);
  let doubleCopyState = { ...copyState};
  stansAfterAction.push(doubleCopyState);
}
if (action.type === 'clear') {
  Object.keys(copyState).forEach(key => delete copyState[key]);
  let doubleCopyState = { ...copyState};
  stansAfterAction.push(doubleCopyState);
}
});
    return stansAfterAction
}


module.exports = transformStateWithClones;
