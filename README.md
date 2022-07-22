# Vue Modals

<p align="center">
  <img src="https://www.appoly.co.uk/app/uploads/2022/07/vue-modal-gif.gif" />
</p>

## Installation

Install Vue Modals with npm

```bash
  npm install @appoly/vue-modals
```

## Props

| Prop                  | Type     | Default | Description                                                                                        |
| :-------------------- | :------- | :------ | :------------------------------------------------------------------------------------------------- |
| `confirmButtonText`   | `string` | Confirm | Text displayed on the confirm button                                                               |
| `confirmButtonClass`  | `string` |         | Custom class for the confirm button                                                                |
| `closeOnOutsideClick` | `bool`   | `True`  | Close the modal by clicking on the outside                                                         |
| `showConfirmButton`   | `string` | `True`  | Display the confirm button                                                                         |
| `cancelButtonText`    | `string` | Cancel  | Text displayed on the cancel button                                                                |
| `cancelButtonClass`   | `string` |         | Custom class for the cancel button                                                                 |
| `closeOnButtonClick`  | `bool`   | `True`  | Modal can be closed on cancel/confirm click or an event is emitted and can be closed via functions |
| `animate`             | `bool`   | `True`  | Should the modal animate on entry/leave                                                            |
| `animationType`       | `string` | zoom    | The type of animation - options include - `zoom, bounce & fade`                                    |
| `timeout`             | `number` | `0`     | Should the modal automatically close, time set in milliseconds                                     |

## Slots

| Slot      | Description                                             |
| :-------- | :------------------------------------------------------ |
| `header`  | Content for the top of the modal                        |
| `body`    | Content for the center of the modal                     |
| `footer`  | Content for the bottom of the modal (above the buttons) |
| `buttons` | Replaces the buttons                                    |

## Usage/Examples

```javascript
import '@appoly/vue-modals';

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
