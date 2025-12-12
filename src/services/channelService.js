import { state } from "../state.js";

export function createChannel(name) {
  return {
    id: Date.now(),
    name,
    funnel: "Воронка",
    stage: "Неразобранное",
    accountId: `ID: Профиль ${Math.floor(Math.random() * 10000000000)}`,
    status: "Авторизуйтесь",
  };
}

export function addChannel(name) {
  const channel = createChannel(
    name || `New channel ${state.channels.length + 1}`
  );
  state.channels.push(channel);
  return channel;
}

export function updateChannel(id, updatedName) {
  const channel = getChannelById(id);
  if (channel) {
    channel.name = updatedName;
  }
}

export function getChannelById(id) {
  return state.channels.find((channel) => channel.id === id);
}

export function deleteChannel(id) {
  state.channels = state.channels.filter((channel) => channel.id !== id);
}

export function getChannels() {
  return state.channels;
}
