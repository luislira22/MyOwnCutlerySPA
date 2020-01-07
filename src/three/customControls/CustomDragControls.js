import {
	EventDispatcher,
	Matrix4,
	Plane,
	Raycaster,
	Vector2,
	Vector3,
	Box3,
	BoxHelper
} from "three";

var CustomDragControls = function (_camera, _domElement, _factoryFloor, _collidableMeshList, _scene) {

	var _raycaster = new Raycaster();
	var _selected = null, _hovered = null;
	var invalidPosition = false;
	var originPos = new Vector3;
	var originYRot = 0;

	var scope = this;

	function activate() {
		_domElement.addEventListener('mousemove', mouseMove, false);
		_domElement.addEventListener('mouseup', mouseCancel, false);
		_domElement.addEventListener('wheel', onMouseWheel, false);
	}

	function setSelected(obj) {
		_selected = obj;
		if (_selected) {
			originPos = _selected.position.clone();
			originYRot = _selected.rotation.y;
			mouseDown()
		}
	}

	function deactivate() {
		_domElement.removeEventListener('mousemove', mouseMove, false);
		_domElement.removeEventListener('mouseup', mouseCancel, false);
		_domElement.removeEventListener('wheel', onMouseWheel, false);
	}

	function onMouseWheel(event) {
		if (_selected) {
			if (event.deltaY < 0) {
				_selected.rotation.y -= Math.PI / 2;
			} else if (event.deltaY > 0) {
				_selected.rotation.y += Math.PI / 2;
			}
			invalidPosition = checkCollisions(_selected);
		}
	}

	function mouseDown() {
		_domElement.style.cursor = 'move';
		scope.dispatchEvent({ type: 'dragstart', object: _selected });
	}

	function mouseCancel() {

		if (_selected) {
			scope.dispatchEvent({ type: 'dragend', object: _selected });

			if (invalidPosition) {
				_selected.position.copy(originPos);
				_selected.rotation.y = originYRot;
				invalidPosition = checkCollisions(_selected);
				/*
				_selected.position.x = originPos.x;
				_selected.position.y = originPos.y;
				_selected.position.z = originPos.z;
				*/
			} else {
				_selected.position.y = originPos.y;
			}

			_selected = null;

			_domElement.style.cursor = _hovered ? 'pointer' : 'auto';
		}
	}

	function dispose() {
		deactivate();
	}

	function mouseMove(event) {
		event.preventDefault();

		if (_selected) {
			var mouse3D = new Vector3((event.clientX / window.innerWidth) * 2 - 1,
				-(event.clientY / window.innerHeight) * 2 + 1,
				0.5);

			_raycaster.setFromCamera(mouse3D, _camera);
			var intersects = _raycaster.intersectObjects([_factoryFloor]);
			if (intersects[0]) {
				_selected.position.x = intersects[0].point.x;
				_selected.position.z = intersects[0].point.z;
				_selected.position.y = originPos.y + 2;
				invalidPosition = checkCollisions(_selected);
				_selected.updateMatrixWorld();
				scope.dispatchEvent({ type: 'drag', object: _selected });
			}
		}
	}

	function checkCollisions(object) {
		var object1 = object;
		var box1 = new Box3().setFromObject(object1);

		for (var index = 0; index < _collidableMeshList.length; index++) {
			var object2 = _collidableMeshList[index];
			if (object2 != object1) {
				var box2;
				if (object2.children.length > 0) {
					//outras linhas
					box2 = new Box3().setFromObject(object2);
				} else {
					//paredes
					box2 = object2.geometry.boundingBox.clone();
					box2.applyMatrix4(object2.matrixWorld);
				}

				if (box1.intersectsBox(box2)) {
					errorHighlight(object, "0x880000")
					return true;
				}
			}
		}
		errorHighlight(object, "0x00005f")
		return false;
	}

	function errorHighlight(object, hex) {
		if (object.material) {
			if (object.material.emissive) {
				object.material.emissive.setHex(hex);
			}
		}

		object.children.forEach(child => {
			errorHighlight(child, hex);
		})
	}

	activate();

	// API

	this.enabled = true;

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.setSelected = setSelected;
};

CustomDragControls.prototype = Object.create(EventDispatcher.prototype);
CustomDragControls.prototype.constructor = CustomDragControls;

export { CustomDragControls as CustomDragControls };
