/* eslint-disable no-param-reassign */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':

        state = {
          ...state, ...actions[i].extraData,
        };

        array.push(state);
        break;

      case 'clear':
        state = {
          ...state,
        };

        for (const key in state) {
          delete state[key];
        }
        array.push(state);
        break;
      case 'removeProperties':
        state = {
          ...state,
        };

        const keysToRemove = actions[i].keysToRemove;

        for (let j = 0; j < keysToRemove.length; j++) {
          delete state[keysToRemove[j]];
        }
        array.push(state);
        break;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
