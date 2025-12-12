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

  // Helper functions for modal animations
  function openModal($modalElement) {
    $modalElement.removeClass(CSS_CLASSES.HIDDEN);
    setTimeout(() => $modalElement.addClass("show"), 10);
  }

  function closeModal($modalElement) {
    $modalElement.removeClass("show");
    setTimeout(() => $modalElement.addClass(CSS_CLASSES.HIDDEN), 300);
  }
  

  function openActionsModal(channelId) {
    state.selectedChannelId = channelId;
    openModal($actionsModal);
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
    openModal($modal);
  });

  $("#closeModal").on("click", () => {
    closeModal($modal);
  });

  $("#confirmAdd").on("click", () => {
    addChannel();
    renderChannels($channelsContainer, openActionsModal);
    closeModal($modal);
  });

  $("#editChannel").on("click", () => {
    closeModal($actionsModal);
    setTimeout(() => {
      const channel = state.channels.find(
        (channel) => channel.id === state.selectedChannelId
      );
      if (channel) {
        $("#channelNameInput").val(channel.name);
      }
      openModal($editModal);
    }, 300);
  });

  $("#closeActions").on("click", () => {
    closeModal($actionsModal);
  });

  $("#deleteChannel").on("click", () => {
    closeModal($actionsModal);
    setTimeout(() => openModal($confirmModal), 300);
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
    closeModal($editModal);
    $("#channelNameInput").val("");
  });

  $("#closeEditModal").on("click", () => {
    closeModal($editModal);
    $("#channelNameInput").val("");
  });

  // Confirm delete modal
  $("#confirmDelete").on("click", () => {
    if (state.selectedChannelId) {
      deleteChannel(state.selectedChannelId);
      renderChannels($channelsContainer, openActionsModal);
      state.selectedChannelId = null;
    }
    closeModal($confirmModal);
  });

  $("#cancelDelete").on("click", () => {
    closeModal($confirmModal);
  });
});
