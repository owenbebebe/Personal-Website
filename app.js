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
    //back curve
    for(let j = 80; j >= 1; j--) {
        ctxH.beginPath();
        ctxH.moveTo(0, (canvasH.height / 2) * j);
        for (let i = 0; i < canvasH.width; i += 5) {
            let y =  canvasH.height / 2 + Math.cos(i * 0.0057+ time) * (j*0.03) * 50 ;
            ctxH.lineTo(i, 0.8*y+(j*-4));
        }
        ctxH.strokeStyle = "#c5947e";
        ctxH.globalAlpha = 0.0142 * j;
        ctxH.stroke();

    } 
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
    let moonY = 1;
    let moonX = 1;
    moonY = 1 + (0.03777 *scrollTop);
    let moonR = 1/(1+Math.exp(-0.00333*scrollTop));
    ctxM.clearRect(0, 0, canvasM.width, canvasM.height);
    for(let i = 1; i <= 10; i++) {
        ctxM.beginPath();
        ctxM.arc((canvasM.width*(1+scrollTop*-0.00066)/1.15), (canvasM.height*moonY)/10, 2*  radius *  i * (1-moonR), 0, Math.PI * 2);
        ctxM.lineWidth = radius * 0.03;
        ctxM.globalAlpha = (1+scrollTop*-0.0041117)* (1- (0.04997 * i));
        ctxM.strokeStyle = "#ff793c";
        ctxM.stroke();
    }
    
}

let scrollNav = document .querySelector(".nav");
let scrollHero = document.querySelector(".hero");
let scrollEnter = false; 
window.addEventListener('scroll', draw);
function updateHeaderPosition() {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    let stickyScroll = currentScrollPos /10;
    if (currentScrollPos <= 300) {
        scrollHero.style.transform = `translateY(${currentScrollPos}px)`;
        scrollNav.style.transform = `translateY(${currentScrollPos}px)`;
        let scrollOpc = 1-(currentScrollPos*0.00333);
        scrollNav.style.opacity = scrollOpc;
        scrollHero.style.opacity = scrollOpc;
        canvasH.style.transform = `translateY(${currentScrollPos*0.667}px)`;
        canvas.style.transform = `translateY(${currentScrollPos*0.9}px)`;        
        //somebody once told me the world is gonna roll me I aint the sharpest tool in the sheded
    }
    if (currentScrollPos >= 300) {
        scrollNav.style.opacity = 0;
        scrollHero.style.opacity = 0;
        scrollNav.style.position = "absolute";
        scrollHero.style.position = "absolute";
        canvas.style.position = "absolute";
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

//scrolling hero page

//drag card function
const container = document.querySelector('.photo-container');
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('active');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 3; // adjust the speed of scrolling here
  container.scrollLeft = scrollLeft - walk;
});