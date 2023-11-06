const formsData = async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url");
  const url = urlInput.value.trim();

  if (!isValidUrl(url)) {
    alert("Please enter a valid URL");
    return;
  }

  const params = url.split("v=")[1];
  const imageUrls = [
    `https://img.youtube.com/vi/${params}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${params}/sddefault.jpg`,
    `https://img.youtube.com/vi/${params}/hqdefault.jpg`,
  ];

  const outputTitle = document.getElementById("outputTitle");
  const img = imageUrls.map((url) => `<img src="${url}">`).join("");
  outputTitle.insertAdjacentHTML(
    "afterend",
    `<div class='list-img'>${img}</div>`
  );

  const listImg = document.querySelector(".list-img");
  listImg.scrollIntoView({ behavior: "smooth", block: "start" });

  const resetBtn = document.querySelector(".reset");
  resetBtn.addEventListener("click", () => {
    urlInput.value = "";
  });

  const height = document.documentElement.scrollHeight;
  const backToTopBtn = document.querySelector(".backToTop");
  backToTopBtn.style.display = height > 1000 ? "block" : "none";

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    backToTopBtn.style.display = "none";
  });
};

const isValidUrl = (url) => {
  const ifUrl = [
    { key: "watch?v=", minLength: 32 },
    { key: "m.youtube.com", minLength: 30 },
    { key: "youtu.be", minLength: 23 },
    { key: "youtube.com", minLength: 30 },
  ];

  return ifUrl.some(
    ({ key, minLength }) => url.includes(key) && url.length >= minLength
  );
};
