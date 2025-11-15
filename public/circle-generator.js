// anime.js is loaded from CDN in index.html
// Wait for anime.js to be available
function waitForAnime() {
  return new Promise((resolve) => {
    if (typeof anime !== 'undefined') {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (typeof anime !== 'undefined') {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
    }
  });
}

// Map anime.js API to our expected functions
const animate = (targets, options) => {
  if (typeof anime === 'undefined') {
    console.error('anime.js not loaded');
    return null;
  }
  
  // Remove targets from options if present to avoid duplication
  const { targets: _, ...restOptions } = options;
  
  // Ensure targets is an array or NodeList
  const targetArray = targets instanceof NodeList ? Array.from(targets) : 
                      Array.isArray(targets) ? targets : [targets];
  
  if (targetArray.length === 0) {
    console.error('No valid targets for animation');
    return null;
  }
  
  return anime({
    targets: targetArray,
    ...restOptions
  });
};

const stagger = (delay, options = {}) => {
  // anime.js v3 uses anime.stagger() function
  if (typeof anime !== 'undefined' && anime.stagger) {
    return anime.stagger(delay, options);
  }
  
  // Fallback: return a function that anime.js can use for delay
  const baseDelay = typeof delay === 'function' ? delay(0) : delay;
  const from = options.from || 'first';
  
  return function(el, i, len) {
    const total = len || (el.parentNode ? el.parentNode.children.length : 1);
    if (from === 'center') {
      const center = Math.floor(total / 2);
      return Math.abs(i - center) * baseDelay;
    } else if (from === 'last') {
      return (total - 1 - i) * baseDelay;
    } else {
      return i * baseDelay;
    }
  };
};

const createTimeline = (options = {}) => {
  if (typeof anime === 'undefined') {
    console.error('anime.js not loaded');
    return null;
  }
  return anime.timeline(options);
};

class CircleGenerator {
  constructor() {
    this.currentAnimation = null;
    this.circles = [];
    this.generatedCode = '';
    this.isPaused = false;
    this.init();
  }

  init() {
    // Input controls
    document.getElementById('generateBtn').addEventListener('click', () => this.generate());
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
    document.getElementById('playBtn').addEventListener('click', () => this.play());
    document.getElementById('copyBtn').addEventListener('click', () => this.copyCode());
    document.getElementById('downloadBtn').addEventListener('click', () => this.downloadCode());
    document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());

    // Sliders
    document.getElementById('speed').addEventListener('input', (e) => {
      document.getElementById('speedValue').textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
    });

    document.getElementById('size').addEventListener('input', (e) => {
      document.getElementById('sizeValue').textContent = `${e.target.value}px`;
    });

    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        this.applyPreset(preset);
      });
    });
  }

  generate() {
    const count = parseInt(document.getElementById('circleCount').value);
    const type = document.getElementById('animationType').value;
    const speed = parseFloat(document.getElementById('speed').value);
    const size = parseInt(document.getElementById('size').value);
    const colorMode = document.getElementById('colorMode').value;

    // Clear previous animation
    if (this.currentAnimation) {
      if (Array.isArray(this.currentAnimation)) {
        this.currentAnimation.forEach(anim => anim.pause());
      } else {
        this.currentAnimation.pause();
      }
    }

    // Create circles
    this.createCircles(count, size, colorMode);

    // Generate animation code
    const code = this.generateAnimationCode(type, count, speed, size);
    this.generatedCode = code;
    document.getElementById('codeOutput').textContent = code;

    // Execute animation
    this.executeAnimation(type, count, speed);
  }

  createCircles(count, size, colorMode) {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    this.circles = [];

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const baseRadius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.3;

    for (let i = 0; i < count; i++) {
      const circle = document.createElement('div');
      circle.className = 'circle';
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';

      // Apply color based on mode
      const color = this.getColor(i, count, colorMode);
      circle.style.background = color;
      circle.style.boxShadow = `0 0 20px ${color}`;

      // Position circles in a circle pattern
      const angle = (Math.PI * 2 * i) / count;
      const radius = baseRadius;
      const x = centerX + Math.cos(angle) * radius - size / 2;
      const y = centerY + Math.sin(angle) * radius - size / 2;
      
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.transform = 'translate(0, 0)';

      canvas.appendChild(circle);
      this.circles.push(circle);
    }
  }

  getColor(index, total, mode) {
    switch (mode) {
      case 'gradient':
        const hue = (index / total) * 360;
        return `hsl(${hue}, 70%, 60%)`;
      case 'rainbow':
        const rainbowHue = (index / total) * 360;
        return `hsl(${rainbowHue}, 100%, 50%)`;
      case 'monochrome':
        const brightness = 30 + (index / total) * 40;
        return `hsl(200, 70%, ${brightness}%)`;
      case 'random':
        return `hsl(${Math.random() * 360}, 70%, 60%)`;
      default:
        return 'hsl(200, 70%, 60%)';
    }
  }

  generateAnimationCode(type, count, speed, size) {
    let code = `// Circle Animation: ${type}\n`;
    code += `// Generated by Mystery Circle\n\n`;
    code += `import { animate, stagger, createTimeline } from 'animejs';\n\n`;
    code += `const circles = document.querySelectorAll('.circle');\n\n`;

    const duration = 2000 / speed;

    switch (type) {
      case 'bounce':
        code += `animate(circles, {\n`;
        code += `  translateY: [0, -100, 0],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(100, { from: 'center' }),\n`;
        code += `  ease: 'outElastic(1, 0.5)',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;

      case 'rotate':
        code += `animate(circles, {\n`;
        code += `  rotate: 360,\n`;
        code += `  scale: [1, 1.5, 1],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(150),\n`;
        code += `  ease: 'inOutSine',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;

      case 'orbit':
        code += `const centerX = window.innerWidth / 2;\n`;
        code += `const centerY = window.innerHeight / 2;\n`;
        code += `const radius = 150;\n\n`;
        code += `circles.forEach((circle, i) => {\n`;
        code += `  const angle = (Math.PI * 2 * i) / ${count};\n`;
        code += `  animate(circle, {\n`;
        code += `    translateX: [0, Math.cos(angle) * radius, 0],\n`;
        code += `    translateY: [0, Math.sin(angle) * radius, 0],\n`;
        code += `    rotate: 360,\n`;
        code += `    duration: ${duration},\n`;
        code += `    ease: 'linear',\n`;
        code += `    loop: true,\n`;
        code += `  });\n`;
        code += `});\n`;
        break;

      case 'pulse':
        code += `animate(circles, {\n`;
        code += `  scale: [1, 1.5, 1],\n`;
        code += `  opacity: [0.5, 1, 0.5],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(50),\n`;
        code += `  ease: 'inOutSine',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;

      case 'spiral':
        code += `circles.forEach((circle, i) => {\n`;
        code += `  const angle = (Math.PI * 2 * i) / ${count};\n`;
        code += `  const maxRadius = 200;\n`;
        code += `  animate(circle, {\n`;
        code += `    translateX: [0, Math.cos(angle) * maxRadius, 0],\n`;
        code += `    translateY: [0, Math.sin(angle) * maxRadius, 0],\n`;
        code += `    rotate: [0, 720],\n`;
        code += `    scale: [1, 0.5, 1],\n`;
        code += `    duration: ${duration},\n`;
        code += `    delay: i * 100,\n`;
        code += `    ease: 'inOutQuad',\n`;
        code += `    loop: true,\n`;
        code += `  });\n`;
        code += `});\n`;
        break;

      case 'ripple':
        code += `animate(circles, {\n`;
        code += `  scale: [0, 2, 0],\n`;
        code += `  opacity: [1, 0.3, 0],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(100, { from: 'center' }),\n`;
        code += `  ease: 'outQuad',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;

      case 'chase':
        code += `circles.forEach((circle, i) => {\n`;
        code += `  const nextIndex = (i + 1) % ${count};\n`;
        code += `  const nextCircle = circles[nextIndex];\n`;
        code += `  animate(circle, {\n`;
        code += `    translateX: [0, nextCircle.offsetLeft - circle.offsetLeft],\n`;
        code += `    translateY: [0, nextCircle.offsetTop - circle.offsetTop],\n`;
        code += `    duration: ${duration},\n`;
        code += `    delay: i * 200,\n`;
        code += `    ease: 'inOutCubic',\n`;
        code += `    loop: true,\n`;
        code += `  });\n`;
        code += `});\n`;
        break;

      case 'explode':
        code += `circles.forEach((circle, i) => {\n`;
        code += `  const angle = (Math.PI * 2 * i) / ${count};\n`;
        code += `  const distance = 300;\n`;
        code += `  animate(circle, {\n`;
        code += `    translateX: [0, Math.cos(angle) * distance, 0],\n`;
        code += `    translateY: [0, Math.sin(angle) * distance, 0],\n`;
        code += `    opacity: [1, 0, 1],\n`;
        code += `    scale: [1, 0, 1],\n`;
        code += `    duration: ${duration},\n`;
        code += `    delay: i * 50,\n`;
        code += `    ease: 'outQuad',\n`;
        code += `    loop: true,\n`;
        code += `  });\n`;
        code += `});\n`;
        break;

      case 'morph':
        code += `animate(circles, {\n`;
        code += `  borderRadius: ['50%', '0%', '50%'],\n`;
        code += `  rotate: [0, 180, 360],\n`;
        code += `  scale: [1, 1.3, 1],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(80),\n`;
        code += `  ease: 'inOutElastic(1, 0.8)',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;

      case 'custom':
        code += `// Custom pattern - modify as needed\n`;
        code += `animate(circles, {\n`;
        code += `  translateX: [0, 200, 0],\n`;
        code += `  translateY: [0, -50, 0],\n`;
        code += `  scale: [1, 1.2, 1],\n`;
        code += `  rotate: [0, 360],\n`;
        code += `  duration: ${duration},\n`;
        code += `  delay: stagger(100),\n`;
        code += `  ease: 'inOutQuad',\n`;
        code += `  loop: true,\n`;
        code += `});\n`;
        break;
    }

    return code;
  }

  executeAnimation(type, count, speed) {
    if (this.currentAnimation) {
      if (Array.isArray(this.currentAnimation)) {
        this.currentAnimation.forEach(anim => {
          if (anim && anim.pause) anim.pause();
        });
      } else {
        if (this.currentAnimation.pause) this.currentAnimation.pause();
      }
    }

    const circles = document.querySelectorAll('.circle');
    if (circles.length === 0) {
      console.error('No circles found');
      return;
    }

    console.log(`Animating ${circles.length} circles with type: ${type}`);

    const duration = 2000 / speed;

    try {
      switch (type) {
        case 'bounce':
          this.currentAnimation = animate(circles, {
            translateY: [0, -100, 0],
            duration: duration,
            delay: anime.stagger ? anime.stagger(100) : stagger(100),
            easing: 'easeOutElastic(1, .6)',
            loop: true,
          });
          break;

        case 'rotate':
          this.currentAnimation = animate(circles, {
            rotate: 360,
            scale: [1, 1.5, 1],
            duration: duration,
            delay: anime.stagger ? anime.stagger(150) : stagger(150),
            easing: 'easeInOutQuad',
            loop: true,
          });
          break;

        case 'orbit':
          const centerX = document.getElementById('canvas').offsetWidth / 2;
          const centerY = document.getElementById('canvas').offsetHeight / 2;
          const radius = 150;
          const orbitAnimations = [];
          circles.forEach((circle, i) => {
            const angle = (Math.PI * 2 * i) / count;
            orbitAnimations.push(animate(circle, {
              translateX: [0, Math.cos(angle) * radius, 0],
              translateY: [0, Math.sin(angle) * radius, 0],
              rotate: 360,
              duration: duration,
              easing: 'linear',
              loop: true,
            }));
          });
          this.currentAnimation = orbitAnimations;
          break;

        case 'pulse':
          this.currentAnimation = animate(circles, {
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            duration: duration,
            delay: anime.stagger ? anime.stagger(50) : stagger(50),
            easing: 'easeInOutQuad',
            loop: true,
          });
          break;

        case 'spiral':
          const spiralAnimations = [];
          circles.forEach((circle, i) => {
            const angle = (Math.PI * 2 * i) / count;
            const maxRadius = 200;
            spiralAnimations.push(animate(circle, {
              translateX: [0, Math.cos(angle) * maxRadius, 0],
              translateY: [0, Math.sin(angle) * maxRadius, 0],
              rotate: [0, 720],
              scale: [1, 0.5, 1],
              duration: duration,
              delay: i * 100,
              easing: 'easeInOutQuad',
              loop: true,
            }));
          });
          this.currentAnimation = spiralAnimations;
          break;

        case 'ripple':
          this.currentAnimation = animate(circles, {
            scale: [0, 2, 0],
            opacity: [1, 0.3, 0],
            duration: duration,
            delay: anime.stagger ? anime.stagger(100) : stagger(100),
            easing: 'easeOutQuad',
            loop: true,
          });
          break;

        case 'chase':
          const chaseAnimations = [];
          circles.forEach((circle, i) => {
            const nextIndex = (i + 1) % count;
            const nextCircle = circles[nextIndex];
            const rect1 = circle.getBoundingClientRect();
            const rect2 = nextCircle.getBoundingClientRect();
            chaseAnimations.push(animate(circle, {
              translateX: [0, rect2.left - rect1.left],
              translateY: [0, rect2.top - rect1.top],
              duration: duration,
              delay: i * 200,
              easing: 'easeInOutCubic',
              loop: true,
            }));
          });
          this.currentAnimation = chaseAnimations;
          break;

        case 'explode':
          const explodeAnimations = [];
          circles.forEach((circle, i) => {
            const angle = (Math.PI * 2 * i) / count;
            const distance = 300;
            explodeAnimations.push(animate(circle, {
              translateX: [0, Math.cos(angle) * distance, 0],
              translateY: [0, Math.sin(angle) * distance, 0],
              opacity: [1, 0, 1],
              scale: [1, 0, 1],
              duration: duration,
              delay: i * 50,
              easing: 'easeOutQuad',
              loop: true,
            }));
          });
          this.currentAnimation = explodeAnimations;
          break;

        case 'morph':
          this.currentAnimation = animate(circles, {
            borderRadius: ['50%', '0%', '50%'],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
            duration: duration,
            delay: anime.stagger ? anime.stagger(80) : stagger(80),
            easing: 'easeInOutElastic(1, .8)',
            loop: true,
          });
          break;

        case 'custom':
          this.currentAnimation = animate(circles, {
            translateX: [0, 200, 0],
            translateY: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            duration: duration,
            delay: anime.stagger ? anime.stagger(100) : stagger(100),
            easing: 'easeInOutQuad',
            loop: true,
          });
          break;
      }
    } catch (error) {
      console.error('Error executing animation:', error);
      console.error('Error details:', error.stack);
      alert('Error executing animation: ' + error.message + '. Check console for details.');
    }
  }

  applyPreset(preset) {
    const presets = {
      wave: { count: 8, type: 'bounce', speed: 1.2, size: 50, color: 'gradient' },
      spiral: { count: 12, type: 'spiral', speed: 1.5, size: 40, color: 'rainbow' },
      pulse: { count: 6, type: 'pulse', speed: 1.0, size: 60, color: 'monochrome' },
      orbit: { count: 10, type: 'orbit', speed: 1.0, size: 45, color: 'gradient' },
      ripple: { count: 15, type: 'ripple', speed: 0.8, size: 35, color: 'rainbow' },
      chase: { count: 7, type: 'chase', speed: 1.3, size: 55, color: 'gradient' },
    };

    const config = presets[preset];
    if (config) {
      document.getElementById('circleCount').value = config.count;
      document.getElementById('animationType').value = config.type;
      document.getElementById('speed').value = config.speed;
      document.getElementById('size').value = config.size;
      document.getElementById('colorMode').value = config.color;
      document.getElementById('speedValue').textContent = `${config.speed.toFixed(1)}x`;
      document.getElementById('sizeValue').textContent = `${config.size}px`;
      this.generate();
    }
  }

  pause() {
    if (this.currentAnimation) {
      if (Array.isArray(this.currentAnimation)) {
        this.currentAnimation.forEach(anim => anim.pause());
      } else {
        this.currentAnimation.pause();
      }
      this.isPaused = true;
    }
  }

  play() {
    if (this.currentAnimation && this.isPaused) {
      if (Array.isArray(this.currentAnimation)) {
        this.currentAnimation.forEach(anim => anim.play());
      } else {
        this.currentAnimation.play();
      }
      this.isPaused = false;
    }
  }

  reset() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '<div class="placeholder"><p>✨ Configure your circles and click Generate</p></div>';
    document.getElementById('codeOutput').textContent = '// Your generated circle animation code will appear here...';
    
    if (this.currentAnimation) {
      this.currentAnimation.pause();
      this.currentAnimation = null;
    }
    
    this.circles = [];
    this.isPaused = false;
  }

  copyCode() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.getElementById('copyBtn');
      const originalText = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  }

  downloadCode() {
    const code = this.generatedCode || document.getElementById('codeOutput').textContent;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circle-animation.js';
    a.click();
    URL.revokeObjectURL(url);
  }

  toggleFullscreen() {
    const canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}

// Initialize the app when DOM and anime.js are ready
async function initApp() {
  await waitForAnime();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new CircleGenerator();
    });
  } else {
    new CircleGenerator();
  }
}

initApp();

