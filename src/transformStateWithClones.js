'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const ACTION_TYPES = {
  add: 'addProperties',
  remove: 'removeProperties',
  clear: 'clear',
};

function transformStateWithClones(state, actions) {
  const history = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case ACTION_TYPES.add: {
        const prevStateCopy = { ...(history.at(-1) ?? state) };

        history.push({ ...prevStateCopy, ...extraData });

        continue;
      }

      case ACTION_TYPES.remove: {
        const prevStateCopy = { ...(history.at(-1) ?? state) };

        for (const key of keysToRemove) {
          delete prevStateCopy[key];
        }

        history.push(prevStateCopy);
        continue;
      }

      case ACTION_TYPES.clear: {
        history.push({});

        continue;
      }

      default: {
        throw new Error('Unexpected action type!');
      }
    }
  }

  return history;
}

module.exports = transformStateWithClones;
