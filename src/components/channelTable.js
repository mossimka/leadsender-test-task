import { CSS_CLASSES } from "../constants.js";
import { state } from "../state.js";

export function renderChannels($container, onSettingsClick, searchQuery = "") {
  const filteredChannels = filterChannels(state.channels, searchQuery);

  const tableHTML = `
    <thead>
      <tr>
        <th>Название</th>
        <th>Воронка и этап</th>
        <th>Данные аккаунта</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      ${
        filteredChannels.length === 0
          ? `<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">
              ${searchQuery ? "Ничего не найдено" : "Нет каналов"}
            </td></tr>`
          : filteredChannels
              .map((channel) => `
                  <tr>
                    <td>${channel.name}</td>
                    <td>${channel.funnel}<br/>${channel.stage}</td>
                    <td>${channel.accountId}</td>
                    <td>${channel.status}</td>
                    <td>
                      <button 
                        class="${CSS_CLASSES.SETTINGS_BTN}" 
                        data-id="${channel.id}"
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
              `).join("")
      }
    </tbody>
  `;

  $container.html(tableHTML);

  $container.find(`.${CSS_CLASSES.SETTINGS_BTN}`).on("click", function () {
    onSettingsClick(Number($(this).data("id")));
  });
}

function filterChannels(channels, query) {
  if (!query || query.trim() === "") {
    return channels;
  }

  const searchTerm = query.toLowerCase().trim();

  return channels.filter((channel) => {
    return (
      channel.name.toLowerCase().includes(searchTerm) ||
      channel.funnel.toLowerCase().includes(searchTerm) ||
      channel.stage.toLowerCase().includes(searchTerm) ||
      channel.accountId.toLowerCase().includes(searchTerm) ||
      channel.status.toLowerCase().includes(searchTerm)
    );
  });
}
