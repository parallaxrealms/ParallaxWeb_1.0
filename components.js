var galleryOpen = false;

// Open the Modal
function openModal() {
  document.getElementById("art_lightbox").style.display = "block";

  document.getElementById("content-art").classList.add("d-none");

  galleryOpen = true;
}

// Close the Modal
function closeModal() {
  document.getElementById("art_lightbox").style.display = "none";

  document.getElementById("content-art").classList.remove("d-none");

  galleryOpen = false;
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("galleryImage");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}


// Email Forms
const contact_submit_btn = $('#submit_button');
$('#contact-form').on('submit', function (event) {
  alert("!");
  event.preventDefault();

  contact_submit_btn.value = 'Sending...';

  const serviceID = 'service_gc3nv3e';
  const templateID = 'template_d9pvlme';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      contact_submit_btn.value = 'Submit';
      alert('Your Message Has Been Submitted! Thank You!');
    }, (err) => {
      contact_submit_btn.value = 'Submit';
      alert(JSON.stringify(err));
    });
});