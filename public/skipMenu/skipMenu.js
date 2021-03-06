/*! skipMenu - v1.1.0 - 2022-05-18 - Commit 4840362
* https://github.com/mydobie/skipMenu

Copyright (c) 2022 Kim Doberstein and myDobie. All rights reserved.

This work is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.
*/
/* ********************* */
(() => {
  'use strict';
  var e = function (t) {
      if (9 === t.nodeType || null === t.parentElement) return !0;
      var n = window.getComputedStyle(t),
        a = n.getPropertyValue('display'),
        i = n.getPropertyValue('visibility'),
        o = n.getPropertyValue('width'),
        r = n.getPropertyValue('height'),
        d = t.getAttribute('hidden');
      return (
        'none' !== a &&
        'hidden' !== i &&
        null === d &&
        '0px' !== o &&
        '0px' !== r &&
        e(t.parentNode)
      );
    },
    t = function (e) {
      var t = document.getElementById(e.menuId);
      if (t) {
        var n = document.getElementById(e.buttonId);
        (t.style.display = 'block'),
          n.setAttribute('aria-expanded', 'true'),
          t.querySelector('[role="menuitem"]').focus();
      }
    },
    n = function (e, t) {
      void 0 === t && (t = !1);
      var n = document.getElementById(e.menuId);
      if (n) {
        var a = document.getElementById(e.buttonId);
        a.setAttribute('aria-expanded', 'false'),
          (n.style.display = 'none'),
          t ||
            e.alwaysShow ||
            document.getElementById(e.id).classList.add('skipMenu-hidden'),
          a.focus();
      }
    },
    a = function (e, t) {
      if (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      )
        return null;
      var n = window.navigator.userAgent.toLowerCase(),
        a = /(macintosh|macintel|macppc|mac68k|macos)/.test(n),
        i = /(opera|opr)/.test(n),
        o = /(firefox)/.test(n),
        r = t;
      return (
        (r +=
          a && i
            ? 'Control + Alt'
            : a
            ? 'Control + Option'
            : o
            ? 'Alt + Shift'
            : 'Alt') +
        ' + ' +
        e
      );
    },
    i = function (t, a, i) {
      var o = document.createElement('div'),
        r = (function (e, t, n) {
          var a = (function (e, t) {
              var n = e.tagName;
              switch (e.getAttribute('role')) {
                case 'main':
                  return t.text.mainLabel;
                case 'search':
                  return t.text.searchLabel;
                case 'navigation':
                  return t.text.navigationLabel;
                case 'region':
                  return t.text.regionLabel;
                case 'complementary':
                  return t.text.complementaryLabel;
                case 'banner':
                  return t.text.bannerLabel;
                case 'contentinfo':
                  return t.text.footerLabel;
              }
              switch (n.toLowerCase()) {
                case 'main':
                  return t.text.mainLabel;
                case 'nav':
                  return t.text.navigationLabel;
                case 'section':
                  return t.text.sectionLabel;
                case 'form':
                  return t.text.formLabel;
                case 'aside':
                  return t.text.complementaryLabel;
                case 'header':
                  return t.text.bannerLabel;
                case 'footer':
                  return t.text.footerLabel;
              }
              return null;
            })(e, n),
            i = '';
          return (
            e.hasAttribute('aria-label')
              ? (i = e.getAttribute('aria-label'))
              : e.hasAttribute('aria-labelledby')
              ? (i = document
                  .getElementById(e.getAttribute('aria-labelledby'))
                  .innerText.trim())
              : e.hasAttribute('title') && (i = e.getAttribute('title')),
            a
              ? i
                ? a + ': ' + i
                : a
              : t
              ? (i || e.innerText).trim()
              : e.tagName.toLocaleLowerCase()
          );
        })(t, !!a, i);
      if (!r || '' === r || t.classList.contains(i.ignoreClass)) return null;
      a &&
        ((o.className = i.id + '-menu-header-level-' + a), (r = a + ') ' + r));
      var d = document.createTextNode(r);
      return (
        o.appendChild(d),
        o.setAttribute('role', 'menuitem'),
        o.classList.add('dropdown-item'),
        o.setAttribute('tabindex', '-1'),
        (function (t, a, i) {
          var o = i.buttonId;
          return (
            t.addEventListener('click', function (e) {
              n(i), a.focus(), e.stopPropagation(), e.preventDefault();
            }),
            t.addEventListener('keydown', function (t) {
              ('Enter' !== t.key && ' ' !== t.key) || (n(i), a.focus()),
                t.stopPropagation(),
                t.preventDefault(),
                'Tab' === t.key &&
                  (n(i),
                  t.shiftKey
                    ? document.getElementById(o).focus()
                    : (function (t) {
                        void 0 === t && (t = 'skipMenu_button');
                        var n,
                          a = document.querySelectorAll(
                            'a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
                          ),
                          i = Array.from(a).findIndex(function (e) {
                            return e.isEqualNode(document.getElementById(t));
                          }),
                          o = document.getElementById(t).tabIndex || 0;
                        if (0 === o)
                          for (var r = i + 1; r < a.length && !n; r++)
                            e(a[r]) && 0 === a[r].tabIndex && (n = a[r]);
                        else {
                          for (r = i + 1; r < a.length && !n; r++)
                            e(a[r]) && a[r].tabIndex >= o && (n = a[r]);
                          for (r = 0; r < i && !n; r++)
                            e(a[r]) && 0 === a[r].tabIndex && (n = a[r]);
                        }
                        n ? n.focus() : document.getElementById(t).focus();
                      })(o));
            }),
            t
          );
        })(o, t, i)
      );
    },
    o = function (t, n, a, o) {
      if (0 === t.length) return null;
      var r = document.createElement('div');
      r.setAttribute('role', 'group'),
        (r.id = a),
        r.setAttribute('aria-labelledby', a + '-title');
      var d = document.createElement('div');
      return (
        d.setAttribute('role', 'separator'),
        (d.id = a + '-title'),
        d.appendChild(document.createTextNode(n)),
        r.appendChild(d),
        t.forEach(function (t) {
          if (e(t)) {
            var n = parseInt(t.tagName.substring(1));
            t.getAttribute('aria-level') &&
              (n = parseInt(t.getAttribute('aria-level'))),
              (function (e) {
                if (
                  null !== e.getAttribute('href') ||
                  (e.hasAttribute('contentEditable') &&
                    'false' !==
                      e.getAttribute('contentEditable').toLowerCase()) ||
                  null !== e.getAttribute('tabindex')
                )
                  return !0;
                var t = e.tagName.toLowerCase();
                return [
                  'button',
                  'details',
                  'input',
                  'iframe',
                  'select',
                  'textarea',
                ].some(function (e) {
                  return e === t;
                });
              })(t) || (t.tabIndex = -1),
              i(t, n, o) && r.appendChild(i(t, n, o));
          }
        }),
        r
      );
    },
    r = function (e) {
      var t = document.createElement('div');
      t.setAttribute('aria-live', 'off'),
        t.setAttribute('role', 'menu'),
        t.classList.add('dropdown-menu'),
        (t.style.display = 'none'),
        (t.id = e.menuId);
      var a = o(
          document.querySelectorAll(e.headers),
          e.text.headingsLabel,
          e.id + '_headings',
          e
        ),
        i = o(
          document.querySelectorAll(e.landmarks),
          e.text.landmarksLabel,
          e.id + '_landmarks',
          e
        );
      return (
        null !== i && t.appendChild(i),
        null !== a && t.appendChild(a),
        null !== a || null !== i
          ? ((function (e, t) {
              var a = e.querySelectorAll('[role="menuitem"]');
              a.forEach(function (e, i) {
                (e.tabIndex = -1),
                  e.addEventListener('keydown', function (e) {
                    ('ArrowDown' != e.key && 'ArrowUp' != e.key) ||
                      (e.stopPropagation(),
                      e.preventDefault(),
                      'ArrowDown' === e.key &&
                        (a[i + 1] ? a[i + 1].focus() : a[0].focus()),
                      'ArrowUp' === e.key &&
                        (a[i - 1]
                          ? a[i - 1].focus()
                          : a[a.length - 1].focus())),
                      'Escape' === e.key && n(t);
                  });
              });
            })(t, e),
            t)
          : null
      );
    },
    d = function () {
      return (
        (d =
          Object.assign ||
          function (e) {
            for (var t, n = 1, a = arguments.length; n < a; n++)
              for (var i in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }),
        d.apply(this, arguments)
      );
    },
    s = (function () {
      function e(e) {
        var t = {
          id: 'skipMenu',
          attachTo: document.getElementsByTagName('body')[0],
          alwaysShow: !0,
          headers: 'h1, h2, h3, h4, h5, h6, [role=heading]',
          landmarks:
            'main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]',
          reloadOnChange: !1,
          useAccessKey: !1,
          accessKey: '0',
          tabIndex: null,
          isRemoved: !1,
          ignoreClass: 'skipMenu-ignore',
          text: {
            buttonLabel: 'Skip to content',
            headingsLabel: 'Headings',
            landmarksLabel: 'Landmarks',
            tooltipLabel: 'Shortcut: ',
            controlKeyLabel: 'Control',
            optionKeyLabel: 'Option',
            altKeyLabel: 'Alt',
            shiftKeyLabel: 'Shift',
            mainLabel: 'Main',
            searchLabel: 'Search',
            navigationLabel: 'Navigation',
            regionLabel: 'Region',
            complementaryLabel: 'Complementary',
            bannerLabel: 'Banner',
            footerLabel: 'Footer',
            sectionLabel: 'Section',
            formLabel: 'Form',
          },
          ensureAbsoluteParent: !0,
        };
        (this.config = d(d({}, t), e)),
          (null == e ? void 0 : e.text) &&
            (this.config.text = d(d({}, t.text), e.text)),
          (this.config.menuId = this.config.id + '_menu'),
          (this.config.buttonId = this.config.id + '_button'),
          (this.config.tooltipId = this.config.id + '_tooltip'),
          (this.update = this.update.bind(this)),
          (this.getConfig = this.getConfig.bind(this));
      }
      return (
        (e.prototype.getConfig = function () {
          return this.config;
        }),
        (e.prototype.init = function () {
          var e, t;
          (e = this.config),
            (t = this.update),
            e.reloadOnChange &&
              new MutationObserver(function (n) {
                n.forEach(function (n) {
                  var a;
                  Array.from(n.removedNodes).some(function (t) {
                    return t.id === e.id;
                  }) ||
                    Array.from(n.addedNodes).some(function (t) {
                      return t.id === e.id;
                    }) ||
                    n.target.closest('#' + e.id) ||
                    'tabindex' === n.attributeName ||
                    '\n\n' ===
                      (null === (a = n.addedNodes[0]) || void 0 === a
                        ? void 0
                        : a.data) ||
                    n.target.id === e.id ||
                    n.target.id === e.menuId ||
                    t();
                });
              }).observe(document, {
                attributes: !0,
                subtree: !0,
                childList: !0,
              }),
            (function (e) {
              document.addEventListener('click', function (t) {
                var a = document.getElementById(e.menuId);
                a &&
                  'none' !== a.style.display &&
                  !t.target.closest('#' + e.id) &&
                  n(e);
              });
            })(this.config),
            this._add();
        }),
        (e.prototype._add = function () {
          if (this.config.isRemoved) return null;
          var e = document.createDocumentFragment(),
            i = document.createElement('div');
          e.appendChild(i),
            (i.id = this.config.id),
            i.setAttribute('data-skip-menu', 'true'),
            this.config.alwaysShow || i.classList.add('skipMenu-hidden');
          var o = (function (e) {
            var i = document.createDocumentFragment(),
              o = document.createElement('button');
            if (
              (o.setAttribute('aria-haspopup', 'true'),
              o.setAttribute('aria-expanded', 'false'),
              o.setAttribute('aria-controls', e.menuId),
              o.classList.add('btn', 'btn-secondary'),
              (o.id = e.buttonId),
              (o.textContent = e.text.buttonLabel),
              e.tabIndex && (o.tabIndex = e.tabIndex),
              o.addEventListener('click', function (a) {
                a.stopPropagation(),
                  a.preventDefault(),
                  (function (e, a) {
                    void 0 === a && (a = !1);
                    var i = document.getElementById(e.menuId);
                    i && ('none' !== i.style.display ? n(e, a) : t(e));
                  })(e, !0);
              }),
              e.alwaysShow ||
                (o.addEventListener('focus', function () {
                  document
                    .getElementById(e.id)
                    .classList.remove('skipMenu-hidden');
                }),
                o.addEventListener('blur', function () {
                  'false' === o.getAttribute('aria-expanded') &&
                    document
                      .getElementById(e.id)
                      .classList.add('skipMenu-hidden');
                })),
              i.appendChild(o),
              e.useAccessKey)
            ) {
              var r = (function (e) {
                if (!a(e.accessKey, e.text.tooltipLabel)) return null;
                var t = document.createElement('div');
                (t.id = e.tooltipId),
                  t.classList.add('tooltip', 'bs-tooltip-bottom');
                var n = document.createElement('div');
                n.classList.add('tooltip-arrow'), t.appendChild(n);
                var i = document.createElement('div');
                return (
                  i.classList.add('tooltip-inner'),
                  (i.textContent = a(e.accessKey, e.text.tooltipLabel)),
                  t.appendChild(i),
                  t
                );
              })(e);
              r &&
                (o.addEventListener('focus', function () {
                  'false' === o.getAttribute('aria-expanded') &&
                    (r.style.display = 'block');
                }),
                o.addEventListener('blur', function () {
                  r.style.display = 'none';
                }),
                o.addEventListener('mouseover', function () {
                  'false' === o.getAttribute('aria-expanded') &&
                    (r.style.display = 'block');
                }),
                o.addEventListener('mouseout', function () {
                  r.style.display = 'none';
                }),
                i.appendChild(r),
                o.setAttribute('accesskey', e.accessKey));
            }
            return i;
          })(this.config);
          i.appendChild(o);
          var d = r(this.config);
          if (null !== d) {
            i.appendChild(d);
            var s = window.getComputedStyle(this.config.attachTo);
            this.config.ensureAbsoluteParent &&
              'body' !== this.config.attachTo.tagName.toLocaleLowerCase() &&
              ![
                'sticky',
                'absolute',
                'fixed',
                'relative',
                '-webkit-sticky',
              ].some(function (e) {
                return e === s.getPropertyValue('position');
              }) &&
              (this.config.attachTo.style.position = 'relative'),
              this.config.attachTo.prepend(i);
          } else
            console.warn(
              'No landmarks or headers found  - skipmenu could not be built'
            );
        }),
        (e.prototype.update = function () {
          var e = document.getElementById(this.config.menuId),
            t = r(this.config);
          e &&
            t &&
            !e.isEqualNode(t) &&
            (e.setAttribute('aria-busy', 'true'),
            e.replaceWith(t),
            e.setAttribute('aria-busy', 'false')),
            t && !e && this._add(),
            !t && e && this._remove();
        }),
        (e.prototype.open = function () {
          t(this.getConfig());
        }),
        (e.prototype.close = function () {
          n(this.getConfig());
        }),
        (e.prototype._remove = function () {
          var e = document.getElementById(this.config.id);
          e && e.remove();
        }),
        (e.prototype.remove = function () {
          (this.config.isRemoved = !0), this._remove();
        }),
        (e.version = 'v1.1.0'),
        e
      );
    })();
  window.SkipMenu = s;
})();
//# sourceMappingURL=skipMenu.js.map
