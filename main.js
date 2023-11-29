const formid = document.getElementById("forms");
const getInput = document.querySelector("#input");
const reset = document.querySelector("#reset");
const chose = document.querySelector("#choose");

formid.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = getInput.value;

  const url = new URL(input);
  const urlSearchParams = new URLSearchParams(url.search);

  let shortPath;
  let param;
  let params;

  if (chose.value === "short") {
    shortPath = url.pathname.slice(8);
  } else {
    param = urlSearchParams.get("v");
    params = url.pathname.slice(1);
  }

  if (!input) {
    getInput.value = "Please enter a URL";
  } else {
    const container = document.querySelector(".container-image");

    const intervalId = setInterval(() => {
      try {
        const imageUrls = generateImageUrls(param || shortPath || params);

        for (let i = 0; i < imageUrls.length; i++) {
          const image = document.createElement("img");
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("image");
          const imageUrl = imageUrls[i];
          image.src = imageUrl;
          imageContainer.appendChild(image);
          container.appendChild(imageContainer);
        }

        container.scrollIntoView({ behavior: "smooth", block: "start" });

        clearInterval(intervalId);
      } catch (error) {
        console.error("Error generating image URLs:", error.message);
      }
    }, 1000);

    reset.addEventListener("click", () => {
      getInput.value = "";
      container.querySelectorAll(".image").forEach((img) => {
        img.remove();
      });
    });
  }

  const backToTopButton = document.querySelector(".backTop");
  const height = document.documentElement.scrollHeight;
  backToTopButton.style.display = height > 1000 ? "block" : "none";

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    backToTopButton.style.display = "none";
  });
});

function generateImageUrls(value) {
  if (!value) {
    throw new Error("Missing video parameter value");
  }

  return [
    `https://img.youtube.com/vi/${value}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${value}/sddefault.jpg`,
    `https://img.youtube.com/vi/${value}/hqdefault.jpg`,
  ];
}
