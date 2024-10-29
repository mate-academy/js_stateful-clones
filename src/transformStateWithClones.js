'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = JSON.parse(JSON.stringify(state)); 
  const container = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...JSON.parse(JSON.stringify(actions[i].extraData)) };
        container.push(JSON.parse(JSON.stringify(stateCopy)));
        break;

      case 'removeProperties':
        actions[i].keysToRemove.forEach((item) => {
          delete stateCopy[item];
        });
        container.push(JSON.parse(JSON.stringify(stateCopy)));
        break;

      case 'clear':
        container.push({});
        stateCopy = {};
        break;

      default:
        break;
    }
  }

  return container;
}

module.exports = transformStateWithClones;
