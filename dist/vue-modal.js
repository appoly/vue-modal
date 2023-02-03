import { openBlock as l, createElementBlock as d, createVNode as m, Transition as f, withCtx as k, createCommentVNode as u, withDirectives as C, normalizeStyle as p, createElementVNode as o, normalizeClass as r, renderSlot as c, toDisplayString as y, vShow as g } from "vue";
const B = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [h, s] of e)
    n[h] = s;
  return n;
}, b = {
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
    }
  },
  data() {
    return {
      initiated: !1,
      show: !1
    };
  },
  created() {
    window.addEventListener("keydown", (t) => {
      (t.key === "Escape" || t.key === "Esc" || t.key === 27) && this.handleOutsideClick();
    });
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
      this.show = !1;
    },
    handleOutsideClick() {
      this.closeOnOutsideClick && this.cancelButtonClicked();
    },
    confirm() {
      this.$emit("confirm"), this.closeOnButtonClick && this.closeModal();
    },
    openModal() {
      this.initiated = !0, this.show = !0;
    }
  }
}, w = { class: "model-content" }, x = { class: "d-block" }, _ = { class: "buttons-footer" };
function v(t, e, n, h, s, i) {
  return l(), d("div", null, [
    m(f, { name: i.backdropTransition }, {
      default: k(() => [
        s.show ? (l(), d("div", {
          key: 0,
          class: "modal-backdrop",
          onClick: e[0] || (e[0] = (...a) => i.handleOutsideClick && i.handleOutsideClick(...a))
        })) : u("", !0)
      ]),
      _: 1
    }, 8, ["name"]),
    m(f, { name: i.modalTransition }, {
      default: k(() => [
        s.initiated ? C((l(), d("div", {
          key: 0,
          class: "modal",
          style: p({ width: i.computedWidth, "max-height": i.computedMaxHeight })
        }, [
          o("header", {
            class: r(i.headerClass)
          }, [
            c(t.$slots, "header", {}, void 0, !0)
          ], 2),
          o("div", w, [
            o("section", null, [
              c(t.$slots, "body", {}, void 0, !0)
            ])
          ]),
          o("footer", {
            class: r(i.footerClass)
          }, [
            o("div", x, [
              c(t.$slots, "footer", {}, void 0, !0)
            ]),
            o("div", _, [
              c(t.$slots, "buttons", {}, () => [
                o("button", {
                  type: "button",
                  class: r(n.cancelButtonClass),
                  onClick: e[1] || (e[1] = (...a) => i.cancelButtonClicked && i.cancelButtonClicked(...a))
                }, y(n.cancelButtonText), 3),
                n.showConfirmButton ? (l(), d("button", {
                  key: 0,
                  type: "button",
                  class: r(n.confirmButtonClass),
                  onClick: e[2] || (e[2] = (...a) => i.confirm && i.confirm(...a))
                }, y(n.confirmButtonText), 3)) : u("", !0)
              ], !0)
            ])
          ], 2)
        ], 4)), [
          [g, s.show]
        ]) : u("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ]);
}
const M = /* @__PURE__ */ B(b, [["render", v], ["__scopeId", "data-v-3a19ad3a"]]);
export {
  M as VueModal
};
