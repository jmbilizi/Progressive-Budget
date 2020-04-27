!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, t, n) {
    "use strict";
    n.r(t);
    n(1);
    let r,
      o = [];
    function u() {
      let e = o.reduce((e, t) => e + parseInt(t.value), 0);
      document.querySelector("#total").textContent = e;
    }
    function a() {
      let e = document.querySelector("#tbody");
      (e.innerHTML = ""),
        o.forEach((t) => {
          let n = document.createElement("tr");
          (n.innerHTML = `\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `),
            e.appendChild(n);
        });
    }
    function l() {
      let e = o.slice().reverse(),
        t = 0,
        n = e.map((e) => {
          let t = new Date(e.date);
          return `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`;
        }),
        u = e.map((e) => ((t += parseInt(e.value)), t));
      r && r.destroy();
      let a = document.getElementById("myChart").getContext("2d");
      r = new Chart(a, {
        type: "line",
        data: {
          labels: n,
          datasets: [
            {
              label: "Total Over Time",
              fill: !0,
              backgroundColor: "#6666ff",
              data: u,
            },
          ],
        },
      });
    }
    function c(e) {
      let t = document.querySelector("#t-name"),
        n = document.querySelector("#t-amount"),
        r = document.querySelector(".form .error");
      if ("" === t.value || "" === n.value)
        return void (r.textContent = "Missing Information");
      r.textContent = "";
      let c = { name: t.value, value: n.value, date: new Date().toISOString() };
      e || (c.value *= -1),
        o.unshift(c),
        l(),
        a(),
        u(),
        fetch("/api/transaction", {
          method: "POST",
          body: JSON.stringify(c),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((e) => e.json())
          .then((e) => {
            e.errors
              ? (r.textContent = "Missing Information")
              : ((t.value = ""), (n.value = ""));
          })
          .catch((e) => {
            saveRecord(c), (t.value = ""), (n.value = "");
          });
    }
    fetch("/api/transaction")
      .then((e) => e.json())
      .then((e) => {
        (o = e), u(), a(), l();
      }),
      (document.querySelector("#add-btn").onclick = function () {
        c(!0);
      }),
      (document.querySelector("#sub-btn").onclick = function () {
        c(!1);
      });
  },
  function (e, t, n) {},
]);
