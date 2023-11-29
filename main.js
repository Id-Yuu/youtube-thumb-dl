const formid = document.getElementById("forms");
const getInput = document.querySelector("#input");
const reset = document.querySelector("#reset");

formid.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = getInput.value;

  const url = new URL(inputValue);
  const urlSearchParams = new URLSearchParams(url.search);
  const param = urlSearchParams.get("v");
  const path = url.pathname.slice(1);
  const pathShort = path.slice(7);

  if (inputValue === "") {
    getInput.value = "Oops Wrong URL";
  } else {
    const imageContainer = document.querySelector(".container-image");

    const intervalId = setInterval(() => {
      try {
        const imageUrls = generateImageUrls(param ? param : pathShort);

        for (let i = 0; i < imageUrls.length; i++) {
          const image = document.createElement("img");
          const containerDiv = document.createElement("div");
          containerDiv.classList.add("image");
          const imageUrl = imageUrls[i];
          image.src = imageUrl;
          containerDiv.appendChild(image);
          imageContainer.appendChild(containerDiv);
        }

        imageContainer.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        clearInterval(intervalId);
      } catch (error) {
        console.error("Error generating image URLs:", error);
      }
    }, 1000);

    reset.addEventListener("click", () => {
      getInput.value = "";
      imageContainer.querySelectorAll(".image").forEach((img) => {
        img.remove();
      });
    });
  }

  const backToTopBtn = document.querySelector(".backTop");
  const height = document.documentElement.scrollHeight;
  backToTopBtn.style.display = height > 1000 ? "block" : "none";

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    backToTopBtn.style.display = "none";
  });
  // END SUBMIT
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
