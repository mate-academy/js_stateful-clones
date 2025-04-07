'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
    const result = [];
    let stateCopy = { ...state };
  
    for (const action of actions) {
      switch (action.type) {
        case 'clear':
          stateCopy = {};
          break;
  
        case 'addProperties':
          stateCopy = {
            ...stateCopy,
            ...action.extraData,
          };
          break;
  
        case 'removeProperties':
          stateCopy = { ...stateCopy };
  
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
          break;
  
        default:
          throw new Error(`Unknown action type: ${action.type}`);
      }
  
      result.push({ ...stateCopy });
    }
  
    return result;
  }
  
  module.exports = transformStateWithClones;