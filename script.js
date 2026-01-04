// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const dots = Array.from({ length: 35 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach(d => {
    d.x += d.dx;
    d.y += d.dy;

    if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.dy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(245,158,11,0.4)";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
/* =========================
   BACKGROUND GLOW FOLLOW MOUSE (FIXED)
========================= */
const bgGlow = document.getElementById("bg-glow");

let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {
  if (!bgGlow) return;

  // Smooth follow (lerp)
  glowX += (e.clientX - glowX) * 0.08;
  glowY += (e.clientY - glowY) * 0.08;

  bgGlow.style.left = `${glowX}px`;
  bgGlow.style.top = `${glowY}px`;
});
/* =========================
   3D ORB MOUSE INTERACTION
========================= */

const orb = document.querySelector(".orb");

window.addEventListener("mousemove", (e) => {
  if (!orb) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;

  orb.style.transform = `
    translate(-50%, -50%)
    rotateX(${ -y }deg)
    rotateY(${ x }deg)
  `;
});
// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
});

// SKILL ANIMATION
const bars = document.querySelectorAll(".fill");
bars.forEach(bar => {
  bar.style.width = bar.dataset.level + "%";
});

// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("three-bg"), alpha:true });
renderer.setSize(innerWidth, innerHeight);

const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe:true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
