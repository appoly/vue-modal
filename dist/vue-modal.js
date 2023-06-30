import { openBlock as l, createElementBlock as d, createVNode as m, Transition as f, withCtx as y, createCommentVNode as u, withDirectives as C, normalizeStyle as p, createElementVNode as s, normalizeClass as r, renderSlot as c, toDisplayString as k, vShow as g } from "vue";
const B = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [h, o] of e)
    n[h] = o;
  return n;
}, w = {
  name: "VueModal",
  props: {
    confirmButtonText: {
      type: String,
      default: "Confirm"
    },
    confirmButtonClass: {
      type: String,
      default: "btn btn-primary btn-large"
    },
    closeOnOutsideClick: {
      type: Boolean,
      default: !0
    },
    showConfirmButton: {
      type: Boolean,
      default: !0
    },
    cancelButtonText: {
      type: String,
      default: "Cancel"
    },
    cancelButtonClass: {
      type: String,
      default: "btn btn-danger btn-large mr-2"
    },
    closeOnButtonClick: {
      type: Boolean,
      default: !0
    },
    animation: {
      type: String,
      default: "zoom"
    },
    timeout: {
      type: Number,
      default: 0
    },
    stickyFooter: {
      type: Boolean,
      default: !1
    },
    stickyHeader: {
      type: Boolean,
      default: !1
    },
    width: {
      type: String,
      default: "700px"
    },
    maxHeight: {
      type: String,
      default: "75%"
    },
    escClosesModal: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      initiated: !1,
      show: !1
    };
  },
  created() {
  },
  watch: {
    show(t) {
      t && this.timeout > 0 && setTimeout(() => {
        this.closeModal();
      }, this.timeout);
    }
  },
  computed: {
    animate() {
      return [
        "zoom",
        "bounce",
        "fade"
      ].includes(this.animation);
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
      const t = [
        "px",
        "%",
        "em",
        "rem"
      ];
      for (let e = 0; e < t.length; e++)
        if (this.width.endsWith(t[e]))
          return this.width;
      return isNaN(this.width) ? "700px" : this.width + "px";
    },
    computedMaxHeight() {
      const t = [
        "px",
        "%",
        "em",
        "rem"
      ];
      for (let e = 0; e < t.length; e++)
        if (this.maxHeight.endsWith(t[e]))
          return this.maxHeight;
      return isNaN(this.maxHeight) ? "75%" : this.maxHeight + "px";
    }
  },
  methods: {
    cancelButtonClicked() {
      this.$emit("cancel"), this.closeOnButtonClick && this.closeModal();
    },
    closeModal() {
      this.show = !1, window.removeEventListener("keydown", this.handleEsc);
    },
    handleOutsideClick() {
      this.closeOnOutsideClick && this.cancelButtonClicked();
    },
    confirm() {
      this.$emit("confirm"), this.closeOnButtonClick && this.closeModal();
    },
    openModal() {
      window.addEventListener("keydown", this.handleEsc), this.initiated = !0, this.show = !0;
    },
    handleEsc(t) {
      (t.key === "Escape" || t.key === "Esc" || t.key === 27) && this.escClosesModal && this.handleOutsideClick();
    }
  }
}, b = { class: "model-content" }, x = { class: "d-block" }, _ = { class: "buttons-footer" };
function v(t, e, n, h, o, i) {
  return l(), d("div", null, [
    m(f, { name: i.backdropTransition }, {
      default: y(() => [
        o.show ? (l(), d("div", {
          key: 0,
          class: "modal-backdrop",
          onClick: e[0] || (e[0] = (...a) => i.handleOutsideClick && i.handleOutsideClick(...a))
        })) : u("", !0)
      ]),
      _: 1
    }, 8, ["name"]),
    m(f, { name: i.modalTransition }, {
      default: y(() => [
        o.initiated ? C((l(), d("div", {
          key: 0,
          class: "modal",
          style: p({ width: i.computedWidth, "max-height": i.computedMaxHeight })
        }, [
          s("header", {
            class: r(i.headerClass)
          }, [
            c(t.$slots, "header", {}, void 0, !0)
          ], 2),
          s("div", b, [
            s("section", null, [
              c(t.$slots, "body", {}, void 0, !0)
            ])
          ]),
          s("footer", {
            class: r(i.footerClass)
          }, [
            s("div", x, [
              c(t.$slots, "footer", {}, void 0, !0)
            ]),
            s("div", _, [
              c(t.$slots, "buttons", {}, () => [
                s("button", {
                  type: "button",
                  class: r(n.cancelButtonClass),
                  onClick: e[1] || (e[1] = (...a) => i.cancelButtonClicked && i.cancelButtonClicked(...a))
                }, k(n.cancelButtonText), 3),
                n.showConfirmButton ? (l(), d("button", {
                  key: 0,
                  type: "button",
                  class: r(n.confirmButtonClass),
                  onClick: e[2] || (e[2] = (...a) => i.confirm && i.confirm(...a))
                }, k(n.confirmButtonText), 3)) : u("", !0)
              ], !0)
            ])
          ], 2)
        ], 4)), [
          [g, o.show]
        ]) : u("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ]);
}
const O = /* @__PURE__ */ B(w, [["render", v], ["__scopeId", "data-v-8c6374f0"]]);
export {
  O as VueModal
};
