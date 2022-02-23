'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneState = Object.assign({}, state);

  for (const obj of actions) {
    const { type } = obj;

    if (type === 'addProperties') {
      const { extraData } = obj;

      Object.assign(cloneState, extraData);
    }

    if (type === 'removeProperties') {
      const { keysToRemove } = obj;

      keysToRemove.forEach(key => delete cloneState[key]);
    }

    if (type === 'clear') {
      cloneState = {};
    }
    result.push({ ...cloneState });
  };

  return result;
}

module.exports = transformStateWithClones;
