import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/* ------------------------------------------------------------------ */
/*  Agent Recourse — Interactive 3D AI Robot Mascot                   */
/*  Faithfully incorporated from downloaded reference specification   */
/* ------------------------------------------------------------------ */

const CONFIG = {
  head: { yaw: 32, pitch: 16, tilt: 6 },        // max degrees (horizontal / vertical / roll)
  eyeMax: 0.42,                                 // max pupil travel (radians on the eyeball)
  body: { yaw: 0.14, pitch: 0.05, roll: 0.02 }, // radians, subtle
  holdMs: 2000,                                 // keep gaze this long after the cursor stops
  // damping rates (higher = faster). Eyes > head > body
  rate: { eye: 16, head: 6, body: 2.4, attention: 7, release: 1.0, close: 4 },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const deg = (d) => (d * Math.PI) / 180;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const damp = (cur, target, lambda, dt) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));
const soft = (v, k = 1.6) => clamp(Math.tanh(v * k) / Math.tanh(k), -1, 1);
const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const rand = (a, b) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ */
/*  Mount Robot into Container                                         */
/* ------------------------------------------------------------------ */
export function mountRobot(container) {
  if (!container) return { dispose() {} };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    console.warn('[Agent Recourse Robot] WebGL unavailable:', err);
    return { dispose() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const canvas = renderer.domElement;
  container.appendChild(canvas);

  const scene = new THREE.Scene();

  // Soft studio reflections (no external HDRI needed)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);

  /* ---------------- Lights ---------------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c0c8, 0.4));

  const key = new THREE.DirectionalLight(0xffffff, 1.85);
  key.position.set(3.5, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 5;   key.shadow.camera.bottom = -2;
  key.shadow.camera.near = 1;  key.shadow.camera.far = 20;
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 4;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xe8eef5, 0.55);
  fill.position.set(-4, 2.5, 4);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 0.95);
  rim.position.set(0, 3, -5);
  scene.add(rim);

  /* ---------------- Materials (Clean Enterprise Neutral Palette) ---------------- */
  const mats = {
    white:   new THREE.MeshPhysicalMaterial({ color: 0xf3f5f7, roughness: 0.3, metalness: 0.0, clearcoat: 0.7, clearcoatRoughness: 0.3 }),
    silver:  new THREE.MeshStandardMaterial({ color: 0xc4cad1, roughness: 0.35, metalness: 0.75 }),
    dark:    new THREE.MeshStandardMaterial({ color: 0x2b3139, roughness: 0.55, metalness: 0.3 }),
    visor:   new THREE.MeshPhysicalMaterial({ color: 0x14181e, roughness: 0.15, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 }),
    eyeball: new THREE.MeshPhysicalMaterial({ color: 0xf7f8fa, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 }),
    iris:    new THREE.MeshStandardMaterial({ color: 0x56677a, roughness: 0.4, side: THREE.DoubleSide }),
    pupil:   new THREE.MeshStandardMaterial({ color: 0x07090c, roughness: 0.2, side: THREE.DoubleSide }),
    glint:   new THREE.MeshBasicMaterial({ color: 0xffffff }),
  };

  const mesh = (geo, mat, { cast = true, receive = false } = {}) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = cast;
    m.receiveShadow = receive;
    return m;
  };

  /* ---------------- Robot Hierarchy ----------------
     root
      ├─ feet
      └─ rig            (body orientation pivot, at ground level)
          ├─ shell      (breathing scale)  → body, chest plate
          ├─ neck
          ├─ arms
          └─ headPivot  (hinge at the neck; yaw / pitch / tilt)
              └─ headGroup → head, visor, ears, antenna, eyes
  ---------------------------------------------------- */
  const root = new THREE.Group();
  scene.add(root);

  const rig = new THREE.Group();
  rig.rotation.order = 'YXZ';
  root.add(rig);

  const shell = new THREE.Group();
  rig.add(shell);

  // Body
  const body = mesh(new THREE.SphereGeometry(1, 48, 32), mats.white);
  body.scale.set(0.72, 0.74, 0.62);
  body.position.y = 0.82;
  shell.add(body);

  // Chest plate (subtle mechanical detail)
  const plate = new THREE.Group();
  plate.position.set(0, 0.95, 0.6);
  plate.rotation.x = -0.15;
  const plateBox = mesh(new RoundedBoxGeometry(0.46, 0.26, 0.05, 4, 0.025), mats.dark);
  plate.add(plateBox);
  for (const x of [-0.1, 0, 0.1]) {
    const dot = mesh(new THREE.SphereGeometry(0.022, 12, 8), mats.silver, { cast: false });
    dot.position.set(x, 0, 0.028);
    plate.add(dot);
  }
  shell.add(plate);

  // Neck
  const neck = mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.4, 24), mats.dark);
  neck.position.y = 1.64;
  rig.add(neck);

  // Arms
  const arms = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.6, 1.2, 0.02);
    const arm = mesh(new THREE.CapsuleGeometry(0.1, 0.3, 6, 16), mats.white);
    arm.position.y = -0.25;
    const hand = mesh(new THREE.SphereGeometry(0.115, 20, 14), mats.silver);
    hand.position.y = -0.5;
    pivot.add(arm, hand);
    rig.add(pivot);
    arms.push({ pivot, s });
  }

  // Feet (static)
  for (const s of [-1, 1]) {
    const foot = mesh(new THREE.SphereGeometry(1, 24, 16), mats.silver);
    foot.scale.set(0.3, 0.13, 0.4);
    foot.position.set(s * 0.32, 0.1, 0.1);
    root.add(foot);
  }

  /* ---------------- Head ---------------- */
  const HEAD_PIVOT_Y = 1.66;
  const headPivot = new THREE.Group();
  headPivot.position.y = HEAD_PIVOT_Y;
  headPivot.rotation.order = 'YXZ';
  rig.add(headPivot);

  const headGroup = new THREE.Group();
  headGroup.position.y = 0.95;
  headPivot.add(headGroup);

  const head = mesh(new THREE.SphereGeometry(1, 64, 48), mats.white);
  head.scale.set(1.15, 0.95, 1.0);
  headGroup.add(head);

  // Face visor (dark glossy ellipsoid poking out of the front of the head)
  const visor = mesh(new THREE.SphereGeometry(1, 48, 32), mats.visor, { cast: false });
  visor.scale.set(0.95, 0.62, 0.7);
  visor.position.set(0, 0.02, 0.35);
  headGroup.add(visor);

  // Ears
  for (const s of [-1, 1]) {
    const earOuter = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.14, 32), mats.silver);
    earOuter.rotation.z = Math.PI / 2;
    earOuter.position.set(s * 1.12, 0, 0);
    const earInner = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.15, 24), mats.dark, { cast: false });
    earInner.rotation.z = Math.PI / 2;
    earInner.position.set(s * 1.14, 0, 0);
    headGroup.add(earOuter, earInner);
  }

  // Antenna (lags slightly behind head motion)
  const antenna = new THREE.Group();
  antenna.position.set(0.3, 0.9, 0);
  antenna.rotation.z = -0.18;
  const stalk = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12), mats.dark);
  stalk.position.y = 0.15;
  const tip = mesh(new THREE.SphereGeometry(0.07, 16, 12), mats.silver);
  tip.position.y = 0.32;
  antenna.add(stalk, tip);
  headGroup.add(antenna);

  /* ---------------- Eyes ----------------
     Each eye: socket ring + eyeball + iris/pupil caps that live ON the
     eyeball surface (they rotate around the eyeball centre), so pupils can
     never leave the eye or clip into the face. */
  const EYE_R = 0.22;
  const capGeo = (radius, halfAngleSin) => {
    const g = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.asin(halfAngleSin));
    g.rotateX(Math.PI / 2); // pole → +Z
    return g;
  };
  const irisGeo  = capGeo(EYE_R + 0.0015, 0.11 / EYE_R);
  const pupilGeo = capGeo(EYE_R + 0.0030, 0.06 / EYE_R);
  const eyeballGeo = new THREE.SphereGeometry(EYE_R, 40, 28);
  const glintGeoA = new THREE.SphereGeometry(0.03, 12, 8);
  const glintGeoB = new THREE.SphereGeometry(0.016, 10, 6);
  const ringGeo = new THREE.TorusGeometry(0.205, 0.03, 16, 48);

  const eyes = [];
  for (const s of [-1, 1]) {
    const group = new THREE.Group();
    group.position.set(s * 0.4, 0.04, 0.9);

    const ball = mesh(eyeballGeo, mats.eyeball, { cast: false });
    const pivot = new THREE.Group();
    pivot.rotation.order = 'YXZ';
    pivot.add(mesh(irisGeo, mats.iris, { cast: false }), mesh(pupilGeo, mats.pupil, { cast: false }));

    // Fixed reflections (stay put while the pupil moves → reads as glossy)
    const gA = mesh(glintGeoA, mats.glint, { cast: false });
    gA.position.set(-0.38, 0.42, 0.82).normalize().multiplyScalar(EYE_R + 0.002);
    const gB = mesh(glintGeoB, mats.glint, { cast: false });
    gB.position.set(0.4, -0.35, 0.85).normalize().multiplyScalar(EYE_R + 0.002);

    group.add(ball, pivot, gA, gB);
    headGroup.add(group);

    // Socket ring follows the curvature of the visor
    const ring = mesh(ringGeo, mats.silver, { cast: false });
    ring.position.set(s * 0.4, 0.04, 0.975);
    ring.rotation.y = s * 0.33;
    headGroup.add(ring);

    eyes.push({ group, pivot, yaw: 0, pitch: 0 });
  }

  /* ---------------- Ground Shadow ---------------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24),
    new THREE.ShadowMaterial({ opacity: 0.14 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const blobCanvas = document.createElement('canvas');
  blobCanvas.width = blobCanvas.height = 128;
  {
    const c = blobCanvas.getContext('2d');
    const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(0,0,0,0.32)');
    g.addColorStop(0.55, 'rgba(0,0,0,0.10)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 128, 128);
  }
  const blobTex = new THREE.CanvasTexture(blobCanvas);
  const blob = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.4),
    new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false })
  );
  blob.rotation.x = -Math.PI / 2;
  blob.position.set(0, 0.004, 0.05);
  scene.add(blob);

  /* ---------------- Camera Framing ---------------- */
  const LOOK_AT = new THREE.Vector3(0, 1.8, 0);
  function fitCamera() {
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const halfH = 2.15, halfW = 1.85;                // content half-extent to keep in frame
    const t = Math.tan(fov / 2);
    const dist = Math.max(halfH / t, halfW / (t * camera.aspect));
    camera.position.set(0, LOOK_AT.y + dist * 0.2, dist * 0.98); // slightly elevated, front-facing
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    fitCamera();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------------- Pointer Tracking ---------------- */
  const P = { x: 0, y: 0, has: false, inside: false, lastMove: 0 };
  const setPointer = (x, y) => {
    P.x = x; P.y = y; P.has = true; P.inside = true; P.lastMove = performance.now();
  };
  const onPointer = (e) => setPointer(e.clientX, e.clientY);
  const onTouch = (e) => { const t = e.touches[0]; if (t) setPointer(t.clientX, t.clientY); };
  const onLeave = () => { P.inside = false; };

  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerdown', onPointer, { passive: true });
  window.addEventListener('touchstart', onTouch, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  window.addEventListener('blur', onLeave);

  /* ---------------- Reduced Motion ---------------- */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = mq.matches;
  const onMq = (e) => { reduced = e.matches; };
  mq.addEventListener('change', onMq);

  /* ---------------- Animation State ---------------- */
  const S = {
    headYaw: 0, headPitch: 0, headTilt: 0,
    bodyYaw: 0, bodyPitch: 0, bodyRoll: 0,
    att: 0,      // 0 = idle, 1 = inspecting cursor
    close: 0,    // 0..1 cursor proximity
    glX: 0, glY: 0, antLag: 0,
  };
  const glance = { x: 0, y: 0, next: 1.5 };
  const blink = { next: rand(2, 4), start: -1 };

  const tmp = new THREE.Vector3();
  const toClient = (obj3d, rect) => {
    obj3d.getWorldPosition(tmp);
    tmp.project(camera);
    return {
      x: rect.left + (tmp.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-tmp.y * 0.5 + 0.5) * rect.height,
    };
  };

  const R = CONFIG.rate;
  const EM = CONFIG.eyeMax;
  const gazeAngleEl = document.getElementById('mascotGazeAngle');

  function update(dt, now) {
    const t = now / 1000;
    const motion = reduced ? 0.5 : 1;
    const idleAmt = reduced ? 0 : 1;
    const W = window.innerWidth, H = window.innerHeight;
    const rect = canvas.getBoundingClientRect();

    /* attention: inspecting vs idle */
    const active = P.inside && P.has && (now - P.lastMove) < CONFIG.holdMs;
    S.att = damp(S.att, active ? 1 : 0, active ? R.attention : (P.inside ? R.release : R.release * 1.8), dt);

    /* cursor relative to the face */
    const hs = toClient(headGroup, rect);
    const dx = P.x - hs.x, dy = P.y - hs.y;
    const nx = P.has ? soft(dx / (W * 0.45)) : 0;
    const ny = P.has ? soft(dy / (H * 0.45)) : 0;

    /* close-cursor state */
    const headR = rect.height * 0.2;
    const dist = Math.hypot(dx, dy);
    const closeT = (active && P.has) ? 1 - smoothstep(headR * 0.9, headR * 2.8, dist) : 0;
    S.close = damp(S.close, closeT, R.close, dt);

    /* idle: glances, drift, breathing */
    if (t >= glance.next) {
      glance.x = rand(-0.8, 0.8);
      glance.y = rand(-0.5, 0.5);
      if (Math.random() < 0.35) { glance.x = 0; glance.y = 0; }
      glance.next = t + rand(2, 5);
    }
    S.glX = damp(S.glX, glance.x, 3, dt);
    S.glY = damp(S.glY, glance.y, 3, dt);

    const iYaw   = idleAmt * (Math.sin(t * 0.37) * 0.06 + Math.sin(t * 0.91) * 0.025 + S.glX * 0.12);
    const iPitch = idleAmt * (Math.sin(t * 0.5 + 1) * 0.035 + S.glY * 0.08);
    const iTilt  = idleAmt * Math.sin(t * 0.29) * 0.025;

    /* cursor targets (clamped by construction) */
    const cYaw   = nx * deg(CONFIG.head.yaw) * motion;
    const cPitch = ny * deg(CONFIG.head.pitch) * motion;
    const cTilt  = (-nx * deg(CONFIG.head.tilt) - nx * deg(3) * S.close) * motion;

    const tYaw   = iYaw   + (cYaw   - iYaw)   * S.att;
    const tPitch = iPitch + (cPitch - iPitch) * S.att;
    const tTilt  = iTilt  + (cTilt  - iTilt)  * S.att;

    S.headYaw   = damp(S.headYaw,   tYaw,   R.head, dt);
    S.headPitch = damp(S.headPitch, tPitch, R.head, dt);
    S.headTilt  = damp(S.headTilt,  tTilt,  R.head, dt);

    /* body: subtle + delayed */
    const bYawI = idleAmt * Math.sin(t * 0.23) * 0.03;
    const bRollI = idleAmt * Math.sin(t * 0.31) * 0.008;
    const bYawC = nx * CONFIG.body.yaw * motion;
    const bPitchC = (ny * CONFIG.body.pitch + 0.045 * S.close) * motion; // forward lean when close
    const bRollC = -nx * CONFIG.body.roll * motion;

    S.bodyYaw   = damp(S.bodyYaw,   bYawI + (bYawC - bYawI) * S.att, R.body, dt);
    S.bodyPitch = damp(S.bodyPitch, bPitchC * S.att + 0.045 * S.close * (1 - S.att) * 0, R.body, dt);
    S.bodyRoll  = damp(S.bodyRoll,  bRollI + (bRollC - bRollI) * S.att, R.body, dt);

    rig.rotation.set(S.bodyPitch, S.bodyYaw, S.bodyRoll);
    // head angles are partly compensated so total stays inside the limits
    headPivot.rotation.set(
      S.headPitch - S.bodyPitch * 0.6,
      S.headYaw - S.bodyYaw * 0.6,
      S.headTilt
    );

    /* breathing */
    const br = idleAmt * Math.sin(t * 1.6);
    shell.scale.set(1 - 0.006 * br, 1 + 0.012 * br, 1 - 0.006 * br);
    headPivot.position.y = HEAD_PIVOT_Y + 0.019 * br;

    /* arms */
    for (const a of arms) {
      a.pivot.rotation.z = a.s * (0.2 + idleAmt * Math.sin(t * 1.6 + a.s) * 0.015) - S.bodyRoll * 2;
    }

    /* antenna lag */
    S.antLag = damp(S.antLag, S.headYaw, 3, dt);
    antenna.rotation.z = -0.18 - (S.headYaw - S.antLag) * 1.2;

    /* blinking */
    if (t >= blink.next && blink.start < 0) {
      blink.start = t;
      blink.next = t + (Math.random() < 0.15 ? 0.3 : rand(2.5, 6));
    }
    let blinkAmt = 0;
    if (blink.start >= 0) {
      const p = (t - blink.start) / 0.16;
      if (p >= 1) blink.start = -1; else blinkAmt = Math.sin(Math.PI * p);
    }

    /* eyes: fast + precise, each eye aims at the cursor independently */
    const Re = Math.max(260, Math.min(W, H) * 0.32);
    for (const e of eyes) {
      const es = toClient(e.group, rect);
      const ex = P.has ? Math.tanh((P.x - es.x) / Re) : 0;
      const ey = P.has ? Math.tanh((P.y - es.y) / Re) : 0;

      // the head already turned part of the way → eyes cover the remainder
      const cy = clamp(ex * EM - (S.headYaw / deg(CONFIG.head.yaw)) * EM * 0.5, -EM, EM);
      const cp = clamp(-ey * EM + (S.headPitch / deg(CONFIG.head.pitch)) * EM * 0.5, -EM, EM);
      const iy = S.glX * EM * 0.6 * idleAmt;
      const ip = S.glY * EM * 0.5 * idleAmt;

      e.yaw   = damp(e.yaw,   iy + (cy - iy) * S.att, R.eye, dt);
      e.pitch = damp(e.pitch, ip + (cp - ip) * S.att, R.eye, dt);

      // hard safety clamp: pupils can never leave the eyeball's visible cap
      e.yaw = clamp(e.yaw, -EM, EM);
      e.pitch = clamp(e.pitch, -EM, EM);
      e.pivot.rotation.set(-e.pitch, e.yaw, 0);

      // slightly narrowed when the cursor is close (focused), plus blinking
      e.group.scale.y = (1 - 0.06 * S.close) * (1 - 0.92 * blinkAmt);
    }

    /* Live Orbital Gaze Radar HUD update */
    if (gazeAngleEl) {
      const degYaw = Math.round((S.headYaw * 180) / Math.PI);
      let dirText = '0° CENTER';
      if (degYaw > 3) {
        dirText = `${degYaw}° RIGHT`;
      } else if (degYaw < -3) {
        dirText = `${Math.abs(degYaw)}° LEFT`;
      }
      gazeAngleEl.textContent = `GAZE: ${dirText}`;
    }
  }

  /* ---------------- Interactive Mascot Messages ---------------- */
  const bubble = document.getElementById('mascotSpeechBubble');
  const speechText = bubble ? bubble.querySelector('.speech-text') : null;
  const messages = [
    "14 Intent Mandates enforced · Watching all agent actions",
    "Cryptographic audit log verified · 0 unauthorized breaches",
    "Active Enclave Guard: Real-time autonomous oversight",
    "Flight 6E-2412 breach isolated · Dispute recourse ready",
    "Tracking cursor with precision optical gaze sensor"
  ];
  let msgIdx = 0;

  const onMascotClick = () => {
    if (bubble && speechText) {
      msgIdx = (msgIdx + 1) % messages.length;
      speechText.textContent = messages[msgIdx];
      bubble.classList.add('visible');
      clearTimeout(bubble._timer);
      bubble._timer = setTimeout(() => {
        bubble.classList.remove('visible');
      }, 3500);
    }
    if (typeof window.showToast === 'function') {
      window.showToast("Sentinel Guardian: Optical scan verified 14 active mandates");
    }
  };
  container.addEventListener('click', onMascotClick);

  /* ---------------- Render loop (paused when hidden) ---------------- */
  let raf = 0, last = 0, running = false, visible = true;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt, now);
    renderer.render(scene, camera);
  }
  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    visible ? start() : stop();
  }, { threshold: 0.01 });
  io.observe(container);

  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  // Recheck layout when window changes or tabs switch
  window.addEventListener('resize', resize, { passive: true });

  start();

  /* ---------------- Cleanup ---------------- */
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('pointerdown', onPointer);
    window.removeEventListener('touchstart', onTouch);
    window.removeEventListener('touchmove', onTouch);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('blur', onLeave);
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('resize', resize);
    container.removeEventListener('click', onMascotClick);
    mq.removeEventListener('change', onMq);

    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const list = Array.isArray(o.material) ? o.material : [o.material];
        list.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
      }
    });
    envTex.dispose();
    blobTex.dispose();
    renderer.dispose();
    canvas.remove();
  }
  window.addEventListener('pagehide', dispose, { once: true });

  return { dispose, resize };
}

/* Auto-mount when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('robot-stage');
    if (stage) {
      window.AgentRecourseRobot = mountRobot(stage);
    }
  });
} else {
  const stage = document.getElementById('robot-stage');
  if (stage) {
    window.AgentRecourseRobot = mountRobot(stage);
  }
}
