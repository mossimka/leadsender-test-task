let channels = [];

const channelsContainer = document.getElementById("channels");
const modal = document.getElementById("modal");

/* Buttons */
const addBtn = document.getElementById("addBtn");
const closeModalBtn = document.getElementById("closeModal");
const confirmAddBtn = document.getElementById("confirmAdd");

addBtn.onclick = () => {
  modal.classList.remove("hidden");
};

closeModalBtn.onclick = () => {
  modal.classList.add("hidden");
};

confirmAddBtn.onclick = () => {
  const channel = {
    id: Date.now(),
    name: "New channel " + (channels.length + 1),
  };

  channels.push(channel);
  renderChannels();
  modal.classList.add("hidden");
};

function renderChannels() {
  channelsContainer.innerHTML = "";
  channels.forEach((channel) => {
    const channelDiv = document.createElement("div");
    channelDiv.className = "channel";

    channelDiv.innerHTML = `
      <h3>${channel.name}</h3>
      <button class="deleteBtn" data-id="${channel.id}">Delete</button>
    `;
    channelsContainer.appendChild(channelDiv);
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.onclick = () => deleteChannel(Number(btn.dataset.id));
  });
}

function deleteChannel(id) {
  channels = channels.filter((channel) => channel.id !== id);
  renderChannels();
}
