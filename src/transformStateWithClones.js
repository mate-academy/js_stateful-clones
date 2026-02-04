'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let workState = { ...state };

  if (actions.length === 0) {
    return [];
  }

  const result = [];

  for (const action of actions) {
    if (!Object.hasOwn(action, 'type')) {
      continue;
    }

    if (action.type === 'clear') {
      workState = {};
    }

    if (action.type === 'removeProperties') {
      if (!Object.hasOwn(action, 'keysToRemove')) {
        continue;
      }

      for (const key of action.keysToRemove) {
        if (!Object.hasOwn(workState, [key])) {
          continue;
        }

        delete workState[key];
      }
    }

    if (action.type === 'addProperties') {
      if (!Object.hasOwn(action, 'extraData')) {
        continue;
      }

      Object.assign(workState, { ...action.extraData });
    }

    result.push({ ...workState });
  }

  return result;
}

module.exports = transformStateWithClones;
