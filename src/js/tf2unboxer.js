"use strict";

import {
    unusualPool,
    cA,
    crateOrder,
    globalBonusItemArray,
    unusualifierArray,
    paintBonusArray,
    strangePartBonusArray,
    creepyCrateBonusArray,
    steamMarketWhitelist,
    halloweenModeCrateList,
    hw11FX,
    hw12FX,
    hw13FX,
    hw14FX,
    hw16FX,
    hw17FX,
    hw18FX,
    hw19FX,
    hw20FX,
    hw21FX,
    hw22FX,
    xmas19FX,
    xmas20FX,
    xmas21FX,
    xmas22FX,
    xmas23FX,
    xmas24FX,
    nice2014UnusualPool,
    allGensFX,
    limitedLateSummerUnusualPool,
    summer23FX,
    hw23FX,
    miscUnusualPool,
    eotlGlitchUnusualPool,
    sniperVsSpyUnusualsPool,
    summer24FX,
    hw24FX,
    summer25FX,
    hw25FX,
} from "./crate.js";

import {
    dataItems
} from "./itemnames.js";
import {
    dataCrates
} from "./cratenames.js";
import {
    dataEffects
} from "./unusualeffects.js";
import {
    dataUi
} from "./text.js";

import {
    LZString
} from "./lz-string.js";

// Function for reporting errors to analytics
let errorTimeout = false;
// Compressed function for deep merging objects. a - target object, b - source object
const mergeDeep = (a, b) => {
    for (const c of Object.keys(b)) b[c] instanceof Object && c in a && Object.assign(b[c], mergeDeep(a[c], b[c]));
    return Object.assign(a || {}, b), a
};

// Swipe events - https://github.com/john-doherty/swiped-events
! function (t, e) {
    "use strict";
    "function" != typeof t.CustomEvent && (t.CustomEvent = function (t, n) {
        n = n || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var a = e.createEvent("CustomEvent");
        return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a
    }, t.CustomEvent.prototype = t.Event.prototype), e.addEventListener("touchstart", function (t) {
        if ("true" === t.target.getAttribute("data-swipe-ignore")) return;
        s = t.target, r = Date.now(), n = t.touches[0].clientX, a = t.touches[0].clientY, u = 0, i = 0
    }, !1), e.addEventListener("touchmove", function (t) {
        if (!n || !a) return;
        var e = t.touches[0].clientX,
            r = t.touches[0].clientY;
        u = n - e, i = a - r
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
            }))
        }
        n = null, a = null, r = null
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
            t = t.parentNode
        }
        return a
    }
}(window, document);

// Generate random 5-letter string
const randomStringPool = "abcdefghijklmnopqrstuwxyz1234567890";

function generateRandomString() {
    let string = "";
    for (let i = 0; i < 5; i++) {
        string += randomStringPool[Math.floor(Math.random() * randomStringPool.length)];
    }
    return string;
}

// Detect WebP support
let imageSupport = ".webp";
let webpTest = new Image();
webpTest.onload = function () {
    if (webpTest.height != 2) {
        imageSupport = ".png";
        console.log("WebP is unsupported - failed image height check");
    }
};
webpTest.onerror = function () {
    imageSupport = ".png";
    DOM.main.img.src = "./images/crate/" + getImg("crate", currentCrateObj.id);
    console.log("WebP is unsupported - failed to load image");
};
webpTest.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';

// DOM elements
HTMLDocument.prototype.eId = document.getElementById; // Use document.eID() as a shorthand for document.eId()
const DOM = {
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
        return: document.eId("bulkresultsreturnbtn"),
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
                strangeDesc: document.eId("strangeluckdesc"),
            }
        },
        unusuals: {
            container: document.eId("statsunusuals"),
            content: document.eId("statsunusualscontent"),
            pageDiv: document.eId("statsunusualspage"),
            prev: document.eId("statsunusualsprev"),
            next: document.eId("statsunusualsnext"),
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
}

// Misc variables
let currentCrate = crateOrder[crateOrder.length - 1];
let currentCrateObj = cA[crateOrder[currentCrate]];
let canUnbox = true;
let inDetailsMode = true;
let addToInventorySaveTimeout = null;
let addToUnusualsSaveTimeout = null;
let addToStatsSaveTimeout = null;
const emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const wearTable = ["", "FN", "MW", "FT", "WW", "BS"];
const wearTableNames = ["", 80, 81, 82, 83, 84];
const gradeTable = ["", "colorcivilian", "colorfreelance", "colormercenary", "colorcommando", "colorassassin", "colorelite"];
const sheenTable = ["", 128, 129, 130, 131, 132, 133, 134];
const killstreakerTable = ["", 135, 136, 137, 138, 139, 140, 141];
// Save object
let save = {
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
    crates: {

    },
    crateStats: {

    },
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
        miscUnusuals: false,
        muteSound: false
    }
}

// Populate save.crates and save.crateStats
for (let crate in cA) {
    save.crates[crate] = [];
    for (let item of cA[crate].loot) {
        save.crates[crate].push({});
        switch (item.quality) {
            case 4:
            case 8:
            case 9:
            case 10:
                save.crates[crate][save.crates[crate].length - 1].n = 0;
                save.crates[crate][save.crates[crate].length - 1].q = 0;
                break;
            case 5:
                for (let i = 1; i < wearTable.length; i++) {
                    save.crates[crate][save.crates[crate].length - 1][wearTable[i]] = 0;
                }
                break;
            case 6:
                for (let i = 1; i < wearTable.length; i++) {
                    save.crates[crate][save.crates[crate].length - 1][wearTable[i]] = 0;
                    save.crates[crate][save.crates[crate].length - 1][`${wearTable[i]}q`] = 0;
                }
                break;
            case 11:
                save.crates[crate][save.crates[crate].length - 1].n = 0;
                save.crates[crate][save.crates[crate].length - 1].s = [];
                save.crates[crate][save.crates[crate].length - 1].p = [];
                break;
            default:
                save.crates[crate][save.crates[crate].length - 1].n = 0;
        }
    }
    for (let bonusItem in cA[crate].exclusiveBonus.loot) {
        save.crates[crate].push({
            n: 0
        });
    }
    if (cA[crate].creepyBonus) {
        for (let bonusItem of creepyCrateBonusArray) {
            save.crates[crate].push({
                n: 0
            });
            if (bonusItem.quality == 11) {
                save.crates[crate][save.crates[crate].length - 1].s = [];
                save.crates[crate][save.crates[crate].length - 1].p = [];
            }
        }
    }
    save.crateStats[crate] = {
        n: 0
    };
    if (cA[crate].unusual) {
        save.crateStats[crate].u = 0;
    }
    if (cA[crate].bonus || cA[crate].exclusiveBonus || cA[crate].creepyBonus) {
        save.crateStats[crate].b = 0;
    }
}

const defaultSave = JSON.parse(JSON.stringify(save));

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
document.querySelectorAll("[data-option]").forEach(el => {
    if (el.classList.contains("checkbox")) {
        el.addEventListener("click", () => {
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
        el.addEventListener("input", () => {
            sound.play("btn");
            if (!isNaN(parseInt(el.value))) {
                save.options[el.dataset.option] = parseInt(el.value);
            } else {
                save.options[el.dataset.option] = el.value;
            }
            triggerOption(el.dataset.option);
            localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
        })
    } else {
        el.addEventListener("click", () => {
            el.parentNode.querySelector(".active").classList.remove("active");
            el.classList.add("active");
            if (el.dataset.optionvalue === 'true') {
                save.options[el.dataset.option] = true;
            } else if (el.dataset.optionvalue === 'false') {
                save.options[el.dataset.option] = false;
            } else {
                save.options[el.dataset.option] = el.dataset.optionvalue
            }
            triggerOption(el.dataset.option);
            localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
        });
    }
})

document.querySelectorAll("[data-optionarray]").forEach(el => {
    el.querySelectorAll("[data-optionvalue]").forEach(val => {
        val.addEventListener("click", () => {
            sound.play("btn");
            if (val.classList.contains("checked")) {
                val.classList.remove("checked")
                save.options[el.dataset.optionarray] = save.options[el.dataset.optionarray].filter(item => item !== val.dataset.optionvalue)
            } else {
                val.classList.add("checked")
                save.options[el.dataset.optionarray].push(val.dataset.optionvalue)
            }
            localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
        })
    })
})

function triggerOption(option, load) {
    if (load) {
        let optionEl = document.querySelector(`[data-option="${option}"], [data-optionarray="${option}"]`);
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
                document.querySelector(`[data-option="${option}"].active`).classList.remove("active");
                document.querySelector(`[data-option="${option}"][data-optionvalue="${save.options[option]}"]`).classList.add("active");
            }
        } else if (optionEl != null && optionEl.tagName === "SELECT") {
            optionEl.value = save.options[option];
        } else if (optionEl.dataset.optionarray) {
            optionEl.querySelectorAll("[data-optionvalue]").forEach(el => {
                if (save.options[optionEl.dataset.optionarray].includes(el.dataset.optionvalue)) {
                    el.classList.add("checked");
                } else {
                    el.classList.remove("checked")
                }
            })
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
            if ((load && save.options.language != "eng") || !load) {
                changeLanguage(save.options.language);
            }
            break;
        case "halloweenMode":
            generateEffectList();
            break;
    }
}

// Update stats function
function updateStats() {
    document.querySelectorAll("[data-stat]").forEach(el => {
        el.innerHTML = save.stats[el.dataset.stat];
    });
    document.querySelectorAll('[data-stat="keys-money"], [data-stat="unusual-avgprice"]').forEach(el => {
        el.innerHTML = "$" + el.innerHTML;
    })

    // Luck
    if (save.stats["unusual-chances"] >= 100 && save.stats["strange-chances"] >= 10) {
        // Unusual luck

        let unusualPrediction = Math.floor(save.stats["unusual-chances"] / 150);
        let msg = getString("ui", 118);
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
        DOM.stats.statistics.luck.unusualDesc.innerHTML = msg;

        // Strange luck

        let strangePrediction = Math.floor(save.stats["strange-chances"] / 10);
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
}

// Populate unusual section in stats
let unusualsGenerated = false;

function generateUnusualStats() {
    unusualsGenerated = true;
    DOM.stats.unusuals.content.innerHTML = "";

    if (save.unusuals.length > 0) {
        DOM.stats.unusuals.pageDiv.dataset.unusualpage = "1";
        DOM.stats.unusuals.pageDiv.dataset.unusualmaxpage = Math.ceil(save.unusuals.length / 200);
        unusualPage({
            el: DOM.stats.unusuals.pageDiv
        })

    } else {
        DOM.stats.unusuals.content.innerHTML = `<p id="nounusuals" data-string="50">${getString("ui", 50)}</p>`;
    }
}

function updateUnusualStats(array, upd) {
    /*  array[0] - item ID
        array[1] - effect ID (or taunt ID if item is an unusualifier)
        array[2] - item quality
        array[3] - item wear
    */
    let tempHtml = "";

    let itemName = getString("item", array[0]);
    let qualityName = getString("ui", 73);

    if (strangeStringPosition === "right") {
        qualityName = `(${qualityName})`;
    }

    let skinFolder = "";
    if (array[3] != 0) {
        skinFolder = `skins/${wearTable[array[3]]}`;
        itemName += ` (${getString("ui", wearTableNames[array[3]])})`;
    }
    let img1, img2;

    let effectText = "";
    if (array[2] === 1 && array[3] === 0) {
        let temp = `<span class="colorstrange">${getString("ui", 71)}</span>`;
        if (strangeStringPosition === "right") {
            temp = temp.replace('">', '">(').replace('</span>', ')</span>');
        }
        qualityName = `${temp} ${qualityName}`;
    }

    if (array[0] === 770) {
        itemName = getString("item", 770).replace("#ITEM#", getString("item", array[1])).replace('The ', '');
        img1 = `<img src="./images/item/${getImg("item", 770)}" alt="" loading="lazy">`;
        img2 = `<img class="unusualifierimg" src="./images/item/${getImg("item", array[1])}" alt="" loading="lazy">`;
    } else {
        if (strangeStringPosition === "left") {
            itemName = `${qualityName} ${itemName}`;
        } else {
            itemName = `${itemName} ${qualityName}`;
        }
        let statClockText = "";
        if (array[2] === 1 && array[3] != 0) {
            statClockText = `<span class="colorstrange statclock">${getString("ui", 157)}</span><br>`;
        }
        effectText = `<p class="statsunusualseffect">${statClockText}${getString("ui", 79)} ${getString("effect", array[1])}</p>`;

        img1 = `<img class="effectimg" src="./images/effect/${getImg("effect", array[1])}" alt="" loading="lazy">`;
        img2 = `<img src="./images/item/${skinFolder}${getImg("item", array[0])}" alt="" loading="lazy">`;
    }

    let urlOptions = {
        item: array[0],
        wear: array[3]
    }
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

    let steamMarketUrl = generateSteamMarketUrl(urlOptions);
    let backpackUrl = generateBackpackTfUrl(urlOptions);
    let marketplaceUrl = generateMarketplaceTfUrl(urlOptions);

    tempHtml += `<div>
    ${img1}
    ${img2}
    <p class="statsunuusalsname">${itemName}</p>
    <div class="statsunusualsbottom">
    ${effectText}
    <div class="statsunusualsmarketbtns">
    <a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${steamMarketUrl}"><i class="icon-steam"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
    </div>
    </div>
    </div>`;

    if (upd) {
        let noUnusualsMsg = DOM.stats.unusuals.content.querySelector("#nounusuals");
        if (noUnusualsMsg) {
            noUnusualsMsg.remove();
        }
        DOM.stats.unusuals.content.innerHTML += tempHtml;
    } else {
        return tempHtml;
    }

}

let crateStatsGenerated = false;

// Populate list of crates in inventory
function generateCrateStats() {
    if (crateStatsGenerated) {
        return 0;
    }
    crateStatsGenerated = true;
    DOM.stats.crates.container.innerHTML = "";
    let tempHtml = "";

    tempHtml += `<div data-cratestats="bonus">
    <img src="./images/item/${getImg("item", 24)}" alt="" loading="lazy">
    <p class="statscratesname">${getString("ui", 144)}</p>
    </div>`;

    for (let crateNum of crateOrder) {
        let crate = cA[crateNum];
        tempHtml += `<div data-cratestats="${crateNum}">
    <img src="./images/crate/${getImg("crate", crate.id)}" alt="" loading="lazy">
    <p class="statscratesname">${getString("crate", crate.id)}</p>
    <p class="statscratesseries">${getSeries(crate.series)}</p>
    </div>`
    }

    DOM.stats.crates.container.innerHTML = tempHtml;
    document.querySelectorAll("[data-cratestats]").forEach(el => {
        el.addEventListener("pointerdown", () => {
            sound.play("btn");
        })
        el.addEventListener("click", evt => {
            sound.play("btnRelease");
            DOM.stats.container.style.display = "none";
            DOM.stats.crates.details.container.classList.add("visible");
            generateCrateDetails(el.dataset.cratestats);
        })
    })
}


// Crate inventory
let showAllItems = false; // Debug variable - if set to true, will show items that were never unboxed as well
function generateCrateDetails(crate, el, saveObj, bonus) {
    let gridWidth = 0;
    let gridClass = "col0";
    let gridArray = ["col0", "col1", "col2", "col3"];

    let htmlEl = DOM.stats.crates.details;

    if (el != undefined) {
        htmlEl = el;
    }

    let saveObject = save;

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
    let tempHTML = "";
    if (crate === "bonus" || bonus === true) {
        if (el === undefined) {
            htmlEl.image.src = `./images/item/${getImg("item", 24)}`;
            htmlEl.title.innerHTML = `<p>${getString("ui", 144)}</p>`;
            htmlEl.crateStats.innerHTML = `<p>${getString("ui", 143)} ${saveObject.stats["bonus-unboxed"]}</p>`;
        }

        for (let item of saveObject.bonusItems) {
            let urlOptions = {
                item: item.i,
                quality: "unique",
                wear: 0
            }
            let steamMarketUrl = generateSteamMarketUrl(urlOptions);
            let backpackUrl = generateBackpackTfUrl(urlOptions);
            let marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
            tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${getString("item", item.i)}</p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", item.i)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${item.n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    <a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${steamMarketUrl}"><i class="icon-steam"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`
        }
    } else {
        let urlOptions;
        let steamMarketUrl;
        let backpackUrl;
        let marketplaceUrl;
        for (let [index, item] of cA[crate].loot.entries()) {
            switch (item.quality) {
                case 1:
                case 2:
                case 3:
                case 7:
                case 12:
                    if (saveObject.crates[crate][index].n === 0 && !showAllItems) {
                        continue;
                    }

                    let itemImg, kitImg, itemName;
                    itemImg = kitImg = itemName = "";
                    if (item.quality === 12) {
                        itemImg = `<img class="cratedetailsitemimg" src="./images/item/${getImg("item", 452)}" loading="lazy">`;
                        kitImg = `<img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">`;
                        itemName = getString("item", 452).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                    } else {
                        itemImg = `<img class="cratedetailsitemimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">`;
                        itemName = getString("item", item.id);
                    }
                    let borderColor = "bordercolor ";
                    switch (item.quality) {
                        case 2:
                            borderColor += "colorstrange"
                            break;
                        case 3:
                            borderColor = "colorhaunted"
                            break;
                        default:
                            borderColor = "colorunique"
                    }
                    urlOptions = {
                        item: item.id,
                        wear: 0
                    }
                    switch (item.quality) {
                        case 1:
                        case 7:
                            urlOptions.quality = "unique";
                            break;
                        case 2:
                            urlOptions.quality = "strange";
                            break;
                        case 3:
                            urlOptions.quality = "haunted";
                            break;
                        case 12:
                            urlOptions.quality = "strangifier";
                            break;
                    }
                    if (urlOptions.quality != "unique" ||
                        globalBonusItemArray.includes(item.id) ||
                        paintBonusArray.includes(item.id) ||
                        strangePartBonusArray.includes(item.id) ||
                        steamMarketWhitelist.includes(item.id)) {
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                    } else {
                        steamMarketUrl = `<a class="btn btndisabled"><i class="icon-steam"></i></a>`
                    }
                    backpackUrl = generateBackpackTfUrl(urlOptions);
                    marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                    tempHTML += `<div class="${borderColor}">
                    <p class="cratedetailsitemname">${itemName}</p>
                    ${itemImg}${kitImg}
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][index].n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`
                    break;
                case 4:
                case 8:
                case 9:
                case 10:
                    if (saveObject.crates[crate][index].n === 0 && saveObject.crates[crate][index].q === 0 && !showAllItems) {
                        continue;
                    }
                    setGridWidth(2);
                    let qualityString, gradeClass;
                    if (item.quality == 8) {
                        qualityString = `<p class="colorstrange">${getString("ui", 71)} <span class="colorhaunted">${getString("ui", 72)}:</span></p>`;
                    } else {
                        qualityString = `<p class="colorstrange">${getString("ui", 71)}:</p>`;
                    }
                    if (item.grade != 0) {
                        gradeClass = ` class="bordercolor ${gradeTable[item.grade]}"`
                    } else {
                        gradeClass = "";
                    }
                    urlOptions = {
                        item: item.id,
                        quality: "unique",
                        wear: 0
                    }
                    if (item.grade != 0 || steamMarketWhitelist.includes(item.id)) {
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                    } else {
                        steamMarketUrl = `<a class="btn btndisabled"><i class="icon-steam"></i></a>`
                    }
                    backpackUrl = generateBackpackTfUrl(urlOptions);
                    marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                    tempHTML += `<div${gradeClass}>
                    <p class="cratedetailsitemname">${getString("item", item.id)}</p>
                    <div>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                        <div class="cratedetailsqualitylist">
                            <p class="colorunique">${getString("ui", 146)}:</p>
                            <p>${saveObject.crates[crate][index].n}</p>
                            ${qualityString}
                            <p>${saveObject.crates[crate][index].q}</p>
                        </div>
                    </div>
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][index].n + saveObject.crates[crate][index].q} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`
                    break;
                case 5:
                case 6:
                    let noItems = true;
                    for (let variant in saveObject.crates[crate][index]) {
                        if (saveObject.crates[crate][index][variant] != 0 || showAllItems) {
                            noItems = false;
                            break;
                        }
                    }
                    if (noItems) {
                        continue;
                    }
                    setGridWidth(3);
                    let gradeClass2;
                    if (item.grade != 0) {
                        gradeClass2 = ` class="bordercolor ${gradeTable[item.grade]}"`
                    } else {
                        gradeClass2 = "";
                    }
                    let strangeList = "";
                    let saveItem = saveObject.crates[crate][index];
                    let itemTotal = saveItem.FN + saveItem.MW + saveItem.FT + saveItem.WW + saveItem.BS;
                    if (item.quality === 6) {
                        strangeList = `<div class="cratedetailsqualitylist">
                        <p class="colorstrange">${getString("ui", 80)}:</p>
                        <p>${saveObject.crates[crate][index].FNq}</p>
                        <p class="colorstrange">${getString("ui", 81)}:</p>
                        <p>${saveObject.crates[crate][index].MWq}</p>
                        <p class="colorstrange">${getString("ui", 82)}:</p>
                        <p>${saveObject.crates[crate][index].FTq}</p>
                        <p class="colorstrange">${getString("ui", 83)}:</p>
                        <p>${saveObject.crates[crate][index].WWq}</p>
                        <p class="colorstrange">${getString("ui", 84)}:</p>
                        <p>${saveObject.crates[crate][index].BSq}</p>
                        </div>`;
                        itemTotal += saveItem.FNq + saveItem.MWq + saveItem.FTq + saveItem.WWq + saveItem.BSq;
                    }
                    tempHTML += `<div${gradeClass2}>
                    <p class="cratedetailsitemname">${getString("item", item.id)}</p>
                    <div>
                    <img class="cratedetailsitemimg" src="./images/item/skins/BS${getImg("item", item.id)}" loading="lazy">
                        <div class="cratedetailsqualitylist">
                            <p class="colorunique">${getString("ui", 80)}:</p>
                            <p>${saveObject.crates[crate][index].FN}</p>
                            <p class="colorunique">${getString("ui", 81)}:</p>
                            <p>${saveObject.crates[crate][index].MW}</p>
                            <p class="colorunique">${getString("ui", 82)}:</p>
                            <p>${saveObject.crates[crate][index].FT}</p>
                            <p class="colorunique">${getString("ui", 83)}:</p>
                            <p>${saveObject.crates[crate][index].WW}</p>
                            <p class="colorunique">${getString("ui", 84)}:</p>
                            <p>${saveObject.crates[crate][index].BS}</p>
                        </div>
                        ${strangeList}
                    </div>
                    <p class="cratedetailsitemunboxed cratedetailsitemnomarket">${getString("ui", 53)} ${itemTotal} ${getString("ui", 54)}</p>
                    </div>`
                    break;
                case 11:
                    if (saveObject.crates[crate][index].n === 0 && saveObject.crates[crate][index].s.length === 0 && saveObject.crates[crate][index].p.length === 0 && !showAllItems) {
                        continue;
                    }
                    setGridWidth(1);

                    if (saveObject.crates[crate][index].n != 0) {
                        let itemName = getString("item", 764).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 1
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}</p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 764)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][index].n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }

                    for (let specKit of saveObject.crates[crate][index].s) {
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 2
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        let itemName = getString("item", 765).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}<br>
                    <span class="cratedetailskillstreak">${getString("ui", 126)} ${getString("ui", sheenTable[specKit.s])}</span></p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 765)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${specKit.n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }

                    for (let proKit of saveObject.crates[crate][index].p) {
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 3
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        let itemName = getString("item", 766).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}<br>
                    <span class="cratedetailskillstreak">${getString("ui", 126)} ${getString("ui", sheenTable[proKit.s])}<br>
                    ${getString("ui", 127)} ${getString("ui", killstreakerTable[proKit.k])}</span></p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 766)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${proKit.n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }
                    break;
            }
        }
        if (cA[crate].exclusiveBonus) {
            for (let [index, item] of cA[crate].exclusiveBonus.loot.entries()) {
                let bonusItemIndex = cA[crate].loot.length + index;
                if (saveObject.crates[crate][bonusItemIndex].n === 0 && !showAllItems) {
                    continue;
                }
                urlOptions = {
                    item: item,
                    quality: "unique",
                    wear: 0
                }
                steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                backpackUrl = generateBackpackTfUrl(urlOptions);
                marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                tempHTML += `<div class="bordercolor colorunique">
                <p class="cratedetailsitemname">${getString("item", item)}</p>
                <img class="cratedetailsitemimg" src="./images/item/${getImg("item", item)}" loading="lazy">
                <div class="cratedetailsitembottom">
                <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][bonusItemIndex].n} ${getString("ui", 54)}</p>
                <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                </div>`;
            }
        }
        if (cA[crate].creepyBonus) {
            for (let [index, item] of creepyCrateBonusArray.entries()) {
                let bonusItemIndex = cA[crate].loot.length + index;
                if (item.quality == 11) {
                    if (saveObject.crates[crate][bonusItemIndex].n === 0 && saveObject.crates[crate][bonusItemIndex].s.length === 0 && saveObject.crates[crate][bonusItemIndex].p.length === 0 && !showAllItems) {
                        continue;
                    }
                    setGridWidth(1);

                    if (saveObject.crates[crate][bonusItemIndex].n != 0) {
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 1
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        let itemName = getString("item", 764).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}</p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 764)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][bonusItemIndex].n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }

                    for (let specKit of saveObject.crates[crate][bonusItemIndex].s) {
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 2
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        let itemName = getString("item", 765).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}<br>
                    <span class="cratedetailskillstreak">${getString("ui", 126)} ${getString("ui", sheenTable[specKit.s])}</span></p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 765)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${specKit.n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }

                    for (let proKit of saveObject.crates[crate][bonusItemIndex].p) {
                        urlOptions = {
                            item: item.id,
                            quality: "unique",
                            wear: 0,
                            kit: 3
                        }
                        steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                        backpackUrl = generateBackpackTfUrl(urlOptions);
                        marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                        let itemName = getString("item", 766).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                        tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}<br>
                    <span class="cratedetailskillstreak">${getString("ui", 126)} ${getString("ui", sheenTable[proKit.s])}<br>
                    ${getString("ui", 127)} ${getString("ui", killstreakerTable[proKit.k])}</span></p>
                    <img class="cratedetailsitemimg" src="./images/item/${getImg("item", 766)}" loading="lazy">
                    <img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${proKit.n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                    }
                } else {
                    if (saveObject.crates[crate][bonusItemIndex].n === 0 && !showAllItems) {
                        continue;
                    }
                    urlOptions = {
                        item: item.id,
                        quality: "strangifier",
                        wear: 0
                    }
                    steamMarketUrl = `<a class="btn tooltiptop" data-tooltip="${getString("ui", 197)}" data-tooltipstring="197" target="_blank" rel="noopener" href="${generateSteamMarketUrl(urlOptions)}"><i class="icon-steam"></i></a>`
                    backpackUrl = generateBackpackTfUrl(urlOptions);
                    marketplaceUrl = generateMarketplaceTfUrl(urlOptions);
                    let itemImg = `<img class="cratedetailsitemimg" src="./images/item/${getImg("item", 452)}" loading="lazy">`;
                    let kitImg = `<img class="cratedetailskitimg" src="./images/item/${getImg("item", item.id)}" loading="lazy">`;
                    let itemName = getString("item", 452).replace("#ITEM#", getString("item", item.id)).replace('The ', '');
                    tempHTML += `<div class="bordercolor colorunique">
                    <p class="cratedetailsitemname">${itemName}</p>
                    ${itemImg}${kitImg}
                    <div class="cratedetailsitembottom">
                    <p class="cratedetailsitemunboxed">${getString("ui", 53)} ${saveObject.crates[crate][bonusItemIndex].n} ${getString("ui", 54)}</p>
                    <div class="cratedetailsitemmarketbtns">
                    ${steamMarketUrl}<a class="btn tooltiptop" data-tooltip="${getString("ui", 198)}" data-tooltipstring="198" target="_blank" rel="noopener" href="${backpackUrl}"><i class="icon-backpacktf"></i></a><a class="btn tooltiptop" data-tooltip="${getString("ui", 199)}" data-tooltipstring="199" target="_blank" rel="noopener" href="${marketplaceUrl}"><i class="icon-marketplacetf"></i></a>
                    </div>
                    </div>
                    </div>`;
                }

            }
        }
        if (el === undefined) {
            htmlEl.image.src = `./images/crate/${getImg("crate", cA[crate].id)}`;
            htmlEl.title.innerHTML = `<p>${getString("crate", cA[crate].id)}</p>
        <p>${getSeries(cA[crate].series)}</p>`;
            let stats = `<p>${getString("ui", 53)} ${saveObject.crateStats[crate].n} ${getString("ui", 54)}</p>`;
            if (saveObject.crateStats[crate].u != undefined) {
                stats += `<p>${getString("ui", 40)} ${saveObject.crateStats[crate].u}</p>`;
            }
            if (saveObject.crateStats[crate].b != undefined) {
                stats += `<p>${getString("ui", 143)} ${saveObject.crateStats[crate].b}</p>`;
            }
            htmlEl.crateStats.innerHTML = stats;
        }
    }
    htmlEl.content.removeAttribute("class");
    htmlEl.content.classList.add(gridClass);
    htmlEl.content.innerHTML = tempHTML;
}

// Keyboard events
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
    };
});

// Languages
let language = "eng";
const dataObj = {
    "item": dataItems,
    "crate": dataCrates,
    "effect": dataEffects,
    "ui": dataUi
}

function getString(type, id) {
    if (dataObj[type][id][language] == undefined) { // If the string does not exist in current language, return it in English instead
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

let strangeStringPosition = "left"; // Whether the "Strange" string in item names should appear before or after the item name

function changeLanguage(lang) {
    language = lang;
    localStorage.setItem("unboxertf-languagechanged", "true");
    unusualsGenerated = false;
    document.querySelectorAll("[data-string]").forEach(item => {
        item.innerHTML = getString("ui", item.dataset.string)
    });
    document.querySelectorAll("[data-tooltipstring]").forEach(item => {
        item.dataset.tooltip = getString("ui", item.dataset.tooltipstring)
    });
    document.querySelectorAll("[data-placeholderstring]").forEach(item => {
        item.placeholder = getString("ui", item.dataset.placeholderstring)
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
        case "rom":
            document.documentElement.lang = "ro";
            break;
        case "swe":
            document.documentElement.lang = "sv";
            break;
        case "fil":
            document.documentElement.lang = "fil";
            break;
    }
    jumpToCrate(currentCrate);
    if (DOM.main.crateGrid.innerHTML != "") {
        generateGrid();
    }
    if (crateStatsGenerated) {
        crateStatsGenerated = false;
        generateCrateStats();
    }
}

// Crate series
function getSeries(id) {
    if (id == 0) {
        return getString("ui", 76);
    } else {
        return getString("ui", 75).replace("(NUM)", id);
    }
}

// Sound
const sound = {
    btn: new Audio(new URL('../sound/btn.mp3',
        import.meta.url)),
    btnRelease: new Audio(new URL('../sound/btnrelease.mp3',
        import.meta.url)),
    crateOpen: new Audio(new URL('../sound/crateopen.mp3',
        import.meta.url)),
    winterCrateOpen: new Audio(new URL('../sound/wintercrateopen.mp3',
        import.meta.url)),
    roboCrateOpen: new Audio(new URL('../sound/robocrateopen.mp3',
        import.meta.url)),
    unboxed: new Audio(new URL('../sound/unboxed.mp3',
        import.meta.url)),
    unusualUnboxed: new Audio(new URL('../sound/unusualunboxed.mp3',
        import.meta.url)),
    play: id => {
        if (save.options.muteSound) {
            return;
        }
        if (sound[id].paused) {
            sound[id].play();
        } else {
            sound[id].currentTime = 0;
        }
    }
}
DOM.main.muteSoundBtn.addEventListener("click", () => {
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

for (let el of document.getElementsByClassName("btn")) {
    el.addEventListener("pointerdown", () => {
        if (!el.classList.contains("btndisabled")) {
            sound.play("btn");
        }
    });
    el.addEventListener("click", () => {
        if (!el.classList.contains("btndisabled")) {
            sound.play("btnRelease");
        }
    });
}

// Previous/next crate buttons

function jumpToCrate(param, firstLoad = false) {
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
        default: // Jump to specific crate
            currentCrate = param;
            break;
    }
    currentCrateObj = cA[crateOrder[currentCrate]];
    if (!firstLoad) {
        DOM.main.crateName.innerHTML = getString("crate", currentCrateObj.id)
        DOM.main.series.innerHTML = getSeries(currentCrateObj.series);
        DOM.main.img.src = "./images/crate/" + getImg("crate", currentCrateObj.id);
        DOM.main.lootList.innerHTML = "";
        DOM.main.effectsList.innerHTML = "";
        generateLootList();
        generateEffectList();
    }
}

DOM.main.nextCrateBtn.addEventListener("click", () => {
    jumpToCrate("next");
});
DOM.main.previousCrateBtn.addEventListener("click", () => {
    jumpToCrate("previous");
});

// Generate loot list

function generateLootList() {
    let html = [];

    for (let item of currentCrateObj.loot) {
        let itemClass = "";
        let itemName = "";

        switch (item.quality) {
            case 11:
                itemName = getString("item", 764).replace("#ITEM#", getString("item", item.id));
                itemName = itemName.replace('The ', '');
                break;
            case 12:
                itemName = getString("item", 452).replace("#ITEM#", getString("item", item.id));
                itemName = itemName.replace('The ', '');
                break;
            default:
                itemName = getString("item", item.id);
        }

        if (gradeTable[item.grade] != 0) {
            itemClass = ` class="${gradeTable[item.grade]}"`
        }
        html.push(`<li${itemClass}>${itemName}</li>`);
    };

    if (currentCrateObj.unusual === 1) {
        html.push(`<li class="unusualloot">${getString("ui", 74)}</li>`);
    }

    DOM.main.lootList.innerHTML = html.join('');

    let bonusHTML = [];
    if (currentCrateObj.bonus) {
        bonusHTML.push(`<p>${getString("ui", 147)}</p>`);
    }
    if (currentCrateObj.exclusiveBonus) {
        bonusHTML.push(`<p>${getString("ui", 148)}</p><ul>`)

        for (let bonusItem of currentCrateObj.exclusiveBonus.loot) {
            bonusHTML.push(`<li>${getString("item", bonusItem)}</li>`);
        }

        bonusHTML.push("</ul>")
    }
    if (currentCrateObj.creepyBonus) {
        bonusHTML.push(`<p>${getString("ui", 148)}</p><ul>`);

        for (let bonusItem of creepyCrateBonusArray) {
            if (bonusItem.quality == 12) {
                bonusHTML.push(`<li>${getString("item", 452).replace("#ITEM#", getString("item", bonusItem.id)).replace('The ', '')}</li>`);
            } else {
                bonusHTML.push(`<li>${getString("item", 764).replace("#ITEM#", getString("item", bonusItem.id)).replace('The ', '')}</li>`);
            }

        }

        bonusHTML.push("</ul>")
    }
    DOM.main.lootBonus.innerHTML = bonusHTML.join('');

    if (currentCrateObj.note > 0) {
        DOM.main.lootNote.innerHTML = getString("ui", currentCrateObj.note);
    } else {
        DOM.main.lootNote.innerHTML = "";
    }
}

// Generate effect list

function generateEffectList() {
    let html = [];
    let effectsArray;
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
            case "hw21":
                effectsArray = hw21FX;
                break;
            case "hw22":
                effectsArray = hw22FX;
                break;
            case "hw23":
                effectsArray = hw23FX;
                break;
            case "hw24":
                effectsArray = hw24FX;
                break;
            case "hw25":
                effectsArray = hw25FX;
                break;
            case "xmas19":
                effectsArray = xmas19FX;
                break;
            case "xmas20":
                effectsArray = xmas20FX;
                break;
            case "xmas21":
                effectsArray = xmas21FX;
                break;
            case "xmas22":
                effectsArray = xmas22FX;
                break;
            case "xmas23":
                effectsArray = xmas23FX;
                break;
            case "xmas24":
                effectsArray = xmas24FX;
                break;
            case "summer23":
                effectsArray = summer23FX;
                break;
            case "summer24":
                effectsArray = summer24FX;
                break;
            case "summer25":
                effectsArray = summer25FX;
                break;

        }
    } else {
        effectsArray = currentCrateObj.effects;
    }
    for (let i = 0; i < effectsArray.length; i++) {
        html.push(`<li>${getString("effect", effectsArray[i])}</li>`);
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
};

function crateHasRandomStranges(crate) {
    let result = false;
    for (let item of crate.loot) {
        if ([4, 6, 8, 9, 10].includes(item.quality)) {
            result = true;
            break;
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
    let steamUrlItemName = `${getEngString("item", arg.item).replace("| ", "")}`;
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
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    } else if (arg.quality == "strangifier") {
        steamUrlItemName = getEngString("item", 452).replace("#ITEM#", getEngString("item", arg.item));
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    } else if (arg.item == 770) {
        steamUrlItemName = steamUrlItemName.replace("#ITEM#", getEngString("item", arg.kitItem));
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    }
    if (arg.quality.includes("unusual")) {
        steamUrlItemName = "Unusual " + steamUrlItemName;
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    }
    if (arg.quality.includes("haunted")) {
        steamUrlItemName = "Haunted " + steamUrlItemName;
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    }
    if (arg.quality.includes("strange")) {
        steamUrlItemName = "Strange " + steamUrlItemName;
        steamUrlItemName = steamUrlItemName.replace('The ', '');
    }
    if (arg.wear != 0) {
        steamUrlItemName += ` (${getEngString("ui", wearTableNames[arg.wear])})`;
    }
    return encodeURI(`https://steamcommunity.com/market/listings/440/${steamUrlItemName}`);
}

function generateBackpackTfUrl(arg) {
    let bpItemName = getEngString("item", arg.item).replace('The ', '');
    if (arg.item == 770) {
        bpItemName = bpItemName.replace("#ITEM# ", "");
    } else if (arg.wear != 0) {
        bpItemName += ` (${getEngString("ui", wearTableNames[arg.wear])})`;
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

    let bpQuality = "";

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
                console.warn(`Unknown Bptf quality: ${arg.quality}`);
            }

    }

    let bpCraftable = "Craftable";
    if (arg.item == 770 || arg.kit) {
        bpCraftable = "Non-Craftable";
    }

    let bpEffect;
    if (arg.item == 770) {
        bpEffect = getSchema("item", arg.kitItem);
    } else if (arg.quality.includes("unusual")) {
        bpEffect = getSchema("effect", arg.effect);
    } else if (arg.quality == "strangifier") {
        bpEffect = getSchema("item", arg.item);
    } else {
        bpEffect = "";
    }

    let bpKit;
    if (arg.kit) {
        bpKit = `${arg.kit}-${getSchema("item", arg.item)}`;
    } else {
        bpKit = "";
    }

    let bpUrl = `${bpQuality}/${bpItemName}/Tradable/${bpCraftable}/${bpEffect}${bpKit}`;

    return encodeURI(`https://backpack.tf/stats/${bpUrl}`);
}

// schema1 / quality / effect / uncraftable / kitlevel / kititem / wear / schema2

function generateMarketplaceTfUrl(arg) {
    let itemId;
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
        itemId = getSchema("item", arg.item)
    }

    let quality;
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

    let effect = "";
    if (arg.effect != undefined) {
        effect = `u${getSchema("effect", arg.effect)};`;
    }

    let wear = "";
    if (arg.wear != 0) {
        wear = `w${arg.wear};`;
    }

    let extraQuality = "";
    if ([5, 13, 15].includes(quality) && arg.quality.includes("strange")) {
        extraQuality = "strange;"
    }

    let craftable = "";
    if (arg.kit || arg.item == 770) {
        craftable = "uncraftable;"
    }

    let kitLevel = "";
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

    let kitItem = "";
    if (arg.kit || arg.quality == "strangifier") {
        kitItem = `td-${getSchema("item", arg.item)};`
    } else if (arg.kitItem) {
        kitItem = `td-${getSchema("item", arg.kitItem)};`;
    }

    let wpId = "";
    if (arg.wear != 0) {
        wpId = getSchema2("item", arg.item);
        if (wpId === false) {
            wpId = `pk${getSchema("item", arg.item).toString().slice(-3)}`;
        } else {
            wpId = `pk${wpId}`
        }
    }

    let link = `https://marketplace.tf/items/tf2/${itemId};${quality};${effect}${craftable}${wear}${wpId}${extraQuality}${kitLevel}${kitItem}`;

    if (link[link.length - 1] == ";") {
        link = link.slice(0, -1);
    }

    return encodeURI(link);
}

// Unboxing code
function unbox() { // This function handles the unboxing itself: which item is unboxed, what are its qualities, wear, effect etc.
    let randomNumber, unusualRandomNumber, itemId, itemWear, itemEffect, itemKillstreak, bonusDrops, cratePos;
    let itemQuality = [];
    const crate = currentCrateObj;
    randomNumber = Math.floor((Math.random() * 10000) + 1); // Between 1 and 10000
    unusualRandomNumber = Math.floor((Math.random() * 150) + 1) // Between 1 and 150
    let tempNumber = 0;
    // Select item from crate
    let crateItem;
    if (crate.unusual && ((unusualRandomNumber === 1) || save.options.forceUnusual)) { // 0.66% chance
        // Item is a random unusual. Pick a random unusual, then assign Unusual (and Strange if applicable) qualities
        let unusualArray = [];
        switch (crate.unusual) {
            case 1: // Pick a random unusual from the general unusual pool
                unusualArray = unusualPool.slice();
                if (currentCrate === 96 && save.options.eotlGlitch) {
                    unusualArray = unusualArray.concat(eotlGlitchUnusualPool);
                }
                if (currentCrateObj.series >= 1 && currentCrateObj.series <= 55 && save.options.sniperVsSpyUnusuals) {
                    unusualArray = unusualArray.concat(sniperVsSpyUnusualsPool);
                }
                if (currentCrateObj.series >= 1 && currentCrateObj.series <= 102 && save.options.miscUnusuals) {
                    unusualArray = unusualArray.concat(miscUnusualPool);
                }
                if (currentCrateObj.series === 89) {
                    unusualArray = unusualArray.concat(nice2014UnusualPool);
                } else if (currentCrateObj.series === 86) {
                    unusualArray = unusualArray.concat(limitedLateSummerUnusualPool);
                }
                itemId = unusualArray[Math.floor(Math.random() * unusualArray.length)];

                if (nice2014UnusualPool.includes(itemId)) {
                    let qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                    if (qualityRandomNumber == 10 || save.options.forceStrange) {
                        itemQuality.push("strange");
                    }
                }

                crateItem = {
                    id: itemId,
                    quality: null
                };
                break;
            case 2: // Pick a random unusual from the same crate, which can have the Unusual quality. Items with higher grades have a smaller chance of being picked
                let gradeRandom;
                if (save.options.forceGrade) {
                    gradeRandom = save.options.forceGradeNum;
                } else {
                    gradeRandom = Math.floor((Math.random() * 1000) + 1); // Between 1 and 1000
                    if (gradeRandom <= 8) { // Elite - 0.8%
                        gradeRandom = 6;
                    } else if (gradeRandom <= 40) { // Assassin - 3.2%
                        gradeRandom = 5;
                    } else if (gradeRandom <= 200) { // Commando - 16%
                        gradeRandom = 4;
                    } else { // Mercnary - 80%
                        gradeRandom = 3;
                    };
                }
                while (unusualArray.length === 0) {
                    unusualArray = crate.loot.filter(item => {
                        return [6, 7, 9, 10].includes(item.quality) && item.grade == gradeRandom;
                    });
                    if (save.options.miscUnusuals && currentCrate === 105 && gradeRandom === 4) {
                        unusualArray.push(crate.loot[5]) // Captain Space Mann
                    }
                    if (gradeRandom <= 2) {
                        throw new Error;
                    }
                    gradeRandom--;
                }
                crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
                itemId = crateItem.id;
                break;
            case 3: // Same as case 2, but items have equal chance of being picked instead
                unusualArray = crate.loot.filter(item => {
                    return [6, 7, 9, 10].includes(item.quality);
                });
                crateItem = unusualArray[Math.floor(Math.random() * unusualArray.length)];
                itemId = crateItem.id;
                break;
        }
        itemQuality.push("unusual");
    } else {
        // Unbox something else
        switch (crate.autoChance) {
            case 1:
                let gradeRandom;
                if (save.options.forceGrade) {
                    gradeRandom = save.options.forceGradeNum;
                } else {
                    gradeRandom = Math.floor((Math.random() * 1000) + 1); // Between 1 and 1000
                    if (gradeRandom <= 8) { // Elite - 0.8%
                        gradeRandom = 6;
                    } else if (gradeRandom <= 40) { // Assassin - 3.2%
                        gradeRandom = 5;
                    } else if (gradeRandom <= 200) { // Commando - 16%
                        gradeRandom = 4;
                    } else { // Mercnary - 80%
                        gradeRandom = 3;
                    };

                    if (crate.loot[0].grade === 1) gradeRandom -= 2;
                }
                let itemPool = [];
                while (itemPool.length === 0) {
                    itemPool = crate.loot.filter(item => {
                        return item.grade == gradeRandom;
                    });
                    if (gradeRandom <= 0) {
                        throw new Error;
                    }
                    gradeRandom--;
                }

                let randomItemNumber = Math.floor(Math.random() * (itemPool.length)); // Between 0 and itemPool.length - 1
                crateItem = itemPool[randomItemNumber];
                cratePos = crate.loot.findIndex(it => {
                    return it.id == crateItem.id;
                })
                break;

            case 2:
                let randomItemNumber2 = Math.floor(Math.random() * (crate.loot.length)); // Between 0 and crate.loot.length - 1
                crateItem = crate.loot[randomItemNumber2];
                cratePos = randomItemNumber2;
                break;

            default:
                randomNumber = Math.floor((Math.random() * 9900) + 1);
                for (const item in crate.loot) {
                    if (randomNumber > tempNumber && randomNumber <= tempNumber + crate.loot[item].chance) {
                        crateItem = crate.loot[item]; // Create a copy of the item we unboxed. Otherwise, we may end up modifying the item in the crate
                        cratePos = item;
                        break;
                    } else {
                        tempNumber += crate.loot[item].chance;
                    }
                };
        }
    }
    itemId = crateItem.id;

    // Handle random unusual items and item qualities
    let generateWear = false;
    if (crateItem.quality != null) {
        // Item is not a random unusual. Assign quality
        let qualityRandomNumber;
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
                qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
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
                qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
                if (qualityRandomNumber == 10 || save.options.forceStrange) {
                    itemQuality.push("strange");
                };
                break;
            case 8:
                qualityRandomNumber = Math.floor((Math.random() * 10) + 1); // Between 1 and 10
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
                }
                qualityRandomNumber = Math.floor((Math.random() * 100) + 1);
                if (qualityRandomNumber > 65 || save.options.forceProKit) {
                    // Pick sheen
                    itemKillstreak.sheen = Math.floor((Math.random() * (sheenTable.length - 1)) + 1);
                }
                if (qualityRandomNumber > 90 || save.options.forceProKit) {
                    // Pick killstreaker
                    itemKillstreak.killstreaker = Math.floor((Math.random() * (killstreakerTable.length - 1)) + 1);
                }
                break;
            case 12:
                itemQuality.push("strangifier");
                break;
        };
    };
    if (itemQuality.length === 1) {
        itemQuality = itemQuality[0];
    } else {
        itemQuality = itemQuality.join("");
    }

    // Wear
    itemWear = 0;
    if (generateWear) {
        let randomWear = Math.floor((Math.random() * 10) + 1);
        switch (randomWear) {
            case 1: // 10% - Battle Scarred
                itemWear = 1;
                break;
            case 2:
            case 3: // 20% - Well-Worn
                itemWear = 2;
                break;
            case 4:
            case 5:
            case 6:
            case 7: // 40% - Field-Tested
                itemWear = 3;
                break;
            case 8:
            case 9: // 20% - Minimal Wear
                itemWear = 4;
                break;
            case 10: // 10% - Factory New
                itemWear = 5;
                break;
        }
    }

    // Unusual effect
    itemEffect = 0;
    if (itemQuality.includes("unusual")) {
        let effectsArray;
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
                case "hw21":
                    effectsArray = hw21FX;
                    break;
                case "hw22":
                    effectsArray = hw22FX;
                    break;
                case "hw23":
                    effectsArray = hw23FX;
                    break;
                case "hw24":
                    effectsArray = hw24FX;
                    break;
                case "hw25":
                    effectsArray = hw25FX;
                    break;
                case "xmas19":
                    effectsArray = xmas19FX;
                    break;
                case "xmas20":
                    effectsArray = xmas20FX;
                    break;
                case "xmas21":
                    effectsArray = xmas21FX;
                    break;
                case "xmas22":
                    effectsArray = xmas22FX;
                    break;
                case "xmas23":
                    effectsArray = xmas23FX;
                    break;
                case "xmas24":
                    effectsArray = xmas24FX;
                    break;
                case "summer23":
                    effectsArray = summer23FX;
                    break;
                case "summer24":
                    effectsArray = summer24FX;
                    break;
                case "summer25":
                    effectsArray = summer25FX;
                    break;
            }
        } else {
            effectsArray = crate.effects;

            // If unboxing an Unusual robohat from the Robo Community Crate, add 1st, 2nd and 3rd gen effects to effect pool
            if (currentCrateObj.series === 58) {
                for (let item of currentCrateObj.loot) {
                    if (itemId === item.id) {
                        effectsArray = effectsArray.concat(allGensFX);
                    }
                }
            }
        }
        itemEffect = effectsArray[Math.floor(Math.random() * effectsArray.length)];
    };

    // Bonus drops

    bonusDrops = [];
    if (crate.bonus) {
        let bonusNum = 0;
        if (save.options.forceBonusItem) {
            bonusNum = 3;
        } else {
            bonusNum = 0;
            let bonusChance = Math.floor((Math.random() * 5) + 1); // Between 1 and 5
            if (bonusChance <= 2 || save.options.forceBonusItem) { // 40% chance to get bonus drop
                bonusNum++;
                bonusChance = Math.floor((Math.random() * 5) + 1) // Between 1 and 5
                if (bonusChance == 1) { // 20% chance to get another bonus drop (8%)
                    bonusNum++;
                    bonusChance = Math.floor((Math.random() * 25) + 1) // Between 1 and 25
                    if (bonusChance == 1) { // 4% chance to get third bonus drop (0.32%)
                        bonusNum++;
                    }
                }
            }
        }
        let oneExclusiveBonusUnboxed = false;
        for (; bonusNum > 0; bonusNum--) {
            let unusualifierChance = Math.floor((Math.random() * 1000) + 1) // Between 1 and 1000
            if (unusualifierChance <= 10 || save.options.forceUnusualifier) { // 1% chance
                // Unbox unusualifier
                let randomTaunt = Math.floor(Math.random() * unusualifierArray.length);
                bonusDrops.push({
                    id: 770,
                    taunt: unusualifierArray[randomTaunt]
                })
            } else {
                let unboxExclusive = false;
                if (crate.exclusiveBonus && !oneExclusiveBonusUnboxed) {
                    let exclusiveBonusChance = Math.floor((Math.random() * 10000) + 1) // Between 1 and 10000
                    if (exclusiveBonusChance <= crate.exclusiveBonus.chance) {
                        unboxExclusive = true;
                        if (crate.oneExclusiveBonus) {
                            oneExclusiveBonusUnboxed = true;
                        }
                    }
                }

                if (unboxExclusive) {
                    // Case exclusive bonus drop
                    let randomBonus = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);
                    bonusDrops.push({
                        id: crate.exclusiveBonus.loot[randomBonus]
                    })
                } else {
                    // Global bonus drop
                    let randomBonus = Math.floor(Math.random() * globalBonusItemArray.length)
                    switch (globalBonusItemArray[randomBonus]) {
                        case "paint": // Pick random paint
                            bonusDrops.push({
                                id: paintBonusArray[Math.floor(Math.random() * paintBonusArray.length)]
                            });
                            break;
                        case "strangepart": // Pick random strange part
                            bonusDrops.push({
                                id: strangePartBonusArray[Math.floor(Math.random() * strangePartBonusArray.length)]
                            });
                            break;
                        default:
                            bonusDrops.push({
                                id: globalBonusItemArray[randomBonus]
                            })
                            break;
                    }
                }
            }
        }
    } else if (crate.exclusiveBonus) {
        let exclusiveBonusChance = Math.floor((Math.random() * 10000) + 1) // Between 1 and 10000
        if (exclusiveBonusChance <= crate.exclusiveBonus.chance || save.options.forceBonusItem) {
            let randomBonus = Math.floor(Math.random() * crate.exclusiveBonus.loot.length);
            bonusDrops.push({
                id: crate.exclusiveBonus.loot[randomBonus]
            })
        }
    }
    if (crate.creepyBonus) {
        let bonusChance = Math.floor((Math.random() * 50) + 1) // Between 1 and 50
        if (bonusChance === 1 || save.options.forceBonusItem) { // 2% chance
            let randomBonus = Math.floor(Math.random() * creepyCrateBonusArray.length);
            let itemKillstreak;
            if (creepyCrateBonusArray[randomBonus].quality === 11) {
                itemKillstreak = {
                    sheen: null,
                    killstreaker: null
                }
                let randomKillstreak = Math.floor((Math.random() * 100) + 1);
                if (randomKillstreak > 65 || save.options.forceProKit) {
                    // Pick sheen
                    itemKillstreak.sheen = Math.floor((Math.random() * (sheenTable.length - 1)) + 1);
                }
                if (randomKillstreak > 90 || save.options.forceProKit) {
                    // Pick killstreaker
                    itemKillstreak.killstreaker = Math.floor((Math.random() * (killstreakerTable.length - 1)) + 1);
                }

            }
            bonusDrops.push({
                id: creepyCrateBonusArray[randomBonus].id,
                quality: creepyCrateBonusArray[randomBonus].quality,
                killstreak: itemKillstreak
            })
        }
    }

    // Return item
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
    }
}

let unboxStop = false;
let pause = false;

function beginUnbox() { // This function handles the unbox countdown and shows the results of the unboxing
    if (unboxStop) {
        return 0;
    }
    let unboxResult = unbox();
    if (unboxResult === undefined) {
        return 0; // Stop function here
    }
    let soundToPlay = "unboxed";

    // Pause unboxing at certain items

    function pauseUnboxing() {
        pause = unboxStop = true;
        DOM.results.returnBtn.classList.add("btndisabled");
        DOM.results.unboxBtn.classList.add("btndisabled");
        setTimeout(() => {
            DOM.results.returnBtn.classList.remove("btndisabled");
            DOM.results.unboxBtn.classList.remove("btndisabled");
            unboxStop = false;
        }, 3000);
    }

    pause = false;
    for (let check of save.options.stopAtItem) {
        switch (check) {
            case "unusual":
                if (unboxResult.quality.includes("unusual")) {
                    pauseUnboxing();
                }
                break;
            case "tauntunusualifier":
                for (let bonusItem of unboxResult.bonus) {
                    if (bonusItem.id === 770) {
                        pauseUnboxing();
                        break;
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
    if (unboxResult.quality.includes("unusual")) {
        soundToPlay = "unusualUnboxed";
    } else {
        for (let bonusItem of unboxResult.bonus) {
            if (bonusItem.id === 770) {
                soundToPlay = "unusualUnboxed";
                break;
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
            case 122:
            case 127:
            case 140:
            case 145:
            case 150:
            case 154:
            case 158:
                sound.play("winterCrateOpen");
                break;
            default:
                sound.play("crateOpen");
        }
        DOM.unboxing.container.style.display = "block";
        // Dot animation
        let dotAnimPos = 2;
        DOM.unboxing.dots.innerHTML = ".";
        let dotAnimation = setInterval(function () {
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
        }, 500);
        // Countdown
        let secondsUntilUnbox = 5;
        DOM.unboxing.countdown.innerHTML = secondsUntilUnbox;
        let uncratingCountdown = setInterval(function () {
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
        DOM.results.lootName.removeAttribute("class");
        DOM.results.effectImg.src = emptyImage;
        DOM.results.kitField.innerHTML = "";

        let completeLootName = unboxResult.name;

        if (unboxResult.wear) {
            completeLootName += ` (${getString("ui", wearTableNames[unboxResult.wear])})`;
            DOM.results.lootImg.src = `./images/item/skins/${wearTable[unboxResult.wear]}${getImg("item", unboxResult.id)}`;
            DOM.results.kitImg.src = emptyImage;
        } else if (unboxResult.killstreak) {
            if (unboxResult.killstreak.killstreaker) {
                completeLootName = getString("item", 766).replace("#ITEM#", completeLootName);
                DOM.results.lootImg.src = `./images/item/${getImg("item", 766)}`;
                DOM.results.kitField.innerHTML = `${getString("ui", 127)} ${getString("ui", killstreakerTable[unboxResult.killstreak.killstreaker])}
      <br>${getString("ui", 126)} ${getString("ui", sheenTable[unboxResult.killstreak.sheen])}`;

            } else if (unboxResult.killstreak.sheen) {

                completeLootName = getString("item", 765).replace("#ITEM#", completeLootName);
                DOM.results.lootImg.src = `./images/item/${getImg("item", 765)}`;
                DOM.results.kitField.innerHTML = `${getString("ui", 126)} ${getString("ui", sheenTable[unboxResult.killstreak.sheen])}`;

            } else {

                completeLootName = getString("item", 764).replace("#ITEM#", completeLootName);
                DOM.results.lootImg.src = `./images/item/${getImg("item", 764)}`;
            }
            completeLootName = completeLootName.replace('The ', '');
            DOM.results.kitImg.src = `./images/item/${getImg("item", unboxResult.id)}`;
        } else if (unboxResult.quality == "strangifier") {
            completeLootName = getString("item", 452).replace("#ITEM#", completeLootName);
            completeLootName = completeLootName.replace('The ', '');
            DOM.results.lootImg.src = `./images/item/${getImg("item", 452)}`;
            DOM.results.kitImg.src = `./images/item/${getImg("item", unboxResult.id)}`;
        } else {
            DOM.results.lootImg.src = `./images/item/${getImg("item", unboxResult.id)}`;
            DOM.results.kitImg.src = emptyImage;
        }

        if (unboxResult.effect) {
            DOM.results.effectImg.src = `./images/effect/${getImg("effect", unboxResult.effect)}`;
            DOM.results.effectField.style.display = "block";
            DOM.results.effectName.innerHTML = getString("effect", unboxResult.effect);
        } else {
            DOM.results.effectField.style.display = "none";
        }

        let tempQualityName = [];
        if (unboxResult.grade) {
            // Item has grade
            DOM.results.lootName.classList.add(gradeTable[unboxResult.grade]);
            if (unboxResult.quality.includes("strange")) {
                if (unboxResult.wear) {
                    DOM.results.kitField.innerHTML = `<span class="colorstrange">${getString("ui", 157)}</span>`;
                } else {
                    tempQualityName.push(`<span class="colorstrange">(${getString("ui", 71)})</span>`);
                }
            }
            if (unboxResult.quality.includes("unusual")) {
                tempQualityName.push(`<span class="colorunusual">(${getString("ui", 73)})</span>`);
            }
        } else {
            // Item has no grade
            if (unboxResult.quality.includes("unusual")) {
                // Item is unusual
                DOM.results.lootName.classList.add("colorunusual");
                completeLootName = completeLootName.replace('The ', '');
                if (unboxResult.quality.includes("strange")) {
                    tempQualityName.push(`<span class="colorstrange">(${getString("ui", 71)})</span>`);
                }
                tempQualityName.push(`(${getString("ui", 73)})`);
            } else {
                // Item is not unusual

                if (unboxResult.quality.includes("haunted")) {
                    DOM.results.lootName.classList.add("colorhaunted");
                    completeLootName = completeLootName.replace('The ', '');
                    if (unboxResult.quality.includes("strange")) {
                        tempQualityName.push(`(${getString("ui", 71)})`);
                    }
                    tempQualityName.push(`(${getString("ui", 72)})`);
                } else if (unboxResult.quality.includes("strange")) {
                    DOM.results.lootName.classList.add("colorstrange");
                    completeLootName = completeLootName.replace('The ', '');
                    tempQualityName.push(`(${getString("ui", 71)})`);
                } else {
                    // Item is not unusual or strange. So it must be unique
                    DOM.results.lootName.classList.add("colorunique");
                }
            }
        }

        if (strangeStringPosition === "left") {
            for (let quality in tempQualityName) {
                if (typeof tempQualityName[quality] === 'string' || tempQualityName[quality] instanceof String) {
                    tempQualityName[quality] = tempQualityName[quality].replace("(", "").replace(")", "");
                }
            }
            DOM.results.lootName.innerHTML = `${tempQualityName.join(" ")} ${completeLootName}`;
        } else {
            DOM.results.lootName.innerHTML = `${completeLootName} ${tempQualityName.join(" ")}`;
        }

        // Show bonus items
        DOM.results.bonusItemContainer.removeAttribute("class");
        if (currentCrateObj.bonus || currentCrateObj.creepyBonus || currentCrateObj.exclusiveBonus) {
            DOM.results.bonusContainer.style.display = "block";
            if (unboxResult.bonus.length > 0) {
                let bonusHTML = "";
                for (let bonusItem of unboxResult.bonus) {
                    if (bonusItem.taunt != undefined) {
                        bonusHTML += `<div class="unusual"><img src="./images/item/${getImg("item", bonusItem.id)}">
                    <img class="unusualifierimg" src="./images/item/${getImg("item", bonusItem.taunt)}">
                <div class="bonustooltip colorunusual">${getString("item", bonusItem.id).replace("#ITEM#", getString("item", bonusItem.taunt))}</div>
                </div>`;
                    } else if (bonusItem.killstreak != undefined) {
                        let killstreakImg;
                        let itemName;
                        if (bonusItem.killstreak.killstreaker != undefined) {
                            killstreakImg = getImg("item", 766);
                            itemName = getString("item", 766);
                        } else if (bonusItem.killstreak.sheen != undefined) {
                            killstreakImg = getImg("item", 765);
                            itemName = getString("item", 765);
                        } else {
                            killstreakImg = getImg("item", 764);
                            itemName = getString("item", 764);
                        }
                        itemName = itemName.replace("#ITEM#", getString("item", bonusItem.id)).replace('The ', '');
                        bonusHTML += `<div><img src="./images/item/${killstreakImg}">
                    <img class="kitimg" src="./images/item/${getImg("item", bonusItem.id)}">
                <div class="bonustooltip">${itemName}</div>
                </div>`;
                    } else if (bonusItem.quality === 12) {
                        bonusHTML += `<div><img src="./images/item/${getImg("item", 452)}">
                    <img class="kitimg" src="./images/item/${getImg("item", bonusItem.id)}">
                <div class="bonustooltip">${getString("item", 452).replace("#ITEM#", getString("item", bonusItem.id)).replace('The ', '')}</div>
                </div>`;
                    } else {
                        bonusHTML += `<div><img src="./images/item/${getImg("item", bonusItem.id)}">
                <div class="bonustooltip">${getString("item", bonusItem.id)}</div>
                </div>`;
                    }

                };
                DOM.results.bonusItemContainer.classList.add(`i${unboxResult.bonus.length}`);
                DOM.results.bonusItemContainer.innerHTML = bonusHTML;
                document.querySelectorAll(".bonustooltip").forEach(el => {
                    ["pointerover", "click"].forEach(evt => {
                        el.parentNode.addEventListener(evt, () => {
                            let tooltipPos = el.getBoundingClientRect();
                            if (tooltipPos.x < 0 || (tooltipPos.x + el.clientWidth) > window.innerWidth) {
                                el.style.whiteSpace = "initial";
                            } else {
                                el.style.whiteSpace = "nowrap";
                                tooltipPos = el.getBoundingClientRect();
                                if (tooltipPos.x < 0 || tooltipPos.x + el.clientWidth > window.innerWidth) {
                                    el.style.whiteSpace = "initial";
                                }
                            }
                        })
                    });
                })
            } else {
                DOM.results.bonusItemContainer.innerHTML = `<span id="lootbonusnone">${getString("ui", 145)}</span>`;
            }
        } else {
            DOM.results.bonusContainer.style.display = "none";
        }
        // Update market links
        let urlOptions = {
            item: unboxResult.id,
            quality: unboxResult.quality,
            wear: unboxResult.wear,
        }
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
        if (unboxResult.quality != "unique" ||
            unboxResult.grade != 0 ||
            unboxResult.killstreak != null ||
            globalBonusItemArray.includes(unboxResult.id) ||
            paintBonusArray.includes(unboxResult.id) ||
            strangePartBonusArray.includes(unboxResult.id) ||
            steamMarketWhitelist.includes(unboxResult.id)) {
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
            DOM.results.statsContainer.style.display = "flex";
            // Add items to save
            let itemNum = addToInventory(unboxResult, save, true);

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
    }
}

function addToInventory(unboxResult, saveObj, saveToStorage) {
    let itemNum;
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
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][`${wearTable[unboxResult.wear]}q`] += 1;
                } else {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos][wearTable[unboxResult.wear]] += 1;
                }
                break;
            case 11:
                let found = false;
                if (unboxResult.killstreak.killstreaker) {
                    for (let item of saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p) {
                        if (item.s === unboxResult.killstreak.sheen && item.p === unboxResult.killstreak.killstreaker) {
                            itemNum = item.n += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        itemNum = 1;
                        saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].p.push({
                            n: 1,
                            s: unboxResult.killstreak.sheen,
                            k: unboxResult.killstreak.killstreaker
                        })
                    }
                } else if (unboxResult.killstreak.sheen) {
                    for (let item of saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s) {
                        if (item.s === unboxResult.killstreak.sheen) {
                            itemNum = item.n += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        itemNum = 1;
                        saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].s.push({
                            n: 1,
                            s: unboxResult.killstreak.sheen
                        })
                    }
                } else {
                    itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
                }
                break;
            default:
                itemNum = saveObj.crates[crateOrder[currentCrate]][unboxResult.cratePos].n += 1;
        }
    }
    for (let bonusItem of unboxResult.bonus) {
        if (currentCrateObj.exclusiveBonus.loot != undefined && currentCrateObj.exclusiveBonus.loot.includes(bonusItem.id)) {
            saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + currentCrateObj.exclusiveBonus.loot.findIndex(arrayItem => {
                return arrayItem === bonusItem.id;
            })].n++;
        } else if (currentCrateObj.creepyBonus) {
            let bonusItemPos = creepyCrateBonusArray.findIndex(arrayItem => {
                return arrayItem.id === bonusItem.id && arrayItem.quality === bonusItem.quality;
            });

            if (bonusItem.quality == 12 || (bonusItem.killstreak != null && bonusItem.killstreak.sheen === null)) {
                saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].n++;
            } else if (bonusItem.killstreak.killstreaker === null) {
                let found = false;
                for (let item of saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s) {
                    if (item.s === bonusItem.killstreak.sheen) {
                        item.n += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].s.push({
                        n: 1,
                        s: bonusItem.killstreak.sheen
                    })
                }
            } else {
                let found = false;
                for (let item of saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p) {
                    if (item.s === bonusItem.killstreak.sheen && item.p === bonusItem.killstreak.killstreaker) {
                        item.n += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    saveObj.crates[crateOrder[currentCrate]][currentCrateObj.loot.length + bonusItemPos].p.push({
                        n: 1,
                        s: bonusItem.killstreak.sheen,
                        k: bonusItem.killstreak.killstreaker
                    })
                }
            }

        } else if (bonusItem.id != 770) {
            let found = false;
            for (let saveItem of saveObj.bonusItems) {
                if (saveItem.i === bonusItem.id) {
                    saveItem.n++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                saveObj.bonusItems.push({
                    i: bonusItem.id,
                    n: 1,
                })
            }
        }
    }
    if (saveToStorage) {
        clearTimeout(addToInventorySaveTimeout);
        addToInventorySaveTimeout = setTimeout(() => {
            localStorage.setItem("unboxertf-crates", LZString.compressToUTF16(JSON.stringify(save.crates)));
            localStorage.setItem("unboxertf-bonusitems", LZString.compressToUTF16(JSON.stringify(save.bonusItems)));
            localStorage.setItem("unboxertf-save-format", 'lzstring');
        }, 2000);
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

    for (let bonusItem of unboxResult.bonus) {
        if (bonusItem.id === 770) {
            saveObj.unusuals.push([bonusItem.id, bonusItem.taunt, 0, 0]);
            if (saveToStorage) {
                updateUnusualStats(save.unusuals[save.unusuals.length - 1], true);
            }
        }
    }

    if (saveToStorage) {
        clearTimeout(addToUnusualsSaveTimeout);
        addToUnusualsSaveTimeout = setTimeout(() => {
            localStorage.setItem("unboxertf-unusuals", LZString.compressToUTF16(JSON.stringify(save.unusuals)));
            localStorage.setItem("unboxertf-save-format", 'lzstring');
        }, 2000);
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
    };

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
    };

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
        let avg = 0;
        for (let num of saveObj.stats["unusual-avg-array"]) {
            avg += parseInt(num);
        }
        saveObj.stats["unusual-avg"] = Math.round(avg / saveObj.stats["unusual-avg-array"].length);

        saveObj.stats["unusual-avgprice-array"].push((saveObj.stats["unboxes-since-last-unusual"] * 2.49).toFixed(2));
        avg = 0;
        for (let num of saveObj.stats["unusual-avgprice-array"]) {
            avg += parseFloat(num);
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
    };

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

    for (let bonusItem of unboxResult.bonus) {
        if (bonusItem.id === 770) {
            saveObj.crateStats[crateOrder[currentCrate]].u++;
            saveObj.stats["unusualifiers-unboxed"]++;
        }
    }

    if (saveToStorage) {
        clearTimeout(addToStatsSaveTimeout);
        addToStatsSaveTimeout = setTimeout(() => {
            localStorage.setItem("unboxertf-cratestats", LZString.compressToUTF16(JSON.stringify(save.crateStats)));
            localStorage.setItem("unboxertf-stats", LZString.compressToUTF16(JSON.stringify(save.stats)));
            localStorage.setItem("unboxertf-save-format", 'lzstring');
        }, 2000);
    }
}

// Generate grid

let gridDivs = null;
let gridNames = [];

function generateGrid() {
    DOM.main.crateGrid.innerHTML = "";
    let html = [];
    for (let i = 0; i < crateOrder.length; i++) {
        html.push(`<div cratenum="${i}" series="${cA[crateOrder[i]].series}">
    <img class="statscratesimg" src="./images/crate/${getImg("crate", cA[crateOrder[i]].id)}" alt="" loading="lazy">
    <p class="statscratesname">${getString("crate", cA[crateOrder[i]].id)}</p>
    <p class="statscratesseries">${getSeries(cA[crateOrder[i]].series)}</p>
    </div>`);
    }
    DOM.main.crateGrid.innerHTML = html.join('');
    gridDivs = DOM.main.crateGrid.querySelectorAll("div");
    gridNames = [];
    for (let i = 0; i < gridDivs.length; i++) {
        gridDivs[i].addEventListener("pointerdown", function () {
            sound.play("btn");
        });
        gridDivs[i].addEventListener("click", function () {
            sound.play("btnRelease");
            jumpToCrate(parseInt(this.getAttribute("cratenum")));
            exitGridView();
        });
        gridNames.push(`${gridDivs[i].querySelector(".statscratesname").textContent} ${gridDivs[i].querySelector(".statscratesseries").textContent}`.toLowerCase())
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
    let searchName = input.toLowerCase();
    if (searchName.length > 0) {
        for (let i = 0; i < gridDivs.length; i++) {
            if (gridNames[i].includes(searchName)) {
                gridDivs[i].style.display = "block";
            } else {
                gridDivs[i].style.display = "none";
            }
        }
    } else {
        for (let crate of gridDivs) {
            crate.style.display = "block";
        }
    }
}

function selectFirstCrateFromSearch() {
    for (let crate of gridDivs) {
        if (crate.style.display == "block") {
            sound.play("btn");
            jumpToCrate(parseInt(crate.getAttribute("cratenum")));
            exitGridView();
            return;
        }
    }
}

// Main screen bindings
DOM.main.moreInfoBtn.addEventListener("click", () => {
    DOM.main.imgContainer.style.display = "none";
    DOM.main.detailsContainer.style.display = "block";
});
DOM.main.infoReturnBtn.addEventListener("click", () => {
    DOM.main.imgContainer.style.display = "flex";
    DOM.main.detailsContainer.style.display = "none";
});
DOM.main.infoEffectsBtn.addEventListener("click", () => {
    DOM.main.effectsContainer.style.display = "block";
    DOM.main.lootContainer.style.display = "none";
    DOM.main.infoEffectsBtn.style.display = "none";
    DOM.main.infoLootBtn.style.display = "flex";
});
DOM.main.infoLootBtn.addEventListener("click", () => {
    DOM.main.effectsContainer.style.display = "none";
    DOM.main.lootContainer.style.display = "block";
    DOM.main.infoEffectsBtn.style.display = "flex";
    DOM.main.infoLootBtn.style.display = "none";
});
DOM.main.gridViewBtn.addEventListener("click", () => {
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
DOM.main.randomCrateBtn.addEventListener("click", () => {
    jumpToCrate("random");
    exitGridView();
});
DOM.main.crateGridSearchBtn.addEventListener("click", () => {
    DOM.main.crateWindow.classList.toggle("showsearch");
    if (DOM.main.crateWindow.classList.contains("showsearch")) {
        DOM.main.crateGridSearch.focus();
    } else {
        DOM.main.crateGridSearch.value = "";
        searchGrid("");
    }
});
DOM.main.unboxBtn.addEventListener("click", () => {
    exitGridView();
    beginUnbox();
});
DOM.main.bulkUnboxBtn.addEventListener("click", () => {
    DOM.bulkSelect.screen.style.display = "flex";
    canUnbox = false;
});
document.querySelector('[data-screen="#statsscreen"]').addEventListener("click", () => {
    updateStats();
    generateCrateStats();
    if (!unusualsGenerated) {
        generateUnusualStats();
    }
});

DOM.main.crateInfoContainer.addEventListener("swiped-left", () => {
    jumpToCrate("previous");
})
DOM.main.crateInfoContainer.addEventListener("swiped-right", () => {
    jumpToCrate("next");
})

DOM.main.crateGridSearch.addEventListener("input", () => {
    searchGrid(DOM.main.crateGridSearch.value);
})

// Options screen bindings

document.querySelectorAll(".tabreturnbtn").forEach(button => {
    button.addEventListener("click", () => {
        DOM.main.container.style.display = "block";
        canUnbox = true;
        button.closest("main").style.display = "none";
    });
});
document.querySelectorAll("[data-screen]").forEach(button => {
    button.addEventListener("click", () => {
        canUnbox = false;
        document.querySelector(button.dataset.screen).style.display = "block";
        button.closest("main").style.display = "none";
    });
});
document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => {
        button.parentNode.querySelector("[data-tab].active").classList.remove("active");
        button.classList.add("active");

        button.closest("main").querySelector("div.visible").classList.remove("visible");
        document.querySelector(button.dataset.tab).classList.add("visible");
    });
});

let resetting = 0;
DOM.options.resetBtn.addEventListener("click", () => {
    if (resetting === 0) {
        resetting = 1;
        DOM.options.resetBtn.innerHTML = getString("ui", 78);
        setTimeout(() => {
            if (resetting === 1) {
                resetting = 0;
                DOM.options.resetBtn.innerHTML = getString("ui", 29);
            }
        }, 4000)
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
        let tempOptionsSave = localStorage.getItem("unboxertf-options");
        if (tempOptionsSave != null) {
            save.options = JSON.parse(tempOptionsSave);
        }

        setTimeout(() => {
            resetting = 0;
            DOM.options.resetBtn.innerHTML = getString("ui", 29);
        }, 4000)
    }
})

// Statistics screen bindings

let lastTabNum = DOM.stats.statistics.container.querySelectorAll("[data-statstring]").length - 1;
DOM.stats.statistics.container.querySelectorAll("[data-statstring]").forEach((tab, index) => {
    tab.dataset.num = index;
})

DOM.stats.statistics.prev.addEventListener("click", () => {
    let currentTab = DOM.stats.statistics.container.querySelector(".statvisible");
    currentTab.classList.remove("statvisible");
    let newTab;
    if (currentTab.dataset.num == "0") {
        newTab = DOM.stats.statistics.container.querySelector(`[data-num="${lastTabNum}"]`);
    } else {
        newTab = DOM.stats.statistics.container.querySelector(`[data-num="${parseInt(currentTab.dataset.num) - 1}"]`);
    }
    newTab.classList.add("statvisible");
    DOM.stats.statistics.tab.innerHTML = getString("ui", newTab.dataset.statstring);
})
DOM.stats.statistics.next.addEventListener("click", () => {
    let currentTab = DOM.stats.statistics.container.querySelector(".statvisible");
    currentTab.classList.remove("statvisible");
    let newTab;
    if (currentTab.dataset.num == lastTabNum) {
        newTab = DOM.stats.statistics.container.querySelector("[data-num='0']");
    } else {
        newTab = DOM.stats.statistics.container.querySelector(`[data-num="${parseInt(currentTab.dataset.num) + 1}"]`);
    }
    newTab.classList.add("statvisible");
    DOM.stats.statistics.tab.innerHTML = getString("ui", newTab.dataset.statstring);
})

DOM.stats.crates.details.returnBtn.addEventListener("click", () => {
    DOM.stats.container.style.display = "block";
    DOM.stats.crates.details.container.classList.remove("visible");
});

DOM.stats.unusuals.prev.addEventListener("click", () => {
    unusualPage({
        el: DOM.stats.unusuals.pageDiv,
        page: "prev"
    })
});
DOM.stats.unusuals.next.addEventListener("click", () => {
    unusualPage({
        el: DOM.stats.unusuals.pageDiv,
        page: "next"
    })
});


// Results screen bindings

DOM.results.returnBtn.addEventListener("click", () => {
    if (!DOM.results.returnBtn.classList.contains("btndisabled")) {
        DOM.main.container.style.display = "block";
        DOM.results.container.style.display = "none";
    }
});
DOM.results.unboxBtn.addEventListener("click", () => {
    exitGridView();
    beginUnbox();
});
let holdUnbox;
DOM.results.unboxBtn.addEventListener("pointerdown", () => {
    clearInterval(holdUnbox);
    clearTimeout(holdUnbox);
    if (save.options.fastUnbox) {
        holdUnbox = setTimeout(() => {
            holdUnbox = setInterval(beginUnbox, 50)
        }, 1000)
    }
});
DOM.results.unboxBtn.addEventListener("pointerup", () => {
    clearInterval(holdUnbox);
    clearTimeout(holdUnbox);
});
DOM.results.unboxBtn.addEventListener("pointerleave", () => {
    clearInterval(holdUnbox);
    clearTimeout(holdUnbox);
});

// Bulk select bindings

DOM.bulkSelect.num.addEventListener("input", () => {
    let crateNum = parseInt(DOM.bulkSelect.num.value);
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
})
DOM.bulkSelect.cancelBtn.addEventListener("click", () => {
    DOM.bulkSelect.screen.style.display = "none";
    canUnbox = true;
})

DOM.bulkSelect.unboxBtn.addEventListener("click", () => {
    if (!DOM.bulkSelect.unboxBtn.classList.contains("btndisabled")) {
        startBulkUnbox(parseInt(DOM.bulkSelect.num.value));
    }
})

// Bulk results bindings
let lastBulkNum = DOM.bulkResults.container.querySelectorAll("[data-statstring]").length - 1;
DOM.bulkResults.container.querySelectorAll("[data-statstring]").forEach((tab, index) => {
    tab.dataset.num = index;
})


DOM.bulkResults.prev.addEventListener("click", () => {
    let currentTab = DOM.bulkResults.container.querySelector(".bulkvisible");
    currentTab.classList.remove("bulkvisible");
    let newTab;
    if (currentTab.dataset.num == "0") {
        newTab = DOM.bulkResults.container.querySelector(`[data-num="${lastBulkNum}"]`);
    } else {
        newTab = DOM.bulkResults.container.querySelector(`[data-num="${parseInt(currentTab.dataset.num) - 1}"]`);
    }
    newTab.classList.add("bulkvisible");
    DOM.bulkResults.tabName.innerHTML = getString("ui", newTab.dataset.statstring);
})
DOM.bulkResults.next.addEventListener("click", () => {
    let currentTab = DOM.bulkResults.container.querySelector(".bulkvisible");
    currentTab.classList.remove("bulkvisible");
    let newTab;
    if (currentTab.dataset.num == lastBulkNum) {
        newTab = DOM.bulkResults.container.querySelector("[data-num='0']");
    } else {
        newTab = DOM.bulkResults.container.querySelector(`[data-num="${parseInt(currentTab.dataset.num) + 1}"]`);
    }
    newTab.classList.add("bulkvisible");
    DOM.bulkResults.tabName.innerHTML = getString("ui", newTab.dataset.statstring);
})

DOM.bulkResults.return.addEventListener("click", () => {
    DOM.main.container.style.display = "block";
    DOM.bulkResults.container.style.display = "none";
    canUnbox = true;
});

DOM.bulkResults.unusualsPrev.addEventListener("click", () => {
    unusualPage({
        saveObj: bulkSave,
        el: DOM.bulkResults.unusualsPageDiv,
        page: "prev"
    })
});
DOM.bulkResults.unusualsNext.addEventListener("click", () => {
    unusualPage({
        saveObj: bulkSave,
        el: DOM.bulkResults.unusualsPageDiv,
        page: "next"
    })
});

// Load saves
let newSaveFormat = localStorage.getItem("unboxertf-save-format");

let tempStatSave = localStorage.getItem("unboxertf-stats");
if (tempStatSave != null) {
    if (newSaveFormat === 'lzstring') {
        tempStatSave = LZString.decompressFromUTF16(tempStatSave);
    }
    Object.assign(save.stats, JSON.parse(tempStatSave));
}

let tempUnusualSave = localStorage.getItem("unboxertf-unusuals");
let newUnusualFormat = localStorage.getItem("unboxertf-unusuals-save-format");
if (tempUnusualSave != null) {
    if (newSaveFormat === 'lzstring' || newUnusualFormat === 'lzstring') {
        tempUnusualSave = LZString.decompressFromUTF16(tempUnusualSave);
    }
    save.unusuals = JSON.parse(tempUnusualSave);
}

let tempBonusItemSave = localStorage.getItem("unboxertf-bonusitems");
if (tempBonusItemSave != null) {
    if (newSaveFormat === 'lzstring') {
        tempBonusItemSave = LZString.decompressFromUTF16(tempBonusItemSave);
    }
    save.bonusItems = JSON.parse(tempBonusItemSave);
}

let tempCrateSave = localStorage.getItem("unboxertf-crates");
if (tempCrateSave != null) {
    if (newSaveFormat === 'lzstring') {
        tempCrateSave = LZString.decompressFromUTF16(tempCrateSave);
    }
    mergeDeep(save.crates, JSON.parse(tempCrateSave));
}

let tempCrateStatsSave = localStorage.getItem("unboxertf-cratestats");
if (tempCrateStatsSave != null) {
    if (newSaveFormat === 'lzstring') {
        tempCrateStatsSave = LZString.decompressFromUTF16(tempCrateStatsSave);
    }

    mergeDeep(save.crateStats, JSON.parse(tempCrateStatsSave));
}

let tempOptionsSave = localStorage.getItem("unboxertf-options");
if (tempOptionsSave != null) {
    Object.assign(save.options, JSON.parse(tempOptionsSave));
    for (let key in save.options) {
        triggerOption(key, true);
    }
}

function unusualPage(arg) {
    let saveObject = save;
    let el = arg.el;
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
            el.dataset.unusualpage = "1"
        } else {
            el.dataset.unusualpage = parseInt(el.dataset.unusualpage) + 1;
        }
    }
    let pageString = getString("ui", 152).replace("#PAGE#", el.dataset.unusualpage).replace("#TOTAL#", el.dataset.unusualmaxpage);
    el.querySelector("[data-unusualpagecount]").innerHTML = pageString;

    let startArray = 200 * (parseInt(el.dataset.unusualpage) - 1);
    let endArray = 200 * parseInt(el.dataset.unusualpage);
    let tempHtml = "";
    for (let unusual of saveObject.unusuals.slice(startArray, endArray)) {
        tempHtml += updateUnusualStats(unusual);
    }
    el.parentNode.querySelector("[data-unusualcontent]").innerHTML = tempHtml;
}

// Bulk unboxing code

let bulkWorker = new Worker(new URL('./bulkWorker.js',
    import.meta.url), {
    type: "module"
});
let bulkSave;
bulkWorker.onmessage = function (e) {
    if (e.data.item) {
        if (!save.options.forceUnusual && !save.options.forceUnusualifier && !save.options.forceStrange && !save.options.forceGrade && !save.options.forceProKit && !save.options.forceBonusItem) {
            addToInventory(e.data.item, save);
            addToUnusuals(e.data.item, save);
            addToStats(e.data.item, save);
        }
    } else if (e.data.progress) {
        DOM.bulkProgress.progressDone.innerHTML = DOM.bulkProgress.progress.value = e.data.progress;
        DOM.bulkProgress.progressPercent.innerHTML = `${Math.round(e.data.progress / DOM.bulkProgress.progress.max * 100)}%`
    } else if (e.data.complete) {
        bulkSave = JSON.parse(e.data.bulkSave);
        localStorage.setItem("unboxertf-crates", LZString.compressToUTF16(JSON.stringify(save.crates)));
        localStorage.setItem("unboxertf-bonusitems", LZString.compressToUTF16(JSON.stringify(save.bonusItems)));
        localStorage.setItem("unboxertf-cratestats", LZString.compressToUTF16(JSON.stringify(save.crateStats)));
        localStorage.setItem("unboxertf-stats", LZString.compressToUTF16(JSON.stringify(save.stats)));
        localStorage.setItem("unboxertf-unusuals", LZString.compressToUTF16(JSON.stringify(save.unusuals)));
        localStorage.setItem("unboxertf-save-format", 'lzstring');

        // Display results
        DOM.bulkResults.title.innerHTML = `${getString("crate", currentCrateObj.id)}<br>${getSeries(currentCrateObj.series)}`;
        document.querySelectorAll("[data-bulkstat]").forEach(el => {
            el.innerHTML = bulkSave.stats[el.dataset.bulkstat];
        })
        document.querySelectorAll('[data-bulkstat="keys-money"], [data-bulkstat="unusual-avgprice"]').forEach(el => {
            el.innerHTML = "$" + el.innerHTML;
        })

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
        throw new Error(e.data.error);
    }
}

function startBulkUnbox(num) {
    bulkSave = JSON.parse(JSON.stringify(defaultSave));
    let cheatsEnabled = false;
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
}

// Disable bulk limit if site URL has a ?bulkunlimited parameter
const urlParams = new URLSearchParams(window.location.search);
let bulkUnlimited = false;
if (urlParams.has('bulkunlimited')) {
    bulkUnlimited = true;
}

// Debug function: Unbox each crate 50 times. THIS IS SLOW! Enable fast unboxing and disable the pause unboxing option before using, or this will not work.
function testUnbox() {
    try {
        for (let crate in cA) {
            console.log(`Testing crate ${crate}`);
            jumpToCrate(crate);
            let counter = 0;
            while (counter <= 49) {
                beginUnbox();
                counter++;
            }
        }
    } catch {
        throw new Error(`Error at crate ${crate}`)
    }

}

// On load, disable loading screen
if (localStorage.getItem("unboxertf-languagechanged") == undefined) {
    langLoop: for (let i = 0; i < navigator.languages.length; i++) {
        switch (navigator.languages[i].slice(0, 2)) {
            case "en":
                break langLoop;
            case "pl":
                changeLanguage("pol");
                save.options.language = "pol";
                DOM.options.langDropdown.value = "pol";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "fr":
                changeLanguage("fre");
                save.options.language = "fre";
                DOM.options.langDropdown.value = "fre";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "zh":
                changeLanguage("sch");
                save.options.language = "sch";
                DOM.options.langDropdown.value = "sch";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "cs":
                changeLanguage("cze");
                save.options.language = "cze";
                DOM.options.langDropdown.value = "cze";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "hu":
                changeLanguage("hun");
                save.options.language = "hun";
                DOM.options.langDropdown.value = "hun";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "ro":
                changeLanguage("rom");
                save.options.language = "rom";
                DOM.options.langDropdown.value = "rom";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "sv":
                changeLanguage("swe");
                save.options.language = "swe";
                DOM.options.langDropdown.value = "swe";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
        }
        switch (navigator.languages[i]) {
            case "fil":
                changeLanguage("fil");
                save.options.language = "fil";
                DOM.options.langDropdown.value = "fil";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
            case "pt-BR":
                changeLanguage("bra");
                save.options.language = "bra";
                DOM.options.langDropdown.value = "bra";
                localStorage.setItem("unboxertf-options", JSON.stringify(save.options));
                break langLoop;
        }
    }
}

DOM.main.container.classList.remove("loading");
document.querySelector("#loadingscreen").classList.add("loaded");