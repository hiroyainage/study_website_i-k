const section = document.querySelector("section.flag")

//シーン・カメラ
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000 )
//レンダラー
var renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: true
})
renderer.setSize(section.clientWidth, section.clientHeight)
renderer.setClearColor(0x000000, 0)

section.appendChild( renderer.domElement )

const loader = new THREE.TextureLoader()
//ジオメトリー・マテリアル
var geometry = new THREE.PlaneGeometry(5, 3, 50, 30)//幅高さ
var material = new THREE.MeshBasicMaterial({ 
  opacity: 0,
  transparent: true,
  map: loader.load("./img/flag.png", () => { 
    material.opacity = 1 
  }),
//   wireframe: true,
// 	color: 0x2727e6
})

//flagオブジェクトメッシュ作成
var flag = new THREE.Mesh( geometry, material )
flag.rotation.set(-0.1, 0, 0)
//シーン追加
scene.add(flag)
//カメラポジション
camera.position.z = 3

//Clock・アニメーション
const clock = new THREE.Clock()

function animate() {
  const time = clock.getElapsedTime()
  
  flag.geometry.vertices.map(v => {    
    const multipler = ((v.x + 2.5) / 5)
    //Wave関数
    const wave1 = 0.5 * Math.sin(0.5 * v.x + time * 2)
    const wave2 = 0.2 * Math.sin(2 * v.x + time * 3)
    
    v.z = (wave1 + wave2) * multipler
  })
  
  flag.geometry.verticesNeedUpdate = true 
  
	requestAnimationFrame( animate )
	renderer.render( scene, camera )
}

animate()

window.addEventListener("resize", function () {
  camera.aspect = section.clientWidth / section.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(section.clientWidth, section.clientHeight)
})