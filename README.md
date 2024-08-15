# Vue Modal

A simple and customizable modal component built with Vue.js. This component provides an easy-to-use interface for creating modals with various customization options.

<p align="center">
  <img src="https://img.shields.io/npm/v/@appoly/vue-modal" />
  <img src="https://img.shields.io/npm/dt/@appoly/vue-modal" />
</p>


<p align="center">
  <img src="https://www.appoly.co.uk/app/uploads/2022/07/vue-modal-2.gif" />
</p>

## Installation

Install the package via npm:

```bash 
npm install @appoly/vue-modal 
```

## Usage

Import and register the component in your Vue application:

```javascript
import VueModal from '@appoly/vue-modal';

export default {
    components: {
        VueModal
    }
}
```

Use the component in your template:

```html 
<vue-modal ref="modal">  
    <template #header>  
        <h3>Modal Header</h3>  
    </template>  
    <template #body>  
        <p>This is the body content of the modal.</p>  
    </template>  
    <template #footer>  
        <p>Footer content</p>  
    </template>  
    <template #buttons>  
        <button @click="cancel">Cancel</button>  
        <button @click="confirm">Confirm</button>  
    </template> 
</vue-modal> 
```

### Open the Modal

To open the modal, use the openModal method:

```javascript 
this.$refs.modal.openModal(); 
```

## Props

| Prop | Type | Default | Description |
|---------------------|-----------|-----------------------------|-------------------------------------------------------------------|
| confirmButtonText | String | "Confirm" | Text for the confirm button. |
| confirmButtonClass| String | "btn btn-primary btn-large"| Class for the confirm button. |
| closeOnOutsideClick| Boolean| true | Determines if clicking outside the modal should close it. |
| showConfirmButton | Boolean | true | Controls the visibility of the confirm button. |
| cancelButtonText | String | "Cancel" | Text for the cancel button. |
| cancelButtonClass | String | "btn btn-danger btn-large mr-2" | Class for the cancel button. |
| closeOnButtonClick| Boolean | true | Determines if clicking the confirm/cancel button should close the modal. |
| animation | String | "zoom" | Animation type for the modal ("zoom", "bounce", "fade"). |
| escClosesModal | Boolean | true | Should the modal close if the Esc key is pressed (and `closeOnOutsideClick` is True)|
| timeout | Number | 0 | Auto-close modal after the specified timeout in milliseconds. |
| stickyFooter | Boolean | false | Makes the footer sticky at the bottom of the modal. |
| stickyHeader | Boolean | false | Makes the header sticky at the top of the modal. |
| width | String | "700px" | Width of the modal. Supports units (px, %, em, rem). |
| maxHeight | String | "75%" | Maximum height of the modal. Supports units (px, %, em, rem). |
| escClosesModal | Boolean | true | Determines if pressing the Escape key should close the modal. |

## Slots

| Slot | Description |
|-----------|---------------------------------------------------|
| header | Content for the modal header. |
| body | Content for the modal body. |
| footer | Content for the modal footer. |
| buttons | Custom buttons to display in the modal footer. |

## Methods

| Method | Description |
|------------------|---------------------------------------------------------|
| openModal() | Opens the modal. |
| closeModal() | Closes the modal. |
| cancelButtonClicked() | Handles the cancel button click event. |
| confirm() | Handles the confirm button click event. |
| handleOutsideClick() | Closes the modal if clicking outside (if enabled). |
| handleEsc(event) | Closes the modal if the Escape key is pressed (if enabled). |

## Events

| Event | Description |
|----------|-------------------------------------|
| cancel | Emitted when the cancel button is clicked. |
| confirm| Emitted when the confirm button is clicked. |

## Styles

The modal component uses the following class names:

- .modal-backdrop - For the modal backdrop.
- .modal - For the modal container.
- .model-content - For the content area within the modal.
- .btn - For buttons within the modal.

Custom animations are also provided for zoom, bounce, and fade.