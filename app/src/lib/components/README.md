# How to write a threejs/svelte component

A component consists of five parts:

1. The import statements
1. The public interface
1. The Mesh definition
1. The lifecicle methods
1. Html template and slots

## 1. The import statements

This part is where you import the dependencies of your component. You can import any of the following:

- threejs objects
- utility functions
- other components

The structure is as follows:

```js
import { ObjectToImport } from '[LibraryName]';
// or
import ComponentToImport from '$lib/component/[ComponentName].svelte';
```

## 2. The public interface

This part is where you define the public interface of your component. It is defined by the following: `export let [name]: [type] = [default value]`. The public interface is used to pass data to the component.

## 3. The Mesh definition

Here we define the mesh, geometry and material of the component. The mesh is the object that is added to the scene. The geometry is the shape, position and rotation of the mesh. The material is the color and texture of the mesh. It is defined as follows:

```js
const geometry = new [typeOf]Geometry([geometry parameters]); // position, segements, radius, etc.
const material = new [typeOf]Material([material parameters]); // Like color, opacity
const mesh = new [Threejs Object](geometry, material);
```

## 4. The lifecicle methods

Next we define the lifecicle of the component. This is where the mayoratity of code lives. The lifecicle methods are:

- `onMount()`: This is where we initialize the component. This is where we add the mesh to the **scene**, add event listeners, etc. Adding a mesh is done by calling `scene.add(mesh)`.
- `beforeUpdate()`: This is where we update the component before the next frame is rendered. This is where we update the mesh, update the geometry, and material
- `onDestroy()`: The main purpose for onDestroy is to remove the mesh from the scene and remove event listeners. If some work needs to be saved, you could prevent the window from closing and save the work. Removing a mesh is done by calling `scene.remove(mesh)`.

## 5. Html template and slots

This last part is optional. It is where you define html elements like input elements, buttons, etc. You can also define slots. Slots are used to pass javascript data to any child components. Like this:

```html
<!-- ParentCompoent.svelte -->
<script lang="ts">
	export let name = 'John Doe';

	$: firstName = name.split(' ')[0];
</script>

<slot firstName="{firstName}" />
```

```html
<!-- +page.svelte -->
<ParentComponent name="Hello World" let:firstName>
  <p>
    <b>First name</b>
    {firstName}
  </p>
  <ChildComponent name={firstName} />
</ParentCompoent>

```
