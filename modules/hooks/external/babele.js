const InitializeBabeleIntegration = () => {
  /**
   * Babele Module Integration
   * https://foundryvtt.com/packages/babele
   *
   * Babele creates its instance in its own init hook (after the system's) and
   * passes it to "babele.init". Babele.get() is deprecated.
   *
   * System hooks are imported asynchronously, so "babele.init" may already
   * have fired by now; then register on the existing instance directly
   * (translations are discovered later, in Babele's "ready" hook).
   *
   * @public
   * @memberof hookEvents
   */
  const register = (babele) => {
    babele.setSystemTranslationsDir("babele");
    babele.registerMapping({
      Item: {
        dvTable: "system.dvTable",
      },
    });
  };
  if (game.babele) register(game.babele);
  else Hooks.once("babele.init", register);
};

export default InitializeBabeleIntegration;
