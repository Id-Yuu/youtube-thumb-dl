const formsData = async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url");
  const url = urlInput.value.trim();

  const isValidUrl = url.includes("watch?v=") && url.length >= 32;
  const isMobileUrl =
    url.includes("m.youtube.com/watch?v=") && url.length >= 37;
  const isValidUrl2 = url.includes("youtube.com/watch?v=") && url.length >= 32;

  const params = url.split("watch?v=")[1];

  if (isMobileUrl || isValidUrl2) {
    params.split("&")[0];
  } else if (!isValidUrl) {
    alert("Invalid URL");
  }

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
