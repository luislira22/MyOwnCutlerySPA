import React, { useState, useEffect, useRef } from 'react';
import { ButtonToolbar, Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import * as THREE from 'three';
import metal_texture from '../img/metal_floor_texture_2.jpg'
import productionline_glb from './objects/ProductionLine.gltf'
import machine_glb from './objects/MachineDesign.gltf'
import product_glb from './objects/Product.gltf'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CustomDragControls } from './customControls/CustomDragControls'
import machineThumbnail from '../img/machineThumbnail.jpg';
import productionLineThumbnail from '../img/productionLineThumbnail.jpg';
import selectSound from './objects/select.wav'


const SceneManager = props => {
    //Scene Global Variables
    const [show, setShow] = useState(false);
    const mount = useRef(null)
    const [sliderX, setSliderX] = useState(0);
    const [sliderZ, setSliderZ] = useState(0);
    const [sliderRotY, setSliderRotY] = useState(0);
    const [selectedObj, setSelectedObj] = useState(false);
    const [minSliderX, setMinSliderX] = useState(0);
    const [maxSliderX, setMaxSliderX] = useState(0);
    const [minSliderZ, setMinSliderZ] = useState(0);
    const [maxSliderZ, setMaxSliderZ] = useState(0);
    const [minSliderRotY, setMinSliderRotY] = useState(0);
    const [maxSliderRotY, setMaxSliderRotY] = useState(0);
    const [stepZ, setStepZ] = useState(0);
    const [stepRotY, setStepRotY] = useState(0);
    const [sceneCreated, setSceneCreated] = useState(false);
    const collidersRef = useRef([]);
    let raycaster;
    const intersectedRef = useRef()
    let scene, renderer, width, height;
    let frameId, delta;
    const cameraRef = useRef();
    const orbControlsRef = useRef(null);
    const dragControlsRef = useRef(null);
    const sceneRef = useRef();
    const rendererRef = useRef();
    //const parentMeshesRef 
    //3D Objects Global Variables
    let productionLineMesh, machineMesh, productMesh, plAnim, machAnim, productAnim;
    const lineMeshRef = useRef();
    const lineAnimRef = useRef();
    const machineMeshRef = useRef();
    const machAnimRef = useRef();
    const productMeshRef = useRef();
    const productAnimRef = useRef();
    const soundRef = useRef();
    let machineHighlight, meshPlane;
    let mixers = [];
    const mixersRef = useRef(mixers);
    let clock = new THREE.Clock();
    let meshes = []; //for raycast detection
    let parentMeshes = []; //for drag n drop
    const parentMeshRef = useRef(parentMeshes);
    const meshesRef = useRef(meshes);
    //DATA
    let productionLines = props.productionLines;
    let machines = props.machines;
    let machineTypes = props.machineTypes;
    let operations = props.operations;

    useEffect(() => {
        width = mount.current.clientWidth;
        height = mount.current.clientHeight;

        scene = new THREE.Scene()
        sceneRef.current = scene;
        raycaster = new THREE.Raycaster();
        scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 200)
        renderer = new THREE.WebGLRenderer({ antialias: true })
        rendererRef.current = renderer;
        camera.position.z = 10;
        camera.position.y = 10;

        cameraRef.current = camera;
        //ADD FLOOR
        const texture = new THREE.TextureLoader().load(metal_texture);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50);
        texture.anisotropy = 16;
        const geometryPlane = new THREE.PlaneBufferGeometry(40, 100, 1);

        var materialColor = new THREE.Color();
        materialColor.setRGB(1.0, 1.0, 1.0);
        const materialFloorTexture = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
        meshPlane = new THREE.Mesh(geometryPlane, materialFloorTexture);
        meshPlane.name = "metalfloor";

        meshPlane.rotateX(Math.PI / 2);
        meshPlane.translateY(-30);
        meshPlane.receiveShadow = true;
        meshPlane.castShadow = true;
        scene.add(meshPlane);

        //ADD WALLS
        const wall = new THREE.PlaneBufferGeometry(40, 10, 1);
        const sidewall = new THREE.PlaneBufferGeometry(100, 10, 1);
        let meshWall = new THREE.Mesh(wall, materialFloorTexture);
        meshWall.translateZ(-80);
        meshWall.translateY(5);
        meshWall.geometry.computeBoundingBox();
        scene.add(meshWall);
        let meshWall2 = new THREE.Mesh(sidewall, materialFloorTexture);
        meshWall2.rotateY(Math.PI / 2);
        meshWall2.translateZ(20);
        meshWall2.translateY(5);
        meshWall2.translateX(30);
        meshWall2.geometry.computeBoundingBox();
        scene.add(meshWall2);
        let meshWall3 = new THREE.Mesh(sidewall, materialFloorTexture);
        meshWall3.rotateY(Math.PI / 2);
        meshWall3.translateZ(-20);
        meshWall3.translateY(5);
        meshWall3.translateX(30);
        meshWall3.geometry.computeBoundingBox();
        scene.add(meshWall3);
        let meshWall4 = new THREE.Mesh(wall, materialFloorTexture);
        meshWall4.translateZ(20);
        meshWall4.translateY(5);
        meshWall4.geometry.computeBoundingBox();
        scene.add(meshWall4);

        //ADD LIGHTS
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 10, 0);
        scene.add(hemiLight);
        let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 1);
        //scene.add(hemiLightHelper);
        let dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1, 1);
        dirLight.position.multiplyScalar(30);
        scene.add(dirLight);
        //camera.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        var d = 50;
        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;
        let dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 1);
        //scene.add(dirLightHeper);

        const orbControls = new OrbitControls(camera, renderer.domElement);

        //Event Listener
        orbControls.addEventListener('change', () => renderer.render(scene, cameraRef.current));
        orbControlsRef.current = orbControls;
        window.addEventListener('mousedown', onMouseDown, false);
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener('resize', onWindowResize, false);

        //AUDIO
        var listener = new THREE.AudioListener();
        camera.add(listener);

        // create a global audio source
        var sound = new THREE.Audio(listener);
        soundRef.current = sound;

        // load a sound and set it as the Audio object's buffer
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load(selectSound, function (buffer) {
            sound.setBuffer(buffer);
            sound.setVolume(0.5);
        });

        /*
        window.addEventListener('webkitfullscreenchange', exitFsHandler, false);
        window.addEventListener('mozfullscreenchange', exitFsHandler, false);
        window.addEventListener('fullscreenchange', exitFsHandler, false);
        window.addEventListener('MSFullscreenChange', exitFsHandler, false);

*/

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.setSize(width, height)

        mount.current.appendChild(renderer.domElement)
        loadObjProductionLine();

        var walls = [meshWall, meshWall2, meshWall3, meshWall4]
        collidersRef.current = [].concat(collidersRef.current, walls);
        console.log(collidersRef.current);
        const dragControls = new CustomDragControls(cameraRef.current, renderer.domElement, meshPlane, collidersRef.current, sceneRef.current);

        dragControls.addEventListener('dragstart', function () { orbControls.enabled = false; });
        dragControls.addEventListener('dragend', function () { orbControls.enabled = true; });

        dragControlsRef.current = dragControls;

        start()

        return () => {
            stop()
            orbControls.removeEventListener('change', () => renderer.render(scene, camera));
            window.removeEventListener('mouseDown', onMouseDown, false);
            window.removeEventListener("keydown", keyDown, false);
            window.removeEventListener('resize', onWindowResize, false);
            /*
            window.removeEventListener('webkitfullscreenchange', exitFsHandler, false);
            window.removeEventListener('mozfullscreenchange', exitFsHandler, false);
            window.removeEventListener('fullscreenchange', exitFsHandler, false);
            window.removeEventListener('MSFullscreenChange', exitFsHandler, false);*/

            mount.current.removeChild(renderer.domElement)

            scene.remove()
        }

    }, [])

    const deleteLines = () => {
        parentMeshRef.current.forEach(line => {
            disposeItGood(line);
            sceneRef.current.remove(line);
            console.log("Apagou");
            collidersRef.current.pop();
        })

        parentMeshRef.current = [];
        meshesRef.current = []
        mixersRef.current = []
        rendererRef.current.renderLists.dispose()

        console.log("Deleted all lines")
    }

    //recursive dispose objects without memory leak
    const disposeItGood = (object) => {
        if (object.material) {
            if (object.material.map) {
                object.material.map.dispose();
            }
            object.material.dispose();
        }
        if (object.geometry) {
            object.geometry.dispose();
        }

        object.children.forEach(child => {
            disposeItGood(child)
        })
    }

    useEffect(() => {
        if (props.newData && sceneCreated) {
            deleteLines();
            console.log("Add new lines");
            createFromData();
        }
    }, [props.newData])

    useEffect(() => {
        if (selectedObj) {
            if (selectedObj.name.includes("Linha"))
                dragControlsRef.current.setSelected(selectedObj);
        }
    }, [selectedObj])

    const refreshFactory = () => {
        console.log("Start refresh");
        props.setRefresh(true);
    }

    const start = () => {
        if (!frameId) {
            frameId = requestAnimationFrame(animate)
        }
    }

    const stop = () => {
        cancelAnimationFrame(frameId)
        frameId = null
    }

    const renderScene = () => {
        renderer.render(sceneRef.current, cameraRef.current)
    }

    const animate = () => {

        moving();

        renderScene()
        frameId = window.requestAnimationFrame(animate)
    }

    const moving = () => {
        delta = clock.getDelta();
        for (var i = 0; i < mixersRef.current.length; i++) {
            mixersRef.current[i].update(delta);
        }
    }

    const highlight = (unkownChild, light) => {

        var parent = unkownChild.parent.parent;

        setSelectedObj(parent);
        updateSliders(parent);
        if (light) {
            soundRef.current.play();
            recursiveHighlight(parent, "0x00005f");
        } else {
            recursiveHighlight(parent, "0x000000")
        }
    }

    const recursiveHighlight = (object, hex) => {
        if (object.material) {
            if (object.material.emissive) {
                object.material.emissive.setHex(hex);
            }
        }

        object.children.forEach(child => {
            recursiveHighlight(child, hex);
        })
    }

    const updateSliders = (object) => {

        if (object.name.includes("Linha")) {
            setMinSliderX(-18);
            setMaxSliderX(18);
            setMinSliderZ(-77);
            setMaxSliderZ(15);
            setStepZ(1);
            setMinSliderRotY(0);
            setMaxSliderRotY(Math.round(Math.PI * 150) / 100); //3 voltas arredondado a 2 casas
            setStepRotY(Math.round((Math.PI / 2) * 100) / 100);
        } else if (object.name.includes("Machine")) {
            setMinSliderX(-10);
            setMaxSliderX(9);
            if (object.rotation.y == 0) {
                setMinSliderZ(2.4);
                setMaxSliderZ(3.5);
            } else {
                setMinSliderZ(-3.6);
                setMaxSliderZ(-2.5);
            }
            setStepZ(0.1);
            setMinSliderRotY(0);
            setMaxSliderRotY(Math.PI);
            setStepRotY(Math.PI);
        }

        setSliderX(object.position.x);
        setSliderZ(object.position.z);
        setSliderRotY(object.rotation.y);
    }

    const onMouseDown = (event) => {
        if (event.target.tagName == "CANVAS") {
            event.preventDefault();
            var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                0.5);

            raycaster.setFromCamera(mouse3D, cameraRef.current);
            var intersects = raycaster.intersectObjects(meshesRef.current);

            if (intersects.length > 0) {

                if (intersectedRef.current != intersects[0].object) {
                    if (intersectedRef.current) { highlight(intersectedRef.current, false); }
                    intersectedRef.current = intersects[0].object;
                    highlight(intersectedRef.current, true);
                    setShow(!show);
                }

            } else {
                if (intersectedRef.current) {
                    setShow(false);
                    highlight(intersectedRef.current, false);
                    intersectedRef.current = null;
                    setSelectedObj(null);
                }
            }
        }
    }

    const loadObjProductionLine = () => {
        var promises = [];

        promises.push(new Promise(function (resolve, reject) {

            new GLTFLoader().load(productionline_glb,
                function (gltf) {
                    productionLineMesh = gltf.scene;
                    productionLineMesh.castShadow = true;
                    productionLineMesh.receiveShadow = true;
                    //plAnim = gltf.animations;
                    lineAnimRef.current = gltf.animations;

                    /*
                    var material = new MeshBasicMaterial();
                    material.transparent = true;
                    material.opacity = 0.3;
                    linesHighlight = productionLineMesh.clone();
                    linesHighlight.children[0].visible = false;
                    linesHighlight.children.forEach(child => {
                        child.children.forEach(childchild => {
                            childchild.material = material;
                        })
                    });
                    linesHighlight.visible = false;
                    scene.add(linesHighlight);
                    */

                    resolve(productionLineMesh);
                }
            )
        }
        ))

        promises.push(new Promise(function (resolve, reject) {

            new GLTFLoader().load(machine_glb,
                function (gltf) {
                    machineMesh = gltf.scene;
                    machineMesh.castShadow = true;
                    machineMesh.receiveShadow = true;
                    //machAnim = gltf.animations;
                    machAnimRef.current = gltf.animations;
                    /* White Transparent Machine
                    var material = new THREE.MeshBasicMaterial();
                    material.transparent = true;
                    material.opacity = 0.3;
                    machineHighlight = machineMesh.clone();

                    machineHighlight.children.forEach(child => {
                        child.children.forEach(childchild => {
                            childchild.material = material;
                        })
                    });

                    const machineData = {
                        img: machineThumbnail,
                        title: "New Machine",
                        description: "",
                    };
                    machineHighlight.userData = machineData;
                    machineHighlight.visible = false;
                    machineHighlight.translateZ(2.5);
                    */
                    resolve(machineMesh);
                }
            )
        }
        ))

        promises.push(new Promise(function (resolve, reject) {

            new GLTFLoader().load(product_glb,
                function (gltf) {
                    productMesh = gltf.scene;
                    productMesh.castShadow = true;
                    productMesh.receiveShadow = true;
                    //productAnim = gltf.animations;
                    productAnimRef.current = gltf.animations;
                    resolve(productMesh);
                }
            )
        }
        ))

        Promise.all(promises)
            .then(function (array) {
                lineMeshRef.current = array[0];
                machineMeshRef.current = array[1];
                productMeshRef.current = array[2];
                setSceneCreated(true);
                createFromData();
            }, function (error) {
                console.error("Could not load all 3D objects:", error);
            });

    }

    const createFromData = () => {
        var i = 0;
        for (var key in productionLines) {
            createProductionLine(productionLines[key], i);
            i++;
        }
        //dragControlsRef.current.updateColliders(collidersRef.current);
        console.log(collidersRef.current);
        props.setNewData(false);
    }

    const createProductionLine = (line, i) => {
        var lineOffset = i * -8;
        var mesh = lineMeshRef.current.clone();
        mesh.name = "Linha";
        const lineData = {
            img: productionLineThumbnail,
            id: line.id,
            title: line.description,
            description: line.machines.length + " Machines",
            title2: "Machines",
            list: [],
        }
        mesh.userData = lineData;
        mesh.children.forEach(child => {
            child.children.forEach(childchild => {
                childchild.material = childchild.material.clone();
                childchild.castShadow = true;
                childchild.receiveShadow = true;
                meshesRef.current.push(childchild);
            })
        });
        //mesh.translateZ(lineOffset);
        //
        //
        sceneRef.current.add(mesh);

        var mixer = new THREE.AnimationMixer(mesh);
        var clip1 = lineAnimRef.current[0];
        var action1 = mixer.clipAction(clip1);
        action1.clampWhenFinished = true;
        mixersRef.current.push(mixer);
        action1.play();

        //Product
        var mesh2 = productMeshRef.current.clone();
        mesh2.children.forEach(child => {
            child.material = child.material.clone();
            child.castShadow = true;
            child.receiveShadow = true;
        });
        mesh.add(mesh2);
        var mixer2 = new THREE.AnimationMixer(mesh2);
        var clip2 = productAnimRef.current[0];
        var action2 = mixer2.clipAction(clip2);
        action2.clampWhenFinished = true;
        //mixers.push(mixer2);
        mixersRef.current.push(mixer2);
        parentMeshRef.current.push(mesh);
        action2.play();

        var i = 0;
        for (var key in line.machines) {
            const machine = createMachine(line.machines[key], i);
            mesh.add(machine);
            mesh.userData.list.push(machine.userData.title);
            i -= 3;
        }
        //var box = new THREE.BoxHelper(mesh, 0xffff00);
        //mesh.add(box);
        mesh.position.z += lineOffset;
        collidersRef.current.push(mesh);
    }

    const createMachine = (machineId, machineOffSet) => {
        var mesh = machineMeshRef.current.clone();
        mesh.name = "Machine";

        const machine = machines.find(function (machine) {
            if (machine.id === machineId) {
                return machine;
            }
        })

        const machineType = machineTypes.find(function (machineType) {
            if (machineType.id === machine.machineType) {
                return machineType;
            }
        })

        var machineOperations = [];
        machineType.operations.forEach(operationId => {
            operations.find(function (element) {
                if (element.id === operationId) {
                    machineOperations.push(element.description + " - " + element.tool + " - " + element.duration);
                }
            })
        })

        const machineData = {
            img: machineThumbnail,
            id: machine.id,
            title: machine.machineBrand + " " + machine.machineModel,
            description: machineType.type,
            title2: "Operations",
            list: machineOperations,
        };

        mesh.userData = machineData;
        mesh.children.forEach(child => {
            child.children.forEach(childchild => {
                childchild.material = childchild.material.clone();
                childchild.castShadow = true;
                childchild.receiveShadow = true;
                meshesRef.current.push(childchild);
            })
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.translateZ(2.5);
        mesh.translateX(-10 - machineOffSet);
        var mixer = new THREE.AnimationMixer(mesh);
        var clip1 = machAnimRef.current[0];
        var clip2 = machAnimRef.current[1];
        var action1 = mixer.clipAction(clip1);
        action1.clampWhenFinished = true;
        var action2 = mixer.clipAction(clip2);
        action2.clampWhenFinished = true;
        mixersRef.current.push(mixer);
        action1.play();
        action2.play();
        return mesh;
    }

    const keyDown = (event) => {
        if (event.code == "KeyF") {
            openFullscreen();
        }
    }

    const onWindowResize = () => {
        width = mount.current.clientWidth;
        height = mount.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    const openFullscreen = () => {
        var elem = mount.current;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        elem.style.width = '100%';
        elem.style.height = '100%';
    }

    const handleSliderX = (event) => {
        var x = +event.target.value;
        selectedObj.position.x = x;
        updateSliders(selectedObj);
    }

    const handleSliderZ = (event) => {
        var z = +event.target.value;
        selectedObj.position.z = z;
        updateSliders(selectedObj);
    }

    const handleRotationY = (event) => {
        var y = +event.target.value;
        if (selectedObj.name.includes("Machine") && selectedObj.rotation.y != 0) {
            selectedObj.position.z = 2.5;
        } else if (selectedObj.name.includes("Machine") && selectedObj.rotation.y == 0) {
            selectedObj.position.z = -2.5;
        }
        selectedObj.rotation.y = y;
        updateSliders(selectedObj);
    }

    const changeView = (event) => {

        switch (event) {
            case "front":
                cameraRef.current.position.set(0, 5, -80);
                break;
            case "back":
                cameraRef.current.position.set(0, 5, 20);
                break;
            case "up":
                cameraRef.current.position.set(0, 60, -30);
                orbControlsRef.current.target.set(0.01, 0, -30);
                break;
            case "side":
                cameraRef.current.position.set(20, 25, -30);
                orbControlsRef.current.target.set(0.01, 0, -30);
                break;
            case "close":
                if (selectedObj) {
                    const objPos = selectedObj.position;
                    cameraRef.current.position.set(objPos.x + 4.5, objPos.y + 5, objPos.z + 4.5);
                    orbControlsRef.current.target.set(objPos.x, objPos.y + 3, objPos.z);
                } else {
                    cameraRef.current.position.set(9, 7.7, 5.2);
                    orbControlsRef.current.target.set(0, 0, -20);
                }
                break;
        }
        orbControlsRef.current.update();
    }

    return (
        <>
            <div className="visual" ref={mount}>
                <div className="uiview">
                    <DropdownButton variant="dark" title="Camera View">
                        <Dropdown.Item onSelect={changeView} eventKey="front">Front</Dropdown.Item>
                        <Dropdown.Item onSelect={changeView} eventKey="back">Back</Dropdown.Item>
                        <Dropdown.Item onSelect={changeView} eventKey="up">Up</Dropdown.Item>
                        <Dropdown.Item onSelect={changeView} eventKey="side">Side</Dropdown.Item>
                        <Dropdown.Item onSelect={changeView} eventKey="close">Close Up</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="ui1">
                    <ButtonToolbar>
                        <Button onClick={refreshFactory} variant="dark">Refresh</Button>
                    </ButtonToolbar>
                </div>
                <div className="ui2">
                    {show ?
                        <Card className="overlay">
                            <Card.Img variant="top" src={selectedObj.userData.img} />
                            <Card.Body>
                                <Card.Title>{selectedObj.userData.title}</Card.Title>
                                <Card.Text>
                                    {selectedObj.userData.description}
                                </Card.Text>
                                <div className="extra">
                                    <Card.Title>{selectedObj.userData.title2}</Card.Title>
                                    {selectedObj.userData.list.map(function (elem, i) {
                                        return <Card.Text key={i}>{elem}</Card.Text>
                                    }
                                    )}
                                    {selectedObj.name.includes("Linha") ?
                                        <ButtonToolbar>
                                            <Button variant="outline-dark" onClick={(e) => props.showCreate(e, selectedObj.userData.id)}>Add New Machine</Button>
                                        </ButtonToolbar>
                                        :
                                        <>
                                        <Card.Title>Translations</Card.Title>
                                        <input type="range" min={minSliderX} max={maxSliderX} value={sliderX} onChange={handleSliderX} className="slider" />
                                        <input type="range" step={stepZ} min={minSliderZ} max={maxSliderZ} value={sliderZ} onChange={handleSliderZ} className="slider" />
                                        <input type="range" step={stepRotY} min={minSliderRotY} max={maxSliderRotY} value={sliderRotY} onChange={handleRotationY} className="slider" />
                                        </>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                        : (<></>)}
                </div>
            </div>
        </>
    )
}
/*u1

*/
export default SceneManager
