import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export interface RootContext {
	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
}
