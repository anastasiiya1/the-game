const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");

startBtn.addEventListener("click", handleStart);

function createMarkup() {
  container.innerHTML = `
    <li class ="container-child"> </li>
    <li class ="container-child"> </li>
    <li class ="container-child"> </li>
    <li class ="container-child"> </li>
    <li class ="container-child"> </li>`;
}

function handleStart() {
  createMarkup();
  startBtn.disabled = true;
  startBtn.textContent = 'Hold on...'

  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const random = Math.random();

      if (random < 0.5) {
        resolve("🤑");
      } else {
        reject("😈");
      }
    });
  });
  Promise.allSettled(promises).then((value) => {
    value.forEach((item, i) => {
      container.children[i].textContent = "";

      setTimeout(() => {
        container.children[i].textContent = item.value || item.reason;
        const winner = value.every((item) => item.status === "fulfilled");
        const looser = value.every((item) => item.status === "rejected");

        if (i === value.length - 1) {
          const instance = basicLightbox.create(`
          <div class="modal">
          <p>
          ${winner ? "🥳 Congratulations! You won!" : looser ? "💩 You'll be lucky next time...maybe" : "🎲 Try one more time!"}
          </p>
          </div>`);
          instance.show();

          startBtn.disabled = false;
          startBtn.textContent = 'Start!'
        }
      }, 1000 * (i + 1));
    });
  });
}
