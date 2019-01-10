export default class ThreeDeeRenderer {

  constructor() {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
    this.render()
  }


  addGeometry(canvas){
    const texture = canvas ? new THREE.CanvasTexture(canvas) : undefined;
    const geometry = new THREE.PlaneGeometry( 100, 100, 100 );
    const material = new THREE.MeshBasicMaterial( { 
      color: 0xffffff,
      map: texture,
      transparent: true
    } );
    const mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    // this.render()
    return mesh
  }

  render(){
    this.renderer.render( this.scene, this.camera );
  }

}