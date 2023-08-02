'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedClones = [];
  const stateClone = makeDeepCopy(state);

  for (const action of actions) {
    transformState(stateClone, action);

    transformedClones.push(makeDeepCopy(stateClone));
  }

  return transformedClones;
}

/**
 * @param {Object} original
 *
 * @return {Object}
 */
function makeDeepCopy(original) {
  const copy = {};

  for (const key in original) {
    let value = original[key];

    if (typeof value === 'object') {
      value = makeDeepCopy(value);
    }

    copy[key] = value;
  }

  return copy;
}

/**
 * @param {Object} state
 * @param {Object} action
 */
function transformState(state, action) {
  const ACTION_ADD = 'addProperties';
  const ACTION_REMOVE = 'removeProperties';
  const ACTION_CLEAR = 'clear';
  const ERROR_MSG = 'Unknown action!';

  switch (action.type) {
    case ACTION_ADD:
      Object.assign(state, action.extraData);
      break;

    case ACTION_REMOVE:
      action.keysToRemove.forEach(key => delete state[key]);
      break;

    case ACTION_CLEAR:
      Object.keys(state).forEach(key => delete state[key]);
      break;

    default:
      throw new Error(ERROR_MSG);
  }
}

module.exports = transformStateWithClones;
