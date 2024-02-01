'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = JSON.parse(JSON.stringify(state));
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => {
        delete cloneState[key];
      });
    } else if (action.type === 'clear') {
      cloneState = {};
    }
    result.push(JSON.parse(JSON.stringify(cloneState)));
  }

  return result;
}

module.exports = transformStateWithClones;
