// API Key: 138b962caecb4ec84d9cc4b9b3d7cc59a8f56fce
// https://emoji-api.com/emojis?access_key=138b962caecb4ec84d9cc4b9b3d7cc59a8f56fce

const emojiListEl = document.querySelector(".emoji-list");

// Fetching API and showing all emojis
async function main() {
  const emojis = await fetch(
    "https://emoji-api.com/emojis?access_key=138b962caecb4ec84d9cc4b9b3d7cc59a8f56fce"
  );
  const emojisData = await emojis.json();

  emojiListEl.innerHTML = emojisData.map((emoji) => emojiHTML(emoji)).join("");
}

main();

// Making HTML code more dynamic for each object in the array
function emojiHTML(emoji) {
  return `
    <div class="emoji-card">
        <div id="${emoji.codePoint}" onclick="copyContent(event)">${emoji.character}</div>
    </div>`;
}

// Copy emoji to keyboard when user clicks
function copyContent(event) {
  let copiedText = event.target.innerText;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copiedText);

  //   /* Alert the copied text */
  //   alert("Copied the text: " + copiedText);
}

// Using search value to render suitable emojis associated to keywords
async function onSearchChange(event) {
  const searchResult = event.target.value;
  renderPosts(searchResult);
}

// Displaying results of search
async function renderPosts(searchResult) {
  const emojiResults = await fetch(
    `https://emoji-api.com/emojis?search=${searchResult}&access_key=138b962caecb4ec84d9cc4b9b3d7cc59a8f56fce`
  );
  const emojiData = await emojiResults.json();
  emojiListEl.innerHTML = emojiData.map((emoji) => emojiHTML(emoji)).join("");
}

// Displaying categories based on the link selected
async function searchCategory(category) {
  const categoryResults = await fetch(`
    https://emoji-api.com/categories/${category}?access_key=138b962caecb4ec84d9cc4b9b3d7cc59a8f56fce
    `);

  const categoryData = await categoryResults.json();
  emojiListEl.innerHTML = categoryData
    .map((emoji) => emojiHTML(emoji))
    .join("");
}
