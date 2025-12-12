import { loadChannels } from "./utils/storage.js";

export const state = {
  channels: loadChannels(),
  selectedChannelId: null
};