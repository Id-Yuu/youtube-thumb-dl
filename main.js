const formsData = async (e) => {
  e.preventDefault();

  // Get the input element and its value
  const urlInput = document.getElementById("url");
  const url = urlInput.value.trim();

  // Check if the URL is valid
  const validUrl = url.includes("watch?v=") && url.length >= 32;

  // If the URL is not valid, show an alert and return
  if (!validUrl) {
    alert("Please enter a valid URL");
    return;
  }

  // Extract the parameters from the URL
  const params = url.slice(32);

  // Define the image URLs for different resolutions
  const imageUrls = [
    `https://img.youtube.com/vi/${params}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${params}/sddefault.jpg`,
    `https://img.youtube.com/vi/${params}/hqdefault.jpg`,
  ];

  // Get the output title element and insert the images
  const outputTitle = document.getElementById("outputTitle");
  const img = imageUrls.map((url) => `<img src="${url}">`).join("");
  outputTitle.insertAdjacentHTML(
    "afterend",
    `<div class='list-img'>${img}</div>`
  );

  // Scroll to the list of images
  const listImg = document.querySelector(".list-img");
  listImg.scrollIntoView({ behavior: "smooth", block: "start" });

  // Add a click event listener to reset the form
  const resetBtn = document.querySelector(".reset");
  resetBtn.addEventListener("click", () => {
    urlInput.value = "";
  });

  // Check if the page is scrolled and show the back to top button
  const height = document.documentElement.scrollHeight;
  const backToTopBtn = document.querySelector(".backToTop");
  backToTopBtn.style.display = height > 1000 ? "block" : "none";

  // Add a click event listener to scroll to the top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    backToTopBtn.style.display = "none";
  });
};
