function _typeof(t) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, _typeof(t)
}! function(t) {
    t(window).on("elementor/frontend/init", (function() {
        var e = t(window).width(),
            n = elementorFrontend.config.responsive.activeBreakpoints,
            i = elementorModules.frontend.handlers.Base,
            o = 1.35,
            a = !1;
        if (null !== WCF_ADDONS_JS.smoothScroller && (o = WCF_ADDONS_JS.smoothScroller.smooth, a = "on" === WCF_ADDONS_JS.smoothScroller.mobile), "function" == typeof ScrollSmoother && "object" === ("undefined" == typeof gsap ? "undefined" : _typeof(gsap))) {
            var s = gsap.matchMedia();
            if (a) ScrollSmoother.create({
                smooth: o,
                effects: !0,
                smoothTouch: .1,
                normalizeScroll: !0,
                ignoreMobileResize: !1
            });
            else s.add("(min-width: 768px)", (function() {
                ScrollSmoother.create({
                    smooth: o,
                    effects: !0,
                    smoothTouch: .1,
                    normalizeScroll: !0,
                    ignoreMobileResize: !1
                })
            }))
        }
        if ("object" === ("undefined" == typeof gsap ? "undefined" : _typeof(gsap))) {
            var r = gsap.matchMedia(),
                l = i.extend({
                    bindEvents: function() {
                        this.run()
                    },
                    run: function() {
                        this.fade_animation(), "widget" === this.getElementType() && (this.text_animation(), this.image_animation()), this.button_move_animation()
                    },
                   
                    image_animation: function() {
                        if (!this.isEdit || this.getElementSettings("wcf_img_animation_editor")) {
                            if ("reveal" === this.getElementSettings("wcf-image-animation")) {
                                var e = this.findElement("img").parent(),
                                    n = this.$element;
                                this.findElement("img").parent().parent().css("overflow", "hidden"), e.css({
                                    overflow: "hidden",
                                    display: "block",
                                    visibility: "hidden",
                                    transition: "none"
                                });
                                var i = this.getElementSettings("image-ease"),
                                    o = !1,
                                    a = "";
                                t.each(["effect-zoom-in", "effect-zoom-out", "left-move", "right-move"], (function(t, e) {
                                    n.hasClass("wcf--image-".concat(e)) && (o = !0, a = "wcf--image-".concat(e), n.removeClass(a))
                                })), e.each((function() {
                                    var e = t(this).find("img"),
                                        s = gsap.timeline({
                                            scrollTrigger: {
                                                trigger: t(this),
                                                start: "top 50%"
                                            }
                                        });
                                    s.set(t(this), {
                                        autoAlpha: 1
                                    }), s.from(t(this), 1.5, {
                                        xPercent: -100,
                                        ease: i,
                                        onComplete: function() {
                                            o && (n.addClass(a), o = !1)
                                        }
                                    }), s.from(e, 1.5, {
                                        xPercent: 100,
                                        scale: 1.3,
                                        delay: -1.5,
                                        ease: i
                                    })
                                }))
                            }
                            if ("scale" === this.getElementSettings("wcf-image-animation")) {
                                var s = this.findElement("img"),
                                    r = this.getElementSettings("wcf-animation-start");
                                "custom" === this.getElementSettings("wcf-animation-start") && (r = this.getElementSettings("wcf_animation_custom_start")), gsap.set(s, {
                                    scale: this.getElementSettings("wcf-scale-start")
                                }), gsap.to(s, {
                                    scrollTrigger: {
                                        trigger: this.$element,
                                        start: r,
                                        scrub: !0
                                    },
                                    scale: this.getElementSettings("wcf-scale-end"),
                                    ease: this.getElementSettings("image-ease")
                                }), s.parent().css("overflow", "hidden")
                            }
                            if ("stretch" === this.getElementSettings("wcf-image-animation")) {
                                var l = this.findElement("img"),
                                    c = this.findElement("img").parent();
                                c.css("padding-bottom", "395px"), gsap.timeline({
                                    scrollTrigger: {
                                        trigger: c,
                                        start: "top top",
                                        pin: !0,
                                        scrub: 1,
                                        pinSpacing: !1,
                                        end: "bottom bottom+=100"
                                    }
                                }).to(l, {
                                    width: "100%",
                                    borderRadius: "0px"
                                }), c.css("transition", "none")
                            }
                        }
                    },
                    fade_animation: function() {
                        var t = this;
                        if ("none" !== this.getElementSettings("wcf-animation") && (!this.isEdit || this.getElementSettings("wcf_enable_animation_editor"))) {
                            var e = this.getElementSettings("fade-from"),
                                i = this.getElementSettings("on-scroll"),
                                o = this.getElementSettings("data-duration"),
                                a = this.getElementSettings("fade-offset"),
                                s = this.getElementSettings("delay"),
                                l = this.getElementSettings("ease"),
                                c = "all";
                            if (this.$element.css("transition", "none"), this.getElementSettings("fade_animation_breakpoint")) {
                                var g = n[this.getElementSettings("fade_animation_breakpoint")].value;
                                c = "min" === this.getElementSettings("fade_breakpoint_min_max") ? "min-width: " + g + "px" : "max-width: " + g + "px"
                            }
                            var m = {
                                opacity: 0,
                                ease: l,
                                duration: o,
                                delay: s
                            };
                            if ("fade" === this.getElementSettings("wcf-animation") && ("top" === e && (m.y = -a), "bottom" === e && (m.y = a), "left" === e && (m.x = -a), "right" === e && (m.x = a), "scale" === e && (m.scale = this.getElementSettings("wcf-a-scale"))), "move" === this.getElementSettings("wcf-animation")) {
                                var d = this.getElementSettings("wcf_a_rotation_di"),
                                    f = this.getElementSettings("wcf_a_transform_origin"),
                                    p = this.getElementSettings("wcf_a_rotation");
                                m.force3D = !0, m.transformOrigin = f, "x" === d && (m.rotationX = p), "y" === d && (m.rotationY = p), gsap.set(this.$element.parent(), {
                                    perspective: 400
                                })
                            }
                            i && (m.scrollTrigger = {
                                trigger: this.$element,
                                start: "top 85%"
                            }), "all" === c ? gsap.from(this.$element, m) : r.add("(".concat(c, ")"), (function() {
                                return gsap.from(t.$element, m),
                                    function() {}
                            }))
                        }
                    },
                  
                });
            elementorFrontend.hooks.addAction("frontend/element_ready/widget", (function(t) {
                elementorFrontend.elementsHandler.addHandler(l, {
                    $element: t
                })
            })), elementorFrontend.hooks.addAction("frontend/element_ready/container", (function(t) {
                elementorFrontend.elementsHandler.addHandler(l, {
                    $element: t
                })
            }));
            var c = i.extend({
                bindEvents: function() {
                    this.isEdit || "yes" === this.getElementSettings("wcf_enable_pin_area") && (this.getElementSettings("wcf_pin_breakpoint") ? e > n[this.getElementSettings("wcf_pin_breakpoint")].value && this.run() : this.run())
                },
                run: function() {
                    var t = this.$element,
                        e = this.getElementSettings("wcf_pin_area_start"),
                        n = this.getElementSettings("wcf_pin_area_end"),
                        i = this.getElementSettings("wcf_pin_end_trigger");
                    "custom" === e && (e = this.getElementSettings("wcf_pin_area_start_custom")), "custom" === n && (n = this.getElementSettings("wcf_pin_area_end_custom")), this.getElementSettings("wcf_custom_pin_area") && (t = this.getElementSettings("wcf_custom_pin_area")), gsap.to(this.$element, {
                        scrollTrigger: {
                            trigger: t,
                            endTrigger: i,
                            pin: this.$element,
                            pinSpacing: !1,
                            start: e,
                            end: n,
                            delay: .5,
                            markers: !1
                        }
                    }), this.$element.css("transition", "none")
                }
            });
            elementorFrontend.hooks.addAction("frontend/element_ready/container", (function(t) {
                elementorFrontend.elementsHandler.addHandler(c, {
                    $element: t
                })
            }))
        }
      
    }))
}(jQuery);