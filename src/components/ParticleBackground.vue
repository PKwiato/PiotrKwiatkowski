<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx;
let particles = [];
let animationFrame;
let mouse = { x: null, y: null, radius: 150 };

class Particle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    
    // Constant slow drift
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    
    this.density = (Math.random() * 30) + 1;
    this.color = '#ff8f73';
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    // Constant movement
    this.x += this.vx;
    this.y += this.vy;

    // Screen wrap
    if (this.x > this.w) this.x = 0;
    if (this.x < 0) this.x = this.w;
    if (this.y > this.h) this.y = 0;
    if (this.y < 0) this.y = this.h;

    // Mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density * 0.5;
      let directionY = forceDirectionY * force * this.density * 0.5;
      
      this.x -= directionX;
      this.y -= directionY;
    }
  }
}

const init = () => {
  particles = [];
  const numberOfParticles = (window.innerWidth * window.innerHeight) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(canvas.value.width, canvas.value.height));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  connect();
  animationFrame = requestAnimationFrame(animate);
};

const connect = () => {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.strokeStyle = `rgba(255, 143, 115, ${0.15 - (distance / 100) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
};

const handleResize = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  init();
};

const handleMouseMove = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
};

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  handleResize();
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  cancelAnimationFrame(animationFrame);
});
</script>
