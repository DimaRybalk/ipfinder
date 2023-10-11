const API = "https://api.ipify.org/?format=json";
const list = document.querySelector(".list");
const listcontainer = document.querySelector(".info_list");
listcontainer.style.display = "none";
const button = document.querySelector(".finder");

async function sendRequest(url, method, options) {
  const response = await fetch(url, { method: method, ...options });
  const result = await response.json();
  return result;
}

class info {
  constructor(element) {
    this.element = element;
  }

  async renderIp() {
    const request = await sendRequest(API);
    return request;
  }

  async render() {
    const ipAdress = await this.renderIp();
    const { ip } = ipAdress;
    const adress = await fetch(`http://ip-api.com/json/${ip}`);
    const pos = await adress.json();
    console.log(pos);
    const { country, city, region, org } = pos;
    let clickCounter = 0;

    button.addEventListener("click", () => {
      listcontainer.style.display = "flex";
      clickCounter++;
      list.style.display = "flex";

      if (clickCounter % 2 >= 1) {
        setTimeout(() => {
          this.element.insertAdjacentHTML(
            "beforeend",
            `
      <li class ="list_item">Ви проживаєте в <span class = "item_variables">${country}</span></li>
      <li class ="list_item">В регіоні під номером <span class = "item_variables">${region}</span> </li>
      <li class ="list_item">у місті <span class = "item_variables">${city}</span> </li>
      <li class ="list_item">Інтернет провайдер <span class = "item_variables">${org}</span></li>
      <li class ="list_item">І маєете таку IP-адресу <span class = "item_variables">${ip}</span></li>
      `
          );
        }, 2000);
      } else {
        listcontainer.style.display = "none";
        this.element.innerHTML = "";
      }
    });
  }
}

const user = new info(list);
user.render();
