"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TunnelSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Math utils
    const Mathutils = {
      normalize: ($value, $min, $max) => ($value - $min) / ($max - $min),
      interpolate: ($normValue, $min, $max) =>
        $min + ($max - $min) * $normValue,
      map: function ($value, $min1, $max1, $min2, $max2) {
        if ($value < $min1) $value = $min1;
        if ($value > $max1) $value = $max1;
        return this.interpolate(
          this.normalize($value, $min1, $max1),
          $min2,
          $max2
        );
      },
    };

    let ww = window.innerWidth,
      wh = window.innerHeight;

    let composer;
    const params = {
      exposure: 1.3,
      bloomStrength: 0.9,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      shadowMapEnabled: true,
      shadowMapType: THREE.PCFSoftShadowMap,
    });
    renderer.setSize(ww, wh);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x194794, 0, 100);

    let cameraRotationProxyX = 3.14159;
    let cameraRotationProxyY = 0;

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.rotation.y = cameraRotationProxyX;
    camera.rotation.z = cameraRotationProxyY;

    const c = new THREE.Group();
    c.position.z = 400;
    c.add(camera);
    scene.add(c);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    let points = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
    ];

    for (let i = 0; i < points.length; i++) {
      let x = points[i][0];
      let y = points[i][2];
      let z = points[i][1];
      points[i] = new THREE.Vector3(x, y, z);
    }

    const path = new THREE.CatmullRomCurve3(points);
    path.tension = 0.5;

    const geometry = new THREE.TubeGeometry(path, 300, 4, 32, false);
    const texture = new THREE.TextureLoader().load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(15, 2);
      }
    );

    const mapHeight = new THREE.TextureLoader().load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(15, 2);
      }
    );

    const material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: mapHeight,
      bumpScale: -0.03,
      specular: 0x0b2349,
    });

    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);

    // Wireframe inner tube
    const geometry2 = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const geo = new THREE.EdgesGeometry(geometry2);
    const mat = new THREE.LineBasicMaterial({
      linewidth: 2,
      opacity: 0.2,
      transparent: true,
    });
    const wireframe = new THREE.LineSegments(geo, mat);
    scene.add(wireframe);

    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0);
    scene.add(light);

    let p1, p2;
    function updateCameraPercentage(percentage) {
      p1 = path.getPointAt(percentage);
      p2 = path.getPointAt(percentage + 0.03);
      c.position.set(p1.x, p1.y, p1.z);
      c.lookAt(p2);
      light.position.set(p2.x, p2.y, p2.z);
    }

    let cameraTargetPercentage = 0;
    let currentCameraPercentage = 0;

    const tubePerc = { percent: 0 };

    gsap.timeline({
      scrollTrigger: {
        trigger: ".scrollTarget",
        start: "top top",
        end: "bottom 100%",
        scrub: 5,
      },
    }).to(tubePerc, {
      percent: 0.96,
      ease: "none",
      duration: 10,
      onUpdate: () => {
        cameraTargetPercentage = tubePerc.percent;
      },
    });

    // Particles
    const spikeyTexture = new THREE.TextureLoader().load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png"
    );

    const particleCount = 6800;
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: spikeyTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particles1 = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: particleCount }, () =>
        new THREE.Vector3(
          Math.random() * 500 - 250,
          Math.random() * 50 - 25,
          Math.random() * 500 - 250
        )
      )
    );

    const particleSystem1 = new THREE.Points(particles1, pMaterial);
    scene.add(particleSystem1);

    function render() {
      currentCameraPercentage = cameraTargetPercentage;
      camera.rotation.y += (cameraRotationProxyX - camera.rotation.y) / 15;
      camera.rotation.x += (cameraRotationProxyY - camera.rotation.x) / 15;
      updateCameraPercentage(currentCameraPercentage);
      particleSystem1.rotation.y += 0.00002;
      composer.render();
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    window.addEventListener("mousemove", (evt) => {
      cameraRotationProxyX = Mathutils.map(
        evt.clientX,
        0,
        window.innerWidth,
        3.24,
        3.04
      );
    
      cameraRotationProxyY = Mathutils.map(
        evt.clientY,
        0,
        window.innerHeight,
        -0.1,
        0.1
      );
    });

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    });
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh" }}>
      <canvas ref={canvasRef} className="experience"></canvas>
      <div className="scrollTarget" style={{ height: "1000vh" }}></div>
      <div className="vignette-radial"></div>
    </section>
  );
}
