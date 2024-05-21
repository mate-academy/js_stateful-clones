'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrBack = [];
  let newState = {};

  Object.assign(newState, state);

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(newState, act.extraData);
        break;

      case 'removeProperties':
        for (const i of act.keysToRemove) {
          delete newState[`${i}`];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    arrBack.push({ ...newState });
  }

  return arrBack;
}

module.exports = transformStateWithClones;
