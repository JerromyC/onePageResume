var colors = ["#FF0000", "#00FFFF"];
var dots = [];
var queue = [];

function createDots() {
    for (var i = 0; i < 10; i++) {
        var dot = document.createElement('div');
        dot.className = 'dot';
        document.body.appendChild(dot);
        dots.push(dot);
    }
}

function moveDots() {
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var pos = queue[i] ? queue[i] : queue[0];
        dot.style.left = pos.left;
        dot.style.top = pos.top;
        dot.style.backgroundColor = colors[i % colors.length];
        dot.style.opacity = 1;
        (function(dot) {
            setTimeout(function() {
                dot.style.opacity = 0;
            }, 50);
        })(dot);
    }

    // remove the oldest position from the queue
    if(queue.length > dots.length) {
        queue.shift();
    }
}

window.onload = function() {
    createDots();
    document.addEventListener('mousemove', function(e) {
        var x = Math.min(e.pageX - 5, window.innerWidth - 10 - 17); // subtract the size of the dot and the width of the scrollbar from the window.innerWidth to prevent overflow
        var y = e.pageY - 5;
        queue.push({left: x + 'px', top: y + 'px'}); // store cursor positions in queue
        moveDots();
    });    
}

// Get all main images
// let mainImages = document.querySelectorAll('.hoverImage:not(.mailBlue):not(.mailRed):not(.fbBlue):not(.fbRed):not(.ghBlue):not(.ghRed):not(.phoneBlue):not(.phoneRed)');

// // Add event listeners to each image
// mainImages.forEach(image => {
//     let imageClass = image.className.split(' ')[1]; // Get the second class (e.g., "mail", "fb", etc.)
//     let imageBlue = document.querySelector(`.${imageClass}Blue`); // Append "Blue" to the class and select
//     let imageRed = document.querySelector(`.${imageClass}Red`); // Append "Red" to the class and select

//     image.addEventListener("mouseover", () => {
//         imageBlue.style.left = "-2.5px";
//         imageRed.style.left = "2.5px";
//     });

//     image.addEventListener("mouseout", () => {
//         imageBlue.style.left = "0";
//         imageRed.style.left = "0";
//     });
// }); 

document.querySelectorAll('.hoverImage-wrapper').forEach(wrapper => {
    // Find the main image
    let mainImage = wrapper.querySelector('.hoverImage');

    if (mainImage) {
        // Extract the specific class of the main image (e.g., 'mail', 'fb', 'gh', 'phone')
        let mainImageClass = mainImage.classList[1];

        // Construct the class names for the blue and red images based on the main image class
        let imageBlueClass = mainImageClass + 'Blue';
        let imageRedClass = mainImageClass + 'Red';

        // Find the corresponding blue and red images within the same wrapper
        let imageBlue = wrapper.querySelector('.' + imageBlueClass);
        let imageRed = wrapper.querySelector('.' + imageRedClass);

        // Add hover effects
        mainImage.addEventListener("mouseover", () => {
            if (imageBlue) imageBlue.style.left = "-2.5px";
            if (imageRed) imageRed.style.left = "2.5px";
        });

        mainImage.addEventListener("mouseout", () => {
            if (imageBlue) imageBlue.style.left = "0";
            if (imageRed) imageRed.style.left = "0";
        });
    }
});
