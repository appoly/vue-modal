(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VueModal = {}));
}(this, (function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
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
            animate: {
                type: Boolean,
                default: true,
            },
            animationType: {
                type: String,
                default: "zoom",
            },
            timeout: {
                type: Number,
                default: 0,
            },
        },
        data: function data() {
            return {
                show: false,
            };
        },
        watch: {
            show: function show(newValue) {
                var this$1 = this;

                if (newValue) {
                    if (this.timeout > 0) {
                        setTimeout(function () {
                            this$1.closeModal();
                        }, this.timeout);
                    }
                }
            }
        },
        computed: {
            modalTransition: function modalTransition() {
                return this.animate ? this.animationType : "";
            },
            backdropTransition: function backdropTransition() {
                return this.animate ? "fade" : "";
            },
        },
        methods: {
            cancelButtonClicked: function cancelButtonClicked() {
                this.$emit("cancel");
                if (this.closeOnButtonClick) {
                    this.closeModal();
                }
            },
            closeModal: function closeModal() {
                this.show = false;
            },
            handleOutsideClick: function handleOutsideClick() {
                if (this.closeOnOutsideClick) {
                    this.cancelButtonClicked();
                }
            },
            confirm: function confirm() {
                this.$emit("confirm");
                if (this.closeOnButtonClick) {
                    this.closeModal();
                }
            },
            openModal: function openModal() {
                this.show = true;
            },
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c("transition", { attrs: { name: _vm.backdropTransition } }, [
            _vm.show
              ? _c("div", {
                  staticClass: "modal-backdrop",
                  on: { click: _vm.handleOutsideClick },
                })
              : _vm._e() ]),
          _vm._v(" "),
          _c("transition", { attrs: { name: _vm.modalTransition } }, [
            _vm.show
              ? _c("div", { staticClass: "modal" }, [
                  _c("div", { staticClass: "model-content" }, [
                    _c("header", [_vm._t("header")], 2),
                    _vm._v(" "),
                    _c("section", { staticClass: "mt-4" }, [_vm._t("body")], 2),
                    _vm._v(" "),
                    _c("footer", [
                      _c("div", { staticClass: "d-block" }, [_vm._t("footer")], 2),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "mt-4 d-flex justify-content-end" },
                        [
                          _vm._t("buttons", function () {
                            return [
                              _c(
                                "button",
                                {
                                  class: _vm.cancelButtonClass,
                                  attrs: { type: "button" },
                                  on: { click: _vm.cancelButtonClicked },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(_vm.cancelButtonText) +
                                      "\n                            "
                                  ) ]
                              ),
                              _vm._v(" "),
                              _vm.showConfirmButton
                                ? _c(
                                    "button",
                                    {
                                      class: _vm.confirmButtonClass,
                                      attrs: { type: "button" },
                                      on: { click: _vm.confirm },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(_vm.confirmButtonText) +
                                          "\n                            "
                                      ) ]
                                  )
                                : _vm._e() ]
                          }) ],
                        2
                      ) ]) ]) ])
              : _vm._e() ]) ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-3e5e8a52_0", { source: ".modal-backdrop[data-v-3e5e8a52] {\n  content: \"\";\n  position: absolute;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 998;\n  background: #2c3e50;\n  opacity: 0.6;\n  cursor: pointer;\n}\n.modal[data-v-3e5e8a52] {\n  position: absolute;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  text-align: center;\n  width: fit-content;\n  height: fit-content;\n  max-width: 22em;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);\n  background: #FFF;\n  z-index: 999;\n  transform: none;\n  -ms-overflow-style: none;\n  /* IE and Edge */\n  scrollbar-width: none;\n}\n.modal .model-content[data-v-3e5e8a52] {\n  max-height: calc(100vh - 125px);\n}\n.modal[data-v-3e5e8a52]::-webkit-scrollbar {\n  display: none;\n}\n.bounce-enter-active[data-v-3e5e8a52] {\n  animation: bounce-in-data-v-3e5e8a52 0.3s;\n}\n.bounce-leave-active[data-v-3e5e8a52] {\n  animation: bounce-in-data-v-3e5e8a52 0.3s reverse;\n}\n.zoom-enter-active[data-v-3e5e8a52] {\n  animation: zoom-in-data-v-3e5e8a52 0.3s;\n}\n.zoom-leave-active[data-v-3e5e8a52] {\n  animation: zoom-in-data-v-3e5e8a52 0.3s reverse;\n}\n@keyframes bounce-in-data-v-3e5e8a52 {\n0% {\n    transform: scale(0);\n}\n50% {\n    transform: scale(1.25);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes zoom-in-data-v-3e5e8a52 {\n0% {\n    transform: scale(0);\n}\n100% {\n    transform: scale(1);\n}\n}\n.fade-enter-active[data-v-3e5e8a52],\n.fade-leave-active[data-v-3e5e8a52] {\n  transition: opacity 0.3s ease;\n}\n.fade-enter-from[data-v-3e5e8a52],\n.fade-leave-to[data-v-3e5e8a52] {\n  opacity: 0;\n}\n.btn[data-v-3e5e8a52] {\n  border: 1px solid rgb(209, 213, 219);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  color: #111827;\n  font-family: \"Inter var\", ui-sans-serif, system-ui, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  padding: 0.75rem 1rem;\n  text-align: center;\n  text-decoration: none #D1D5DB solid;\n  text-decoration-thickness: auto;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  transition: all 0.2s ease-in-out;\n}\n.btn.btn-primary[data-v-3e5e8a52] {\n  background-color: #00a8ff;\n  color: white;\n  opacity: 0.8;\n}\n.btn.btn-primary[data-v-3e5e8a52]:hover {\n  opacity: 1;\n}\n.btn.btn-danger[data-v-3e5e8a52] {\n  background-color: #ff0000;\n  color: white;\n  opacity: 0.8;\n}\n.btn.btn-danger[data-v-3e5e8a52]:hover {\n  opacity: 1;\n}\n.btn.btn-large[data-v-3e5e8a52] {\n  padding: 10px 24px;\n  line-height: 1.5;\n}\n.d-flex[data-v-3e5e8a52] {\n  display: flex;\n}\n.d-flex.justify-content-end[data-v-3e5e8a52] {\n  justify-content: flex-end;\n}\n.mt-4[data-v-3e5e8a52] {\n  margin-top: 4rem;\n}\n\n/*# sourceMappingURL=VueModal.vue.map */", map: {"version":3,"sources":["/Users/calumchamberlain/Code/vue-modal/src/components/VueModal.vue","VueModal.vue"],"names":[],"mappings":"AAyIA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;ACxIA;AD2IA;EACA,kBAAA;EACA,eAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,4CAAA;EACA,gBAAA;EACA,YAAA;EACA,eAAA;EAWA,wBAAA;EACA,gBAAA;EACA,qBAAA;AClJA;ADuIA;EAEA,+BAAA;ACtIA;ADyIA;EACA,aAAA;ACvIA;AD+IA;EACA,yCAAA;AC5IA;AD+IA;EACA,iDAAA;AC5IA;AD+IA;EACA,uCAAA;AC5IA;AD+IA;EACA,+CAAA;AC5IA;AD+IA;AACA;IACA,mBAAA;AC5IE;AD+IF;IACA,sBAAA;AC7IE;ADgJF;IACA,mBAAA;AC9IE;AACF;ADiJA;AACA;IACA,mBAAA;AC/IE;ADkJF;IACA,mBAAA;AChJE;AACF;ADmJA;;EAEA,6BAAA;ACjJA;ADoJA;;EAEA,UAAA;ACjJA;ADoJA;EACA,oCAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;EACA,gOAAA;EACA,mBAAA;EACA,gBAAA;EACA,oBAAA;EACA,qBAAA;EACA,kBAAA;EACA,mCAAA;EACA,+BAAA;EACA,2CAAA;EACA,eAAA;EACA,iBAAA;EACA,yBAAA;EACA,0BAAA;EACA,gCAAA;ACjJA;ADmJA;EAEA,yBAAA;EACA,YAAA;EACA,YAAA;AClJA;ADoJA;EACA,UAAA;AClJA;ADsJA;EAEA,yBAAA;EACA,YAAA;EACA,YAAA;ACrJA;ADuJA;EACA,UAAA;ACrJA;ADyJA;EACA,kBAAA;EACA,gBAAA;ACvJA;AD2JA;EACA,aAAA;ACxJA;AD0JA;EACA,yBAAA;ACxJA;AD4JA;EACA,gBAAA;ACzJA;;AAEA,uCAAuC","file":"VueModal.vue","sourcesContent":["<template>\n    <div>\n        <transition :name=\"backdropTransition\">\n            <div v-if=\"show\" class=\"modal-backdrop\" @click=\"handleOutsideClick\" />\n        </transition>\n\n        <transition :name=\"modalTransition\">\n            <div v-if=\"show\" class=\"modal\">\n                <div class=\"model-content\">\n                    <header>\n                        <slot name=\"header\" />\n                    </header>\n\n                    <section class=\"mt-4\">\n                        <slot name=\"body\" />\n                    </section>\n\n                    <footer>\n                        <div class=\"d-block\">\n                            <slot name=\"footer\" />\n                        </div>\n                        <div class=\"mt-4 d-flex justify-content-end\">\n                            <slot name=\"buttons\">\n                                <button type=\"button\" :class=\"cancelButtonClass\" @click=\"cancelButtonClicked\">\n                                    {{ cancelButtonText }}\n                                </button>\n                                <button v-if=\"showConfirmButton\" type=\"button\" :class=\"confirmButtonClass\"\n                                    @click=\"confirm\">\n                                    {{ confirmButtonText }}\n                                </button>\n                            </slot>\n                        </div>\n                    </footer>\n                </div>\n            </div>\n        </transition>\n    </div>\n</template>\n\n<script>\nexport default {\n    name: \"VueModal\",\n    props: {\n        confirmButtonText: {\n            type: String,\n            default: \"Confirm\",\n        },\n        confirmButtonClass: {\n            type: String,\n            default: \"btn btn-primary btn-large\",\n        },\n        closeOnOutsideClick: {\n            type: Boolean,\n            default: true,\n        },\n        showConfirmButton: {\n            type: Boolean,\n            default: true,\n        },\n        cancelButtonText: {\n            type: String,\n            default: \"Cancel\",\n        },\n        cancelButtonClass: {\n            type: String,\n            default: \"btn btn-danger btn-large mr-2\",\n        },\n        closeOnButtonClick: {\n            type: Boolean,\n            default: true,\n        },\n        animate: {\n            type: Boolean,\n            default: true,\n        },\n        animationType: {\n            type: String,\n            default: \"zoom\",\n        },\n        timeout: {\n            type: Number,\n            default: 0,\n        },\n    },\n    data() {\n        return {\n            show: false,\n        };\n    },\n    watch: {\n        show(newValue) {\n            if (newValue) {\n                if (this.timeout > 0) {\n                    setTimeout(() => {\n                        this.closeModal();\n                    }, this.timeout);\n                }\n            }\n        }\n    },\n    computed: {\n        modalTransition() {\n            return this.animate ? this.animationType : \"\";\n        },\n        backdropTransition() {\n            return this.animate ? \"fade\" : \"\";\n        },\n    },\n    methods: {\n        cancelButtonClicked() {\n            this.$emit(\"cancel\");\n            if (this.closeOnButtonClick) {\n                this.closeModal();\n            }\n        },\n        closeModal() {\n            this.show = false;\n        },\n        handleOutsideClick() {\n            if (this.closeOnOutsideClick) {\n                this.cancelButtonClicked();\n            }\n        },\n        confirm() {\n            this.$emit(\"confirm\");\n            if (this.closeOnButtonClick) {\n                this.closeModal();\n            }\n        },\n        openModal() {\n            this.show = true;\n        },\n    },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.modal-backdrop {\n    content: '';\n    position: absolute;\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 998;\n    background: #2c3e50;\n    opacity: 0.6;\n    cursor: pointer;\n}\n\n.modal {\n    position: absolute;\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    text-align: center;\n    width: fit-content;\n    height: fit-content;\n    max-width: 22em;\n    padding: 2rem;\n    border-radius: 8px;\n    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);\n    background: #FFF;\n    z-index: 999;\n    transform: none;\n\n    .model-content {\n        // overflow: auto;\n        max-height: calc(100vh - 125px);\n    }\n\n    &::-webkit-scrollbar {\n        display: none;\n    }\n\n    -ms-overflow-style: none;\n    /* IE and Edge */\n    scrollbar-width: none;\n}\n\n.bounce-enter-active {\n    animation: bounce-in 0.3s;\n}\n\n.bounce-leave-active {\n    animation: bounce-in 0.3s reverse;\n}\n\n.zoom-enter-active {\n    animation: zoom-in 0.3s;\n}\n\n.zoom-leave-active {\n    animation: zoom-in 0.3s reverse;\n}\n\n@keyframes bounce-in {\n    0% {\n        transform: scale(0);\n    }\n\n    50% {\n        transform: scale(1.25);\n    }\n\n    100% {\n        transform: scale(1);\n    }\n}\n\n@keyframes zoom-in {\n    0% {\n        transform: scale(0);\n    }\n\n    100% {\n        transform: scale(1);\n    }\n}\n\n.fade-enter-active,\n.fade-leave-active {\n    transition: opacity 0.3s ease;\n}\n\n.fade-enter-from,\n.fade-leave-to {\n    opacity: 0;\n}\n\n.btn {\n    border: 1px solid rgb(209, 213, 219);\n    border-radius: .5rem;\n    box-sizing: border-box;\n    color: #111827;\n    font-family: \"Inter var\", ui-sans-serif, system-ui, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n    font-size: .875rem;\n    font-weight: 600;\n    line-height: 1.25rem;\n    padding: .75rem 1rem;\n    text-align: center;\n    text-decoration: none #D1D5DB solid;\n    text-decoration-thickness: auto;\n    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n    cursor: pointer;\n    user-select: none;\n    -webkit-user-select: none;\n    touch-action: manipulation;\n    transition: all 0.2s ease-in-out;\n\n    &.btn-primary {\n        //faded .btn-primary\n        background-color: #00a8ff;\n        color: white;\n        opacity: 0.8;\n\n        &:hover {\n            opacity: 1;\n        }\n    }\n\n    &.btn-danger {\n        //faded .btn-danger\n        background-color: #ff0000;\n        color: white;\n        opacity: 0.8;\n\n        &:hover {\n            opacity: 1;\n        }\n    }\n\n    &.btn-large {\n        padding: 10px 24px;\n        line-height: 1.5;\n    }\n}\n\n.d-flex {\n    display: flex;\n\n    &.justify-content-end {\n        justify-content: flex-end;\n    }\n}\n\n.mt-4 {\n    margin-top: 4rem;\n}\n</style>\n",".modal-backdrop {\n  content: \"\";\n  position: absolute;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 998;\n  background: #2c3e50;\n  opacity: 0.6;\n  cursor: pointer;\n}\n\n.modal {\n  position: absolute;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  text-align: center;\n  width: fit-content;\n  height: fit-content;\n  max-width: 22em;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);\n  background: #FFF;\n  z-index: 999;\n  transform: none;\n  -ms-overflow-style: none;\n  /* IE and Edge */\n  scrollbar-width: none;\n}\n.modal .model-content {\n  max-height: calc(100vh - 125px);\n}\n.modal::-webkit-scrollbar {\n  display: none;\n}\n\n.bounce-enter-active {\n  animation: bounce-in 0.3s;\n}\n\n.bounce-leave-active {\n  animation: bounce-in 0.3s reverse;\n}\n\n.zoom-enter-active {\n  animation: zoom-in 0.3s;\n}\n\n.zoom-leave-active {\n  animation: zoom-in 0.3s reverse;\n}\n\n@keyframes bounce-in {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    transform: scale(1.25);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes zoom-in {\n  0% {\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity 0.3s ease;\n}\n\n.fade-enter-from,\n.fade-leave-to {\n  opacity: 0;\n}\n\n.btn {\n  border: 1px solid rgb(209, 213, 219);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  color: #111827;\n  font-family: \"Inter var\", ui-sans-serif, system-ui, -apple-system, system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  padding: 0.75rem 1rem;\n  text-align: center;\n  text-decoration: none #D1D5DB solid;\n  text-decoration-thickness: auto;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  transition: all 0.2s ease-in-out;\n}\n.btn.btn-primary {\n  background-color: #00a8ff;\n  color: white;\n  opacity: 0.8;\n}\n.btn.btn-primary:hover {\n  opacity: 1;\n}\n.btn.btn-danger {\n  background-color: #ff0000;\n  color: white;\n  opacity: 0.8;\n}\n.btn.btn-danger:hover {\n  opacity: 1;\n}\n.btn.btn-large {\n  padding: 10px 24px;\n  line-height: 1.5;\n}\n\n.d-flex {\n  display: flex;\n}\n.d-flex.justify-content-end {\n  justify-content: flex-end;\n}\n\n.mt-4 {\n  margin-top: 4rem;\n}\n\n/*# sourceMappingURL=VueModal.vue.map */"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-3e5e8a52";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('VueModal', __vue_component__);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.default = __vue_component__;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
