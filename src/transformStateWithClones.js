'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const record = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    record.push({ ...stateCopy });
  });

  return record;
}

module.exports = transformStateWithClones;
