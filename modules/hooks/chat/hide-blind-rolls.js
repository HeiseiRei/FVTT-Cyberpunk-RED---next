const HideBlindRolls = () => {
  /**
   * Inject UI "tags" for rolls and whispers make it more clear that private
   * messages are being sent or received.
   *
   * @public
   * @memberof hookEvents
   * @param {ChatMessage} message - the chat message document
   * @param {HTMLElement} html    - the HTML DOM of the chat card
   */
  Hooks.on("renderChatMessageHTML", async (_message, html) => {
    // Do not display "Blind" chat cards to non-gm
    // Foundry doesn't support blind chat messages so this is how we get around
    // that.
    if (html.classList.contains("blind") && !game.user.isGM) {
      // Remove header so Foundry does not attempt to update its timestamp
      html.querySelectorAll(".message-header").forEach((header) => {
        header.remove();
      });
      html.replaceChildren();
      html.style.display = "none";
    }
  });
};

export default HideBlindRolls;
