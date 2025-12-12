import { CSS_CLASSES } from "../constants.js";
import { state } from "../state.js";

export function renderChannels(container, onSettingsClick) {
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
      ${state.channels
        .map(
          (channel) => `
        <tr>
          <td>${channel.name}</td>
          <td>${channel.funnel}<br/>${channel.stage}</td>
          <td>${channel.accountId}</td>
          <td>${channel.status}</td>
          <td>
            <button class="${CSS_CLASSES.SETTINGS_BTN}" data-id="${channel.id}">⋮</button>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  container.innerHTML = tableHTML;

  container.querySelectorAll(`.${CSS_CLASSES.SETTINGS_BTN}`).forEach((btn) => {
    btn.addEventListener("click", () =>
      onSettingsClick(Number(btn.dataset.id))
    );
  });
}
