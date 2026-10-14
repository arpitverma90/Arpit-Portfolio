$(document).ready(function () {

    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        const originalText = aboutText.textContent.trim().replace(/\s+/g, ' ');
        let resizeTimer;

        function renderAboutText() {
            const width = aboutText.clientWidth;
            if (window.innerWidth < 900 || width < 450) {
                aboutText.textContent = originalText;
                return;
            }

            const words = originalText.split(' ');
            const style = window.getComputedStyle(aboutText);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = style.font;

            const wordWidths = words.map(word => context.measureText(word).width);
            const spaceWidth = context.measureText(' ').width;
            const totalWidth = wordWidths.reduce((sum, wordWidth) => sum + wordWidth, 0)
                + spaceWidth * (words.length - 1);
            const lineCount = Math.ceil(totalWidth / width);
            const targetLineWidth = totalWidth / lineCount;
            const lines = [];
            let start = 0;

            for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
                const remainingLines = lineCount - lineIndex - 1;
                const maxEnd = words.length - remainingLines;
                let end = start;
                let lineWidth = 0;

                while (end < maxEnd) {
                    const nextWidth = lineWidth
                        + (end > start ? spaceWidth : 0)
                        + wordWidths[end];
                    if (end > start && lineWidth >= targetLineWidth) {
                        break;
                    }
                    lineWidth = nextWidth;
                    end++;
                }

                if (end < maxEnd && end > start) {
                    const nextWidth = lineWidth + spaceWidth + wordWidths[end];
                    if (Math.abs(nextWidth - targetLineWidth) < Math.abs(lineWidth - targetLineWidth)) {
                        lineWidth = nextWidth;
                        end++;
                    }
                }

                lines.push(words.slice(start, end));
                start = end;
            }

            aboutText.replaceChildren();
            lines.forEach((lineWords, lineIndex) => {
                const line = document.createElement('span');
                line.className = 'about-line';
                let letterGaps = 0;

                lineWords.forEach((word, index) => {
                    const wordElement = document.createElement('span');
                    wordElement.textContent = word;
                    line.appendChild(wordElement);
                    letterGaps += Math.max(0, word.length - 1);
                    if (index < lineWords.length - 1) {
                        line.appendChild(document.createTextNode(' '));
                    }
                });

                aboutText.appendChild(line);
                if (letterGaps > 0 && lineIndex < lines.length - 1) {
                    const range = document.createRange();
                    range.selectNodeContents(line);
                    const naturalWidth = range.getBoundingClientRect().width;
                    const letterSpacing = Math.max(0, (width - naturalWidth) / letterGaps);
                    line.querySelectorAll('span').forEach(word => {
                        word.style.letterSpacing = `${letterSpacing}px`;
                    });
                }
            });
        }

        renderAboutText();
        document.fonts.ready.then(renderAboutText);
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(renderAboutText, 100);
        });
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("p9GssEuj6GLDmPLE-");

        emailjs.sendForm('service_clipkkh', 'template_9q1jime', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

// document.addEventListener('visibilitychange',
//     function () {
//         if (document.visibilityState === "visible") {
//             document.title = "Portfolio | Arpit Verma";
//             $("#favicon").attr("href", "assets/images/logo.png");
//         }
//         else {
//             document.title = "Come Back To Portfolio";
//             $("#favicon").attr("href", "assets/images/favhand.png");
//         }
//     });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Engineering ", "Data Analytics", "Power Bi Developer", "Cloud Engineering"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 6).forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }

// document.getElementById("contact-form").addEventListener("submit", function(e) {
//     e.preventDefault();
//     const url = "https://script.google.com/macros/s/AKfycbxpbDrNN85noMKCQiiUhrWpQ9GTjbl4r-8_7Ba42-N5hioLGQGVTaA-JveYuSITuZXh6g/exec"; // Replace with your Google Apps Script URL
//     const formData = new FormData(document.getElementById("contact-form"));
//     const data = Object.fromEntries(formData.entries());

//     fetch(url, {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => {
//         showModal("Form submitted successfully!");
//     })
//     .catch(error => {
//         showModal("Form submission failed: " + error.message);
//     });
// });

// Function to show the modal
function showModal(message) {
    document.getElementById("modal-message").innerText = message;
    document.getElementById("myModal").style.display = "block";

    // Reload the form after 2 seconds
    setTimeout(() => {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("contact-form").reset(); // Reset the form
        window.location.reload(); // Reload the page
    }, 2000); // Adjust the timeout duration as needed
}

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").onclick = function() {
    document.getElementById("myModal").style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}





/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
