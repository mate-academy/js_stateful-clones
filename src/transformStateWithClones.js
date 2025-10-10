'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const history = [];
  const list = Array.isArray(actions) ? actions : [];

  for (let i = 0; i < list.length; i++) {
    const action = list[i] || {};
    const type = action.type;

    switch (type) {
      case 'clear': {
        stateCopy = {};
        break;
      }

      case 'addProperties': {
        const extra = (action && action.extraData) || {};

        stateCopy = Object.assign({}, stateCopy, extra);
        break;
      }

      case 'removeProperties': {
        const toRemoveArr = (action && action.keysToRemove) || [];
        const toRemove = new Set(toRemoveArr);
        const next = {};

        for (const key in stateCopy) {
          if (
            Object.prototype.hasOwnProperty.call(stateCopy, key) &&
            !toRemove.has(key)
          ) {
            next[key] = stateCopy[key];
          }
        }
        stateCopy = next;
        break;
      }
      default:
        throw new Error('Unknown action type:' + type);
    }

    history.push(Object.assign({}, stateCopy));
  }

  return history;
}

module.exports = transformStateWithClones;
