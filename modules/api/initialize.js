import empableItems from "./actor/empable-items.js";

/**
 * Loads actor functions from predefined modules and returns them as an object.
 *
 * @private
 * @returns {Object} An object where keys are function names and values
 *                   are the corresponding functions.
 */
function _loadActorFunctions() {
  const functions = {};

  // Statically added modules
  const modules = [empableItems];

  modules.forEach((module) => {
    if (typeof module === "function" && module.name) {
      // Function's name is used as the key
      const functionName = module.name;
      functions[functionName] = module;
    }
  });

  return functions;
}

/**
 * Initializes the public CPR API and loads actor functions.
 *
 * Version 1 provides cprActorCalculateDerivedStats(actor, previousHp),
 * cprDamageRollCreated(roll, item, actor), cprPreApplyDamage(damageData), and
 * cprActorDamageApplied(actor, result). `damageData` is mutable and contains
 * actor, damage parameters, armorData, and the source rollContext.
 *
 * @returns {Object} The initialized `game.cpr.api` object.
 */
function initializeAPI() {
  // Load actor functions synchronously
  const actorFunctions = _loadActorFunctions();
  // Return the initialized API object
  return { actor: actorFunctions, extensionApiVersion: 1 };
}

export default initializeAPI;
