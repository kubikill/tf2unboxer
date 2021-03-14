"use strict"; // Register service worker

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.prod.js');
  });
} // Function for reporting errors to analytics


function reportError(message) {
  window.goatcounter.count({
    path: "Error ".concat(generateRandomString()),
    // Yes, this is stupid, but this is required to prevent GoatCounter from grouping bug reports together
    title: message,
    event: true
  });
} // Compressed function for deep merging objects. a - target object, b - source object


var mergeDeep = function mergeDeep(a, b) {
  for (var _i = 0, _Object$keys = Object.keys(b); _i < _Object$keys.length; _i++) {
    var c = _Object$keys[_i];
    b[c] instanceof Object && c in a && Object.assign(b[c], mergeDeep(a[c], b[c]));
  }

  return Object.assign(a || {}, b), a;
}; // Swipe events - https://github.com/john-doherty/swiped-events


!function (t, e) {
  "use strict";

  "function" != typeof t.CustomEvent && (t.CustomEvent = function (t, n) {
    n = n || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var a = e.createEvent("CustomEvent");
    return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a;
  }, t.CustomEvent.prototype = t.Event.prototype), e.addEventListener("touchstart", function (t) {
    if ("true" === t.target.getAttribute("data-swipe-ignore")) return;
    s = t.target, r = Date.now(), n = t.touches[0].clientX, a = t.touches[0].clientY, u = 0, i = 0;
  }, !1), e.addEventListener("touchmove", function (t) {
    if (!n || !a) return;
    var e = t.touches[0].clientX,
        r = t.touches[0].clientY;
    u = n - e, i = a - r;
  }, !1), e.addEventListener("touchend", function (t) {
    if (s !== t.target) return;
    var e = parseInt(l(s, "data-swipe-threshold", "20"), 10),
        o = parseInt(l(s, "data-swipe-timeout", "500"), 10),
        c = Date.now() - r,
        d = "",
        p = t.changedTouches || t.touches || [];
    Math.abs(u) > Math.abs(i) ? Math.abs(u) > e && c < o && (d = u > 0 ? "swiped-left" : "swiped-right") : Math.abs(i) > e && c < o && (d = i > 0 ? "swiped-up" : "swiped-down");

    if ("" !== d) {
      var b = {
        dir: d.replace(/swiped-/, ""),
        xStart: parseInt(n, 10),
        xEnd: parseInt((p[0] || {}).clientX || -1, 10),
        yStart: parseInt(a, 10),
        yEnd: parseInt((p[0] || {}).clientY || -1, 10)
      };
      s.dispatchEvent(new CustomEvent("swiped", {
        bubbles: !0,
        cancelable: !0,
        detail: b
      })), s.dispatchEvent(new CustomEvent(d, {
        bubbles: !0,
        cancelable: !0,
        detail: b
      }));
    }

    n = null, a = null, r = null;
  }, !1);
  var n = null,
      a = null,
      u = null,
      i = null,
      r = null,
      s = null;

  function l(t, n, a) {
    for (; t && t !== e.documentElement;) {
      var u = t.getAttribute(n);
      if (u) return u;
      t = t.parentNode;
    }

    return a;
  }
}(window, document); // Generate random 4-letter string

var randomStringPool = "abcdefghijklmnopqrstuwxyz1234567890";

function generateRandomString() {
  var string = "";

  for (var i = 0; i < 5; i++) {
    string += randomStringPool[Math.floor(Math.random() * randomStringPool.length)];
  }

  return string;
} // Detect WebP support


var imageSupport = ".webp";
var webpTest = new Image();

webpTest.onload = function () {
  if (webpTest.height != 2) {
    imageSupport = ".png";
    console.log("WebP is unsupported - failed image height check");
  }
};

webpTest.onerror = function () {
  imageSupport = ".png";
  console.log("WebP is unsupported - failed to load image");
};

webpTest.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA'; // DOM elements

HTMLDocument.prototype.eId = document.getElementById; // Use document.eID() as a shorthand for document.eId()

var DOM = {
  main: {
    container: document.eId("crateselectscreen"),
    optionsBtn: document.eId("optionsbtn"),
    statsBtn: document.eId("statsbtn"),
    gridViewBtn: document.eId("gridviewbtn"),
    exitGridViewBtn: document.eId("exitgridviewbtn"),
    unboxBtn: document.eId("unboxbtn"),
    bulkUnboxBtn: document.eId("bulkunboxbtn"),
    randomCrateBtn: document.eId("randomcratebtn"),
    muteSoundBtn: document.eId("soundbtn"),
    infoBtn: document.eId("infobtn"),
    previousCrateBtn: document.eId("previouscratebtn"),
    nextCrateBtn: document.eId("nextcratebtn"),
    crateName: document.eId("cratename"),
    crateInfoContainer: document.eId("crateinfo"),
    series: document.eId("crateseries"),
    imgContainer: document.eId("crateimagediv"),
    img: document.eId("crateimage"),
    detailsContainer: document.eId("cratedetails"),
    lootContainer: document.eId("cratelootdiv"),
    lootTitle: document.eId("crateloottitle"),
    lootList: document.eId("cratelootlist"),
    lootNote: document.eId("cratenote"),
    lootBonus: document.eId("cratelootbonus"),
    effectsContainer: document.eId("crateeffectsdiv"),
    effectsTitle: document.eId("crateeffectstitle"),
    effectsList: document.eId("crateeffectslist"),
    infoReturnBtn: document.eId("crateinforeturnbtn"),
    infoEffectsBtn: document.eId("crateinfoeffectsbtn"),
    infoLootBtn: document.eId("crateinfolootbtn"),
    moreInfoBtn: document.eId("crateinfobtn"),
    crateGrid: document.eId("crategrid"),
    crateGridSearch: document.eId("crategridsearchinput"),
    crateGridSearchBtn: document.eId("searchbtn"),
    crateGridSearchDiv: document.eId("crategridsearch"),
    crateWindow: document.eId("cratewindow")
  },
  bulkSelect: {
    screen: document.eId("bulkunboxselect"),
    container: document.eId("bulkunboxcontainer"),
    num: document.eId("bulkselectnum"),
    unboxBtn: document.eId("bulkunboxselectbtn"),
    cancelBtn: document.eId("bulkunboxselectcancelbtn"),
    warning: document.eId("bulkwarning"),
    warningHuge: document.eId("bulkwarninghuge")
  },
  bulkProgress: {
    container: document.eId("bulkunboxprogress"),
    progress: document.eId("bulkunboxprogressbar"),
    progressDone: document.eId("bulkunboxprogressdone"),
    progressTotal: document.eId("bulkunboxprogresstotal"),
    progressPercent: document.eId("bulkunboxprogresspercent")
  },
  bulkResults: {
    container: document.eId("bulkunboxresults"),
    title: document.eId("bulkresultstitle"),
    prev: document.eId("bulkresultsprev"),
    next: document.eId("bulkresultsnext"),
    tabName: document.eId("bulkresultstabname"),
    stats: document.eId("bulkresultsstats"),
    "return": document.eId("bulkresultsreturnbtn"),
    unusuals: document.eId("bulkresultsunusuals"),
    unusualsContent: document.eId("bulkresultsunusualscontent"),
    unusualsPageDiv: document.eId("bulkunusualspage"),
    unusualsPrev: document.eId("bulkunusualsprev"),
    unusualsNext: document.eId("bulkunusualsnext"),
    items: {
      container: document.eId("bulkresultsitems"),
      content: document.eId("bulkresultsitems")
    },
    bonusItems: {
      container: document.eId("bulkresultsbonusitems"),
      content: document.eId("bulkresultsbonusitems")
    }
  },
  options: {
    container: document.eId("optionsscreen"),
    returnBtn: document.eId("optionsreturnbtn"),
    debugSettings: document.eId("debugsettings"),
    resetBtn: document.eId("resetbtn"),
    langDropdown: document.eId("langdropdown")
  },
  stats: {
    container: document.eId("statsscreen"),
    returnBtn: document.eId("statsreturnbtn"),
    statistics: {
      container: document.eId("statscontainerinner"),
      prev: document.eId("statsgeneralprev"),
      tab: document.eId("statsgeneraltab"),
      next: document.eId("statsgeneralnext"),
      luck: {
        container: document.eId("statsluckcontainer"),
        notEnough: document.eId("statslucknotenough"),
        unusual: document.eId("unusualluck"),
        unusualDesc: document.eId("unusualluckdesc"),
        strange: document.eId("strangeluck"),
        strangeDesc: document.eId("strangeluckdesc")
      }
    },
    unusuals: {
      container: document.eId("statsunusuals"),
      content: document.eId("statsunusualscontent"),
      pageDiv: document.eId("statsunusualspage"),
      prev: document.eId("statsunusualsprev"),
      next: document.eId("statsunusualsnext")
    },
    crates: {
      container: document.eId("statscrates"),
      details: {
        container: document.eId("statscratesdetails"),
        returnBtn: document.eId("returnstatsdetailsbtn"),
        content: document.eId("statscratesdetailscontent"),
        image: document.eId("cratedetailsimage"),
        title: document.eId("cratedetailstitle"),
        crateStats: document.eId("cratedetailsstats")
      }
    }
  },
  about: {
    container: document.eId("aboutscreen"),
    creditsTitle: document.eId("creditstitle")
  },
  unboxing: {
    container: document.eId("countdownscreen"),
    countdown: document.eId("uncratingcountdown"),
    dots: document.eId("uncratinganim")
  },
  results: {
    container: document.eId("resultscreen"),
    returnBtn: document.eId("returnbtn"),
    unboxBtn: document.eId("unboxagainbtn"),
    lootName: document.eId("lootname"),
    lootChance: document.eId("lootunboxpercent"),
    lootImg: document.eId("lootimg"),
    effectImg: document.eId("effectimg"),
    effectField: document.eId("effectfield"),
    effectName: document.eId("effectname"),
    kitImg: document.eId("kitimg"),
    kitField: document.eId("kitfield"),
    statsContainer: document.eId("lootstatscontainer"),
    statTimesUnboxedDiv: document.eId("loottimesunboxeddiv"),
    statTimesUnboxed: document.eId("loottimesunboxed"),
    statUnusualsUnboxedDiv: document.eId("lootunusualsunboxeddiv"),
    statUnusualsUnboxed: document.eId("lootunusualsunboxed"),
    statSinceLastUnusual: document.eId("lootsincelastunu"),
    bonusContainer: document.eId("lootbonusitems"),
    bonusItemContainer: document.eId("lootbonusitemcontainer"),
    steamMarketBtn: document.eId("lootsteammarketbtn"),
    bptfBtn: document.eId("lootbptfbtn"),
    mptfBtn: document.eId("lootmptfbtn")
  }
}; // Misc variables

var currentCrate = 0;
var currentCrateObj = cA[crateOrder[currentCrate]];
var canUnbox = true;
var inDetailsMode = true;
var emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var wearTable = ["", "FN", "MW", "FT", "WW", "BS"];
var wearTableNames = ["", 80, 81, 82, 83, 84];
var gradeTable = ["", "colorcivilian", "colorfreelance", "colormercenary", "colorcommando", "colorassassin", "colorelite"];
var sheenTable = ["", 128, 129, 130, 131, 132, 133, 134];
var killstreakerTable = ["", 135, 136, 137, 138, 139, 140, 141]; // Save object

var save = {
  stats: {
    "crates-opened": 0,
    "keys-money": 0.00,
    "unboxes-since-last-unusual": 0,
    "min-unusual-drought": "N/A",
    "max-unusual-drought": 0,
    "unusual-avg": "N/A",
    "unusual-avg-array": [],
    "unusual-avgprice": "N/A",
    "unusual-avgprice-array": [],
    "bonus-unboxed": 0,
    "unusualifiers-unboxed": 0,
    "single-bonus-unboxed": 0,
    "double-bonus-unboxed": 0,
    "triple-bonus-unboxed": 0,
    "unique-unboxed": 0,
    "strange-unboxed": 0,
    "random-strange-unboxed": 0,
    "haunted-unboxed": 0,
    "strangehaunted-unboxed": 0,
    "decorated-unboxed": 0,
    "unusual-unboxed": 0,
    "strangeunusual-unboxed": 0,
    "grade-unboxed": 0,
    "civilian-unboxed": 0,
    "freelance-unboxed": 0,
    "mercenary-unboxed": 0,
    "commando-unboxed": 0,
    "assassin-unboxed": 0,
    "elite-unboxed": 0,
    "factorynew-unboxed": 0,
    "minimalwear-unboxed": 0,
    "fieldtested-unboxed": 0,
    "wellworn-unboxed": 0,
    "battlescarred-unboxed": 0,
    "unusual-chances": 0,
    "strange-chances": 0
  },
  crates: {},
  crateStats: {},
  bonusItems: [],
  unusuals: [],
  options: {
    language: "eng",
    fastUnbox: false,
    forceUnusual: false,
    forceUnusualifier: false,
    forceStrange: false,
    forceGrade: false,
    forceGradeNum: 3,
    forceProKit: false,
    forceBonusItem: false,
    amoledTheme: false,
    stopAtItem: ["unusual", "tauntunusualifier", "bonusitem", "gradeelite"],
    halloweenMode: "none",
    eotlGlitch: false,
    sniperVsSpyUnusuals: false,
    muteSound: false
  }
}; // Populate save.crates and save.crateStats

for (var _crate in cA) {
  save.crates[_crate] = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cA[_crate].loot[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      save.crates[_crate].push({});

      switch (item.quality) {
        case 4:
        case 8:
        case 9:
        case 10:
          save.crates[_crate][save.crates[_crate].length - 1].n = 0;
          save.crates[_crate][save.crates[_crate].length - 1].q = 0;
          break;

        case 5:
          for (var i = 1; i < wearTable.length; i++) {
            save.crates[_crate][save.crates[_crate].length - 1][wearTable[i]] = 0;
          }

          break;

        case 6:
          for (var _i2 = 1; _i2 < wearTable.length; _i2++) {
            save.crates[_crate][save.crates[_crate].length - 1][wearTable[_i2]] = 0;
            save.crates[_crate][save.crates[_crate].length - 1]["".concat(wearTable[_i2], "q")] = 0;
          }

          break;

        case 11:
          save.crates[_crate][save.crates[_crate].length - 1].n = 0;
          save.crates[_crate][save.crates[_crate].length - 1].s = [];
          save.crates[_crate][save.crates[_crate].length - 1].p = [];
          break;

        default:
          save.crates[_crate][save.crates[_crate].length - 1].n = 0;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var bonusItem in cA[_crate].exclusiveBonus.loot) {
    save.crates[_crate].push({
      n: 0
    });
  }

  if (cA[_crate].creepyBonus) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = creepyCrateBonusArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _bonusItem = _step2.value;

        save.crates[_crate].push({
          n: 0
        });

        if (_bonusItem.quality == 11) {
          save.crates[_crate][save.crates[_crate].length - 1].s = [];
          save.crates[_crate][save.crates[_crate].length - 1].p = [];
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  save.crateStats[_crate] = {
    n: 0
  };

  if (cA[_crate].unusual) {
    save.crateStats[_crate].u = 0;
  }

  if (cA[_crate].bonus || cA[_crate].exclusiveBonus || cA[_crate].creepyBonus) {
    save.crateStats[_crate].b = 0;
  }
}

var defaultSave = JSON.parse(JSON.stringify(save));
/* ITEM SAVE SYSTEM

n - Stores the amount of the item.
    For items that can have a Strange or Strange Haunted variant, this will store the amount of non-Strange items.
    For killstreak kits, this will store the amount of normal killstreak kits.
q - For items that can have a Strange or Strange Haunted variant, this will store the amount of Strange items.
FN/MW/FT/WW/BS - Stores the amount of the item with specific wear
    For items that can have a Strange variant, this will store the amount of non-Strange items.
FNq/MWq/FTq/WWq/BSq - Same as above, but for items that can have a Strange variant, this will store the amount of non-Strange items.
s - For killstreak kits, this will store specialized killstreak kits.
p - For killstreak kits, this will store professional killstreak kits.
*/
// Options code

document.querySelectorAll("[data-option]").forEach(function (el) {
  if (el.classList.contains("checkbox")) {
    el.addEventListener("click", function () {
      sound.play("btn");
      el.classList.toggle("checked");

      if (el.classList.contains("checked")) {
        save.options[el.dataset.option] = true;
      } else {
        save.options[el.dataset.option] = false;
      }

      localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
    });
  } else if (el.tagName == "SELECT") {
    el.addEventListener("input", function () {
      sound.play("btn");

      if (!isNaN(parseInt(el.value))) {
        save.options[el.dataset.option] = parseInt(el.value);
      } else {
        save.options[el.dataset.option] = el.value;
      }

      triggerOption(el.dataset.option);
      localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
    });
  } else {
    el.addEventListener("click", function () {
      el.parentNode.querySelector(".active").classList.remove("active");
      el.classList.add("active");

      if (el.dataset.optionvalue === 'true') {
        save.options[el.dataset.option] = true;
      } else if (el.dataset.optionvalue === 'false') {
        save.options[el.dataset.option] = false;
      } else {
        save.options[el.dataset.option] = el.dataset.optionvalue;
      }

      triggerOption(el.dataset.option);
      localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
    });
  }
});
document.querySelectorAll("[data-optionarray]").forEach(function (el) {
  el.querySelectorAll("[data-optionvalue]").forEach(function (val) {
    val.addEventListener("click", function () {
      sound.play("btn");

      if (val.classList.contains("checked")) {
        val.classList.remove("checked");
        save.options[el.dataset.optionarray] = save.options[el.dataset.optionarray].filter(function (item) {
          return item !== val.dataset.optionvalue;
        });
      } else {
        val.classList.add("checked");
        save.options[el.dataset.optionarray].push(val.dataset.optionvalue);
      }

      localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
    });
  });
});

function triggerOption(option, load) {
  if (load) {
    var optionEl = document.querySelector("[data-option=\"".concat(option, "\"], [data-optionarray=\"").concat(option, "\"]"));

    if (save.options[option] === true || save.options[option] === false) {
      if (optionEl != null && optionEl.classList.contains("checkbox")) {
        if (save.options[option]) {
          optionEl.classList.add("checked");
        } else {
          optionEl.classList.remove("checked");
        }
      } else if (option === "muteSound") {
        if (save.options.muteSound) {
          DOM.main.muteSoundBtn.innerHTML = '<i class="icon-mute"></i>';
        }
      } else {
        document.querySelector("[data-option=\"".concat(option, "\"].active")).classList.remove("active");
        document.querySelector("[data-option=\"".concat(option, "\"][data-optionvalue=\"").concat(save.options[option], "\"]")).classList.add("active");
      }
    } else if (optionEl != null && optionEl.tagName === "SELECT") {
      optionEl.value = save.options[option];
    } else if (optionEl.dataset.optionarray) {
      optionEl.querySelectorAll("[data-optionvalue]").forEach(function (el) {
        if (save.options[optionEl.dataset.optionarray].includes(el.dataset.optionvalue)) {
          el.classList.add("checked");
        } else {
          el.classList.remove("checked");
        }
      });
    }
  }

  switch (option) {
    case "amoledTheme":
      if (save.options.amoledTheme) {
        document.body.classList.add("amoledtheme");
      } else {
        document.body.classList.remove("amoledtheme");
      }

      break;

    case "language":
      if (load && save.options.language != "eng" || !load) {
        changeLanguage(save.options.language);
      }

      break;

    case "halloweenMode":
      generateEffectList();
      break;
  }
} // Update stats function


function updateStats() {
  document.querySelectorAll("[data-stat]").forEach(function (el) {
    el.innerHTML = save.stats[el.dataset.stat];
  });
  document.querySelectorAll('[data-stat="keys-money"], [data-stat="unusual-avgprice"]').forEach(function (el) {
    el.innerHTML = "$" + el.innerHTML;
  }); // Luck

  if (save.stats["unusual-chances"] >= 100 && save.stats["strange-chances"] >= 10) {
    // Unusual luck
    var unusualPrediction = Math.floor(save.stats["unusual-chances"] / 150);
    var msg = getString("ui", 118);
    msg = msg.replace("#TOTALUNBOXES#", save.stats["unusual-chances"]);
    msg = msg.replace("#UNUSUALSUNBOXED#", save.stats["unusual-unboxed"]);
    DOM.stats.statistics.luck.unusual.removeAttribute("class");

    if (unusualPrediction < save.stats["unusual-unboxed"]) {
      // Lucky
      DOM.stats.statistics.luck.unusual.classList.add("lucky");
      DOM.stats.statistics.luck.unusual.innerHTML = getString("ui", 114);
      msg += getString("ui", 119);
      msg = msg.replace("#DIFF#", save.stats["unusual-unboxed"] - unusualPrediction);
    } else if (unusualPrediction > save.stats["unusual-unboxed"]) {
      // Unlucky
      DOM.stats.statistics.luck.unusual.classList.add("unlucky");
      DOM.stats.statistics.luck.unusual.innerHTML = getString("ui", 115);
      msg += getString("ui", 120);
      msg = msg.replace("#DIFF#", unusualPrediction - save.stats["unusual-unboxed"]);
    } else {
      // Neither lucky nor unlucky
      DOM.stats.statistics.luck.unusual.classList.add("neither");
      msg += getString("ui", 121);
      DOM.stats.statistics.luck.unusual.innerHTML = getString("ui", 116);
    }

    msg = msg.replace("#PREDICTION#", unusualPrediction);
    DOM.stats.statistics.luck.unusualDesc.innerHTML = msg; // Strange luck

    var strangePrediction = Math.floor(save.stats["strange-chances"] / 10);
    msg = getString("ui", 122);
    msg = msg.replace("#TOTALUNBOXES#", save.stats["strange-chances"]);
    msg = msg.replace("#STRANGESUNBOXED#", save.stats["random-strange-unboxed"]);
    DOM.stats.statistics.luck.strange.removeAttribute("class");

    if (strangePrediction < save.stats["random-strange-unboxed"]) {
      // Lucky
      DOM.stats.statistics.luck.strange.classList.add("lucky");
      DOM.stats.statistics.luck.strange.innerHTML = getString("ui", 114);
      msg += getString("ui", 119);
      msg = msg.replace("#DIFF#", save.stats["random-strange-unboxed"] - strangePrediction);
    } else if (strangePrediction > save.stats["random-strange-unboxed"]) {
      // Unlucky
      DOM.stats.statistics.luck.strange.classList.add("unlucky");
      DOM.stats.statistics.luck.strange.innerHTML = getString("ui", 115);
      msg += getString("ui", 120);
      msg = msg.replace("#DIFF#", strangePrediction - save.stats["random-strange-unboxed"]);
    } else {
      // Neither lucky nor unlucky
      DOM.stats.statistics.luck.unusual.classList.add("neither");
      msg += getString("ui", 121);
      DOM.stats.statistics.luck.strange.innerHTML = getString("ui", 116);
    }

    msg = msg.replace("#PREDICTION#", strangePrediction);
    DOM.stats.statistics.luck.strangeDesc.innerHTML = msg;
    DOM.stats.statistics.luck.notEnough.style.display = "none";
    DOM.stats.statistics.luck.container.style.display = "flex";
  } else {
    // Not enough data to show luck
    DOM.stats.statistics.luck.container.style.display = "none";
    DOM.stats.statistics.luck.notEnough.style.display = "flex";
  }
} // Populate unusual section in stats


var unusualsGenerated = false;

function generateUnusualStats() {
  unusualsGenerated = true;
  DOM.stats.unusuals.content.innerHTML = "";

  if (save.unusuals.length > 0) {
    DOM.stats.unusuals.pageDiv.dataset.unusualpage = "1";
    DOM.stats.unusuals.pageDiv.dataset.unusualmaxpage = Math.ceil(save.unusuals.length / 200);
    unusualPage({
      el: DOM.stats.unusuals.pageDiv
    });
  } else {
    DOM.stats.unusuals.content.innerHTML = "<p id=\"nounusuals\" data-string=\"50\">".concat(getString("ui", 50), "</p>");
  }
}

function updateUnusualStats(array, upd) {
  /*  array[0] - item ID
      array[1] - effect ID (or taunt ID if item is an unusualifier)
      array[2] - item quality
      array[3] - item wear
  */
  var tempHtml = "";
  var itemName = getString("item", array[0]);
  var qualityName = getString("ui", 73);

  if (strangeStringPosition === "right") {
    qualityName = "(".concat(qualityName, ")");
  }

  var skinFolder = "";

  if (array[3] != 0) {
    skinFolder = "skins/".concat(wearTable[array[3]]);
    itemName += " (".concat(getString("ui", wearTableNames[array[3]]), ")");
  }

  var img1, img2;
  var effectText = "";

  if (array[2] === 1 && array[3] === 0) {
    var temp = "<span class=\"colorstrange\">".concat(getString("ui", 71), "</span>");

    if (strangeStringPosition === "right") {
      temp = temp.replace('">', '">(').replace('</span>', ')</span>');
    }

    qualityName = "".concat(temp, " ").concat(qualityName);
  }

  if (array[0] === 770) {
    itemName = getString("item", 770).replace("#ITEM#", getString("item", array[1]));
    img1 = "<img src=\"./images/item/".concat(getImg("item", 770), "\" alt=\"\">");
    img2 = "<img class=\"unusualifierimg\" src=\"./images/item/".concat(getImg("item", array[1]), "\" alt=\"\">");
  } else {
    if (strangeStringPosition === "left") {
      itemName = "".concat(qualityName, " ").concat(itemName);
    } else {
      itemName = "".concat(itemName, " ").concat(qualityName);
    }

    var statClockText = "";

    if (array[2] === 1 && array[3] != 0) {
      statClockText = "<span class=\"colorstrange statclock\">".concat(getString("ui", 157), "</span><br>");
    }

    effectText = "<p class=\"statsunusualseffect\">".concat(statClockText).concat(getString("ui", 79), " ").concat(getString("effect", array[1]), "</p>");
    img1 = "<img src=\"./images/effect/".concat(getImg("effect", array[1]), "\" alt=\"\">");
    img2 = "<img src=\"./images/item/".concat(skinFolder).concat(getImg("item", array[0]), "\" alt=\"\">");
  }

  var urlOptions = {
    item: array[0],
    wear: array[3]
  };

  if (array[0] === 770) {
    urlOptions.kitItem = array[1];
  } else {
    urlOptions.effect = array[1];
  }

  if (array[2] === 1) {
    urlOptions.quality = "strangeunusual";
  } else {
    urlOptions.quality = "unusual";
  }

  var steamMarketUrl = generateSteamMarketUrl(urlOptions);
  var backpackUrl = generateBackpackTfUrl(urlOptions);
  var marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
  tempHtml += "<div>\n    ".concat(img1, "\n    ").concat(img2, "\n    <p class=\"statsunuusalsname\">").concat(itemName, "</p>\n    <div class=\"statsunusualsbottom\">\n    ").concat(effectText, "\n    <div class=\"statsunusualsmarketbtns\">\n    <a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(steamMarketUrl, "\"><i class=\"icon-steam\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n    </div>\n    </div>\n    </div>");

  if (upd) {
    var noUnusualsMsg = DOM.stats.unusuals.content.querySelector("#nounusuals");

    if (noUnusualsMsg) {
      noUnusualsMsg.remove();
    }

    DOM.stats.unusuals.content.innerHTML += tempHtml;
  } else {
    return tempHtml;
  }
}

var crateStatsGenerated = false; // Populate list of crates in inventory

function generateCrateStats() {
  if (crateStatsGenerated) {
    return 0;
  }

  crateStatsGenerated = true;
  DOM.stats.crates.container.innerHTML = "";
  var tempHtml = "";
  tempHtml += "<div data-cratestats=\"bonus\">\n    <img src=\"./images/item/".concat(getImg("item", 24), "\" alt=\"\">\n    <p class=\"statscratesname\">").concat(getString("ui", 144), "</p>\n    </div>");
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = crateOrder[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var crateNum = _step3.value;
      var _crate2 = cA[crateNum];
      tempHtml += "<div data-cratestats=\"".concat(crateNum, "\">\n    <img src=\"./images/crate/").concat(getImg("crate", _crate2.id), "\" alt=\"\">\n    <p class=\"statscratesname\">").concat(getString("crate", _crate2.id), "</p>\n    <p class=\"statscratesseries\">").concat(getSeries(_crate2.series), "</p>\n    </div>");
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  DOM.stats.crates.container.innerHTML = tempHtml;
  document.querySelectorAll("[data-cratestats]").forEach(function (el) {
    el.addEventListener("pointerdown", function () {
      sound.play("btn");
    });
    el.addEventListener("click", function (evt) {
      sound.play("btnRelease");
      DOM.stats.container.style.display = "none";
      DOM.stats.crates.details.container.classList.add("visible");
      generateCrateDetails(el.dataset.cratestats);
    });
  });
} // Crate inventory


var showAllItems = false; // Debug variable - if set to true, will show items that were never unboxed as well

function generateCrateDetails(crate, el, saveObj, bonus) {
  var gridWidth = 0;
  var gridClass = "col0";
  var gridArray = ["col0", "col1", "col2", "col3"];
  var htmlEl = DOM.stats.crates.details;

  if (el != undefined) {
    htmlEl = el;
  }

  var saveObject = save;

  if (saveObj != undefined) {
    saveObject = saveObj;
  }

  htmlEl.content.innerHTML = "";

  function setGridWidth(width) {
    if (width > gridWidth) {
      gridWidth = width;
      gridClass = gridArray[width];
    }
  }

  var tempHTML = "";

  if (crate === "bonus" || bonus === true) {
    if (el === undefined) {
      htmlEl.image.src = "./images/item/".concat(getImg("item", 24));
      htmlEl.title.innerHTML = "<p>".concat(getString("ui", 144), "</p>");
      htmlEl.crateStats.innerHTML = "<p>".concat(getString("ui", 143), " ").concat(saveObject.stats["bonus-unboxed"], "</p>");
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = saveObject.bonusItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _item = _step4.value;
        var urlOptions = {
          item: _item.i,
          quality: "unique",
          wear: 0
        };
        var steamMarketUrl = generateSteamMarketUrl(urlOptions);
        var backpackUrl = generateBackpackTfUrl(urlOptions);
        var marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
        tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(getString("item", _item.i), "</p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", _item.i), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(_item.n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    <a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(steamMarketUrl, "\"><i class=\"icon-steam\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  } else {
    var _urlOptions;

    var _steamMarketUrl;

    var _backpackUrl;

    var _marketplaceUrl;

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = cA[crate].loot.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _step5$value = _slicedToArray(_step5.value, 2),
            _index2 = _step5$value[0],
            _item4 = _step5$value[1];

        switch (_item4.quality) {
          case 1:
          case 2:
          case 3:
          case 7:
          case 12:
            if (saveObject.crates[crate][_index2].n === 0 && !showAllItems) {
              continue;
            }

            var _itemImg = void 0,
                _kitImg = void 0,
                _itemName4 = void 0;

            _itemImg = _kitImg = _itemName4 = "";

            if (_item4.quality === 12) {
              _itemImg = "<img class=\"cratedetailsitemimg\" src=\"./images/item/".concat(getImg("item", 452), "\">");
              _kitImg = "<img class=\"cratedetailskitimg\" src=\"./images/item/".concat(getImg("item", _item4.id), "\">");
              _itemName4 = getString("item", 452).replace("#ITEM#", getString("item", _item4.id));
            } else {
              _itemImg = "<img class=\"cratedetailsitemimg\" src=\"./images/item/".concat(getImg("item", _item4.id), "\">");
              _itemName4 = getString("item", _item4.id);
            }

            var borderColor = "bordercolor ";

            switch (_item4.quality) {
              case 2:
                borderColor += "colorstrange";
                break;

              case 3:
                borderColor = "colorhaunted";
                break;

              default:
                borderColor = "colorunique";
            }

            _urlOptions = {
              item: _item4.id,
              wear: 0
            };

            switch (_item4.quality) {
              case 1:
              case 7:
                _urlOptions.quality = "unique";
                break;

              case 2:
                _urlOptions.quality = "strange";
                break;

              case 3:
                _urlOptions.quality = "haunted";
                break;

              case 12:
                _urlOptions.quality = "strangifier";
                break;
            }

            if (_urlOptions.quality != "unique" || globalBonusItemArray.includes(_item4.id) || paintBonusArray.includes(_item4.id) || strangePartBonusArray.includes(_item4.id) || steamMarketWhitelist.includes(_item4.id)) {
              _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
            } else {
              _steamMarketUrl = "<a class=\"btn btndisabled\"><i class=\"icon-steam\"></i></a>";
            }

            _backpackUrl = generateBackpackTfUrl(_urlOptions);
            _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
            tempHTML += "<div class=\"".concat(borderColor, "\">\n                    <p class=\"cratedetailsitemname\">").concat(_itemName4, "</p>\n                    ").concat(_itemImg).concat(_kitImg, "\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][_index2].n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
            break;

          case 4:
          case 8:
          case 9:
          case 10:
            if (saveObject.crates[crate][_index2].n === 0 && saveObject.crates[crate][_index2].q === 0 && !showAllItems) {
              continue;
            }

            setGridWidth(2);
            var qualityString = void 0,
                gradeClass = void 0;

            if (_item4.quality == 8) {
              qualityString = "<p class=\"colorstrange\">".concat(getString("ui", 71), " <span class=\"colorhaunted\">").concat(getString("ui", 72), ":</span></p>");
            } else {
              qualityString = "<p class=\"colorstrange\">".concat(getString("ui", 71), ":</p>");
            }

            if (_item4.grade != 0) {
              gradeClass = " class=\"bordercolor ".concat(gradeTable[_item4.grade], "\"");
            } else {
              gradeClass = "";
            }

            _urlOptions = {
              item: _item4.id,
              quality: "unique",
              wear: 0
            };

            if (_item4.grade != 0 || steamMarketWhitelist.includes(_item4.id)) {
              _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
            } else {
              _steamMarketUrl = "<a class=\"btn btndisabled\"><i class=\"icon-steam\"></i></a>";
            }

            _backpackUrl = generateBackpackTfUrl(_urlOptions);
            _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
            tempHTML += "<div".concat(gradeClass, ">\n                    <p class=\"cratedetailsitemname\">").concat(getString("item", _item4.id), "</p>\n                    <div>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", _item4.id), "\">\n                        <div class=\"cratedetailsqualitylist\">\n                            <p class=\"colorunique\">").concat(getString("ui", 146), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].n, "</p>\n                            ").concat(qualityString, "\n                            <p>").concat(saveObject.crates[crate][_index2].q, "</p>\n                        </div>\n                    </div>\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][_index2].n + saveObject.crates[crate][_index2].q, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
            break;

          case 5:
          case 6:
            var noItems = true;

            for (var variant in saveObject.crates[crate][_index2]) {
              if (saveObject.crates[crate][_index2][variant] != 0 || showAllItems) {
                noItems = false;
                break;
              }
            }

            if (noItems) {
              continue;
            }

            setGridWidth(3);
            var gradeClass2 = void 0;

            if (_item4.grade != 0) {
              gradeClass2 = " class=\"bordercolor ".concat(gradeTable[_item4.grade], "\"");
            } else {
              gradeClass2 = "";
            }

            var strangeList = "";
            var saveItem = saveObject.crates[crate][_index2];
            var itemTotal = saveItem.FN + saveItem.MW + saveItem.FT + saveItem.WW + saveItem.BS;

            if (_item4.quality === 6) {
              strangeList = "<div class=\"cratedetailsqualitylist\">\n                        <p class=\"colorstrange\">".concat(getString("ui", 80), ":</p>\n                        <p>").concat(saveObject.crates[crate][_index2].FNq, "</p>\n                        <p class=\"colorstrange\">").concat(getString("ui", 81), ":</p>\n                        <p>").concat(saveObject.crates[crate][_index2].MWq, "</p>\n                        <p class=\"colorstrange\">").concat(getString("ui", 82), ":</p>\n                        <p>").concat(saveObject.crates[crate][_index2].FTq, "</p>\n                        <p class=\"colorstrange\">").concat(getString("ui", 83), ":</p>\n                        <p>").concat(saveObject.crates[crate][_index2].WWq, "</p>\n                        <p class=\"colorstrange\">").concat(getString("ui", 84), ":</p>\n                        <p>").concat(saveObject.crates[crate][_index2].BSq, "</p>\n                        </div>");
              itemTotal += saveItem.FNq + saveItem.MWq + saveItem.FTq + saveItem.WWq + saveItem.BSq;
            }

            tempHTML += "<div".concat(gradeClass2, ">\n                    <p class=\"cratedetailsitemname\">").concat(getString("item", _item4.id), "</p>\n                    <div>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/skins/FN").concat(getImg("item", _item4.id), "\">\n                        <div class=\"cratedetailsqualitylist\">\n                            <p class=\"colorunique\">").concat(getString("ui", 80), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].FN, "</p>\n                            <p class=\"colorunique\">").concat(getString("ui", 81), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].MW, "</p>\n                            <p class=\"colorunique\">").concat(getString("ui", 82), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].FT, "</p>\n                            <p class=\"colorunique\">").concat(getString("ui", 83), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].WW, "</p>\n                            <p class=\"colorunique\">").concat(getString("ui", 84), ":</p>\n                            <p>").concat(saveObject.crates[crate][_index2].BS, "</p>\n                        </div>\n                        ").concat(strangeList, "\n                    </div>\n                    <p class=\"cratedetailsitemunboxed cratedetailsitemnomarket\">").concat(getString("ui", 53), " ").concat(itemTotal, " ").concat(getString("ui", 54), "</p>\n                    </div>");
            break;

          case 11:
            if (saveObject.crates[crate][_index2].n === 0 && saveObject.crates[crate][_index2].s.length === 0 && saveObject.crates[crate][_index2].p.length === 0 && !showAllItems) {
              continue;
            }

            setGridWidth(1);

            if (saveObject.crates[crate][_index2].n != 0) {
              var _itemName5 = getString("item", 764).replace("#ITEM#", getString("item", _item4.id));

              _urlOptions = {
                item: _item4.id,
                quality: "unique",
                wear: 0,
                kit: 1
              };
              _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
              _backpackUrl = generateBackpackTfUrl(_urlOptions);
              _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
              tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName5, "</p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 764), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item4.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][_index2].n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
            }

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
              for (var _iterator10 = saveObject.crates[crate][_index2].s[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var _specKit = _step10.value;
                _urlOptions = {
                  item: _item4.id,
                  quality: "unique",
                  wear: 0,
                  kit: 2
                };
                _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
                _backpackUrl = generateBackpackTfUrl(_urlOptions);
                _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);

                var _itemName6 = getString("item", 765).replace("#ITEM#", getString("item", _item4.id));

                tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName6, "<br>\n                    <span class=\"cratedetailskillstreak\">").concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[_specKit.s]), "</span></p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 765), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item4.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(_specKit.n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
              }
            } catch (err) {
              _didIteratorError10 = true;
              _iteratorError10 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                  _iterator10["return"]();
                }
              } finally {
                if (_didIteratorError10) {
                  throw _iteratorError10;
                }
              }
            }

            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
              for (var _iterator11 = saveObject.crates[crate][_index2].p[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                var _proKit = _step11.value;
                _urlOptions = {
                  item: _item4.id,
                  quality: "unique",
                  wear: 0,
                  kit: 3
                };
                _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
                _backpackUrl = generateBackpackTfUrl(_urlOptions);
                _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);

                var _itemName7 = getString("item", 766).replace("#ITEM#", getString("item", _item4.id));

                tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName7, "<br>\n                    <span class=\"cratedetailskillstreak\">").concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[_proKit.s]), "<br>\n                    ").concat(getString("ui", 127), " ").concat(getString("ui", killstreakerTable[_proKit.k]), "</span></p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 766), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item4.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(_proKit.n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
              }
            } catch (err) {
              _didIteratorError11 = true;
              _iteratorError11 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                  _iterator11["return"]();
                }
              } finally {
                if (_didIteratorError11) {
                  throw _iteratorError11;
                }
              }
            }

            break;
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    if (cA[crate].exclusiveBonus) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = cA[crate].exclusiveBonus.loot.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = _slicedToArray(_step6.value, 2),
              index = _step6$value[0],
              _item2 = _step6$value[1];

          var bonusItemIndex = cA[crate].loot.length + index;

          if (saveObject.crates[crate][bonusItemIndex].n === 0 && !showAllItems) {
            continue;
          }

          _urlOptions = {
            item: _item2,
            quality: "unique",
            wear: 0
          };
          _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
          _backpackUrl = generateBackpackTfUrl(_urlOptions);
          _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
          tempHTML += "<div class=\"bordercolor colorunique\">\n                <p class=\"cratedetailsitemname\">".concat(getString("item", _item2), "</p>\n                <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", _item2), "\">\n                <div class=\"cratedetailsitembottom\">\n                <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][bonusItemIndex].n, " ").concat(getString("ui", 54), "</p>\n                <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                </div>");
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    if (cA[crate].creepyBonus) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = creepyCrateBonusArray.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _step7$value = _slicedToArray(_step7.value, 2),
              _index = _step7$value[0],
              _item3 = _step7$value[1];

          var _bonusItemIndex = cA[crate].loot.length + _index;

          if (_item3.quality == 11) {
            if (saveObject.crates[crate][_bonusItemIndex].n === 0 && saveObject.crates[crate][_bonusItemIndex].s.length === 0 && saveObject.crates[crate][_bonusItemIndex].p.length === 0 && !showAllItems) {
              continue;
            }

            setGridWidth(1);

            if (saveObject.crates[crate][_bonusItemIndex].n != 0) {
              _urlOptions = {
                item: _item3.id,
                quality: "unique",
                wear: 0,
                kit: 1
              };
              _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
              _backpackUrl = generateBackpackTfUrl(_urlOptions);
              _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
              var itemName = getString("item", 764).replace("#ITEM#", getString("item", _item3.id));
              tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(itemName, "</p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 764), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item3.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][_bonusItemIndex].n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
            }

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = saveObject.crates[crate][_bonusItemIndex].s[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var specKit = _step8.value;
                _urlOptions = {
                  item: _item3.id,
                  quality: "unique",
                  wear: 0,
                  kit: 2
                };
                _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
                _backpackUrl = generateBackpackTfUrl(_urlOptions);
                _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);

                var _itemName = getString("item", 765).replace("#ITEM#", getString("item", _item3.id));

                tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName, "<br>\n                    <span class=\"cratedetailskillstreak\">").concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[specKit.s]), "</span></p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 765), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item3.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(specKit.n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }

            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
              for (var _iterator9 = saveObject.crates[crate][_bonusItemIndex].p[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var proKit = _step9.value;
                _urlOptions = {
                  item: _item3.id,
                  quality: "unique",
                  wear: 0,
                  kit: 3
                };
                _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
                _backpackUrl = generateBackpackTfUrl(_urlOptions);
                _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);

                var _itemName2 = getString("item", 766).replace("#ITEM#", getString("item", _item3.id));

                tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName2, "<br>\n                    <span class=\"cratedetailskillstreak\">").concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[proKit.s]), "<br>\n                    ").concat(getString("ui", 127), " ").concat(getString("ui", killstreakerTable[proKit.k]), "</span></p>\n                    <img class=\"cratedetailsitemimg\" src=\"./images/item/").concat(getImg("item", 766), "\">\n                    <img class=\"cratedetailskitimg\" src=\"./images/item/").concat(getImg("item", _item3.id), "\">\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(proKit.n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
              }
            } catch (err) {
              _didIteratorError9 = true;
              _iteratorError9 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                  _iterator9["return"]();
                }
              } finally {
                if (_didIteratorError9) {
                  throw _iteratorError9;
                }
              }
            }
          } else {
            if (saveObject.crates[crate][_bonusItemIndex].n === 0 && !showAllItems) {
              continue;
            }

            _urlOptions = {
              item: _item3.id,
              quality: "strangifier",
              wear: 0
            };
            _steamMarketUrl = "<a class=\"btn tooltiptop\" data-tooltip=\"".concat(getString("ui", 197), "\" data-tooltipstring=\"197\" target=\"_blank\" rel=\"noopener\" href=\"").concat(generateSteamMarketUrl(_urlOptions), "\"><i class=\"icon-steam\"></i></a>");
            _backpackUrl = generateBackpackTfUrl(_urlOptions);
            _marketplaceUrl = generateMarketplaceTfUrl(_urlOptions);
            var itemImg = "<img class=\"cratedetailsitemimg\" src=\"./images/item/".concat(getImg("item", 452), "\">");
            var kitImg = "<img class=\"cratedetailskitimg\" src=\"./images/item/".concat(getImg("item", _item3.id), "\">");

            var _itemName3 = getString("item", 452).replace("#ITEM#", getString("item", _item3.id));

            tempHTML += "<div class=\"bordercolor colorunique\">\n                    <p class=\"cratedetailsitemname\">".concat(_itemName3, "</p>\n                    ").concat(itemImg).concat(kitImg, "\n                    <div class=\"cratedetailsitembottom\">\n                    <p class=\"cratedetailsitemunboxed\">").concat(getString("ui", 53), " ").concat(saveObject.crates[crate][_bonusItemIndex].n, " ").concat(getString("ui", 54), "</p>\n                    <div class=\"cratedetailsitemmarketbtns\">\n                    ").concat(_steamMarketUrl, "<a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 198), "\" data-tooltipstring=\"198\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_backpackUrl, "\"><i class=\"icon-backpacktf\"></i></a><a class=\"btn tooltiptop\" data-tooltip=\"").concat(getString("ui", 199), "\" data-tooltipstring=\"199\" target=\"_blank\" rel=\"noopener\" href=\"").concat(_marketplaceUrl, "\"><i class=\"icon-marketplacetf\"></i></a>\n                    </div>\n                    </div>\n                    </div>");
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }

    if (el === undefined) {
      htmlEl.image.src = "./images/crate/".concat(getImg("crate", cA[crate].id));
      htmlEl.title.innerHTML = "<p>".concat(getString("crate", cA[crate].id), "</p>\n        <p>").concat(getSeries(cA[crate].series), "</p>");
      var stats = "<p>".concat(getString("ui", 53), " ").concat(saveObject.crateStats[crate].n, " ").concat(getString("ui", 54), "</p>");

      if (saveObject.crateStats[crate].u != undefined) {
        stats += "<p>".concat(getString("ui", 40), " ").concat(saveObject.crateStats[crate].u, "</p>");
      }

      if (saveObject.crateStats[crate].b != undefined) {
        stats += "<p>".concat(getString("ui", 143), " ").concat(saveObject.crateStats[crate].b, "</p>");
      }

      htmlEl.crateStats.innerHTML = stats;
    }
  }

  htmlEl.content.removeAttribute("class");
  htmlEl.content.classList.add(gridClass);
  htmlEl.content.innerHTML = tempHTML;
} // Keyboard events


document.addEventListener('keydown', function (event) {
  if (DOM.main.crateWindow.classList.contains("showsearch") && event.code == 'Enter') {
    selectFirstCrateFromSearch();
  } else if (event.code == 'Enter' || event.code == 'Space') {
    if (!unboxStop && canUnbox && inDetailsMode) {
      sound.play("btn");
      exitGridView();
      beginUnbox();
    }

    return 0;
  } else if (event.code == "ArrowLeft" || event.code == "KeyA") {
    if (!unboxStop && canUnbox && inDetailsMode) {
      sound.play("btn");
      jumpToCrate("previous");
    }
  } else if (event.code == "ArrowRight" || event.code == "KeyD") {
    if (!unboxStop && canUnbox && inDetailsMode) {
      sound.play("btn");
      jumpToCrate("next");
    }
  }

  ;
}); // Languages

var language = "eng";
var dataObj = {
  "item": dataItems,
  "crate": dataCrates,
  "effect": dataEffects,
  "ui": dataUi
};

function getString(type, id) {
  if (dataObj[type][id][language] == undefined) {
    // If the string does not exist in current language, return it in English instead
    if (dataObj[type][id].eng != undefined) {
      return dataObj[type][id].eng;
    } else {
      return "Invalid name! Please report this";
    }
  } else {
    return dataObj[type][id][language];
  }
}

function getEngString(type, id) {
  return dataObj[type][id].eng;
}

function getImg(type, id) {
  return dataObj[type][id].img + imageSupport;
}

function getSchema(type, id) {
  return dataObj[type][id].schema;
}

function getSchema2(type, id) {
  if (dataObj[type][id].schema2 != undefined) {
    return dataObj[type][id].schema2;
  } else {
    return false;
  }
}

var strangeStringPosition = "left"; // Whether the "Strange" string in item names should appear before or after the item name

function changeLanguage(lang) {
  language = lang;
  localStorage.setItem("unboxertf-languagechanged", "true");
  unusualsGenerated = false;
  document.querySelectorAll("[data-string]").forEach(function (item) {
    item.innerHTML = getString("ui", item.dataset.string);
  });
  document.querySelectorAll("[data-tooltipstring]").forEach(function (item) {
    item.dataset.tooltip = getString("ui", item.dataset.tooltipstring);
  });
  document.querySelectorAll("[data-placeholderstring]").forEach(function (item) {
    item.placeholder = getString("ui", item.dataset.placeholderstring);
  });
  DOM.stats.statistics.tab.innerHTML = getString("ui", DOM.stats.statistics.container.querySelector(".statvisible").dataset.statstring);

  switch (lang) {
    case "pol":
      strangeStringPosition = "right";
      break;

    default:
      strangeStringPosition = "left";
  }

  switch (lang) {
    case "eng":
      document.documentElement.lang = "en";
      break;

    case "pol":
      document.documentElement.lang = "pl";
      break;

    case "fre":
      document.documentElement.lang = "fr";
      break;

    case "sch":
      document.documentElement.lang = "zh-Hans";
      break;

    case "bra":
      document.documentElement.lang = "pt-BR";
      break;

    case "cze":
      document.documentElement.lang = "cs";
      break;

    case "hun":
      document.documentElement.lang = "hu";
      break;
  }

  jumpToCrate(currentCrate);
  generateGrid();
  crateStatsGenerated = false;
  generateCrateStats();
} // Crate series


function getSeries(id) {
  if (id == 0) {
    return getString("ui", 76);
  } else {
    return getString("ui", 75).replace("(NUM)", id);
  }
} // Sound


var sound = {
  btn: new Audio("./sound/btn.mp3"),
  btnRelease: new Audio("./sound/btnrelease.mp3"),
  crateOpen: new Audio("./sound/crateopen.mp3"),
  wrapOpen: new Audio("./sound/wrapopen.mp3"),
  roboCrateOpen: new Audio("./sound/robocrateopen.mp3"),
  unboxed: new Audio("./sound/unboxed.mp3"),
  unusualUnboxed: new Audio("./sound/unusualunboxed.mp3"),
  play: function play(id) {
    if (save.options.muteSound) {
      return;
    }

    if (sound[id].paused) {
      sound[id].play();
    } else {
      sound[id].currentTime = 0;
    }
  }
};
DOM.main.muteSoundBtn.addEventListener("click", function () {
  if (!save.options.muteSound) {
    save.options.muteSound = true;
    DOM.main.muteSoundBtn.innerHTML = '<i class="icon-mute"></i>';
    localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
  } else {
    save.options.muteSound = false;
    DOM.main.muteSoundBtn.innerHTML = '<i class="icon-speaker"></i>';
    localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
    sound.play("btnRelease");
  }
});
var _iteratorNormalCompletion12 = true;
var _didIteratorError12 = false;
var _iteratorError12 = undefined;

try {
  var _loop2 = function _loop2() {
    var el = _step12.value;
    el.addEventListener("pointerdown", function () {
      if (!el.classList.contains("btndisabled")) {
        sound.play("btn");
      }
    });
    el.addEventListener("click", function () {
      if (!el.classList.contains("btndisabled")) {
        sound.play("btnRelease");
      }
    });
  };

  for (var _iterator12 = document.getElementsByClassName("btn")[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
    _loop2();
  } // Previous/next crate buttons

} catch (err) {
  _didIteratorError12 = true;
  _iteratorError12 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
      _iterator12["return"]();
    }
  } finally {
    if (_didIteratorError12) {
      throw _iteratorError12;
    }
  }
}

function jumpToCrate(param) {
  switch (param) {
    case "next":
      if (currentCrate == crateOrder[crateOrder.length - 1]) {
        currentCrate = 0;
      } else {
        currentCrate += 1;
      }

      break;

    case "previous":
      if (currentCrate == 0) {
        currentCrate = crateOrder[crateOrder.length - 1];
      } else {
        currentCrate -= 1;
      }

      break;

    case "random":
      currentCrate = Math.floor(Math.random() * (crateOrder.length - 1)) + 1;
      break;

    default:
      // Jump to specific crate
      currentCrate = param;
      break;
  }

  currentCrateObj = cA[crateOrder[currentCrate]];
  DOM.main.crateName.innerHTML = getString("crate", currentCrateObj.id);
  DOM.main.series.innerHTML = getSeries(currentCrateObj.series);
  DOM.main.img.src = "./images/crate/" + getImg("crate", currentCrateObj.id);
  DOM.main.lootList.innerHTML = "";
  DOM.main.effectsList.innerHTML = "";
  generateLootList();
  generateEffectList();
}

DOM.main.nextCrateBtn.addEventListener("click", function () {
  jumpToCrate("next");
});
DOM.main.previousCrateBtn.addEventListener("click", function () {
  jumpToCrate("previous");
}); // Generate loot list

function generateLootList() {
  var html = [];
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = currentCrateObj.loot[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var _item5 = _step13.value;
      var itemClass = "";
      var itemName = "";

      switch (_item5.quality) {
        case 11:
          itemName = getString("item", 764).replace("#ITEM#", getString("item", _item5.id));
          break;

        case 12:
          itemName = getString("item", 452).replace("#ITEM#", getString("item", _item5.id));
          break;

        default:
          itemName = getString("item", _item5.id);
      }

      if (gradeTable[_item5.grade] != 0) {
        itemClass = " class=\"".concat(gradeTable[_item5.grade], "\"");
      }

      html.push("<li".concat(itemClass, ">").concat(itemName, "</li>"));
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  ;

  if (currentCrateObj.unusual === 1) {
    html.push("<li class=\"unusualloot\">".concat(getString("ui", 74), "</li>"));
  }

  DOM.main.lootList.innerHTML = html.join('');
  var bonusHTML = [];

  if (currentCrateObj.bonus) {
    bonusHTML.push("<p>".concat(getString("ui", 147), "</p>"));
  }

  if (currentCrateObj.exclusiveBonus) {
    bonusHTML.push("<p>".concat(getString("ui", 148), "</p><ul>"));
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = currentCrateObj.exclusiveBonus.loot[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var _bonusItem2 = _step14.value;
        bonusHTML.push("<li>".concat(getString("item", _bonusItem2), "</li>"));
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
          _iterator14["return"]();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }

    bonusHTML.push("</ul>");
  }

  if (currentCrateObj.creepyBonus) {
    bonusHTML.push("<p>".concat(getString("ui", 148), "</p><ul>"));
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = creepyCrateBonusArray[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var _bonusItem3 = _step15.value;

        if (_bonusItem3.quality == 12) {
          bonusHTML.push("<li>".concat(getString("item", 452).replace("#ITEM#", getString("item", _bonusItem3.id)), "</li>"));
        } else {
          bonusHTML.push("<li>".concat(getString("item", 764).replace("#ITEM#", getString("item", _bonusItem3.id)), "</li>"));
        }
      }
    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
          _iterator15["return"]();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }

    bonusHTML.push("</ul>");
  }

  DOM.main.lootBonus.innerHTML = bonusHTML.join('');

  if (currentCrateObj.note > 0) {
    DOM.main.lootNote.innerHTML = getString("ui", currentCrateObj.note);
  } else {
    DOM.main.lootNote.innerHTML = "";
  }
} // Generate effect list


function generateEffectList() {
  var html = [];
  var effectsArray;

  if (!["none", null, undefined].includes(save.options.halloweenMode) && halloweenModeCrateList[save.options.halloweenMode].includes(currentCrate)) {
    switch (save.options.halloweenMode) {
      case "hw11":
        effectsArray = hw11FX;
        break;

      case "hw12":
        effectsArray = hw12FX;
        break;

      case "hw13":
        effectsArray = hw13FX;
        break;

      case "hw14":
        effectsArray = hw14FX;
        break;

      case "hw16":
        effectsArray = hw16FX;
        break;

      case "hw17":
        effectsArray = hw17FX;
        break;

      case "hw18":
        effectsArray = hw18FX;
        break;

      case "hw19":
        effectsArray = hw19FX;
        break;

      case "hw20":
        effectsArray = hw20FX;
        break;

      case "xmas19":
        effectsArray = xmas19FX;
        break;

      case "xmas20":
        effectsArray = xmas20FX;
        break;
    }
  } else {
    effectsArray = currentCrateObj.effects;
  }

  for (var _i3 = 0; _i3 < effectsArray.length; _i3++) {
    html.push("<li>".concat(getString("effect", effectsArray[_i3]), "</li>"));
  }

  DOM.main.effectsList.innerHTML = html.join('');

  if (effectsArray.length > 0) {
    DOM.main.effectsTitle.innerHTML = getString("ui", 31);
  } else {
    DOM.main.effectsTitle.innerHTML = getString("ui", 32);
  }
}

function crateHasUnusual(crate) {
  if (crate.loot[crate.loot.length - 1].id == 0) {
    return true;
  } else {
    return false;
  }
}

;

function crateHasRandomStranges(crate) {
  var result = false;
  var _iteratorNormalCompletion16 = true;
  var _didIteratorError16 = false;
  var _iteratorError16 = undefined;

  try {
    for (var _iterator16 = crate.loot[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
      var _item6 = _step16.value;

      if ([4, 6, 8, 9, 10].includes(_item6.quality)) {
        result = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError16 = true;
    _iteratorError16 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
        _iterator16["return"]();
      }
    } finally {
      if (_didIteratorError16) {
        throw _iteratorError16;
      }
    }
  }

  return result;
}
/* Generate Steam Market / backpack.tf / marketplace.tf URLs for items
Parameters:

item - item id
effect - unusual effect
quality - item quality
wear - item wear
kit - killstreak kit level
kitItem - item for strangifier/killstreak kit/unusualifier
*/


function generateSteamMarketUrl(arg) {
  if (arg.quality == undefined) {
    arg.quality = "";
  }

  var steamUrlItemName = "".concat(getEngString("item", arg.item).replace("| ", ""));

  if (arg.kit) {
    switch (arg.kit) {
      case 1:
        steamUrlItemName = getEngString("item", 764).replace("#ITEM#", getEngString("item", arg.item));
        break;

      case 2:
        steamUrlItemName = getEngString("item", 765).replace("#ITEM#", getEngString("item", arg.item));
        break;

      case 3:
        steamUrlItemName = getEngString("item", 766).replace("#ITEM#", getEngString("item", arg.item));
        break;
    }
  } else if (arg.quality == "strangifier") {
    steamUrlItemName = getEngString("item", 452).replace("#ITEM#", getEngString("item", arg.item));
  } else if (arg.item == 770) {
    steamUrlItemName = steamUrlItemName.replace("#ITEM#", getEngString("item", arg.kitItem));
  }

  if (arg.quality.includes("unusual")) {
    steamUrlItemName = "Unusual " + steamUrlItemName;
  }

  if (arg.quality.includes("haunted")) {
    steamUrlItemName = "Haunted " + steamUrlItemName;
  }

  if (arg.quality.includes("strange")) {
    steamUrlItemName = "Strange " + steamUrlItemName;
  }

  if (arg.wear != 0) {
    steamUrlItemName += " (".concat(getEngString("ui", wearTableNames[arg.wear]), ")");
  }

  return encodeURI("https://steamcommunity.com/market/listings/440/".concat(steamUrlItemName));
}

function generateBackpackTfUrl(arg) {
  var bpItemName = getEngString("item", arg.item);

  if (arg.item == 770) {
    bpItemName = bpItemName.replace("#ITEM# ", "");
  } else if (arg.wear != 0) {
    bpItemName += " (".concat(getEngString("ui", wearTableNames[arg.wear]), ")");
  } else if (arg.quality == "strangifier") {
    bpItemName = getEngString("item", 452).replace("#ITEM# ", "");
  } else if (arg.kit) {
    switch (arg.kit) {
      case 1:
        bpItemName = getEngString("item", 764).replace("#ITEM# ", "");
        break;

      case 2:
        bpItemName = getEngString("item", 765).replace("#ITEM# ", "");
        break;

      case 3:
        bpItemName = getEngString("item", 766).replace("#ITEM# ", "");
        break;
    }
  }

  bpItemName = bpItemName.replace("War Paint", "| War Paint");
  var bpQuality = "";

  switch (arg.quality) {
    case "unusual":
    case "unusualunique":
      bpQuality = "Unusual";
      break;

    case "strangeunusual":
    case "unusualstrange":
      bpQuality = "Strange Unusual";
      break;

    case "strange":
      bpQuality = "Strange";
      break;

    case "haunted":
      bpQuality = "Haunted";
      break;

    case "strangehaunted":
      bpQuality = "Strange Haunted";
      break;

    case "unique":
    case "strangifier":
      if (arg.wear != 0) {
        bpQuality = "Decorated Weapon";
      } else {
        bpQuality = "Unique";
      }

      break;

    default:
      if (arg.wear != 0) {
        bpQuality = "Decorated Weapon";
      } else {
        console.warn("Unknown Bptf quality: ".concat(arg.quality));
      }

  }

  var bpCraftable = "Craftable";

  if (arg.item == 770 || arg.kit) {
    bpCraftable = "Non-Craftable";
  }

  var bpEffect;

  if (arg.item == 770) {
    bpEffect = getSchema("item", arg.kitItem);
  } else if (arg.quality.includes("unusual")) {
    bpEffect = getSchema("effect", arg.effect);
  } else if (arg.quality == "strangifier") {
    bpEffect = getSchema("item", arg.item);
  } else {
    bpEffect = "";
  }

  var bpKit;

  if (arg.kit) {
    bpKit = "".concat(arg.kit, "-").concat(getSchema("item", arg.item));
  } else {
    bpKit = "";
  }

  var bpUrl = "".concat(bpQuality, "/").concat(bpItemName, "/Tradable/").concat(bpCraftable, "/").concat(bpEffect).concat(bpKit);
  return encodeURI("https://backpack.tf/stats/".concat(bpUrl));
} // schema1 / quality / effect / uncraftable / kitlevel / kititem / wear / schema2


function generateMarketplaceTfUrl(arg) {
  var itemId;

  if (arg.quality == "strangifier") {
    itemId = getSchema2("item", arg.item);

    if (itemId === false) {
      itemId = getSchema("item", 452);
    }
  } else if (arg.kit) {
    switch (arg.kit) {
      case 1:
        itemId = getSchema("item", 764);
        break;

      case 2:
        itemId = getSchema("item", 765);
        break;

      case 3:
        itemId = getSchema("item", 766);
        break;
    }
  } else {
    itemId = getSchema("item", arg.item);
  }

  var quality;

  switch (arg.quality) {
    case "unusual":
    case "strangeunusual":
    case "unusualstrange":
    case "unusualunique":
      quality = 5;
      break;

    case "unique":
    case "strangifier":
      quality = 6;
      break;

    case "strange":
      quality = 11;
      break;

    case "haunted":
    case "strangehaunted":
      quality = 13;
      break;

    default:
      if (arg.wear != 0) {
        quality = 15;
      } else {
        console.warn("Unknown Mptf quality: " + arg.quality);
      }

  }

  var effect = "";

  if (arg.effect != undefined) {
    effect = "u".concat(getSchema("effect", arg.effect), ";");
  }

  var wear = "";

  if (arg.wear != 0) {
    wear = "w".concat(arg.wear, ";");
  }

  var extraQuality = "";

  if ([5, 13, 15].includes(quality) && arg.quality.includes("strange")) {
    extraQuality = "strange;";
  }

  var craftable = "";

  if (arg.kit || arg.item == 770) {
    craftable = "uncraftable;";
  }

  var kitLevel = "";

  switch (arg.kit) {
    case 1:
      kitLevel = "kt-1;";
      break;

    case 2:
      kitLevel = "kt-2;";
      break;

    case 3:
      kitLevel = "kt-3;";
      break;
  }

  var kitItem = "";

  if (arg.kit || arg.quality == "strangifier") {
    kitItem = "td-".concat(getSchema("item", arg.item), ";");
  } else if (arg.kitItem) {
    kitItem = "td-".concat(getSchema("item", arg.kitItem), ";");
  }

  var wpId = "";

  if (arg.wear != 0) {
    wpId = getSchema2("item", arg.item);

    if (wpId === false) {
      wpId = "pk".concat(getSchema("item", arg.item).toString().slice(-3));
    } else {
      wpId = "pk".concat(wpId);
    }
  }

  var link = "https://marketplace.tf/items/tf2/".concat(itemId, ";").concat(quality, ";").concat(effect).concat(craftable).concat(wear).concat(wpId).concat(extraQuality).concat(kitLevel).concat(kitItem);

  if (link[link.length - 1] == ";") {
    link = link.slice(0, -1);
  }

  return encodeURI(link);
} // Unboxing code


function unbox() {
  // This function handles the unboxing itself: which item is unboxed, what are its qualities, wear, effect etc.
  var randomNumber, unusualRandomNumber, itemId, itemWear, itemEffect, itemKillstreak, bonusDrops, cratePos;
  var itemQuality = [];

  try {
    var _crate3 = currentCrateObj;
    randomNumber = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000

    unusualRandomNumber = Math.floor(Math.random() * 150 + 1); // Between 1 and 150

    var tempNumber = 0; // Select item from crate

    var crateItem;

    if (_crate3.unusual && (unusualRandomNumber === 1 || save.options.forceUnusual)) {
      // 0.66% chance
      // Item is a random unusual. Pick a random unusual, then assign Unusual (and Strange if applicable) qualities
      var unusualArray = [];

      (function () {
        switch (_crate3.unusual) {
          case 1:
            // Pick a random unusual from the general unusual pool
            unusualArray = unusualPool.slice();

            if (currentCrate === 96 && save.options.eotlGlitch) {
              unusualArray.push(916, 917, 918);
            }

            ;

            if (currentCrateObj.series >= 1 && currentCrateObj.series <= 55 && save.options.sniperVsSpyUnusuals) {
              unusualArray.push(1354, 1359, 1370, 62, 158, 194, 124, 70, 178);
            }

            itemId = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            crateItem = {
              id: itemId,
              quality: null
            };
            break;

          case 2:
            // Pick a random unusual from the same crate, which can have the Unusual quality. Items with higher grades have a smaller chance of being picked
            var gradeRandom;

            if (save.options.forceGrade) {
              gradeRandom = save.options.forceGradeNum;
            } else {
              gradeRandom = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

              if (gradeRandom <= 8) {
                // Elite - 0.8%
                gradeRandom = 6;
              } else if (gradeRandom <= 40) {
                // Assassin - 3.2%
                gradeRandom = 5;
              } else if (gradeRandom <= 200) {
                // Commando - 16%
                gradeRandom = 4;
              } else {
                // Mercnary - 80%
                gradeRandom = 3;
              }

              ;
            }

            while (unusualArray.length === 0) {
              unusualArray = _crate3.loot.filter(function (item) {
                return [6, 7, 9, 10].includes(item.quality) && item.grade == gradeRandom;
              });

              if (gradeRandom <= 2) {
                throw new Error();
              }

              gradeRandom--;
            }

            crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            itemId = crateItem.id;
            break;

          case 3:
            // Same as case 1, but items have equal chance of being picked instead
            unusualArray = _crate3.loot.filter(function (item) {
              return [6, 7, 9, 10].includes(item.quality);
            });
            crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
            itemId = crateItem.id;
            break;
        }
      })();

      itemQuality.push("unusual");
    } else {
      // Unbox something else
      (function () {
        switch (_crate3.autoChance) {
          case 1:
            var gradeRandom;

            if (save.options.forceGrade) {
              gradeRandom = save.options.forceGradeNum;
            } else {
              gradeRandom = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

              if (gradeRandom <= 8) {
                // Elite - 0.8%
                gradeRandom = 6;
              } else if (gradeRandom <= 40) {
                // Assassin - 3.2%
                gradeRandom = 5;
              } else if (gradeRandom <= 200) {
                // Commando - 16%
                gradeRandom = 4;
              } else {
                // Mercnary - 80%
                gradeRandom = 3;
              }

              ;
              if (_crate3.loot[0].grade === 1) gradeRandom -= 2;
            }

            var itemPool = [];

            while (itemPool.length === 0) {
              itemPool = _crate3.loot.filter(function (item) {
                return item.grade == gradeRandom;
              });

              if (gradeRandom <= 0) {
                throw new Error();
              }

              gradeRandom--;
            }

            var randomItemNumber = Math.floor(Math.random() * itemPool.length); // Between 0 and itemPool.length - 1

            crateItem = itemPool[randomItemNumber];
            cratePos = _crate3.loot.findIndex(function (it) {
              return it.id == crateItem.id;
            });
            break;

          case 2:
            var randomItemNumber2 = Math.floor(Math.random() * _crate3.loot.length); // Between 0 and crate.loot.length - 1

            crateItem = _crate3.loot[randomItemNumber2];
            cratePos = randomItemNumber2;
            break;

          default:
            randomNumber = Math.floor(Math.random() * 9900 + 1);

            for (var _item7 in _crate3.loot) {
              if (randomNumber > tempNumber && randomNumber <= tempNumber + _crate3.loot[_item7].chance) {
                crateItem = _crate3.loot[_item7]; // Create a copy of the item we unboxed. Otherwise, we may end up modifying the item in the crate

                cratePos = _item7;
                break;
              } else {
                tempNumber += _crate3.loot[_item7].chance;
              }
            }

            ;
        }
      })();
    }

    itemId = crateItem.id; // Handle random unusual items and item qualities

    var generateWear = false;

    if (crateItem.quality != null) {
      // Item is not a random unusual. Assign quality
      var qualityRandomNumber;

      switch (crateItem.quality) {
        case 0:
          itemQuality.push("unusual");
          break;

        case 1:
        case 7:
          itemQuality.push("unique");
          break;

        case 2:
          itemQuality.push("strange");
          break;

        case 3:
          itemQuality.push("haunted");
          break;

        case 4:
        case 9:
        case 10:
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

          if (qualityRandomNumber == 10 || save.options.forceStrange) {
            itemQuality.push("strange");
          } else {
            itemQuality.push("unique");
          }

          break;

        case 5:
          generateWear = true;
          break;

        case 6:
          generateWear = true;
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

          if (qualityRandomNumber == 10 || save.options.forceStrange) {
            itemQuality.push("strange");
          }

          ;
          break;

        case 8:
          qualityRandomNumber = Math.floor(Math.random() * 10 + 1); // Between 1 and 10

          if (qualityRandomNumber == 10 || save.options.forceStrange) {
            itemQuality.push("strange", "haunted");
          } else {
            itemQuality.push("unique");
          }

          break;

        case 11:
          itemQuality.push("unique");
          itemKillstreak = {
            sheen: null,
            killstreaker: null
          };
          qualityRandomNumber = Math.floor(Math.random() * 100 + 1);

          if (qualityRandomNumber > 65 || save.options.forceProKit) {
            // Pick sheen
            itemKillstreak.sheen = Math.floor(Math.random() * (sheenTable.length - 1) + 1);
          }

          if (qualityRandomNumber > 90 || save.options.forceProKit) {
            // Pick killstreaker
            itemKillstreak.killstreaker = Math.floor(Math.random() * (killstreakerTable.length - 1) + 1);
          }

          break;

        case 12:
          itemQuality.push("strangifier");
          break;
      }

      ;
    }

    ;

    if (itemQuality.length === 1) {
      itemQuality = itemQuality[0];
    } else {
      itemQuality = itemQuality.join("");
    } // Wear


    itemWear = 0;

    if (generateWear) {
      var randomWear = Math.floor(Math.random() * 10 + 1);

      switch (randomWear) {
        case 1:
          itemWear = 1;
          break;

        case 2:
        case 3:
          itemWear = 2;
          break;

        case 4:
        case 5:
        case 6:
        case 7:
          itemWear = 3;
          break;

        case 8:
        case 9:
          itemWear = 4;
          break;

        case 10:
          itemWear = 5;
          break;
      }
    } // Unusual effect


    itemEffect = 0;

    if (itemQuality.includes("unusual")) {
      var effectsArray;

      if (!["none", null, undefined].includes(save.options.halloweenMode) && halloweenModeCrateList[save.options.halloweenMode].includes(currentCrate)) {
        switch (save.options.halloweenMode) {
          case "hw11":
            effectsArray = hw11FX;
            break;

          case "hw12":
            effectsArray = hw12FX;
            break;

          case "hw13":
            effectsArray = hw13FX;
            break;

          case "hw14":
            effectsArray = hw14FX;
            break;

          case "hw16":
            effectsArray = hw16FX;
            break;

          case "hw17":
            effectsArray = hw17FX;
            break;

          case "hw18":
            effectsArray = hw18FX;
            break;

          case "hw19":
            effectsArray = hw19FX;
            break;

          case "hw20":
            effectsArray = hw20FX;
            break;

          case "xmas19":
            effectsArray = xmas19FX;
            break;

          case "xmas20":
            effectsArray = xmas20FX;
            break;
        }
      } else {
        effectsArray = _crate3.effects;
      }

      itemEffect = effectsArray[Math.floor(Math.random() * effectsArray.length)];
    }

    ; // Bonus drops

    bonusDrops = [];

    if (_crate3.bonus) {
      var bonusNum = 0;

      if (save.options.forceBonusItem) {
        bonusNum = 3;
      } else {
        bonusNum = 0;
        var bonusChance = Math.floor(Math.random() * 5 + 1); // Between 1 and 5

        if (bonusChance <= 2 || save.options.forceBonusItem) {
          // 40% chance to get bonus drop
          bonusNum++;
          bonusChance = Math.floor(Math.random() * 5 + 1); // Between 1 and 5

          if (bonusChance == 1) {
            // 20% chance to get another bonus drop 
            bonusNum++;
            bonusChance = Math.floor(Math.random() * 25 + 1); // Between 1 and 25

            if (bonusChance == 1) {
              // 4% chance
              bonusNum++;
            }
          }
        }
      }

      var oneExclusiveBonusUnboxed = false;

      for (; bonusNum > 0; bonusNum--) {
        var unusualifierChance = Math.floor(Math.random() * 1000 + 1); // Between 1 and 1000

        if (unusualifierChance <= 15 || save.options.forceUnusualifier) {
          // 1.5% chance
          // Unbox unusualifier
          var randomTaunt = Math.floor(Math.random() * unusualifierArray.length);
          bonusDrops.push({
            id: 770,
            taunt: unusualifierArray[randomTaunt]
          });
        } else {
          var unboxExclusive = false;

          if (_crate3.exclusiveBonus && !oneExclusiveBonusUnboxed) {
            var exclusiveBonusChance = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000

            if (exclusiveBonusChance <= _crate3.exclusiveBonus.chance) {
              unboxExclusive = true;

              if (_crate3.oneExclusiveBonus) {
                oneExclusiveBonusUnboxed = true;
              }
            }
          }

          if (unboxExclusive) {
            // Case exclusive bonus drop
            var randomBonus = Math.floor(Math.random() * _crate3.exclusiveBonus.loot.length);
            bonusDrops.push({
              id: _crate3.exclusiveBonus.loot[randomBonus]
            });
          } else {
            // Global bonus drop
            var _randomBonus = Math.floor(Math.random() * globalBonusItemArray.length);

            switch (globalBonusItemArray[_randomBonus]) {
              case "paint":
                // Pick random paint
                bonusDrops.push({
                  id: paintBonusArray[Math.floor(Math.random() * paintBonusArray.length)]
                });
                break;

              case "strangepart":
                // Pick random strange part
                bonusDrops.push({
                  id: strangePartBonusArray[Math.floor(Math.random() * strangePartBonusArray.length)]
                });
                break;

              default:
                bonusDrops.push({
                  id: globalBonusItemArray[_randomBonus]
                });
                break;
            }
          }
        }
      }
    } else if (_crate3.exclusiveBonus) {
      var _exclusiveBonusChance = Math.floor(Math.random() * 10000 + 1); // Between 1 and 10000


      if (_exclusiveBonusChance <= _crate3.exclusiveBonus.chance || save.options.forceBonusItem) {
        var _randomBonus2 = Math.floor(Math.random() * _crate3.exclusiveBonus.loot.length);

        bonusDrops.push({
          id: _crate3.exclusiveBonus.loot[_randomBonus2]
        });
      }
    }

    if (_crate3.creepyBonus) {
      var _bonusChance = Math.floor(Math.random() * 50 + 1); // Between 1 and 50


      if (_bonusChance === 1 || save.options.forceBonusItem) {
        // 2% chance
        var _randomBonus3 = Math.floor(Math.random() * creepyCrateBonusArray.length);

        var _itemKillstreak;

        if (creepyCrateBonusArray[_randomBonus3].quality === 11) {
          _itemKillstreak = {
            sheen: null,
            killstreaker: null
          };
          var randomKillstreak = Math.floor(Math.random() * 100 + 1);

          if (randomKillstreak > 65 || save.options.forceProKit) {
            // Pick sheen
            _itemKillstreak.sheen = Math.floor(Math.random() * (sheenTable.length - 1) + 1);
          }

          if (randomKillstreak > 90 || save.options.forceProKit) {
            // Pick killstreaker
            _itemKillstreak.killstreaker = Math.floor(Math.random() * (killstreakerTable.length - 1) + 1);
          }
        }

        bonusDrops.push({
          id: creepyCrateBonusArray[_randomBonus3].id,
          quality: creepyCrateBonusArray[_randomBonus3].quality,
          killstreak: _itemKillstreak
        });
      }
    } // Return item


    return {
      id: itemId,
      cratePos: cratePos,
      name: getString("item", itemId),
      quality: itemQuality,
      wear: itemWear,
      grade: crateItem.grade,
      effect: itemEffect,
      killstreak: itemKillstreak,
      bonus: bonusDrops
    };
  } catch (err) {
    var errorMessage = "Something went wrong when executing unbox().\n    Error stack: ".concat(err.stack, "\n\n    currentCrate: ").concat(currentCrate, "\n    randomNumber: ").concat(randomNumber, "\n    unusualRandomNumber: ").concat(unusualRandomNumber, "\n    forceUnusual: ").concat(save.options.forceUnusual, "\n    itemId: ").concat(itemId, "\n    quality: ").concat(itemQuality, "\n    wear: ").concat(itemWear, "\n    effect: ").concat(itemEffect);
    console.error(errorMessage);
    reportError(errorMessage);
  }
}

var unboxStop = false;
var pause = false;

function beginUnbox() {
  // This function handles the unbox countdown and shows the results of the unboxing
  if (unboxStop) {
    return 0;
  }

  var unboxResult = unbox();

  if (unboxResult === undefined) {
    return 0; // Stop function here
  }

  var soundToPlay = "unboxed"; // Pause unboxing at certain items

  function pauseUnboxing() {
    pause = unboxStop = true;
    DOM.results.returnBtn.classList.add("btndisabled");
    DOM.results.unboxBtn.classList.add("btndisabled");
    setTimeout(function () {
      DOM.results.returnBtn.classList.remove("btndisabled");
      DOM.results.unboxBtn.classList.remove("btndisabled");
      unboxStop = false;
    }, 3000);
  }

  pause = false;
  var _iteratorNormalCompletion17 = true;
  var _didIteratorError17 = false;
  var _iteratorError17 = undefined;

  try {
    for (var _iterator17 = save.options.stopAtItem[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
      var check = _step17.value;

      switch (check) {
        case "unusual":
          if (unboxResult.quality.includes("unusual")) {
            pauseUnboxing();
          }

          break;

        case "tauntunusualifier":
          var _iteratorNormalCompletion20 = true;
          var _didIteratorError20 = false;
          var _iteratorError20 = undefined;

          try {
            for (var _iterator20 = unboxResult.bonus[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
              var _bonusItem6 = _step20.value;

              if (_bonusItem6.id === 770) {
                pauseUnboxing();
                break;
              }
            }
          } catch (err) {
            _didIteratorError20 = true;
            _iteratorError20 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
                _iterator20["return"]();
              }
            } finally {
              if (_didIteratorError20) {
                throw _iteratorError20;
              }
            }
          }

          break;

        case "strange":
          if (unboxResult.quality.includes("strange")) {
            pauseUnboxing();
          }

          break;

        case "prokit":
          if (unboxResult.killstreak && unboxResult.killstreak.killstreaker != null) {
            pauseUnboxing();
          }

          break;

        case "bonusitem":
          if (unboxResult.bonus.length === 3) {
            pauseUnboxing();
          }

          break;

        case "grademercenary":
          if (unboxResult.grade === 3) {
            pauseUnboxing();
          }

          break;

        case "gradecommando":
          if (unboxResult.grade === 4) {
            pauseUnboxing();
          }

          break;

        case "gradeassassin":
          if (unboxResult.grade === 5) {
            pauseUnboxing();
          }

          break;

        case "gradeelite":
          if (unboxResult.grade === 6) {
            pauseUnboxing();
          }

          break;
      }

      if (pause) {
        break;
      }
    }
  } catch (err) {
    _didIteratorError17 = true;
    _iteratorError17 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
        _iterator17["return"]();
      }
    } finally {
      if (_didIteratorError17) {
        throw _iteratorError17;
      }
    }
  }

  if (unboxResult.quality.includes("unusual")) {
    soundToPlay = "unusualUnboxed";
  } else {
    var _iteratorNormalCompletion18 = true;
    var _didIteratorError18 = false;
    var _iteratorError18 = undefined;

    try {
      for (var _iterator18 = unboxResult.bonus[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
        var _bonusItem4 = _step18.value;

        if (_bonusItem4.id === 770) {
          soundToPlay = "unusualUnboxed";
          break;
        }
      }
    } catch (err) {
      _didIteratorError18 = true;
      _iteratorError18 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
          _iterator18["return"]();
        }
      } finally {
        if (_didIteratorError18) {
          throw _iteratorError18;
        }
      }
    }
  }

  if (save.options.fastUnbox) {
    // If fast unboxing is on, just show the result screen instantly
    showResults();
    DOM.main.container.style.display = "none";
    DOM.results.container.style.display = "block";
    sound.play(soundToPlay);
  } else {
    // Otherwise, play crate sound, display unbox animation, and when it's finished, show result screen
    canUnbox = false;

    switch (crateOrder[currentCrate]) {
      case 57:
        sound.play("roboCrateOpen");
        break;

      case 114:
        sound.play("wrapOpen");
        break;

      default:
        sound.play("crateOpen");
    }

    DOM.unboxing.container.style.display = "block"; // Dot animation

    var dotAnimPos = 2;
    DOM.unboxing.dots.innerHTML = ".";
    var dotAnimation = setInterval(function () {
      switch (dotAnimPos) {
        case 0:
          DOM.unboxing.dots.innerHTML = "&nbsp;";
          dotAnimPos += 1;
          break;

        case 1:
          DOM.unboxing.dots.innerHTML = ".";
          dotAnimPos += 1;
          break;

        case 2:
          DOM.unboxing.dots.innerHTML = "..";
          dotAnimPos += 1;
          break;

        case 3:
          DOM.unboxing.dots.innerHTML = "...";
          dotAnimPos = 0;
          break;
      }
    }, 500); // Countdown

    var secondsUntilUnbox = 5;
    DOM.unboxing.countdown.innerHTML = secondsUntilUnbox;
    var uncratingCountdown = setInterval(function () {
      secondsUntilUnbox -= 1;
      DOM.unboxing.countdown.innerHTML = secondsUntilUnbox;

      if (secondsUntilUnbox == 0) {
        showResults();
        DOM.main.container.style.display = "none";
        DOM.unboxing.container.style.display = "none";
        DOM.results.container.style.display = "block";
        clearInterval(dotAnimation);
        clearInterval(uncratingCountdown);
        canUnbox = true;
        sound.play(soundToPlay);
      }
    }, 1000);
  }

  function showResults() {
    try {
      DOM.results.lootName.removeAttribute("class");
      DOM.results.effectImg.src = emptyImage;
      DOM.results.kitField.innerHTML = "";
      var completeLootName = unboxResult.name;

      if (unboxResult.wear) {
        completeLootName += " (".concat(getString("ui", wearTableNames[unboxResult.wear]), ")");
        DOM.results.lootImg.src = "./images/item/skins/".concat(wearTable[unboxResult.wear]).concat(getImg("item", unboxResult.id));
        DOM.results.kitImg.src = emptyImage;
      } else if (unboxResult.killstreak) {
        if (unboxResult.killstreak.killstreaker) {
          completeLootName = getString("item", 766).replace("#ITEM#", completeLootName);
          DOM.results.lootImg.src = "./images/item/".concat(getImg("item", 766));
          DOM.results.kitField.innerHTML = "".concat(getString("ui", 127), " ").concat(getString("ui", killstreakerTable[unboxResult.killstreak.killstreaker]), "\n      <br>").concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[unboxResult.killstreak.sheen]));
        } else if (unboxResult.killstreak.sheen) {
          completeLootName = getString("item", 765).replace("#ITEM#", completeLootName);
          DOM.results.lootImg.src = "./images/item/".concat(getImg("item", 765));
          DOM.results.kitField.innerHTML = "".concat(getString("ui", 126), " ").concat(getString("ui", sheenTable[unboxResult.killstreak.sheen]));
        } else {
          completeLootName = getString("item", 764).replace("#ITEM#", completeLootName);
          DOM.results.lootImg.src = "./images/item/".concat(getImg("item", 764));
        }

        DOM.results.kitImg.src = "./images/item/".concat(getImg("item", unboxResult.id));
      } else if (unboxResult.quality == "strangifier") {
        completeLootName = getString("item", 452).replace("#ITEM#", completeLootName);
        DOM.results.lootImg.src = "./images/item/".concat(getImg("item", 452));
        DOM.results.kitImg.src = "./images/item/".concat(getImg("item", unboxResult.id));
      } else {
        DOM.results.lootImg.src = "./images/item/".concat(getImg("item", unboxResult.id));
        DOM.results.kitImg.src = emptyImage;
      }

      if (unboxResult.effect) {
        DOM.results.effectImg.src = "./images/effect/".concat(getImg("effect", unboxResult.effect));
        DOM.results.effectField.style.display = "block";
        DOM.results.effectName.innerHTML = getString("effect", unboxResult.effect);
      } else {
        DOM.results.effectField.style.display = "none";
      }

      var tempQualityName = [];

      if (unboxResult.grade) {
        // Item has grade
        DOM.results.lootName.classList.add(gradeTable[unboxResult.grade]);

        if (unboxResult.quality.includes("strange")) {
          if (unboxResult.wear) {
            DOM.results.kitField.innerHTML = "<span class=\"colorstrange\">".concat(getString("ui", 157), "</span>");
          } else {
            tempQualityName.push("<span class=\"colorstrange\">(".concat(getString("ui", 71), ")</span>"));
          }
        }

        if (unboxResult.quality.includes("unusual")) {
          tempQualityName.push("<span class=\"colorunusual\">(".concat(getString("ui", 73), ")</span>"));
        }
      } else {
        // Item has no grade
        if (unboxResult.quality.includes("unusual")) {
          // Item is unusual
          DOM.results.lootName.classList.add("colorunusual");

          if (unboxResult.quality.includes("strange")) {
            tempQualityName.push("<span class=\"colorstrange\">(".concat(getString("ui", 71), ")</span>"));
          }

          tempQualityName.push("(".concat(getString("ui", 73), ")"));
        } else {
          // Item is not unusual
          if (unboxResult.quality.includes("haunted")) {
            DOM.results.lootName.classList.add("colorhaunted");

            if (unboxResult.quality.includes("strange")) {
              tempQualityName.push("(".concat(getString("ui", 71), ")"));
            }

            tempQualityName.push("(".concat(getString("ui", 72), ")"));
          } else if (unboxResult.quality.includes("strange")) {
            DOM.results.lootName.classList.add("colorstrange");
            tempQualityName.push("(".concat(getString("ui", 71), ")"));
          } else {
            // Item is not unusual or strange. So it must be unique
            DOM.results.lootName.classList.add("colorunique");
          }
        }
      }

      if (strangeStringPosition === "left") {
        for (var quality in tempQualityName) {
          if (typeof tempQualityName[quality] === 'string' || tempQualityName[quality] instanceof String) {
            tempQualityName[quality] = tempQualityName[quality].replace("(", "").replace(")", "");
          }
        }

        DOM.results.lootName.innerHTML = "".concat(tempQualityName.join(" "), " ").concat(completeLootName);
      } else {
        DOM.results.lootName.innerHTML = "".concat(completeLootName, " ").concat(tempQualityName.join(" "));
      } // Show bonus items


      DOM.results.bonusItemContainer.removeAttribute("class");

      if (currentCrateObj.bonus || currentCrateObj.creepyBonus || currentCrateObj.exclusiveBonus) {
        DOM.results.bonusContainer.style.display = "block";

        if (unboxResult.bonus.length > 0) {
          var bonusHTML = "";
          var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = unboxResult.bonus[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _bonusItem5 = _step19.value;

              if (_bonusItem5.taunt != undefined) {
                bonusHTML += "<div class=\"unusual\"><img src=\"./images/item/".concat(getImg("item", _bonusItem5.id), "\">\n                    <img class=\"unusualifierimg\" src=\"./images/item/").concat(getImg("item", _bonusItem5.taunt), "\">\n                <div class=\"bonustooltip colorunusual\">").concat(getString("item", _bonusItem5.id).replace("#ITEM#", getString("item", _bonusItem5.taunt)), "</div>\n                </div>");
              } else if (_bonusItem5.killstreak != undefined) {
                var killstreakImg = void 0;
                var itemName = void 0;

                if (_bonusItem5.killstreak.killstreaker != undefined) {
                  killstreakImg = getImg("item", 766);
                  itemName = getString("item", 766);
                } else if (_bonusItem5.killstreak.sheen != undefined) {
                  killstreakImg = getImg("item", 765);
                  itemName = getString("item", 765);
                } else {
                  killstreakImg = getImg("item", 764);
                  itemName = getString("item", 764);
                }

                itemName = itemName.replace("#ITEM#", getString("item", _bonusItem5.id));
                bonusHTML += "<div><img src=\"./images/item/".concat(killstreakImg, "\">\n                    <img class=\"kitimg\" src=\"./images/item/").concat(getImg("item", _bonusItem5.id), "\">\n                <div class=\"bonustooltip\">").concat(itemName, "</div>\n                </div>");
              } else if (_bonusItem5.quality === 12) {
                bonusHTML += "<div><img src=\"./images/item/".concat(getImg("item", 452), "\">\n                    <img class=\"kitimg\" src=\"./images/item/").concat(getImg("item", _bonusItem5.id), "\">\n                <div class=\"bonustooltip\">").concat(getString("item", 452).replace("#ITEM#", getString("item", _bonusItem5.id)), "</div>\n                </div>");
              } else {
                bonusHTML += "<div><img src=\"./images/item/".concat(getImg("item", _bonusItem5.id), "\">\n                <div class=\"bonustooltip\">").concat(getString("item", _bonusItem5.id), "</div>\n                </div>");
              }
            }
          } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
                _iterator19["return"]();
              }
            } finally {
              if (_didIteratorError19) {
                throw _iteratorError19;
              }
            }
          }

          ;
          DOM.results.bonusItemContainer.classList.add("i".concat(unboxResult.bonus.length));
          DOM.results.bonusItemContainer.innerHTML = bonusHTML;
          document.querySelectorAll(".bonustooltip").forEach(function (el) {
            ["pointerover", "click"].forEach(function (evt) {
              el.parentNode.addEventListener(evt, function () {
                var tooltipPos = el.getBoundingClientRect();

                if (tooltipPos.x < 0 || tooltipPos.x + el.clientWidth > window.innerWidth) {
                  el.style.whiteSpace = "initial";
                } else {
                  el.style.whiteSpace = "nowrap";
                  tooltipPos = el.getBoundingClientRect();

                  if (tooltipPos.x < 0 || tooltipPos.x + el.clientWidth > window.innerWidth) {
                    el.style.whiteSpace = "initial";
                  }
                }
              });
            });
          });
        } else {
          DOM.results.bonusItemContainer.innerHTML = "<span id=\"lootbonusnone\">".concat(getString("ui", 145), "</span>");
        }
      } else {
        DOM.results.bonusContainer.style.display = "none";
      } // Update market links


      var urlOptions = {
        item: unboxResult.id,
        quality: unboxResult.quality,
        wear: unboxResult.wear
      };

      if (unboxResult.quality.includes("unusual")) {
        urlOptions.effect = unboxResult.effect;
      }

      if (unboxResult.killstreak) {
        if (unboxResult.killstreak.killstreaker) {
          urlOptions.kit = 3;
        } else if (unboxResult.killstreak.sheen) {
          urlOptions.kit = 2;
        } else {
          urlOptions.kit = 1;
        }
      }

      if ([764, 765, 766, 452].includes(unboxResult.id)) {
        urlOptions.kitItem = unboxResult.effect;
      }

      if (unboxResult.quality != "unique" || unboxResult.grade != 0 || unboxResult.killstreak != null || globalBonusItemArray.includes(unboxResult.id) || paintBonusArray.includes(unboxResult.id) || strangePartBonusArray.includes(unboxResult.id) || steamMarketWhitelist.includes(unboxResult.id)) {
        DOM.results.steamMarketBtn.href = generateSteamMarketUrl(urlOptions);
        DOM.results.steamMarketBtn.classList.remove("btndisabled");
      } else {
        DOM.results.steamMarketBtn.removeAttribute("href");
        DOM.results.steamMarketBtn.classList.add("btndisabled");
      }

      DOM.results.bptfBtn.href = generateBackpackTfUrl(urlOptions);
      DOM.results.mptfBtn.href = generateMarketplaceTfUrl(urlOptions);

      if (save.options.forceUnusual || save.options.forceUnusualifier || save.options.forceStrange || save.options.forceGrade || save.options.forceProKit || save.options.forceBonusItem) {
        DOM.results.statsContainer.style.display = "none";
      } else {
        DOM.results.statsContainer.style.display = "flex"; // Add items to save

        var itemNum = addToInventory(unboxResult, save, true);

        if (["unusual", "unusualunique", "strangeunusual", "unusualstrange"].includes(unboxResult.quality)) {
          DOM.results.statSinceLastUnusual.innerHTML = save.stats["unboxes-since-last-unusual"] + 1;
          addToUnusuals(unboxResult, save, true);
          addToStats(unboxResult, save, true);
          DOM.results.statTimesUnboxedDiv.style.display = "none";
          DOM.results.statUnusualsUnboxed.innerHTML = save.stats["unusual-unboxed"];
          DOM.results.statUnusualsUnboxedDiv.style.display = "block";
        } else {
          addToUnusuals(unboxResult, save, true);
          addToStats(unboxResult, save, true);

          if (currentCrateObj.unusual) {
            DOM.results.statSinceLastUnusual.innerHTML = save.stats["unboxes-since-last-unusual"];
          }

          DOM.results.statTimesUnboxed.innerHTML = itemNum;
          DOM.results.statTimesUnboxedDiv.style.display = "block";
          DOM.results.statUnusualsUnboxedDiv.style.display = "none";
        }
      }
    } catch (err) {
      var errorMessage = "Something went wrong when executing beginUnbox().\n    Error stack: ".concat(err.stack, "\n\n    currentCrate: ").concat(currentCrate, "\n    forceUnusual: ").concat(save.options.forceUnusual, "\n    itemId: ").concat(unboxResult.id, "\n    quality: ").concat(unboxResult.quality, "\n    wear: ").concat(unboxResult.wear, "\n    effect: ").concat(unboxResult.effect);
      console.error(errorMessage);
      reportError(errorMessage);
    }
  }
}

function addToInventory(unboxResult, saveObj, saveToStorage) {
  var itemNum;

  if (unboxResult.cratePos != null) {
    switch (currentCrateObj.loot[unboxResult.cratePos].quality) {
      case 4:
      case 8:
      case 9:
      case 10:
        if (["strange", "strangehaunted"].includes(unboxResult.quality)) {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].q += 1;
        } else {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
        }

        break;

      case 5:
        itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
        break;

      case 6:
        if (unboxResult.quality === "strange") {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos]["".concat(wearTable[unboxResult.wear], "q")] += 1;
        } else {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
        }

        break;

      case 11:
        var found = false;

        if (unboxResult.killstreak.killstreaker) {
          var _iteratorNormalCompletion21 = true;
          var _didIteratorError21 = false;
          var _iteratorError21 = undefined;

          try {
            for (var _iterator21 = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              var _item8 = _step21.value;

              if (_item8.s === unboxResult.killstreak.sheen && _item8.p === unboxResult.killstreak.killstreaker) {
                itemNum = _item8.n += 1;
                found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
                _iterator21["return"]();
              }
            } finally {
              if (_didIteratorError21) {
                throw _iteratorError21;
              }
            }
          }

          if (!found) {
            itemNum = 1;
            saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p.push({
              n: 1,
              s: unboxResult.killstreak.sheen,
              k: unboxResult.killstreak.killstreaker
            });
          }
        } else if (unboxResult.killstreak.sheen) {
          var _iteratorNormalCompletion22 = true;
          var _didIteratorError22 = false;
          var _iteratorError22 = undefined;

          try {
            for (var _iterator22 = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
              var _item9 = _step22.value;

              if (_item9.s === unboxResult.killstreak.sheen) {
                itemNum = _item9.n += 1;
                found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
                _iterator22["return"]();
              }
            } finally {
              if (_didIteratorError22) {
                throw _iteratorError22;
              }
            }
          }

          if (!found) {
            itemNum = 1;
            saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s.push({
              n: 1,
              s: unboxResult.killstreak.sheen
            });
          }
        } else {
          itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
        }

        break;

      default:
        itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
    }
  }

  var _iteratorNormalCompletion23 = true;
  var _didIteratorError23 = false;
  var _iteratorError23 = undefined;

  try {
    var _loop = function _loop() {
      var bonusItem = _step23.value;

      if (currentCrateObj.exclusiveBonus.loot != undefined && currentCrateObj.exclusiveBonus.loot.includes(bonusItem.id)) {
        saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + currentCrateObj.exclusiveBonus.loot.findIndex(function (arrayItem) {
          return arrayItem === bonusItem.id;
        })].n++;
      } else if (currentCrateObj.creepyBonus) {
        var bonusItemPos = creepyCrateBonusArray.findIndex(function (arrayItem) {
          return arrayItem.id === bonusItem.id && arrayItem.quality === bonusItem.quality;
        });

        if (bonusItem.quality == 12 || bonusItem.killstreak != null && bonusItem.killstreak.sheen === null) {
          saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].n++;
        } else if (bonusItem.killstreak.killstreaker === null) {
          var _found = false;
          var _iteratorNormalCompletion24 = true;
          var _didIteratorError24 = false;
          var _iteratorError24 = undefined;

          try {
            for (var _iterator24 = saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
              var _item10 = _step24.value;

              if (_item10.s === bonusItem.killstreak.sheen) {
                _item10.n += 1;
                _found = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
                _iterator24["return"]();
              }
            } finally {
              if (_didIteratorError24) {
                throw _iteratorError24;
              }
            }
          }

          if (!_found) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s.push({
              n: 1,
              s: bonusItem.killstreak.sheen
            });
          }
        } else {
          var _found2 = false;
          var _iteratorNormalCompletion25 = true;
          var _didIteratorError25 = false;
          var _iteratorError25 = undefined;

          try {
            for (var _iterator25 = saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
              var _item11 = _step25.value;

              if (_item11.s === bonusItem.killstreak.sheen && _item11.p === bonusItem.killstreak.killstreaker) {
                _item11.n += 1;
                _found2 = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError25 = true;
            _iteratorError25 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
                _iterator25["return"]();
              }
            } finally {
              if (_didIteratorError25) {
                throw _iteratorError25;
              }
            }
          }

          if (!_found2) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p.push({
              n: 1,
              s: bonusItem.killstreak.sheen,
              k: bonusItem.killstreak.killstreaker
            });
          }
        }
      } else if (bonusItem.id != 770) {
        var _found3 = false;
        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
          for (var _iterator26 = saveObj.bonusItems[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            var saveItem = _step26.value;

            if (saveItem.i === bonusItem.id) {
              saveItem.n++;
              _found3 = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError26 = true;
          _iteratorError26 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
              _iterator26["return"]();
            }
          } finally {
            if (_didIteratorError26) {
              throw _iteratorError26;
            }
          }
        }

        if (!_found3) {
          saveObj.bonusItems.push({
            i: bonusItem.id,
            n: 1
          });
        }
      }
    };

    for (var _iterator23 = unboxResult.bonus[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError23 = true;
    _iteratorError23 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
        _iterator23["return"]();
      }
    } finally {
      if (_didIteratorError23) {
        throw _iteratorError23;
      }
    }
  }

  if (saveToStorage) {
    localStorage.setItem("unboxertf-crates", JSON.stringify(save.crates));
    localStorage.setItem("unboxertf-bonusitems", JSON.stringify(save.bonusItems));
  }

  return itemNum;
}

function addToUnusuals(unboxResult, saveObj, saveToStorage) {
  if (unboxResult.quality.includes("unusual")) {
    if (["strange", "strangeunusual", "unusualstrange"].includes(unboxResult.quality)) {
      saveObj.unusuals.push([unboxResult.id, unboxResult.effect, 1, unboxResult.wear]);
    } else {
      saveObj.unusuals.push([unboxResult.id, unboxResult.effect, 0, unboxResult.wear]);
    }

    if (saveToStorage) {
      updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
    }
  }

  var _iteratorNormalCompletion27 = true;
  var _didIteratorError27 = false;
  var _iteratorError27 = undefined;

  try {
    for (var _iterator27 = unboxResult.bonus[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
      var _bonusItem7 = _step27.value;

      if (_bonusItem7.id === 770) {
        saveObj.unusuals.push([_bonusItem7.id, _bonusItem7.taunt, 0, 0]);

        if (saveToStorage) {
          updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
        }
      }
    }
  } catch (err) {
    _didIteratorError27 = true;
    _iteratorError27 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
        _iterator27["return"]();
      }
    } finally {
      if (_didIteratorError27) {
        throw _iteratorError27;
      }
    }
  }

  if (saveToStorage) {
    localStorage.setItem("unboxertf-unusuals", JSON.stringify(save.unusuals));
  }
}

function addToStats(unboxResult, saveObj, saveToStorage) {
  // Update stats
  saveObj.stats["crates-opened"] += 1;
  saveObj.stats["keys-money"] = (parseFloat(saveObj.stats["keys-money"]) + 2.49).toFixed(2);

  switch (unboxResult.quality) {
    case "unique":
      saveObj.stats["unique-unboxed"] += 1;
      break;

    case "strange":
      saveObj.stats["strange-unboxed"] += 1;
      break;

    case "haunted":
      saveObj.stats["haunted-unboxed"] += 1;
      break;

    case "unusual":
    case "unusualunique":
      saveObj.stats["unusual-unboxed"] += 1;
      break;

    case "strangehaunted":
      saveObj.stats["strange-unboxed"] += 1;
      saveObj.stats["haunted-unboxed"] += 1;
      saveObj.stats["strangehaunted-unboxed"] += 1;
      break;

    case "strangeunusual":
    case "unusualstrange":
      saveObj.stats["strange-unboxed"] += 1;
      saveObj.stats["unusual-unboxed"] += 1;
      saveObj.stats["strangeunusual-unboxed"] += 1;
      break;
  }

  if (unboxResult.wear) {
    saveObj.stats["decorated-unboxed"] += 1;
  }

  ;

  if (unboxResult.grade) {
    saveObj.stats["grade-unboxed"] += 1;
  }

  switch (unboxResult.grade) {
    case 1:
      saveObj.stats["civilian-unboxed"] += 1;
      break;

    case 2:
      saveObj.stats["freelance-unboxed"] += 1;
      break;

    case 3:
      saveObj.stats["mercenary-unboxed"] += 1;
      break;

    case 4:
      saveObj.stats["commando-unboxed"] += 1;
      break;

    case 5:
      saveObj.stats["assassin-unboxed"] += 1;
      break;

    case 6:
      saveObj.stats["elite-unboxed"] += 1;
      break;
  }

  ;

  switch (unboxResult.wear) {
    case 1:
      saveObj.stats["factorynew-unboxed"] += 1;
      break;

    case 2:
      saveObj.stats["minimalwear-unboxed"] += 1;
      break;

    case 3:
      saveObj.stats["fieldtested-unboxed"] += 1;
      break;

    case 4:
      saveObj.stats["wellworn-unboxed"] += 1;
      break;

    case 5:
      saveObj.stats["battlescarred-unboxed"] += 1;
      break;
  }

  if (["unusual", "unusualunique", "strangeunusual", "unusualstrange"].includes(unboxResult.quality)) {
    if (saveObj.stats["unboxes-since-last-unusual"] < saveObj.stats["min-unusual-drought"] || saveObj.stats["min-unusual-drought"] === "N/A") {
      saveObj.stats["min-unusual-drought"] = saveObj.stats["unboxes-since-last-unusual"];
    }

    saveObj.crateStats[crateOrder[currentCrate]].u++;
    saveObj.stats["unusual-avg-array"].push(saveObj.stats["unboxes-since-last-unusual"]);
    var avg = 0;
    var _iteratorNormalCompletion28 = true;
    var _didIteratorError28 = false;
    var _iteratorError28 = undefined;

    try {
      for (var _iterator28 = saveObj.stats["unusual-avg-array"][Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
        var num = _step28.value;
        avg += parseInt(num);
      }
    } catch (err) {
      _didIteratorError28 = true;
      _iteratorError28 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
          _iterator28["return"]();
        }
      } finally {
        if (_didIteratorError28) {
          throw _iteratorError28;
        }
      }
    }

    saveObj.stats["unusual-avg"] = Math.round(avg / saveObj.stats["unusual-avg-array"].length);
    saveObj.stats["unusual-avgprice-array"].push((saveObj.stats["unboxes-since-last-unusual"] * 2.49).toFixed(2));
    avg = 0;
    var _iteratorNormalCompletion29 = true;
    var _didIteratorError29 = false;
    var _iteratorError29 = undefined;

    try {
      for (var _iterator29 = saveObj.stats["unusual-avgprice-array"][Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
        var _num = _step29.value;
        avg += parseFloat(_num);
      }
    } catch (err) {
      _didIteratorError29 = true;
      _iteratorError29 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
          _iterator29["return"]();
        }
      } finally {
        if (_didIteratorError29) {
          throw _iteratorError29;
        }
      }
    }

    saveObj.stats["unusual-avgprice"] = (avg / saveObj.stats["unusual-avg-array"].length).toFixed(2);
    saveObj.stats["unboxes-since-last-unusual"] = 0;
  } else {
    if (currentCrateObj.unusual) {
      saveObj.stats["unboxes-since-last-unusual"] += 1;

      if (saveObj.stats["unboxes-since-last-unusual"] > saveObj.stats["max-unusual-drought"]) {
        saveObj.stats["max-unusual-drought"] = saveObj.stats["unboxes-since-last-unusual"];
      }
    }
  }

  saveObj.stats["bonus-unboxed"] += unboxResult.bonus.length;

  if (currentCrateObj.unusual) {
    saveObj.stats["unusual-chances"] += 1;
  }

  if (crateHasRandomStranges(currentCrateObj)) {
    saveObj.stats["strange-chances"] += 1;

    if (unboxResult.quality.includes("strange")) {
      saveObj.stats["random-strange-unboxed"] += 1;
    }
  }

  ;
  saveObj.crateStats[crateOrder[currentCrate]].n++;

  if (unboxResult.bonus.length > 0) {
    saveObj.crateStats[crateOrder[currentCrate]].b += unboxResult.bonus.length;

    switch (unboxResult.bonus.length) {
      case 1:
        saveObj.stats["single-bonus-unboxed"]++;
        break;

      case 2:
        saveObj.stats["double-bonus-unboxed"]++;
        break;

      case 3:
        saveObj.stats["triple-bonus-unboxed"]++;
        break;
    }
  }

  var _iteratorNormalCompletion30 = true;
  var _didIteratorError30 = false;
  var _iteratorError30 = undefined;

  try {
    for (var _iterator30 = unboxResult.bonus[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
      var _bonusItem8 = _step30.value;

      if (_bonusItem8.id === 770) {
        saveObj.crateStats[crateOrder[currentCrate]].u++;
        saveObj.stats["unusualifiers-unboxed"]++;
      }
    }
  } catch (err) {
    _didIteratorError30 = true;
    _iteratorError30 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
        _iterator30["return"]();
      }
    } finally {
      if (_didIteratorError30) {
        throw _iteratorError30;
      }
    }
  }

  if (saveToStorage) {
    localStorage.setItem("unboxertf-cratestats", JSON.stringify(save.crateStats));
    localStorage.setItem("unboxertf-stats", JSON.stringify(save.stats));
  }
} // Generate grid


var gridDivs = null;
var gridNames = [];

function generateGrid() {
  DOM.main.crateGrid.innerHTML = "";
  var html = [];

  for (var _i4 = 0; _i4 < crateOrder.length; _i4++) {
    html.push("<div cratenum=\"".concat(_i4, "\" series=\"").concat(cA[crateOrder[_i4]].series, "\">\n    <img class=\"statscratesimg\" src=\"./images/crate/").concat(getImg("crate", cA[crateOrder[_i4]].id), "\" alt=\"\">\n    <p class=\"statscratesname\">").concat(getString("crate", cA[crateOrder[_i4]].id), "</p>\n    <p class=\"statscratesseries\">").concat(getSeries(cA[crateOrder[_i4]].series), "</p>\n    </div>"));
  }

  DOM.main.crateGrid.innerHTML = html.join('');
  gridDivs = DOM.main.crateGrid.querySelectorAll("div");
  gridNames = [];

  for (var _i5 = 0; _i5 < gridDivs.length; _i5++) {
    gridDivs[_i5].addEventListener("pointerdown", function () {
      sound.play("btn");
    });

    gridDivs[_i5].addEventListener("click", function () {
      sound.play("btnRelease");
      jumpToCrate(parseInt(this.getAttribute("cratenum")));
      exitGridView();
    });

    gridNames.push("".concat(gridDivs[_i5].querySelector(".statscratesname").textContent, " ").concat(gridDivs[_i5].querySelector(".statscratesseries").textContent).toLowerCase());
  }
}

function exitGridView() {
  DOM.main.crateGrid.style.display = "none";
  DOM.main.crateInfoContainer.style.display = "block";
  DOM.main.gridViewBtn.style.display = "flex";
  DOM.main.exitGridViewBtn.style.display = "none";
  DOM.main.crateGridSearchBtn.style.display = "none";
  DOM.main.crateWindow.classList.remove("gridactive");
  DOM.main.crateWindow.classList.remove("showsearch");
  DOM.main.crateGridSearch.value = "";
  inDetailsMode = true;
  searchGrid("");
}

function searchGrid(input) {
  if (gridDivs === null) {
    return 0;
  }

  var searchName = input.toLowerCase();

  if (searchName.length > 0) {
    for (var _i6 = 0; _i6 < gridDivs.length; _i6++) {
      if (gridNames[_i6].includes(searchName)) {
        gridDivs[_i6].style.display = "block";
      } else {
        gridDivs[_i6].style.display = "none";
      }
    }
  } else {
    var _iteratorNormalCompletion31 = true;
    var _didIteratorError31 = false;
    var _iteratorError31 = undefined;

    try {
      for (var _iterator31 = gridDivs[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
        var _crate4 = _step31.value;
        _crate4.style.display = "block";
      }
    } catch (err) {
      _didIteratorError31 = true;
      _iteratorError31 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
          _iterator31["return"]();
        }
      } finally {
        if (_didIteratorError31) {
          throw _iteratorError31;
        }
      }
    }
  }
}

function selectFirstCrateFromSearch() {
  var _iteratorNormalCompletion32 = true;
  var _didIteratorError32 = false;
  var _iteratorError32 = undefined;

  try {
    for (var _iterator32 = gridDivs[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
      var _crate5 = _step32.value;

      if (_crate5.style.display == "block") {
        sound.play("btn");
        jumpToCrate(parseInt(_crate5.getAttribute("cratenum")));
        exitGridView();
        return;
      }
    }
  } catch (err) {
    _didIteratorError32 = true;
    _iteratorError32 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
        _iterator32["return"]();
      }
    } finally {
      if (_didIteratorError32) {
        throw _iteratorError32;
      }
    }
  }
} // Main screen bindings


DOM.main.moreInfoBtn.addEventListener("click", function () {
  DOM.main.imgContainer.style.display = "none";
  DOM.main.detailsContainer.style.display = "block";
});
DOM.main.infoReturnBtn.addEventListener("click", function () {
  DOM.main.imgContainer.style.display = "flex";
  DOM.main.detailsContainer.style.display = "none";
});
DOM.main.infoEffectsBtn.addEventListener("click", function () {
  DOM.main.effectsContainer.style.display = "block";
  DOM.main.lootContainer.style.display = "none";
  DOM.main.infoEffectsBtn.style.display = "none";
  DOM.main.infoLootBtn.style.display = "flex";
});
DOM.main.infoLootBtn.addEventListener("click", function () {
  DOM.main.effectsContainer.style.display = "none";
  DOM.main.lootContainer.style.display = "block";
  DOM.main.infoEffectsBtn.style.display = "flex";
  DOM.main.infoLootBtn.style.display = "none";
});
DOM.main.gridViewBtn.addEventListener("click", function () {
  DOM.main.crateGrid.style.display = "grid";
  DOM.main.crateInfoContainer.style.display = "none";
  DOM.main.gridViewBtn.style.display = "none";
  DOM.main.exitGridViewBtn.style.display = "flex";
  DOM.main.crateGridSearchBtn.style.display = "flex";
  DOM.main.crateWindow.classList.add("gridactive");
  inDetailsMode = false;

  if (DOM.main.crateGrid.innerHTML == "") {
    generateGrid();
  }
});
DOM.main.exitGridViewBtn.addEventListener("click", exitGridView);
DOM.main.randomCrateBtn.addEventListener("click", function () {
  jumpToCrate("random");
  exitGridView();
});
DOM.main.crateGridSearchBtn.addEventListener("click", function () {
  DOM.main.crateWindow.classList.toggle("showsearch");

  if (DOM.main.crateWindow.classList.contains("showsearch")) {
    DOM.main.crateGridSearch.focus();
  } else {
    DOM.main.crateGridSearch.value = "";
    searchGrid("");
  }
});
DOM.main.unboxBtn.addEventListener("click", function () {
  exitGridView();
  beginUnbox();
});
DOM.main.bulkUnboxBtn.addEventListener("click", function () {
  DOM.bulkSelect.screen.style.display = "flex";
  canUnbox = false;
});
document.querySelector('[data-screen="#statsscreen"]').addEventListener("click", function () {
  updateStats();
  generateCrateStats();

  if (!unusualsGenerated) {
    generateUnusualStats();
  }
});
DOM.main.crateInfoContainer.addEventListener("swiped-left", function () {
  jumpToCrate("previous");
});
DOM.main.crateInfoContainer.addEventListener("swiped-right", function () {
  jumpToCrate("next");
});
DOM.main.crateGridSearch.addEventListener("input", function () {
  searchGrid(DOM.main.crateGridSearch.value);
}); // Options screen bindings

document.querySelectorAll(".tabreturnbtn").forEach(function (button) {
  button.addEventListener("click", function () {
    DOM.main.container.style.display = "block";
    canUnbox = true;
    button.closest("main").style.display = "none";
  });
});
document.querySelectorAll("[data-screen]").forEach(function (button) {
  button.addEventListener("click", function () {
    canUnbox = false;
    document.querySelector(button.dataset.screen).style.display = "block";
    button.closest("main").style.display = "none";
  });
});
document.querySelectorAll("[data-tab]").forEach(function (button) {
  button.addEventListener("click", function () {
    button.parentNode.querySelector("[data-tab].active").classList.remove("active");
    button.classList.add("active");
    button.closest("main").querySelector("div.visible").classList.remove("visible");
    document.querySelector(button.dataset.tab).classList.add("visible");
  });
});
var resetting = 0;
DOM.options.resetBtn.addEventListener("click", function () {
  if (resetting === 0) {
    resetting = 1;
    DOM.options.resetBtn.innerHTML = getString("ui", 78);
    setTimeout(function () {
      if (resetting === 1) {
        resetting = 0;
        DOM.options.resetBtn.innerHTML = getString("ui", 29);
      }
    }, 4000);
  } else if (resetting === 1) {
    resetting = 2;
    DOM.options.resetBtn.innerHTML = getString("ui", 77);
    save = JSON.parse(JSON.stringify(defaultSave));
    localStorage.removeItem("unboxertf-stats");
    localStorage.removeItem("unboxertf-unusuals");
    localStorage.removeItem("unboxertf-bonusitems");
    localStorage.removeItem("unboxertf-crates");
    localStorage.removeItem("unboxertf-cratestats");
    DOM.stats.unusuals.content.innerHTML = "";
    unusualsGenerated = false;

    var _tempOptionsSave = localStorage.getItem("unboxertf-options");

    if (_tempOptionsSave != null) {
      save.options = JSON.parse(_tempOptionsSave);
    }

    setTimeout(function () {
      resetting = 0;
      DOM.options.resetBtn.innerHTML = getString("ui", 29);
    }, 4000);
  }
}); // Statistics screen bindings

var lastTabNum = DOM.stats.statistics.container.querySelectorAll("[data-statstring]").length - 1;
DOM.stats.statistics.container.querySelectorAll("[data-statstring]").forEach(function (tab, index) {
  tab.dataset.num = index;
});
DOM.stats.statistics.prev.addEventListener("click", function () {
  var currentTab = DOM.stats.statistics.container.querySelector(".statvisible");
  currentTab.classList.remove("statvisible");
  var newTab;

  if (currentTab.dataset.num == "0") {
    newTab = DOM.stats.statistics.container.querySelector("[data-num=\"".concat(lastTabNum, "\"]"));
  } else {
    newTab = DOM.stats.statistics.container.querySelector("[data-num=\"".concat(parseInt(currentTab.dataset.num) - 1, "\"]"));
  }

  newTab.classList.add("statvisible");
  DOM.stats.statistics.tab.innerHTML = getString("ui", newTab.dataset.statstring);
});
DOM.stats.statistics.next.addEventListener("click", function () {
  var currentTab = DOM.stats.statistics.container.querySelector(".statvisible");
  currentTab.classList.remove("statvisible");
  var newTab;

  if (currentTab.dataset.num == lastTabNum) {
    newTab = DOM.stats.statistics.container.querySelector("[data-num='0']");
  } else {
    newTab = DOM.stats.statistics.container.querySelector("[data-num=\"".concat(parseInt(currentTab.dataset.num) + 1, "\"]"));
  }

  newTab.classList.add("statvisible");
  DOM.stats.statistics.tab.innerHTML = getString("ui", newTab.dataset.statstring);
});
DOM.stats.crates.details.returnBtn.addEventListener("click", function () {
  DOM.stats.container.style.display = "block";
  DOM.stats.crates.details.container.classList.remove("visible");
});
DOM.stats.unusuals.prev.addEventListener("click", function () {
  unusualPage({
    el: DOM.stats.unusuals.pageDiv,
    page: "prev"
  });
});
DOM.stats.unusuals.next.addEventListener("click", function () {
  unusualPage({
    el: DOM.stats.unusuals.pageDiv,
    page: "next"
  });
}); // Results screen bindings

DOM.results.returnBtn.addEventListener("click", function () {
  if (!DOM.results.returnBtn.classList.contains("btndisabled")) {
    DOM.main.container.style.display = "block";
    DOM.results.container.style.display = "none";
  }
});
DOM.results.unboxBtn.addEventListener("click", function () {
  exitGridView();
  beginUnbox();
});
var holdUnbox;
DOM.results.unboxBtn.addEventListener("pointerdown", function () {
  clearInterval(holdUnbox);
  clearTimeout(holdUnbox);

  if (save.options.fastUnbox) {
    holdUnbox = setTimeout(function () {
      holdUnbox = setInterval(beginUnbox, 50);
    }, 1000);
  }
});
DOM.results.unboxBtn.addEventListener("pointerup", function () {
  clearInterval(holdUnbox);
  clearTimeout(holdUnbox);
});
DOM.results.unboxBtn.addEventListener("pointerleave", function () {
  clearInterval(holdUnbox);
  clearTimeout(holdUnbox);
}); // Bulk select bindings

DOM.bulkSelect.num.addEventListener("input", function () {
  var crateNum = parseInt(DOM.bulkSelect.num.value);

  if ([0, NaN].includes(crateNum)) {
    DOM.bulkSelect.unboxBtn.classList.add("btndisabled");
  } else {
    DOM.bulkSelect.unboxBtn.classList.remove("btndisabled");
  }

  if (!bulkUnlimited && crateNum > 1000000) {
    DOM.bulkSelect.num.value = 1000000;
  }

  if (crateNum >= 500000) {
    DOM.bulkSelect.warning.style.display = "none";
    DOM.bulkSelect.warningHuge.style.display = "block";
  } else if (crateNum >= 50000) {
    DOM.bulkSelect.warning.style.display = "block";
    DOM.bulkSelect.warningHuge.style.display = "none";
  } else {
    DOM.bulkSelect.warning.style.display = "none";
    DOM.bulkSelect.warningHuge.style.display = "none";
  }
});
DOM.bulkSelect.cancelBtn.addEventListener("click", function () {
  DOM.bulkSelect.screen.style.display = "none";
  canUnbox = true;
});
DOM.bulkSelect.unboxBtn.addEventListener("click", function () {
  if (!DOM.bulkSelect.unboxBtn.classList.contains("btndisabled")) {
    startBulkUnbox(parseInt(DOM.bulkSelect.num.value));
  }
}); // Bulk results bindings

var lastBulkNum = DOM.bulkResults.container.querySelectorAll("[data-statstring]").length - 1;
DOM.bulkResults.container.querySelectorAll("[data-statstring]").forEach(function (tab, index) {
  tab.dataset.num = index;
});
DOM.bulkResults.prev.addEventListener("click", function () {
  var currentTab = DOM.bulkResults.container.querySelector(".bulkvisible");
  currentTab.classList.remove("bulkvisible");
  var newTab;

  if (currentTab.dataset.num == "0") {
    newTab = DOM.bulkResults.container.querySelector("[data-num=\"".concat(lastBulkNum, "\"]"));
  } else {
    newTab = DOM.bulkResults.container.querySelector("[data-num=\"".concat(parseInt(currentTab.dataset.num) - 1, "\"]"));
  }

  newTab.classList.add("bulkvisible");
  DOM.bulkResults.tabName.innerHTML = getString("ui", newTab.dataset.statstring);
});
DOM.bulkResults.next.addEventListener("click", function () {
  var currentTab = DOM.bulkResults.container.querySelector(".bulkvisible");
  currentTab.classList.remove("bulkvisible");
  var newTab;

  if (currentTab.dataset.num == lastBulkNum) {
    newTab = DOM.bulkResults.container.querySelector("[data-num='0']");
  } else {
    newTab = DOM.bulkResults.container.querySelector("[data-num=\"".concat(parseInt(currentTab.dataset.num) + 1, "\"]"));
  }

  newTab.classList.add("bulkvisible");
  DOM.bulkResults.tabName.innerHTML = getString("ui", newTab.dataset.statstring);
});
DOM.bulkResults["return"].addEventListener("click", function () {
  DOM.main.container.style.display = "block";
  DOM.bulkResults.container.style.display = "none";
  canUnbox = true;
});
DOM.bulkResults.unusualsPrev.addEventListener("click", function () {
  unusualPage({
    saveObj: bulkSave,
    el: DOM.bulkResults.unusualsPageDiv,
    page: "prev"
  });
});
DOM.bulkResults.unusualsNext.addEventListener("click", function () {
  unusualPage({
    saveObj: bulkSave,
    el: DOM.bulkResults.unusualsPageDiv,
    page: "next"
  });
}); // Load saves

var tempStatSave = localStorage.getItem("unboxertf-stats");

if (tempStatSave != null) {
  Object.assign(save.stats, JSON.parse(tempStatSave));
}

var tempUnusualSave = localStorage.getItem("unboxertf-unusuals");

if (tempUnusualSave != null) {
  save.unusuals = JSON.parse(tempUnusualSave);
}

var tempBonusItemSave = localStorage.getItem("unboxertf-bonusitems");

if (tempBonusItemSave != null) {
  save.bonusItems = JSON.parse(tempBonusItemSave);
}

var tempCrateSave = localStorage.getItem("unboxertf-crates");

if (tempCrateSave != null) {
  mergeDeep(save.crates, JSON.parse(tempCrateSave));
}

var tempCrateStatsSave = localStorage.getItem("unboxertf-cratestats");

if (tempCrateStatsSave != null) {
  mergeDeep(save.crateStats, JSON.parse(tempCrateStatsSave));
}

var tempOptionsSave = localStorage.getItem("unboxertf-options");

if (tempOptionsSave != null) {
  Object.assign(save.options, JSON.parse(tempOptionsSave));

  for (var key in save.options) {
    triggerOption(key, true);
  }
}

jumpToCrate(crateOrder[crateOrder.length - 1]); // Show most recent crate on load

function unusualPage(arg) {
  var saveObject = save;
  var el = arg.el;

  if (arg.saveObj != undefined) {
    saveObject = arg.saveObj;
  }

  if (arg.page === "prev") {
    if (el.dataset.unusualpage == "1") {
      el.dataset.unusualpage = el.dataset.unusualmaxpage;
    } else {
      el.dataset.unusualpage = parseInt(el.dataset.unusualpage) - 1;
    }
  } else if (arg.page === "next") {
    if (el.dataset.unusualpage == el.dataset.unusualmaxpage) {
      el.dataset.unusualpage = "1";
    } else {
      el.dataset.unusualpage = parseInt(el.dataset.unusualpage) + 1;
    }
  }

  var pageString = getString("ui", 152).replace("#PAGE#", el.dataset.unusualpage).replace("#TOTAL#", el.dataset.unusualmaxpage);
  el.querySelector("[data-unusualpagecount]").innerHTML = pageString;
  var startArray = 200 * (parseInt(el.dataset.unusualpage) - 1);
  var endArray = 200 * parseInt(el.dataset.unusualpage);
  var tempHtml = "";
  var _iteratorNormalCompletion33 = true;
  var _didIteratorError33 = false;
  var _iteratorError33 = undefined;

  try {
    for (var _iterator33 = saveObject.unusuals.slice(startArray, endArray)[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
      var unusual = _step33.value;
      tempHtml += updateUnusualStats(unusual);
    }
  } catch (err) {
    _didIteratorError33 = true;
    _iteratorError33 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
        _iterator33["return"]();
      }
    } finally {
      if (_didIteratorError33) {
        throw _iteratorError33;
      }
    }
  }

  el.parentNode.querySelector("[data-unusualcontent]").innerHTML = tempHtml;
} // Bulk unboxing code


var bulkWorker = new Worker('./js/bulkWorker.prod.js');
var bulkSave;

bulkWorker.onmessage = function (e) {
  if (e.data.item) {
    if (!save.options.forceUnusual && !save.options.forceUnusualifier && !save.options.forceStrange && !save.options.forceGrade && !save.options.forceProKit && !save.options.forceBonusItem) {
      addToInventory(e.data.item, save);
      addToUnusuals(e.data.item, save);
      addToStats(e.data.item, save);
    }
  } else if (e.data.progress) {
    DOM.bulkProgress.progressDone.innerHTML = DOM.bulkProgress.progress.value = e.data.progress;
    DOM.bulkProgress.progressPercent.innerHTML = "".concat(Math.round(e.data.progress / DOM.bulkProgress.progress.max * 100), "%");
  } else if (e.data.complete) {
    bulkSave = JSON.parse(e.data.bulkSave);
    localStorage.setItem("unboxertf-crates", JSON.stringify(save.crates));
    localStorage.setItem("unboxertf-bonusitems", JSON.stringify(save.bonusItems));
    localStorage.setItem("unboxertf-cratestats", JSON.stringify(save.crateStats));
    localStorage.setItem("unboxertf-stats", JSON.stringify(save.stats));
    localStorage.setItem("unboxertf-unusuals", JSON.stringify(save.unusuals)); // Display results

    DOM.bulkResults.title.innerHTML = "".concat(getString("crate", currentCrateObj.id), "<br>").concat(getSeries(currentCrateObj.series));
    document.querySelectorAll("[data-bulkstat]").forEach(function (el) {
      el.innerHTML = bulkSave.stats[el.dataset.bulkstat];
    });
    document.querySelectorAll('[data-bulkstat="keys-money"], [data-bulkstat="unusual-avgprice"]').forEach(function (el) {
      el.innerHTML = "$" + el.innerHTML;
    });
    DOM.bulkResults.unusualsPageDiv.dataset.unusualpage = "1";
    DOM.bulkResults.unusualsPageDiv.dataset.unusualmaxpage = Math.ceil(bulkSave.unusuals.length / 200);
    unusualPage({
      saveObj: bulkSave,
      el: DOM.bulkResults.unusualsPageDiv
    });
    generateCrateDetails(crateOrder[currentCrate], DOM.bulkResults.items, bulkSave);
    generateCrateDetails(crateOrder[currentCrate], DOM.bulkResults.bonusItems, bulkSave, true);
    generateUnusualStats();
    DOM.main.container.style.display = "none";
    DOM.bulkSelect.screen.style.display = "none";
    DOM.bulkSelect.container.style.display = "flex";
    DOM.bulkProgress.container.style.display = "none";

    if (DOM.bulkResults.container.querySelector(".bulkvisible")) {
      DOM.bulkResults.container.querySelector(".bulkvisible").classList.remove("bulkvisible");
    }

    DOM.bulkResults.tabName.innerHTML = getString("ui", DOM.bulkResults.stats.dataset.statstring);
    DOM.bulkResults.stats.classList.add("bulkvisible");
    DOM.bulkResults.container.style.display = "block";
  } else if (e.data.error) {
    reportError(e.data.error);
  }
};

function startBulkUnbox(num) {
  bulkSave = JSON.parse(JSON.stringify(defaultSave));
  var cheatsEnabled = false;

  if (save.options.forceUnusual || save.options.forceUnusualifier || save.options.forceStrange || save.options.forceGrade || save.options.forceProKit || save.options.forceBonusItem) {
    cheatsEnabled = true;
  }

  DOM.bulkSelect.container.style.display = "none";
  DOM.bulkProgress.progress.value = "0";
  DOM.bulkProgress.progressTotal.innerHTML = DOM.bulkProgress.progress.max = num;
  DOM.bulkProgress.progressDone.innerHTML = "0";
  DOM.bulkProgress.container.style.display = "flex";
  bulkWorker.postMessage({
    bulkSave: bulkSave,
    options: JSON.stringify(save.options),
    crate: currentCrate,
    crateNum: num,
    cheats: cheatsEnabled
  });
} // Disable bulk limit if site URL has a ?bulkunlimited parameter


var urlParams = new URLSearchParams(window.location.search);
var bulkUnlimited = false;

if (urlParams.has('bulkunlimited')) {
  bulkUnlimited = true;
} // Debug function: Unbox each crate 50 times. THIS IS SLOW! Enable fast unboxing and disable the pause unboxing option before using, or this will not work.


function testUnbox() {
  try {
    for (var _crate6 in cA) {
      console.log("Testing crate ".concat(_crate6));
      jumpToCrate(_crate6);
      var counter = 0;

      while (counter <= 49) {
        beginUnbox();
        counter++;
      }
    }
  } catch (_unused) {
    throw new Error("Error at crate ".concat(crate));
  }
} // On load, disable loading screen


window.onload = function () {
  if (localStorage.getItem("unboxertf-languagechanged") == undefined) {
    for (var _i7 = 0; _i7 < navigator.languages.length; _i7++) {
      switch (navigator.languages[_i7].slice(0, 2)) {
        case "en":
          _i7 = navigator.languages.length;
          break;

        case "pl":
          changeLanguage("pol");
          save.options.language = "pol";
          DOM.options.langDropdown.value = "pol";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;

        case "fr":
          changeLanguage("fre");
          save.options.language = "fre";
          DOM.options.langDropdown.value = "fre";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;

        case "zh":
          changeLanguage("sch");
          save.options.language = "sch";
          DOM.options.langDropdown.value = "sch";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;

        case "cs":
          changeLanguage("cze");
          save.options.language = "cze";
          DOM.options.langDropdown.value = "cze";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;

        case "hu":
          changeLanguage("hun");
          save.options.language = "hun";
          DOM.options.langDropdown.value = "hun";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;
      }

      switch (navigator.languages[_i7]) {
        case "pt-BR":
          changeLanguage("bra");
          save.options.language = "bra";
          DOM.options.langDropdown.value = "bra";
          localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
          _i7 = navigator.languages.length;
          break;
      }
    }
  }

  DOM.main.container.classList.remove("loading");
  document.querySelector("#loadingscreen").style.display = "none";
};