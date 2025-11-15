// Mathematical Mysteries Visualizations

// π Normal Distribution Visualization
function explorePiNormal() {
  const canvas = document.getElementById('pi-digits-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 200;
  
  // First 1000 digits of π (approximation)
  const piDigits = "314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009946576407895126946839835259570982582262052248940772671947826848260147699090264013639443745530506820349625245174939965143142980919065925093722169646151570985838741059788595977297549893016175392846813826868386894277415599185592524595395943104997252468084598727364469584865383673622262609912460805124388439045124413654976278079771569143599770012961608944169486855584840635342207222582848864815845602850601684273945226746767889525213852254995466672782398645659611635488623057745649803559363456817432411251507606947945109659609402522887971089314566913686722874894056010150330861792868092087476091782493858900971490967598526136554978189312978482168299894872265880485756401427047755513237964145152374623436454285844479526586782105114135473573952311342716610213596953623144295248493718711014576540359027993440374200731057853906219838744780847848968332144571386875194350643021845319104848100537061468067491927819119793995206141966342875444064374512371819217999839101591956181467514269123974894090718649423196156794520809514655022523160388193014209376213785595663893778708303906979207734672218256259966150142150306803844773454920260541466592520149744285073251866600213243408819071048633173464965145390579626856100550810665879699816357473638405257145910289706414011097120628043903975951567715770042033786993600723055876317635942187312514712053292819182618612586732157919841484882916447060957527069572209175671167229109816909152801735067127485832228718352093539657251210835791513698820914442100675103346711031412671113699086585163983150197016515116851714376576183515565088490998985998238734552833163550764791853589322618548963213293308985706420467525907091548141654985946163718027098199430992448895757128289059232332609729971208443357326548938239119325974636673058360414281388303203824903758985243744170291327656180937734440307074692112019130203303801976211011004492932151608424448596376698389522868478312355265821314495768572624334418930396864262434107732269780280731891544110104468232527162010526522721116603966655730925471105578537634668206531098965269186205647693118707179667467976855397299323428301947845385647849263844263443865892038295862465118287533283724437570440022822535743234093231690363794027";
  
  const digitCounts = new Array(10).fill(0);
  const digits = piDigits.substring(0, 1000).split('').map(Number);
  
  digits.forEach(d => {
    if (d >= 0 && d <= 9) digitCounts[d]++;
  });
  
  // Draw bar chart
  const barWidth = canvas.width / 10;
  const maxCount = Math.max(...digitCounts);
  
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  digitCounts.forEach((count, digit) => {
    const barHeight = (count / maxCount) * (canvas.height - 40);
    const x = digit * barWidth;
    const y = canvas.height - barHeight - 20;
    
    // Color based on expected frequency
    const expected = 1000 / 10;
    const ratio = count / expected;
    if (ratio > 1.1) ctx.fillStyle = '#10b981';
    else if (ratio < 0.9) ctx.fillStyle = '#ef4444';
    else ctx.fillStyle = '#6366f1';
    
    ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
    
    // Label
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(digit.toString(), x + barWidth / 2, canvas.height - 5);
    ctx.fillText(count.toString(), x + barWidth / 2, y - 5);
  });
  
  // Title
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Digit Frequency in First 1000 Digits of π', canvas.width / 2, 15);
}

// π + e Calculations
function updatePiE() {
  const pi = Math.PI;
  const e = Math.E;
  
  document.getElementById('pi-plus-e').textContent = (pi + e).toFixed(5) + '...';
  document.getElementById('pi-minus-e').textContent = (pi - e).toFixed(5) + '...';
  document.getElementById('pi-times-e').textContent = (pi * e).toFixed(5) + '...';
  document.getElementById('pi-div-e').textContent = (pi / e).toFixed(5) + '...';
}

// Circle Packing Visualization
function visualizePacking() {
  const canvas = document.getElementById('packing-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;
  
  const count = parseInt(document.getElementById('packing-count').value) || 7;
  const radius = 30;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Simple circular packing (not optimal, just visual)
  const circles = [];
  if (count === 1) {
    circles.push({ x: centerX, y: centerY });
  } else {
    const angleStep = (Math.PI * 2) / count;
    const packRadius = Math.min(canvas.width, canvas.height) * 0.3;
    
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      circles.push({
        x: centerX + Math.cos(angle) * packRadius,
        y: centerY + Math.sin(angle) * packRadius
      });
    }
  }
  
  // Draw circles
  circles.forEach((circle, i) => {
    const hue = (i / circles.length) * 360;
    ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  
  // Draw bounding square
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
}

// Kissing Number Visualization
function visualizeKissing() {
  const canvas = document.getElementById('kissing-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const centerRadius = 40;
  const outerRadius = 80;
  
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw center circle
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw 6 kissing circles (2D proven)
  const kissingCount = 6;
  for (let i = 0; i < kissingCount; i++) {
    const angle = (i * Math.PI * 2) / kissingCount;
    const x = centerX + Math.cos(angle) * outerRadius;
    const y = centerY + Math.sin(angle) * outerRadius;
    
    ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
    ctx.beginPath();
    ctx.arc(x, y, centerRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  // Animate
  anime({
    targets: canvas,
    scale: [1, 1.05, 1],
    duration: 2000,
    easing: 'easeInOutSine',
    loop: true
  });
}

// Buffon's Needle Simulation
let buffonInterval = null;
let buffonDrops = 0;
let buffonCrossings = 0;

function startBuffon() {
  if (buffonInterval) return;
  
  const canvas = document.getElementById('buffon-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 300;
  
  const lineSpacing = 40;
  const needleLength = 30;
  
  // Draw lines
  function drawLines() {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    for (let y = 0; y < canvas.height; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
  
  drawLines();
  
  buffonInterval = setInterval(() => {
    // Random needle position and angle
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const angle = Math.random() * Math.PI;
    
    const x1 = x - (needleLength / 2) * Math.cos(angle);
    const y1 = y - (needleLength / 2) * Math.sin(angle);
    const x2 = x + (needleLength / 2) * Math.cos(angle);
    const y2 = y + (needleLength / 2) * Math.sin(angle);
    
    // Check if crosses a line
    const crosses = Math.floor(y1 / lineSpacing) !== Math.floor(y2 / lineSpacing);
    
    // Draw needle
    ctx.strokeStyle = crosses ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    buffonDrops++;
    if (crosses) buffonCrossings++;
    
    // Update stats
    document.getElementById('buffon-drops').textContent = buffonDrops;
    document.getElementById('buffon-crossings').textContent = buffonCrossings;
    
    if (buffonDrops > 0) {
      const estimatedPi = (2 * needleLength * buffonDrops) / (lineSpacing * buffonCrossings);
      document.getElementById('buffon-pi').textContent = estimatedPi.toFixed(4);
    }
    
    // Redraw lines occasionally
    if (buffonDrops % 50 === 0) {
      drawLines();
    }
  }, 50);
}

function stopBuffon() {
  if (buffonInterval) {
    clearInterval(buffonInterval);
    buffonInterval = null;
  }
}

// Chord Length Distribution
function visualizeChords() {
  const canvas = document.getElementById('chord-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 150;
  const method = document.getElementById('chord-method').value;
  const numChords = 100;
  
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw circle
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  const lengths = [];
  
  for (let i = 0; i < numChords; i++) {
    let x1, y1, x2, y2;
    
    if (method === 'random-points') {
      // Random two points on circle
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      x1 = centerX + Math.cos(angle1) * radius;
      y1 = centerY + Math.sin(angle1) * radius;
      x2 = centerX + Math.cos(angle2) * radius;
      y2 = centerY + Math.sin(angle2) * radius;
    } else if (method === 'random-chord') {
      // Random chord through circle
      const angle = Math.random() * Math.PI * 2;
      const dist = (Math.random() - 0.5) * radius * 2;
      const perpAngle = angle + Math.PI / 2;
      const halfChord = Math.sqrt(radius * radius - dist * dist);
      x1 = centerX + Math.cos(angle) * dist + Math.cos(perpAngle) * halfChord;
      y1 = centerY + Math.sin(angle) * dist + Math.sin(perpAngle) * halfChord;
      x2 = centerX + Math.cos(angle) * dist - Math.cos(perpAngle) * halfChord;
      y2 = centerY + Math.sin(angle) * dist - Math.sin(perpAngle) * halfChord;
    } else {
      // Random midpoint
      const midDist = Math.random() * radius;
      const midAngle = Math.random() * Math.PI * 2;
      const midX = centerX + Math.cos(midAngle) * midDist;
      const midY = centerY + Math.sin(midAngle) * midDist;
      const perpAngle = midAngle + Math.PI / 2;
      const halfChord = Math.sqrt(radius * radius - midDist * midDist);
      x1 = midX + Math.cos(perpAngle) * halfChord;
      y1 = midY + Math.sin(perpAngle) * halfChord;
      x2 = midX - Math.cos(perpAngle) * halfChord;
      y2 = midY - Math.sin(perpAngle) * halfChord;
    }
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    lengths.push(length);
    
    // Draw chord
    const alpha = 0.3;
    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Show distribution info
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  ctx.fillStyle = '#f1f5f9';
  ctx.font = '12px monospace';
  ctx.fillText(`Method: ${method}`, 10, 20);
  ctx.fillText(`Avg length: ${avgLength.toFixed(2)}`, 10, 40);
  ctx.fillText(`Max: ${Math.max(...lengths).toFixed(2)}`, 10, 60);
}

// Perfect Circle Reconstruction
function reconstructCircle() {
  const canvas = document.getElementById('perfect-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;
  
  const numPoints = parseInt(document.getElementById('perfect-points').value) || 3;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;
  
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Generate points on circle with noise
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const noise = (Math.random() - 0.5) * 10;
    const r = radius + noise;
    points.push({
      x: centerX + Math.cos(angle) * r,
      y: centerY + Math.sin(angle) * r
    });
  }
  
  // Draw original circle (hidden)
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Draw points
  points.forEach((p, i) => {
    ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Reconstruct circle from points (simplified - 3 point method)
  if (numPoints >= 3) {
    // Use first 3 points to find circle
    const p1 = points[0];
    const p2 = points[1];
    const p3 = points[2];
    
    // Calculate circle from 3 points (simplified)
    const ax = p1.x, ay = p1.y;
    const bx = p2.x, by = p2.y;
    const cx = p3.x, cy = p3.y;
    
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) > 0.001) {
      const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
      const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
      const r = Math.sqrt((ax - ux) ** 2 + (ay - uy) ** 2);
      
      // Draw reconstructed circle
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ux, uy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  explorePiNormal();
  updatePiE();
  visualizePacking();
  visualizeKissing();
  visualizeChords();
  reconstructCircle();
});

