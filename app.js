//create a curve
let canvas = document.querySelector(".canvas-low");
  const ctx = canvas.getContext("2d");
  let canvasH = document.querySelector(".canvas-high");
  const ctxH = canvasH.getContext("2d");

  let time = 0;
  let timeLow = 0;
function animate() {
    requestAnimationFrame(animate);
    canvas.width = 1000;
    canvas.height = 1000;
    canvasH.width = 1350;
    canvasH.height = 1350;
    time += 0.008;
    ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //front  curve
    
    timeLow += 0.03;
    for(let j = 30; j >= 1; j--) {
        ctx.beginPath();
        ctx.moveTo(0, (canvas.height / 2) * j);
        for (let i = 0; i < canvas.width; i += 5) {
            let y = canvas.height / 2 + Math.sin(i * 0.01+ timeLow) * (j*0.085) * 50 ;
            ctx.lineTo(i, y+(j*-5));
        }
        ctx.strokeStyle = "#ff793c";
        // ctx.fillStyle= "#FEFBFA";
        ctx.globalAlpha = (0.03 * j);
        ctx.stroke();
    }   
    //back curve
    for(let j = 80; j >= 1; j--) {
        ctxH.beginPath();
        ctxH.moveTo(0, (canvasH.height / 2) * j);
        for (let i = 0; i < canvasH.width; i += 5) {
            let y =  canvasH.height / 2 + Math.cos(i * 0.0057+ time) * (j*0.03) * 50 ;
            ctxH.lineTo(i, 0.8*y+(j*-4));
        }
        if(j === 80) {
            ctxH.fillStyle = "#FEFBFA";
            ctxH.fill();
        }
        ctxH.strokeStyle = "#c5947e";
        ctxH.globalAlpha = 0.0142 * j;
        ctxH.stroke();

    }  
  }
  
  animate();
// moon 
const canvasM = document.querySelector(".canvas-moon");
const ctxM = canvasM.getContext('2d');
let radius;

setSize();
    
// Listen for resize events
window.addEventListener('resize', setSize);

function setSize() {
    canvasM.width = window.innerWidth;
    canvasM.height = window.innerHeight;
    radius = Math.min(canvasM.width, canvasM.height) * 0.076;
    requestAnimationFrame(draw);
}

function draw() {
    let scrollTop = window.scrollY || window.pageYOffset;
    if(scrollTop <= 150) {
        canvasM.style.opacity = "1";
        let moonY = 1;
        let moonX = 1;
        moonY = 1 + (0.03777 *scrollTop);
        let moonR = 1/(1+Math.exp(0.00333 *scrollTop));
        ctxM.clearRect(0, 0, canvasM.width, canvasM.height);
        for(let i = 1; i <= 10; i++) {
            ctxM.beginPath();
            ctxM.arc((canvasM.width*(1+scrollTop*-0.00066)/1.15), (canvasM.height*moonY)/10, 2*  radius *  i * (1-moonR), 0, Math.PI * 2);
            canvasM.style.transform = `translateY(${scrollTop}px)`;
            ctxM.lineWidth = radius * 0.02;
            ctxM.fillStyle = "#ff793c";
            ctxM.fill();
            ctxM.globalAlpha = (1+scrollTop*-0.006667)* (1- (0.17 * i));
        }
    }
    else {
        canvasM.style.opacity = "0";
    }
    
    
}

let scrollNav = document .querySelector(".nav");
let scrollHero = document.querySelector(".hero");
let scrollEnter = false; 
let backTop = document.querySelector(".back-top");

window.addEventListener('scroll', draw);
function updateHeaderPosition() {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    let stickyScroll = currentScrollPos /10;
    if (currentScrollPos <= 250) {
        scrollHero.style.transform = `translateY(${currentScrollPos}px)`;
        scrollNav.style.transform = `translateY(${currentScrollPos}px)`;
        let scrollOpc = 1-(currentScrollPos*0.00333);
        scrollNav.style.opacity = scrollOpc;
        scrollHero.style.opacity = scrollOpc;
        canvasH.style.transform = `translateY(${currentScrollPos*0.667}px)`;
        canvas.style.transform = `translateY(${currentScrollPos*0.9}px)`;
        backTop.style.opacity = '0';        
        //somebody once told me the world is gonna roll me I aint the sharpest tool in the sheded
    }
    if (currentScrollPos >= 250) {
        scrollNav.style.opacity = 0;
        scrollHero.style.opacity = 0;
        scrollNav.style.position = "absolute";
        scrollHero.style.position = "absolute";
        canvas.style.position = "absolute";
        backTop.style.opacity = '1';    
    }
  }

function onScroll() {
    requestAnimationFrame(updateHeaderPosition);
}

window.addEventListener('scroll', onScroll);

// scrolling effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    });
});


const hiddenElement = document.querySelectorAll('.hidden'); 
hiddenElement.forEach((el) => observer.observe(el));

function sendEmail() {
    Email.send({
        SecureToken : "c45f8b49-065a-42b8-84d1-ec701714ea08",
        To : 'liowency@gmail.com',
        From : 'liowency@gmail.com',
        Subject : "New Contact Form From Personal Website",
        Body : "Name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Message: " + document.getElementById("message").value
    }).then(
      message => alert("Message Sent Successfully! Thank You for Connecting!")
    );
    
}

// ticker 
var ticker = document.querySelector('.ticker')
  , list = document.querySelector('.ticker__list')
  , clone = list.cloneNode(true)

ticker.append(clone)

//smooth scrolling effect

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});