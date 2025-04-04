'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  return actions.map((action) => performAction({ ...state }, action));
}

/**
 * @param {Object} state
 * @param {Object} actions
 *
 * @return {Object}
 */
function performAction(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;
    case 'removeProperties':
      action.keysToRemove.forEach((key) => delete state[key]);
      break;
    case 'clear':
      Object.keys(state).forEach((key) => delete state[key]);
  }

  return { ...state };
}

module.exports = transformStateWithClones;
