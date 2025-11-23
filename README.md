# ⭕ Mystery Circle

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/) [![GitHub stars](https://img.shields.io/github/stars/yksanjo/mystery-circle?style=social)](https://github.com/yksanjo/mystery-circle/stargazers) [![GitHub forks](https://img.shields.io/github/forks/yksanjo/mystery-circle.svg)](https://github.com/yksanjo/mystery-circle/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yksanjo/mystery-circle.svg)](https://github.com/yksanjo/mystery-circle/issues) [![Last commit](https://img.shields.io/github/last-commit/yksanjo/mystery-circle.svg)](https://github.com/yksanjo/mystery-circle/commits/main)


**Unlock the secrets of circle animations**

Mystery Circle is a specialized tool for creating, experimenting with, and generating beautiful circle-based animations. Extracted and enhanced from the AI Animation Generator, this project focuses exclusively on the art and science of animated circles.

## ✨ Features

### Animation Generator
- **10+ Animation Types**: Bounce, Rotate, Orbit, Pulse, Spiral, Ripple, Chase, Explode, Morph, and Custom patterns
- **Customizable Controls**: Adjust circle count, size, speed, and color modes
- **Color Modes**: Gradient, Rainbow, Monochrome, and Random color schemes
- **Preset Animations**: Quick-start presets for common patterns
- **Code Generation**: Export ready-to-use anime.js code
- **Fullscreen Mode**: Immersive viewing experience
- **Real-time Preview**: See your animations come to life instantly

### Mathematical Mysteries
- **8 Deep Mathematical Mysteries**: Explore unsolved problems about circles and π
- **Interactive Visualizations**: Visual demonstrations of mathematical concepts
- **Educational Content**: Learn about π normality, circle packing, Buffon's needle, and more
- **Difficulty Levels**: Content organized by beginner, intermediate, and advanced levels

## 🚀 Quick Start

### Prerequisites

- A web server (or use the provided setup)
- Modern browser with ES6 module support

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd mystery-circle
   ```

3. Start a local server. You can use Python's built-in server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use Node.js http-server
   npx http-server -p 8000
   ```

4. Open your browser to `http://localhost:8000/public`
5. Explore the **Mathematical Mysteries** page to learn about unsolved circle problems

## 📖 Usage

### Basic Usage

1. **Configure Your Circles**:
   - Set the number of circles (1-50)
   - Choose an animation type
   - Adjust speed and size sliders
   - Select a color mode

2. **Generate Animation**:
   - Click "Generate Animation" to create and preview
   - Use presets for quick patterns
   - Pause/Play to control animation

3. **Export Code**:
   - View generated code in the code section
   - Copy or download the code for use in your projects

### Animation Types

- **Bounce Wave**: Circles bounce in a wave pattern from center
- **Rotate & Scale**: Rotating circles with scaling effects
- **Orbit**: Circular orbital motion around center
- **Pulse**: Synchronized pulsing effect
- **Spiral**: Spiraling motion with rotation
- **Ripple**: Expanding ripple effect from center
- **Chase**: Circles chasing each other in sequence
- **Explode**: Explosive outward motion
- **Morph**: Shape morphing between circle and square
- **Custom**: Customizable pattern template

### Color Modes

- **Gradient**: Smooth color gradient across circles
- **Rainbow**: Full spectrum rainbow colors
- **Monochrome**: Single color with varying brightness
- **Random**: Random colors for each circle

### Presets

Quick-start presets include:
- **Wave Pattern**: 8 circles in a bouncing wave
- **Spiral Dance**: 12 circles in a spiral formation
- **Synchronized Pulse**: 6 circles pulsing together
- **Orbital Motion**: 10 circles in orbit
- **Ripple Effect**: 15 circles creating ripples
- **Chase Sequence**: 7 circles chasing each other

## 🎨 Customization

### Adjusting Parameters

- **Circle Count**: Control how many circles appear (1-50)
- **Size**: Adjust circle diameter (20-100px)
- **Speed**: Control animation speed (0.5x - 3x)
- **Animation Type**: Choose from 10 different patterns

### Code Export

The generated code uses [anime.js](https://animejs.com/) and can be:
- Copied directly into your projects
- Modified for custom animations
- Integrated with React, Vue, or vanilla JavaScript

## 🛠️ Technical Details

### Dependencies

- **anime.js**: Animation library (loaded from CDN or local dist)
- **Modern JavaScript**: ES6 modules, async/await
- **CSS3**: Custom properties, Grid, Flexbox

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 Project Structure

```
mystery-circle/
├── public/
│   ├── index.html          # Main HTML file
│   ├── circle-generator.js # Core animation logic
│   └── styles.css          # Styling
├── docs/                   # Documentation
├── README.md              # This file
└── package.json           # Project configuration
```

## 🎯 Use Cases

- **Web Development**: Add engaging circle animations to websites
- **Learning**: Understand animation principles and patterns
- **Prototyping**: Quickly test animation ideas
- **Art Projects**: Create visual art with animated circles
- **UI/UX Design**: Design loading states, transitions, and effects

## 🔮 Future Enhancements

- [ ] Additional animation patterns
- [ ] 3D circle animations
- [ ] Interactive circle manipulation
- [ ] Animation timeline editor
- [ ] Export to GIF/Video
- [ ] React/Vue component export
- [ ] Sound synchronization
- [ ] Particle effects integration

## 📝 License

This project is open source and available for use in your projects.

## 🙏 Credits

- Built with [anime.js](https://animejs.com/)
- Extracted and enhanced from the AI Animation Generator project
- Inspired by the beauty of geometric animations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new animation patterns
- Improve the UI/UX
- Enhance code generation
- Add new features

---

**Unlock the mystery. Create beautiful circles. ✨**

