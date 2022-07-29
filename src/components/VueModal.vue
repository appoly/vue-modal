<template>
    <div>
        <transition :name="backdropTransition">
            <div v-if="show" class="modal-backdrop" @click="handleOutsideClick" />
        </transition>

        <transition :name="modalTransition">
            <div v-if="initiated" v-show="show" class="modal" :style="{ width: computedWidth }">
                <header :class="headerClass">
                    <slot name="header" />
                </header>
                <div class="model-content">
                    <section>
                        <slot name="body" />
                    </section>
                </div>
                <footer :class="footerClass">
                    <div class="d-block">
                        <slot name="footer" />
                    </div>
                    <div class="buttons-footer d-flex justify-content-end">
                        <slot name="buttons">
                            <button type="button" :class="cancelButtonClass" @click="cancelButtonClicked">
                                {{ cancelButtonText }}
                            </button>
                            <button v-if="showConfirmButton" type="button" :class="confirmButtonClass" @click="confirm">
                                {{ confirmButtonText }}
                            </button>
                        </slot>
                    </div>
                </footer>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "VueModal",
    props: {
        confirmButtonText: {
            type: String,
            default: "Confirm",
        },
        confirmButtonClass: {
            type: String,
            default: "btn btn-primary btn-large",
        },
        closeOnOutsideClick: {
            type: Boolean,
            default: true,
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        cancelButtonText: {
            type: String,
            default: "Cancel",
        },
        cancelButtonClass: {
            type: String,
            default: "btn btn-danger btn-large mr-2",
        },
        closeOnButtonClick: {
            type: Boolean,
            default: true,
        },
        animation: {
            type: String,
            default: "zoom",
        },
        timeout: {
            type: Number,
            default: 0,
        },
        stickyFooter: {
            type: Boolean,
            default: false,
        },
        stickyHeader: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "700px",
        }
    },
    data() {
        return {
            initiated: false,
            show: false,
        };
    },
    created() {
        //listen for esc key press
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc' || event.key === 27) {
                this.handleOutsideClick();
            }
        });
    },
    watch: {
        show(newValue) {
            if (newValue) {
                if (this.timeout > 0) {
                    setTimeout(() => {
                        this.closeModal();
                    }, this.timeout);
                }
            }
        }
    },
    computed: {
        animate() {
            const animations = [
                'zoom', 'bounce', 'fade'
            ];
            return animations.includes(this.animation);
        },
        modalTransition() {
            return this.animate ? this.animation : "";
        },
        backdropTransition() {
            return this.animate ? "fade" : "";
        },
        headerClass() {
            return this.stickyHeader ? "--sticky" : "";
        },
        footerClass() {
            return this.stickyFooter ? "--sticky" : "";
        },
        computedWidth() {
            const possibleWidthEndings = [
                'px', '%', 'em', 'rem'
            ];
            // if width has a possibleWidthEnding then return it as is
            for (let i = 0; i < possibleWidthEndings.length; i++) {
                if (this.width.endsWith(possibleWidthEndings[i])) {
                    return this.width;
                }
            }
            // if width is not a number return default 700px
            if (isNaN(this.width)) {
                return "700px";
            }
            // if width is a number return it as a px value
            return this.width + "px";
        }
    },
    methods: {
        cancelButtonClicked() {
            this.$emit("cancel");
            if (this.closeOnButtonClick) {
                this.closeModal();
            }
        },
        closeModal() {
            this.show = false;
        },
        handleOutsideClick() {
            if (this.closeOnOutsideClick) {
                this.cancelButtonClicked();
            }
        },
        confirm() {
            this.$emit("confirm");
            if (this.closeOnButtonClick) {
                this.closeModal();
            }
        },
        openModal() {
            this.initiated = true;
            this.show = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
}

.modal {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: fit-content;
    width: 700px;
    border-radius: 8px;
    box-shadow: 0 -2px 5px 0 rgb(0 0 0 / 15%);
    background: #FFF;
    z-index: 999;
    transform: none;
    overflow: auto;
    max-width: 95%;
    max-height: 50%;
    text-align: left;

    .model-content {
        // overflow: auto;
        max-height: calc(100vh - 125px);
        padding: 0em 2em 0em 2em;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;

    header {
        &.--sticky {
            position: sticky;
            top: 0;
            background-color: inherit;
            z-index: 1055;
            margin: 0;
        }
    }

    header,
    footer {
        margin: 1em 2em 1em 2em;
    }

    footer {
        &.--sticky {
            position: sticky;
            bottom: 0;
            background-color: inherit;
            z-index: 1055;
            margin: 0;
        }

        .buttons-footer {
            display: flex;
            justify-content: flex-end;
            padding: 0.5em 0em 1em 1em;
        }
    }
}

.bounce-enter-active {
    animation: bounce-in 0.3s;
}

.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
}

.zoom-enter-active {
    animation: zoom-in 0.3s;
}

.zoom-leave-active {
    animation: zoom-in 0.3s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes zoom-in {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.btn {
    border: 1px solid rgb(209, 213, 219);
    border-radius: .5rem;
    box-sizing: border-box;
    color: #111827;
    font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: .75rem 1rem;
    text-align: center;
    text-decoration: none #D1D5DB solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: all 0.2s ease-in-out;

    &.btn-primary {
        //faded .btn-primary
        background-color: #00a8ff;
        color: white;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    &.btn-danger {
        //faded .btn-danger
        background-color: #ff0000;
        color: white;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    &.btn-large {
        padding: 10px 24px;
        line-height: 1.5;
    }
}

.d-flex {
    display: flex;

    &.justify-content-end {
        justify-content: flex-end;
    }
}

.mt-4 {
    margin-top: 4rem;
}
</style>
