import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls';
import { EffectComposer} from 'EffectComposer';
import { RenderPass} from 'RenderPass';
import { UnrealBloomPass} from 'UnrealBloomPass';

//scene, camera, renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

window.addEventListener('resize', handleResize);

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setClearColor(0x222222);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

document.body.appendChild(renderer.domElement)

scene.background = new THREE.Color(0x000000)
scene.fog = new THREE.Fog(0x000000, 8, 180) //숫자가 작을수록 뿌옇고 넓음 //위치,정도?


const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;
controls.rotateSpeed = 0.75; //OrbitControls로 회전시킬 때 속도 
controls.enableDamping = true;
// controls.enableZoom = false; //zoom in-out 불가 

//card min, max 회전값설정 ( OrbitControls 수직방향)
// controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
// controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

controls.minDistance = 2;
controls.maxDistance = 80;


const composer = new EffectComposer(renderer);
const renderScene = new RenderPass(scene, camera);
composer.addPass(renderScene);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.1;
bloomPass.radius = 1;
bloomPass.strength = 1;
composer.addPass(bloomPass);

//gltf loader 

let gltfmodel;
let gltfmodel2;
let gltfmodel3;
let gltfmodel4;
let gltfmodel5;
let gltfmodel6;
let gltfmodel7;
let gltfmodel8;
let gltfmodel9;
let gltfmodel10;
let gltfmodel11;
let gltfmodel12;
let gltfmodel13;
let gltfmodel14;
let gltfmodel15;
let gltfmodel16;
let gltfmodel17;
let gltfmodel18;
let gltfmodel19;
let gltfmodel20;

let loader = new GLTFLoader();

//sound play 
const listener = new THREE.AudioListener();
camera.add(listener);

window.addEventListener('click', () => {
  // AudioContext 시작 코드
  const audioContext = new AudioContext();

  // Three.js 오디오 로드 및 재생
  const audioLoader = new THREE.AudioLoader();
  const sound = new THREE.PositionalAudio(listener); // listener는 이미 정의되어 있어야 합니다.

  audioLoader.load('./assets/sound/mysound.mp3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.play();
  });
});




//2층 쓰레기 
loader.load('./models/mygltf/building2.gltf', function (gltf) {
  gltfmodel = gltf.scene;
  gltfmodel.scale.set(600, 600, 600);
  gltfmodel.position.set(0, -4, 0)
  gltfmodel.rotation.z = 0.2;
  gltfmodel.castShadow = true;
  gltfmodel.receiveShadow = true;
  scene.add(gltfmodel);
  // gltfmodel.traverse(function (node) {
  //   if (node.isMesh || node.isLight) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //     node.mapping = THREE.EquirectangularRefractionMapping;
  //   }
  // })


  let pts = [];
  let v3 = new THREE.Vector3();
  gltfmodel.traverse(child => {
      if (child.isMesh) {
          let pos = child.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
              v3.fromBufferAttribute(pos, i);

              // Add some randomness to the particle positions
              v3.x += Math.random() * 150;
              v3.y += Math.random() * 150;
              v3.z += Math.random() * 150;

              pts.push(v3.clone());
          }
      }
  });

  let g = new THREE.BufferGeometry().setFromPoints(pts);
  g.center();

  // Increase the size of the particles
  let m = new THREE.PointsMaterial({ color: "orange", size: 0.2});

  let p = new THREE.Points(g, m);
  scene.add(p);
}, undefined, function (error) {
  console.error(err)
})


//model2 오토바이
loader.load('./models/mygltf/bike.gltf', function (gltf) {
  gltfmodel2 = gltf.scene;
  gltfmodel2.scale.set(1900, 1900, 1900);
  gltfmodel2.position.set(-10, -1, 15)
  gltfmodel2.rotation.x += 0.8;
  gltfmodel2.castShadow = true;
  gltfmodel2.receiveShadow = true;
  scene.add(gltfmodel2);
  gltfmodel2.add(sounds)

  gltfmodel2.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
}, undefined, function (error) {
  console.error(err)
})

//3층 야채 
loader.load('./models/mygltf/vegetable.gltf', function (gltf) {
  gltfmodel3 = gltf.scene;
  gltfmodel3.scale.set(600, 600, 600);
  gltfmodel3.position.set(0, 8, 0)
  gltfmodel3.rotation.x += 0.05;
  gltfmodel3.castShadow = true;
  gltfmodel3.receiveShadow = true;
  scene.add(gltfmodel3);
  gltfmodel3.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/trash2.gltf', function (gltf) {
  gltfmodel4 = gltf.scene;
  gltfmodel4.scale.set(2500, 2500, 2500)
  gltfmodel4.position.set(-11, 0, -20)
  gltfmodel4.castShadow = true;
  gltfmodel4.receiveShadow = true;
  gltfmodel4.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel4);
}, undefined, function (error) {
  console.error(error)
})

//사람
loader.load('./models/mygltf/cass.gltf', function (gltf) {
  gltfmodel5 = gltf.scene;
  gltfmodel5.scale.set(1500, 1500, 1500);
  gltfmodel5.position.set(-10, -4, -10)
  gltfmodel5.castShadow = true;
  gltfmodel5.receiveShadow = true;

  gltfmodel5.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  });

  scene.add(gltfmodel5);
}, undefined, function (error) {
  console.error(err)
})

// let mX = 0
// let mY = 0;
// document.onmousemove = getMouseXY;
// function getMouseXY(e) {
//   mX = e.pageX;
//   mY = e.pageY;
//   gltfmodel5.position.x = mX*0.02;
//   gltfmodel5.position.y = mY*0.02;
//   }


loader.load('./models/mygltf/warehouse.gltf', function (gltf) {
  gltfmodel6 = gltf.scene;
  gltfmodel6.scale.set(3500, 3500, 3500);
  gltfmodel6.position.set(25, -48, 30)
  gltfmodel6.castShadow = true;
  gltfmodel6.receiveShadow = true;
  gltfmodel6.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel6);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/sign.gltf', function (gltf) {
  gltfmodel7 = gltf.scene;
  gltfmodel7.scale.set(3000, 3000, 3000);
  gltfmodel7.position.set(15, -10, -80)
  gltfmodel7.rotation.x = -0.2;
  gltfmodel7.castShadow = true;
  gltfmodel7.receiveShadow = true;
  gltfmodel7.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel7);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/ladder.gltf', function (gltf) {
  gltfmodel8 = gltf.scene;
  gltfmodel8.scale.set(3000, 3000, 3000);
  gltfmodel8.position.set(-15, -30, 80)
  gltfmodel8.rotation.x = -0.2;
  gltfmodel8.castShadow = true;
  gltfmodel8.receiveShadow = true;
  gltfmodel8.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel8);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/building1.gltf', function (gltf) {
  gltfmodel9 = gltf.scene;
  gltfmodel9.scale.set(3000, 3000, 3000);
  gltfmodel9.position.set(-20, 10, -20)
  gltfmodel9.castShadow = true;
  gltfmodel9.receiveShadow = true;
  gltfmodel9.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel9);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/bike2.gltf', function (gltf) {
  gltfmodel10 = gltf.scene;
  gltfmodel10.scale.set(2000, 2000, 2000);
  gltfmodel10.position.set(-25, -10, -20)
  gltfmodel10.rotation.x = -0.02;
  gltfmodel10.castShadow = true;
  gltfmodel10.receiveShadow = true;
  gltfmodel10.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel10);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/cart2.gltf', function (gltf) {
  gltfmodel11 = gltf.scene;
  gltfmodel11.scale.set(3000, 3000, 3000);
  gltfmodel11.position.set(25, -5, -30)
  gltfmodel11.rotation.x = -0.02;
  gltfmodel11.castShadow = true;
  gltfmodel11.receiveShadow = true;
  gltfmodel11.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel11);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/truck.gltf', function (gltf) {
  gltfmodel12 = gltf.scene;
  gltfmodel12.scale.set(1000, 1000, 1000);
  gltfmodel12.position.set(25, -15, -15)
  gltfmodel12.rotation.x = -0.02;
  gltfmodel12.castShadow = true;
  gltfmodel12.receiveShadow = true;
  gltfmodel12.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel12);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/sign2.gltf', function (gltf) {
  gltfmodel13 = gltf.scene;
  gltfmodel13.scale.set(4000, 4000, 4000);
  gltfmodel13.position.set(-25, -15, 55)
  gltfmodel13.castShadow = true;
  gltfmodel13.receiveShadow = true;
  gltfmodel13.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel13);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/truck2.gltf', function (gltf) {
  gltfmodel14 = gltf.scene;
  gltfmodel14.scale.set(2500, 2500, 2500);
  gltfmodel14.position.set(-50, -20, 0)
  gltfmodel14.castShadow = true;
  gltfmodel14.receiveShadow = true;
  gltfmodel14.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel14);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/box.gltf', function (gltf) {
  gltfmodel15 = gltf.scene;
  gltfmodel15.scale.set(10000, 10000, 10000);
  gltfmodel15.position.set(0, 0,40)
  gltfmodel15.castShadow = true;
  gltfmodel15.receiveShadow = true;
  gltfmodel15.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel15);
}, undefined, function (error) {
  console.error(err)
})


loader.load('./models/mygltf/cat.gltf', function (gltf) {
  gltfmodel16 = gltf.scene;
  gltfmodel16.scale.set(6000, 6000, 6000);
  gltfmodel16.position.set(70, 0, 50)
  gltfmodel16.castShadow = true;
  gltfmodel16.receiveShadow = true;
  gltfmodel16.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel16);
}, undefined, function (error) {
  console.error(err)
})


loader.load('./models/mygltf/cigar.gltf', function (gltf) {
  gltfmodel17 = gltf.scene;
  gltfmodel17.scale.set(1500, 1500, 1500);
  gltfmodel17.position.set(10, 0, 0)
  gltfmodel17.castShadow = true;
  gltfmodel17.receiveShadow = true;
  gltfmodel17.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel17);
}, undefined, function (error) {
  console.error(err)
})


// loader.load('./models/mygltf/jim.gltf', function (gltf) {
//   gltfmodel18 = gltf.scene;
//   gltfmodel18.scale.set(1000, 1000, 1000);
//   gltfmodel18.position.set(0, 0, 0)
//   gltfmodel18.castShadow = true;
//   gltfmodel18.receiveShadow = true;
//   gltfmodel18.traverse(function (node) {
//     if (node.isMesh || node.isLight) {
//       node.castShadow = true;
//       node.receiveShadow = true;
//       node.mapping = THREE.EquirectangularRefractionMapping;
//     }
//   })
//   scene.add(gltfmodel18);
// }, undefined, function (error) {
//   console.error(err)
// })


loader.load('./models/mygltf/jim2.gltf', function (gltf) {
  gltfmodel19 = gltf.scene;
  gltfmodel19.scale.set(2000, 2000, 2000);
  gltfmodel19.position.set(0, -20, 0)
  gltfmodel19.castShadow = true;
  gltfmodel19.receiveShadow = true;
  gltfmodel19.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel19);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/leaf.gltf', function (gltf) {
  gltfmodel20 = gltf.scene;
  gltfmodel20.scale.set(1700, 1700, 1700);
  gltfmodel20.position.set(10, 0, -10);
  gltfmodel20.castShadow = true;
  gltfmodel20.receiveShadow = true;
  gltfmodel20.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel20);
}, undefined, function (error) {
  console.error(err)
})


// loader.load('./models/mygltf/radish.gltf', function (gltf) {
//   gltfmodel21 = gltf.scene;
//   gltfmodel21.scale.set(100, 100, 100);
//   gltfmodel21.position.set(0, 0, 0)
//   gltfmodel21.castShadow = true;
//   gltfmodel21.receiveShadow = true;
//   gltfmodel21.traverse(function (node) {
//     if (node.isMesh || node.isLight) {
//       node.castShadow = true;
//       node.receiveShadow = true;
//       node.mapping = THREE.EquirectangularRefractionMapping;
//     }
//   })
//   scene.add(gltfmodel21);
// }, undefined, function (error) {
//   console.error(err)
// })


loader.load('./models/mygltf/sign3.gltf', function (gltf) {
  gltfmodel22 = gltf.scene;
  gltfmodel22.scale.set(1000, 1000, 1000);
  gltfmodel22.position.set(0, 0, 0)
  gltfmodel22.castShadow = true;
  gltfmodel22.receiveShadow = true;
  gltfmodel22.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel22);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/sign4.gltf', function (gltf) {
  gltfmodel23 = gltf.scene;
  gltfmodel23.scale.set(1000, 1000, 1000);
  gltfmodel23.position.set(0, 0, 0)
  gltfmodel23.castShadow = true;
  gltfmodel23.receiveShadow = true;
  gltfmodel23.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel23);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/trash.gltf', function (gltf) {
  gltfmodel24 = gltf.scene;
  gltfmodel24.scale.set(2000, 2000, 2000);
  gltfmodel24.position.set(0, 0, 0)
  gltfmodel24.castShadow = true;
  gltfmodel24.receiveShadow = true;
  gltfmodel24.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel24);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/umbrella.gltf', function (gltf) {
  gltfmodel26 = gltf.scene;
  gltfmodel26.scale.set(1000, 1000, 1000);
  gltfmodel26.position.set(0, 0, 0)
  gltfmodel26.castShadow = true;
  gltfmodel26.receiveShadow = true;
  gltfmodel26.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel26);
}, undefined, function (error) {
  console.error(err)
})

loader.load('./models/mygltf/jim3.gltf', function (gltf) {
  gltfmodel27 = gltf.scene;
  gltfmodel27.scale.set(5000, 5000, 5000);
  gltfmodel27.position.set(0, 0, 0)
  gltfmodel27.castShadow = true;
  gltfmodel27.receiveShadow = true;
  gltfmodel27.traverse(function (node) {
    if (node.isMesh || node.isLight) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.mapping = THREE.EquirectangularRefractionMapping;
    }
  })
  scene.add(gltfmodel27);
}, undefined, function (error) {
  console.error(err)
})

//Plane 바닥면 
// let material = new THREE.MeshPhongMaterial({
//   //envMap: texture,
//   // color: 0xff0000,
//   // flatShading: true,
// });

// let geometryP = new THREE.PlaneGeometry(1000, 1000, 10,10)
// let plane = new THREE.Mesh(geometryP, material);
// plane.rotation.x = -Math.PI/2;
// //plane.position.y = -3;
// plane.position.set(0,-5,0)
// plane.castShadow = true;
// plane.receiveShadow = true;
// scene.add(plane);

let light = new THREE.DirectionalLight(0xffffff, 20);
light.position.set(0, 100, 0);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
light.shadow.focus = 1;
light.shadow.bias = -0.001;
// const helper = new THREE.DirectionalLightHelper( light, 5 );
// scene.add( helper );
scene.add(light);


camera.position.z = 9;
camera.position.y = 7;

function gltfRotate() {
  //쓰레기
  if (gltfmodel) {
    const rotationSpeed = -0.009; // 회전 속도 (조절 가능)
    gltfmodel.rotation.y += rotationSpeed;
  }
  //오토바이
  if (gltfmodel2) {
    const rotationSpeed = 0.01; // 회전 속도 (조절 가능)
    gltfmodel2.rotation.y += -0.01;
    gltfmodel2.rotation.x += rotationSpeed;
  }

  if (gltfmodel3) {
    gltfmodel3.rotation.y += 0.002;
  }

  if (gltfmodel4) {
    gltfmodel4.rotation.y += 0.003;
    gltfmodel4.rotation.x += -0.004;
  }
  //사람
  if (gltfmodel5) {
    gltfmodel5.rotation.y += -0.02;
  }
  //warehouse
  if (gltfmodel6) {
    gltfmodel6.rotation.y += 0.002;
  }
   //sign
  if (gltfmodel7) {
    gltfmodel7.rotation.y += 0.02;
  }
  //ladde
  if (gltfmodel8) {
    gltfmodel8.rotation.y += 0.004;
  }
  if (gltfmodel9) {
    gltfmodel9.rotation.y += 0.003;
  }

  if (gltfmodel9) {
    gltfmodel9.rotation.y += 0.01;
  }
  //cart2
  if (gltfmodel11) {
    gltfmodel11.rotation.z += 0.02;
  }
  if (gltfmodel12) {
    gltfmodel12.rotation.y += 0.002;
  }
  if (gltfmodel13) {
    gltfmodel13.rotation.y += 0.02;
  }
  if (gltfmodel14) {
    gltfmodel14.rotation.y += -0.001;
  }
  if (gltfmodel15) {
    gltfmodel15.rotation.z += 0.01;
  }
  if (gltfmodel16) {
    gltfmodel16.rotation.y += -0.002;
  }
  if (gltfmodel17) {
    gltfmodel17.rotation.x += 0.02;
  }
  if (gltfmodel19) {
    gltfmodel19.rotation.y += -0.02;
  }
  if (gltfmodel20) {
    gltfmodel20.rotation.y += 0.02;
    gltfmodel20.rotation.x += 0.01;
  }
}



// create an object for the sound to play from
const sphere = new THREE.SphereGeometry(0.1, 100, 30);
const material2 = new THREE.MeshPhongMaterial({ color: 0xff2200 });
const mesh = new THREE.Mesh(sphere, material2);
mesh.position.set(0, 0, 0)
mesh.scale.set(0, 0, )
scene.add(mesh);



function handleResize() {
  //종횡비 조절
  camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix(); 이 code를 호출해야 정상적으로 송출됨 
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //재호출
  renderer.render(scene, camera);
  controls.update();
}


//mouseX, mouseY 활용

function animate() {
  controls.update();
  // Define the panning limits for the camera
  gltfRotate();
  composer.render();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate()

//bloompass render 하는 코드 
// renderer.setAnimationLoop(() => {
//   //renderer.render(scene, camera);
//   animate()
// });




