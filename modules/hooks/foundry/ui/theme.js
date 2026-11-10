import SystemUtils from "../../../utils/cpr-systemUtils.js";

const SetTheme = () => {
  /**
   * Set the CSS theme after user settings have been loaded
   *
   * @public
   * @memberof hookEvents
   */
  Hooks.once("ready", () => {
    SystemUtils.SetTheme();
  });
};

export default SetTheme;
