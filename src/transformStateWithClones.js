'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_COPY = Object.assign({}, state);
  const STATE_CHANGES_LIST = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(STATE_COPY, action.extraData);

        STATE_CHANGES_LIST.push({
          ...{},
          ...STATE_COPY,
        });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (STATE_COPY.hasOwnProperty(key)) {
            delete STATE_COPY[key];
          }
        }

        STATE_CHANGES_LIST.push({
          ...{},
          ...STATE_COPY,
        });

        break;

      case 'clear':
        for (const key in STATE_COPY) {
          delete STATE_COPY[key];
        }

        STATE_CHANGES_LIST.push({
          ...{},
          ...STATE_COPY,
        });

        break;

      default:
        throw new Error(`Action type "${action.type}" does not exist`);
    }
  }

  return STATE_CHANGES_LIST;
}

module.exports = transformStateWithClones;
