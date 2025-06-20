'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const chainActions = [];
  let keys = [];
  let values = [];

  for (const action of actions) {
    let objectAction = {};

    switch (action.type) {
      case 'addProperties':
        (() => {
          return chainActions.length === 0
            ? (objectAction = { ...state })
            : (objectAction = { ...chainActions[chainActions.length - 1] });
        })();

        keys = Object.keys(action.extraData);
        values = Object.values(action.extraData);

        for (let i = 0; i < keys.length; i++) {
          objectAction[keys[i]] = values[i];
        }

        break;

      case 'removeProperties':
        (() => {
          return chainActions.length === 0
            ? (objectAction = { ...state })
            : (objectAction = { ...chainActions[chainActions.length - 1] });
        })();

        keys = Object.keys(action.extraData);
        
        for (let i = 0; i < keys.length; i++) {
          delete objectAction[keys[i]];
        }

        break;

      case 'clear':
        objectAction = {};
        break;
    }

    chainActions.push(objectAction);
  }

  return chainActions;
}

module.exports = transformStateWithClones;
