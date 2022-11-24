let slideIndex = 1;
let period_time = 0;
let cur_interval;

function timer() {
    let time = document.querySelector('#timer');
    if (time.value >= 1) {
        if (cur_interval != null) {
            clearInterval(cur_interval);
            cur_interval = null;
        }
        period_time = time.value;
        if (cur_interval == null) {
            cur_interval = setInterval(() => {
                showSlide(slideIndex);
                slideIndex++;
            }, period_time * 1000);
        }
    }
}

function stopSlideshow() {
    clearInterval(cur_interval);
    cur_interval = null;
}

// Next/previous controls
function plusSlides(n) {
    showSlide(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

showSlide(slideIndex);
