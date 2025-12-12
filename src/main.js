import { CSS_CLASSES, MODAL_IDS } from "./constants.js";
import { state } from "./state.js";
import { addChannel, deleteChannel } from "./services/channelService.js";
import { renderChannels } from "./components/channelTable.js";
import { saveChannels } from "./utils/storage.js";

$(document).ready(() => {
  const $channelsContainer = $("#channels");
  const $modal = $(`#${MODAL_IDS.ADD}`);
  const $actionsModal = $(`#${MODAL_IDS.ACTIONS}`);
  const $confirmModal = $(`#${MODAL_IDS.CONFIRM}`);
  const $editModal = $(`#${MODAL_IDS.EDIT}`);

  function openActionsModal(channelId) {
    state.selectedChannelId = channelId;
    $actionsModal.removeClass(CSS_CLASSES.HIDDEN);
  }

  // Initial render of channels from localStorage
  renderChannels($channelsContainer, openActionsModal);

  // Search functionality
  $("#searchInput").on("input", function () {
    const searchQuery = $(this).val();
    renderChannels($channelsContainer, openActionsModal, searchQuery);
  });

  // Add channel modal
  $("#addBtn").on("click", () => {
    $modal.removeClass(CSS_CLASSES.HIDDEN);
  });

  $("#closeModal").on("click", () => {
    $modal.addClass(CSS_CLASSES.HIDDEN);
  });

  $("#confirmAdd").on("click", () => {
    addChannel();
    renderChannels($channelsContainer, openActionsModal);
    $modal.addClass(CSS_CLASSES.HIDDEN);
  });

  $("#editChannel").on("click", () => {
    $actionsModal.addClass(CSS_CLASSES.HIDDEN);
    $editModal.removeClass(CSS_CLASSES.HIDDEN);

    const channel = state.channels.find(
      (channel) => channel.id === state.selectedChannelId
    );
    if (channel) {
      $("#channelNameInput").val(channel.name);
    }
  });

  $("#closeActions").on("click", () => {
    $actionsModal.addClass(CSS_CLASSES.HIDDEN);
  });

  $("#deleteChannel").on("click", () => {
    $actionsModal.addClass(CSS_CLASSES.HIDDEN);
    $confirmModal.removeClass(CSS_CLASSES.HIDDEN);
  });

  // Edit modal handlers
  $("#saveChannelName").on("click", () => {
    const newName = $("#channelNameInput").val().trim();
    if (newName && state.selectedChannelId) {
      const channel = state.channels.find(
        (c) => c.id === state.selectedChannelId
      );
      if (channel) {
        channel.name = newName;
        saveChannels(state.channels);
        renderChannels($channelsContainer, openActionsModal);
      }
    }
    $editModal.addClass(CSS_CLASSES.HIDDEN);
    $("#channelNameInput").val("");
  });

  $("#closeEditModal").on("click", () => {
    $editModal.addClass(CSS_CLASSES.HIDDEN);
    $("#channelNameInput").val("");
  });

  // Confirm delete modal
  $("#confirmDelete").on("click", () => {
    if (state.selectedChannelId) {
      deleteChannel(state.selectedChannelId);
      renderChannels($channelsContainer, openActionsModal);
      state.selectedChannelId = null;
    }
    $confirmModal.addClass(CSS_CLASSES.HIDDEN);
  });

  $("#cancelDelete").on("click", () => {
    $confirmModal.addClass(CSS_CLASSES.HIDDEN);
  });
});
