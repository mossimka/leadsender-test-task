import { CSS_CLASSES, MODAL_IDS } from "./constants.js";
import { state } from "./state.js";
import { addChannel, deleteChannel } from "./services/channelService.js";
import { renderChannels } from "./components/channelTable.js";

const channelsContainer = document.getElementById("channels");
const modal = document.getElementById(MODAL_IDS.ADD);
const actionsModal = document.getElementById(MODAL_IDS.ACTIONS);
const confirmModal = document.getElementById(MODAL_IDS.CONFIRM);
const editModal = document.getElementById(MODAL_IDS.EDIT);

// Add channel modal
document.getElementById("addBtn").addEventListener("click", () => {
  modal.classList.remove(CSS_CLASSES.HIDDEN);
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add(CSS_CLASSES.HIDDEN);
});

document.getElementById("confirmAdd").addEventListener("click", () => {
  addChannel();
  renderChannels(channelsContainer, openActionsModal);
  modal.classList.add(CSS_CLASSES.HIDDEN);
});


function openActionsModal(channelId) {
  state.selectedChannelId = channelId;
  actionsModal.classList.remove(CSS_CLASSES.HIDDEN);
}

document.getElementById("editChannel").addEventListener("click", () => {
  actionsModal.classList.add(CSS_CLASSES.HIDDEN);
  editModal.classList.remove(CSS_CLASSES.HIDDEN);

  const channel = state.channels.find((channel) => channel.id === state.selectedChannelId);
  if (channel) {
    document.getElementById("channelNameInput").value = channel.name;
  }
});

document.getElementById("closeActions").addEventListener("click", () => {
  actionsModal.classList.add(CSS_CLASSES.HIDDEN);
});

document.getElementById("deleteChannel").addEventListener("click", () => {
  actionsModal.classList.add(CSS_CLASSES.HIDDEN);
  confirmModal.classList.remove(CSS_CLASSES.HIDDEN);
});

// Edit modal handlers
document.getElementById("saveChannelName").addEventListener("click", () => {
  const newName = document.getElementById("channelNameInput").value.trim();
  if (newName && state.selectedChannelId) {
    const channel = state.channels.find(
      (c) => c.id === state.selectedChannelId
    );
    if (channel) {
      channel.name = newName;
      renderChannels(channelsContainer, openActionsModal);
    }
  }
  editModal.classList.add(CSS_CLASSES.HIDDEN);
  document.getElementById("channelNameInput").value = "";
});

document.getElementById("closeEditModal").addEventListener("click", () => {
  editModal.classList.add(CSS_CLASSES.HIDDEN);
  document.getElementById("channelNameInput").value = "";
});

// Confirm delete modal
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (state.selectedChannelId) {
    deleteChannel(state.selectedChannelId);
    renderChannels(channelsContainer, openActionsModal);
    state.selectedChannelId = null;
  }
  confirmModal.classList.add(CSS_CLASSES.HIDDEN);
});

document.getElementById("cancelDelete").addEventListener("click", () => {
  confirmModal.classList.add(CSS_CLASSES.HIDDEN);
});
