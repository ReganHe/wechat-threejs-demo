import {
  registerGLTFLoader
} from '../../loaders/gltf-loader'

export function renderModel(canvas, THREE) {
  registerGLTFLoader(THREE)

  var container, stats, clock, gui, mixer, actions, activeAction, previousAction;
  var camera, scene, renderer, model, face;
  var api = {
    state: 'Walking'
  };
  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height, 100, 10000);
    camera.position.set(90, 180, 380);
    camera.lookAt(new THREE.Vector3(100, -50, 0));
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    // lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    scene.add(light);
    // model
    var loader = new THREE.GLTFLoader();
    var modelUrl = 'models/dlam.glb';
    loader.load(modelUrl, function (gltf) {
      model = gltf.scene;
      scene.add(model);
      createGUI(model, gltf.animations);
    }, undefined, function (e) {
      console.error(e);
    });
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    /// 设置背景透明
    renderer.setClearAlpha(0);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
  }

  function createGUI(model, animations) {
    mixer = new THREE.AnimationMixer(model);
    actions = {};
    for (var i = 0; i < animations.length; i++) {
      var clip = animations[i];
      var action = mixer.clipAction(clip);
      actions[clip.name] = action;
    }

    activeAction = actions['animation_0'];
    if (activeAction) {
      activeAction.play();
    }
  }

  function fadeToAction(name, duration) {
    previousAction = activeAction;
    activeAction = actions[name];
    if (previousAction !== activeAction) {
      previousAction.fadeOut(duration);
    }
    activeAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play();
  }

  function animate() {
    var dt = clock.getDelta();
    if (mixer) mixer.update(dt);
    canvas.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
}