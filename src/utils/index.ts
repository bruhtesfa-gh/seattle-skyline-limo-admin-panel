export function showImagePreview(
  src: HTMLInputElement,
  target: HTMLImageElement
) {
  var fr = new FileReader();
  // when image is loaded, set the src of the image where you want to display it
  fr.onload = function (e) {
    target.src = this.result as string;
  };
  src.addEventListener("change", function () {
    // fill fr with image data
    if (src.files) {
      fr.readAsDataURL(src.files[0]);
    }
  });
}
