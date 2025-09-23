function alertTemplate(alert) {
  return `
    <section class="alert-list" style="background:${alert.background}">
      <p style="color:${alert.color}">${alert.message}</p>
    </section>
  `;
}

function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML += template;  
  if (callback) {
    callback(data, parentElement);
  }
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  constructor(file) {
    this.file = file;
  }

  async getData() {
    const response = await fetch(`../public/json/${this.file}.json`);
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }

  async renderAlert() {
    const alerts = await this.getData();
    const main = document.querySelector("main");
    if (alerts && alerts.length > 0) {
        const htmlElement = document.querySelector("#alerts");
        const template = alerts.map(alertTemplate).join("");
        renderWithTemplate(template, htmlElement);
    }
  }
}
