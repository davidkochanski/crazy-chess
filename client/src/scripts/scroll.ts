window.addEventListener("DOMContentLoaded", () => {
    const images = document.getElementById("modal-img-array");

    if(images) {
        images.addEventListener('wheel', (event) => {
            event.preventDefault();
            images.scrollBy({
              left: event.deltaY < 0 ? -30 : 30,
            });
          });
    }
})


