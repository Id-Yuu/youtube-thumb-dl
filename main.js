const formsData = (e) => {
  e.preventDefault();
  // get input
  const url = document.getElementById("url").value;
  // Check Error
  if (url === "") {
    alert("Please Enter URL");
    return;
  } else if (!url.includes("watch?v=")) {
    alert("Please Enter Valid URL");
    return;
  } else if (url.length < 32) {
    alert("Please Enter Valid URL");
    return;
  } else {
    // get image
    const params = url.slice(32);
    const imageUrls = [
      `https://img.youtube.com/vi/${params}/maxresdefault.jpg`, // High Res
      `https://img.youtube.com/vi/${params}/sddefault.jpg`, // Standard
      `https://img.youtube.com/vi/${params}/hqdefault.jpg`, // low
    ];
    // output
    const outputTitle = document.getElementById("outputTitle");
    let img = "";
    imageUrls.forEach((url) => (img += `<img src="${url}">`));
    outputTitle.insertAdjacentHTML(
      "afterend",
      "<div class='list-img'>" + img + "</div>"
    );
    // scroll
    const listImg = document.querySelector(".list-img");
    listImg.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
      scrollMode: "if-needed",
    });
    // clear
    const reset = document.querySelector(".reset");
    reset.addEventListener("click", () => {
      url.value = "";
    });
  }
  // Back to top
  const height = document.documentElement.scrollHeight;
  if (height > 1000) {
    document.querySelector(".backToTop").style.display = "block";
  }
  const backToTop = document.querySelector(".backToTop");
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    document.querySelector(".backToTop").style.display = "none";
  });
};
