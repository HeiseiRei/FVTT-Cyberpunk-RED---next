import CPRChat from "../../chat/cpr-chat.js";

const AddGlyphs = () => {
  /**
   * Enables listeners so that clickable damage glyphs work.
   *
   * @public
   * @memberof hookEvents
   * @param {ChatMessage} message - the chat message document
   * @param {HTMLElement} html    - the HTML DOM of the chat card
   * @param {object} data          - the data used to render the chat message
   */
  Hooks.on("renderChatMessageHTML", async (_message, html, data) => {
    CPRChat.chatListeners(html);
    CPRChat.addMessageTags(html, data);
  });
};

export default AddGlyphs;
