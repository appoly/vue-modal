# Vue Modal

<p align="center">
  <img src="https://img.shields.io/npm/v/@appoly/vue-modal" />
  <img src="https://img.shields.io/npm/dt/@appoly/vue-modal" />
</p>


<p align="center">
  <img src="https://www.appoly.co.uk/app/uploads/2022/07/vue-modal-2.gif" />
</p>

## Installation

Install Vue Modal with npm

```bash
npm install @appoly/vue-modal
```

## Props

| Prop                  | Type     | Default | Description                                                                                        |
| :-------------------- | :------- | :------ | :------------------------------------------------------------------------------------------------- |
| `confirmButtonText`   | `string` | Confirm | Text displayed on the confirm button                                                               |
| `confirmButtonClass`  | `string` |         | Custom class for the confirm button                                                                |
| `closeOnOutsideClick` | `bool`   | `true`  | Close the modal by clicking on the outside                                                         |
| `showConfirmButton`   | `string` | `true`  | Display the confirm button                                                                         |
| `cancelButtonText`    | `string` | Cancel  | Text displayed on the cancel button                                                                |
| `cancelButtonClass`   | `string` |         | Custom class for the cancel button                                                                 |
| `closeOnButtonClick`  | `bool`   | `true`  | Modal can be closed on cancel/confirm click or an event is emitted and can be closed via functions |
| `escClosesModal`      | `bool`   | `true`  | Should the modal close if the Esc key is pressed (and `closeOnOutsideClick` is True)               |
| `animation`           | `string` | `zoom`  | Animation type, options include `zoom, bounce, fade & none`                                        |
| `timeout`             | `number` | `0`     | Should the modal automatically close, time set in milliseconds                                     |
| `width`               | `string` | `700px` | Width of the modal in px, rem, em, %. Just numbers default to px                                   |
| `maxHeight`           | `string` | `75%`   | Height of the modal in px, rem, em, %. Just number default to px                                   |
| `sticky-header`       | `bool`   | `false` | Should the modal have a sticky header                                                              |
| `sticky-footer`       | `bool`   | `false` | Should the modal have a sticky footer                                                              |

## Slots

| Slot      | Description                                             |
| :-------- | :------------------------------------------------------ |
| `header`  | Content for the top of the modal                        |
| `body`    | Content for the center of the modal                     |
| `footer`  | Content for the bottom of the modal (above the buttons) |
| `buttons` | Replaces the buttons                                    |

## Usage/Examples

```javascript
import VueModal from '@appoly/vue-modal';
import '@appoly/vue-modal/dist/style.css';
```

```vue
<VueModal ref="myModal" timeout="5000">
    <template #header>
        <h1>My Modal</h1>
        <hr>
    </template>
    <template #body>
        <p>This modal will hide in 5 seconds</p>
    </template>
</VueModal>
```
## Open Modal
```javascript
this.$refs.myModal.openModal();
```

## Close Modal
If closeOnButtonClick is turned off you will need to listen for the `confirm` and `cancel` events and close the modal using

```javascript
this.$refs.myModal.closeModal();
```
