'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };

  const actionsResult = [];

  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case add:
        Object.assign(stateCopy, action.extraData);
        break;

      case remove:
        for (const cn of action.keysToRemove) {
          delete stateCopy[cn];
        };
        break;

      case clear:
        stateCopy = {};
        break;
    }

    actionsResult.push({ ...stateCopy });
  }

  return actionsResult;
};

module.exports = transformStateWithClones;
