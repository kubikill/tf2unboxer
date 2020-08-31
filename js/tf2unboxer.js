console.log("Since you're snooping around, here are some cheats...");
console.log("Set 'forceStranges' to true to always unbox a strange item whenever possible. Set to false to disable.");
console.log("Set 'forceWear' to a value between 1 and 5 to unbox a skin with specific wear level. 1 is Factory New, 5 is Battle Scarred. Set to 0 to disable.");
// Game variables
var currentCrate = 143;
var countdown = 5;
var uncratingCountdown;
var chanceNumber = 0;
var forceUnusuals = false;
var forceStranges = false;
var forceWear = 0;
var gameSave = {};
var currentStatsCrate = 1;
var unusualSave = [];
var fastUnbox = false;
var unboxDelay = false;
var resetDelay = 0;
var soundToPlay = "";
var canUnbox = true;
var canSwitchCrates = true;
var stats = {
  cratesOpened: 0,
  moneyWasted: 0,
  moneyWastedCents: 0,
  shortestUnusualDrought: null,
  currentDrought: 0,
  longestUnusualDrought: null,
  unluckiestStreak: 0,
  uniqueUnboxed: 0,
  strangeUnboxed: 0,
  hauntedUnboxed: 0,
  decoratedUnboxed: 0,
  unusualUnboxed: 0
};
var gridSupport = "grid";
var viewAllItems = false;
var statsGenerated = false;
var gradeTable = ["yo", "FN", "MW", "FT", "WW", "BS"];
var gradeTable2 = [
  "wow",
  text.g1.eng,
  text.g2.eng,
  text.g3.eng,
  text.g4.eng,
  text.g5.eng
];
var gradeTable3 = [
  "huzzah",
  "civiliancolor",
  "freelancecolor",
  "mercenarycolor",
  "commandocolor",
  "assassincolor",
  "elitecolor"
];
if (!Modernizr.pointerevents) {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/pep/0.4.3/pep.js";
  document.head.appendChild(script);
}
if (!Modernizr.cssgrid) {
  gridSupport = "block";
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "./grid.css");
  document.head.appendChild(link);
}
// Check for WebP support

var imageSupport = ".webp";
var webpTest = new Image();
webpTest.onload = function () {
  if (webpTest.height !== 2) {
    imageSupport = ".png";
  }
};
webpTest.onerror = function () {
  imageSupport = ".png";
};
webpTest.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
// HTML DOM
var pageCrateName = document.getElementById("cratename");
var pageCrateSeries = document.getElementById("crateseries");
var unboxBtn = document.getElementById("unboxbtn");
var muteSoundBtn = document.getElementById("soundbtn");
var muteSoundIcon = document.getElementById("soundicon");
var crateSelectContainer = document.getElementById("crateselect");
var countdownContainer = document.getElementById("countdowncontainer");
var uncratingCountdownText = document.getElementById("uncratingcountdown");
var uncratingDots = document.getElementById("uncratinganim");
var crateResultContainer = document.getElementById("crateresult");
var crateImg = document.getElementById("crateimg");
var returnBtn = document.getElementById("returnbtn");
var lootName = document.getElementById("lootname");
var lootChance = document.getElementById("lootunboxpercent");
var lootImg = document.getElementById("lootimg");
var effectImg = document.getElementById("effectimg");
var statsDiv = document.getElementById("stats");
var statsReturnBtn = document.getElementById("statsreturnbtn");
var statsBtn = document.getElementById("statsbtn");
var cratesOpenedStat = document.getElementById("cratesopenedstat");
var moneyWastedStat = document.getElementById("moneywastedstat");
var moneyWastedCentsStat = document.getElementById("moneywastedcents");
var moreContainer = document.getElementById("more");
var moreBtn = document.getElementById("morebtn");
var moreReturnBtn = document.getElementById("morereturnbtn");
var crateInfoBtn = document.getElementById("crateinfobtn");
var crateInfo = document.getElementById("crateinfo");
var crateContainer = document.getElementById("cratemain");
var crateView = document.getElementById("crateview");
var crateSelectGrid = document.getElementById("crateselectgrid");
var crateInfoReturnBtn = document.getElementById("crateinforeturnbtn");
var statsGeneralBtn = document.getElementById("statsgeneralbtn");
var statsUnusualsBtn = document.getElementById("statsunusualsbtn");
var statsCratesBtn = document.getElementById("statscratesbtn");
var statsGeneral = document.getElementById("statsgeneral");
var statsUnusuals = document.getElementById("statsunusuals");
var statsCrates = document.getElementById("statscrates");
var moreOptionsBtn = document.getElementById("moreoptionsbtn");
var moreChangelogBtn = document.getElementById("morechangelogbtn");
var moreCreditsBtn = document.getElementById("morecreditsbtn");
var moreOptions = document.getElementById("moreoptions");
var moreChangelog = document.getElementById("morechangelog");
var moreCredits = document.getElementById("morecredits");
var lootList = document.getElementById("lootlist");
var effectList = document.getElementById("effectlist");
var effectText = document.getElementById("effecttext");
var effectName = document.getElementById("effectname");
var crateEffectsBtn = document.getElementById("crateinfoeffectsbtn");
var crateLootBtn = document.getElementById("crateinfolootbtn");
var crateInfoContent = document.getElementById("crateinfocontent");
var crateInfoEffectsContent = document.getElementById("crateinfoeffectscontent");
var statsContainer = document.getElementById("statscontainer");
var statsHeader = document.getElementById("statsheader");
var statsCratesDetails = document.getElementById("statscratesdetails");
var statsCratesDetailsReturnBtn = document.getElementById("statscratesdetailsreturnbtn");
var statsCratesDetailsName = document.getElementById("statscratesdetailsname");
var statsCratesDetailsSeries = document.getElementById("statscratesdetailsseries");
var statsCratesDetailsImage = document.getElementById("statscratesdetailsimage");
var statsCratesDetailsUnbox = document.getElementById("statscratesdetailsunbox");
var statsCratesDetailsContent = document.getElementById("statscratesdetailscontent");
var statsCratesDetailsLeftBtn = document.getElementById("statscratesdetailsleftbtn");
var statsCratesDetailsRightBtn = document.getElementById("statscratesdetailsrightbtn");
var gridViewBtn = document.getElementById("gridviewbtn");
var exitGridViewBtn = document.getElementById("exitgridviewbtn");
var previousCrateBtn = document.getElementById("navleft");
var nextCrateBtn = document.getElementById("navright");
var randomCrateBtn = document.getElementById("randomcratebtn");
var noUnusualsText = document.getElementById("nounusuals");
var noItemsText = document.getElementById("noitems");
var uniqueUnboxedStat = document.getElementById("uniqueunboxedstat");
var strangeUnboxedStat = document.getElementById("strangeunboxedstat");
var hauntedUnboxedStat = document.getElementById("hauntedunboxedstat");
var decoratedUnboxedStat = document.getElementById("decoratedunboxedstat");
var unusualUnboxedStat = document.getElementById("unusualunboxedstat");
var shortestUnusualDroughtStat = document.getElementById("shortestdroughtstat");
var longestUnusualDroughtStat = document.getElementById("longestdroughtstat");
var sinceLastUnusualStat = document.getElementById("sincelastunusualstat");
var resetSaveBtn = document.getElementById("resetbtn");
var resetSaveBtnText = document.getElementById("resetbtntext");
var fastUnboxOnBtn = document.getElementById("fastunboxonbtn");
var fastUnboxOffBtn = document.getElementById("fastunboxoffbtn");
var unboxAgainBtn = document.getElementById("unboxagainbtn");
var timesUnboxedText = document.getElementById("lootunboxedtimestext");
var timesUnboxedCount = document.getElementById("lootunboxcount");
var crateNote = document.getElementById("cratenote");
var unusualEffectsText = document.getElementById("unusualeffectstext");
var showAllItemsOffBtn = document.getElementById("showallitemsoffbtn");
var showAllItemsOnBtn = document.getElementById("showallitemsonbtn");
var lootSinceLastUnusual = document.getElementById('lootsincelastunusualcount');
var lootSinceLastUnusualDiv = document.getElementById('lootsincelastunusual');
var langDropdown = document.getElementById('langdropdown');
var unusualCheatOffBtn = document.getElementById('unusualcheatoffbtn');
var unusualCheatOnBtn = document.getElementById('unusualcheatonbtn');
// Text DOM
var textMoreBtn = document.getElementById("morebtntext");
var textStatsBtn = document.getElementById("statsbtntext");
var textGridViewBtn = document.getElementById("gridviewbtntext");
var textDetailsViewBtn = document.getElementById("exitgridviewbtntext");
var textUnboxBtn = document.getElementById("unboxbtntext");
var textRandomCrateBtn = document.getElementById("randomcratebtntext");
var textCrateContains = document.getElementById("cratecontainstext");
var textUnusualEffects = document.getElementById("unusualeffectstext");
var textCrateDetailsReturn = document.getElementById("crateinforeturnbtntext");
var textCrateDetailsLoot = document.getElementById("crateinfolootbtntext");
var textCrateDetailsEffects = document.getElementById("crateinfoeffectsbtntext");
var textCrateDetailsMoreInfo = document.getElementById("moreinfobtntext");
var textUnboxingYourLoot = document.getElementById("uncratingtext");
var textNewLootAcquired = document.getElementById("newlootacquired");
var textYouUnboxed = document.getElementById("youtext");
var textLootUnboxChance = document.getElementById("lootunboxchancetext");
var textLootUnboxedTimes = document.getElementById("lootunboxedtimestext");
var textLootSinceLastUnusual = document.getElementById("lootsincelastunusualtext");
var textReturnBtn = document.getElementById("returnbtntext");
var textUnboxAgainBtn = document.getElementById("unboxagaintext");
var textEffect = document.getElementById("effecttext");
var textStatsGeneral = document.getElementById("statsgeneralbtntext");
var textStatsUnusuals = document.getElementById("statsunusualsbtntext");
var textStatsCrates = document.getElementById("statscratesbtntext");
var textStatsCratesOpened = document.getElementById("cratesopenedtext");
var textStatsMoneyWasted = document.getElementById("moneywastedtext");
var textStatsSinceLastUnusual = document.getElementById("sincelastunusualtext");
var textStatsShortestDrought = document.getElementById("shortestdroughttext");
var textStatsLongestDrought = document.getElementById("longestdroughttext");
var textStatsUniqueUnboxed = document.getElementById("uniqueunboxed");
var textStatsStrangeUnboxed = document.getElementById("strangeunboxed");
var textStatsHauntedUnboxed = document.getElementById("hauntedunboxed");
var textStatsDecoratedUnboxed = document.getElementById("decoratedunboxed");
var textStatsUnusualUnboxed = document.getElementById("unusualunboxed");
var textNoUnusuals = document.getElementById('nounusuals');
var textStatsReturnBtn = document.getElementById('statsreturnbtntext');
var textStatsListReturnBtn = document.getElementById('statscratesdetailsreturnbtntext');
var textStatsCratesDetailsUnbox = document.getElementById('statscratesdetailsunboxtext');
var textNoItems = document.getElementById('noitems');
var textMoreOptionsBtn = document.getElementById('moreoptionsbtntext');
var textMoreChangelogBtn = document.getElementById('morechangelogbtntext');
var textMoreCreditsBtn = document.getElementById('morecreditsbtntext');
var textLangOption = document.getElementById('langname');
var textFastUnboxOption = document.getElementById('fastunboxname');
var textFastUnboxOff = document.getElementById('fastunboxoffbtntext');
var textFastUnboxOn = document.getElementById('fastunboxonbtntext');
var textFastUnboxDesc = document.getElementById('fastunboxtext');
var textAllItemsOption = document.getElementById('showallitemsname');
var textAllItemsOff = document.getElementById('showallitemsoffbtntext');
var textAllItemsOn = document.getElementById('showallitemsonbtntext');
var textAllItemsDesc = document.getElementById('showallitemstext');
var textResetOption = document.getElementById('resetname');
var textResetBtn = document.getElementById('resetbtntext');
var textResetDesc = document.getElementById('resettext');
var textOptionsReturn = document.getElementById('morereturnbtntext');
var textCredits1 = document.getElementById('credits1');
var textCredits2 = document.getElementById('credits2');
var textCredits3 = document.getElementById('credits3');
var textCredits4 = document.getElementById('credits4');
var textThankYou = document.getElementById('thankyou');
var textSteamTooltip = document.getElementById('steamtooltip');
var textSoundTooltip = document.getElementById('soundtooltip');
var textUnusualCheat = document.getElementById('unusualcheatname');
var textUnusualCheatOff = document.getElementById('unusualcheatoffbtntext');
var textUnusualCheatOn = document.getElementById('unusualcheatonbtntext');
var textUnusualCheatDesc = document.getElementById('unusualcheattext');
var textTranslations = document.getElementById('credits5');
var textSChTranslation = document.getElementById('credits6');
langDropdown.addEventListener("change", function () {
  loadLanguage(this.value);
});
var saveLang = "eng";
// Load language
function loadLanguage(lang) {
  localStorage.setItem("saveLang", lang);
  language = lang;
  gradeTable2 = [
    "wow",
    text.g1[lang],
    text.g2[lang],
    text.g3[lang],
    text.g4[lang],
    text.g5[lang]
  ];
  pageCrateName.innerHTML = cratename["c" + cA[crateOrder[currentCrate]].id][language];
  pageCrateSeries.innerHTML = getSeries(crateOrder[currentCrate]);
  lootList.innerHTML = "";
  effectList.innerHTML = "";
  generateLootList();
  generateEffectList();
  generateStatsCrates(true);
  generateGrid(true);
  loadUnusuals();
  textMoreBtn.innerHTML = text.b1[lang];
  textStatsBtn.innerHTML = text.b2[lang];
  textGridViewBtn.innerHTML = text.b3[lang];
  textDetailsViewBtn.innerHTML = text.b4[lang];
  textUnboxBtn.innerHTML = text.b5[lang];
  textRandomCrateBtn.innerHTML = text.b6[lang];
  textCrateContains.innerHTML = text.d1[lang];
  textUnusualEffects.innerHTML = text.d2[lang];
  textCrateDetailsEffects.innerHTML = text.b8[lang];
  textCrateDetailsLoot.innerHTML = text.b9[lang];
  textCrateDetailsMoreInfo.innerHTML = text.b10[lang];
  textCrateDetailsReturn.innerHTML = text.b7[lang];
  textUnboxingYourLoot.innerHTML = text.u1[lang];
  textNewLootAcquired.innerHTML = text.u2[lang];
  textYouUnboxed.innerHTML = text.u3[lang];
  textLootUnboxChance.innerHTML = text.u6[lang];
  textLootUnboxedTimes.innerHTML = text.u7[lang];
  textLootSinceLastUnusual.innerHTML = text.u8[lang];
  textReturnBtn.innerHTML = text.b7[lang];
  textUnboxAgainBtn.innerHTML = text.b11[lang];
  textEffect.innerHTML = text.u5[lang];
  textStatsGeneral.innerHTML = text.b12[lang];
  textStatsUnusuals.innerHTML = text.b13[lang];
  textStatsCrates.innerHTML = text.b14[lang];
  textStatsCratesOpened.innerHTML = text.s1[lang];
  textStatsMoneyWasted.innerHTML = text.s2[lang];
  textStatsSinceLastUnusual.innerHTML = text.u8[lang];
  textStatsShortestDrought.innerHTML = text.s3[lang];
  textStatsLongestDrought.innerHTML = text.s4[lang];
  textStatsUniqueUnboxed.innerHTML = text.s5[lang];
  textStatsStrangeUnboxed.innerHTML = text.s6[lang];
  textStatsHauntedUnboxed.innerHTML = text.s7[lang];
  textStatsDecoratedUnboxed.innerHTML = text.s8[lang];
  textStatsUnusualUnboxed.innerHTML = text.s9[lang];
  textNoUnusuals.innerHTML = text.s10[lang];
  textStatsReturnBtn.innerHTML = text.b15[lang];
  textStatsListReturnBtn.innerHTML = text.b16[lang];
  textStatsCratesDetailsUnbox.innerHTML = text.s11[lang];
  textNoItems.innerHTML = text.s12[lang];
  textMoreOptionsBtn.innerHTML = text.b1[lang];
  textMoreChangelogBtn.innerHTML = text.b17[lang];
  textMoreCreditsBtn.innerHTML = text.b18[lang];
  textLangOption.innerHTML = text.o1[lang];
  textFastUnboxOption.innerHTML = text.o2[lang];
  textFastUnboxDesc.innerHTML = text.o3[lang];
  textFastUnboxOff.innerHTML = text.b19[lang];
  textFastUnboxOn.innerHTML = text.b20[lang];
  textAllItemsOption.innerHTML = text.o4[lang];
  textAllItemsDesc.innerHTML = text.o5[lang];
  textAllItemsOff.innerHTML = text.b19[lang];
  textAllItemsOn.innerHTML = text.b20[lang];
  textResetOption.innerHTML = text.o6[lang];
  textResetBtn.innerHTML = text.b21[lang];
  textResetDesc.innerHTML = text.o7[lang];
  textOptionsReturn.innerHTML = text.b15[lang];
  textCredits1.innerHTML = text.c1[lang];
  textCredits2.innerHTML = text.c2[lang];
  textCredits3.innerHTML = text.c3[lang];
  textCredits4.innerHTML = text.c4[lang];
  textTranslations.innerHTML = text.c6[lang];
  textSChTranslation.innerHTML = text.c7[lang];
  textThankYou.innerHTML = text.c5[lang];
  textSteamTooltip.innerHTML = text.t1[lang];
  textSoundTooltip.innerHTML = text.t2[lang];
  textUnusualCheat.innerHTML = text.o8[lang];
  textUnusualCheatOff.innerHTML = text.b19[lang];
  textUnusualCheatOn.innerHTML = text.b20[lang];
  textUnusualCheatDesc.innerHTML = text.o9[lang];
  statsCratesDetailsUnbox = document.getElementById("statscratesdetailsunbox");
}
// Sounds
var muteSound = false;
var soundBtn = new Audio("./sound/btn.mp3");
var soundBtnRelease = new Audio("./sound/btnrelease.mp3");
var soundCrateOpen = new Audio("./sound/crateopen.mp3");
var soundWrapOpen = new Audio("./sound/wrapopen.mp3");
var soundRoboCrateOpen = new Audio("./sound/robocrateopen.mp3");
var soundUnboxed = new Audio("./sound/unboxed.mp3");
var soundUnusualUnboxed = new Audio("./sound/unusualunboxed.mp3");

function playSound(id) {
  if (muteSound) {
    return;
  }
  switch (id) {
    case "btn":
      if (soundBtn.paused) {
        soundBtn.play();
      } else {
        soundBtn.currentTime = 0;
      }
      break;
    case "btnrelease":
      if (soundBtnRelease.paused) {
        soundBtnRelease.play();
      } else {
        soundBtnRelease.currentTime = 0;
      }
      break;
    case "crateopen":
      if (soundCrateOpen.paused) {
        soundCrateOpen.play();
      }
      break;
    case "robocrateopen":
      if (soundRoboCrateOpen.paused) {
        soundRoboCrateOpen.play();
      }
      break;
    case "wrapopen":
      if (soundWrapOpen.paused) {
        soundWrapOpen.play();
      }
      break;
    case "unboxed":
      if (soundUnboxed.paused) {
        soundUnboxed.play();
      } else {
        soundUnboxed.currentTime = 0;
      }
      soundUnusualUnboxed.pause();
      soundUnusualUnboxed.currentTime = 0;
      soundRoboCrateOpen.pause();
      soundRoboCrateOpen.currentTime = 0;
      break;
    case "unusualunboxed":
      if (soundUnusualUnboxed.paused) {
        soundUnusualUnboxed.play();
      } else {
        soundUnusualUnboxed.currentTime = 0;
      }
      soundUnboxed.pause();
      soundUnboxed.currentTime = 0;
      soundRoboCrateOpen.pause();
      soundRoboCrateOpen.currentTime = 0;
      break;
  }
}
// Mute sound button
muteSoundBtn.addEventListener("click", function () {
  if (!muteSound) {
    muteSound = true;
    muteSoundIcon.src = "./images/muteiconc.svg";
    localStorage.setItem("muteSound", "true");
  } else {
    muteSound = false;
    muteSoundIcon.src = "./images/speakericonc.svg";
    localStorage.removeItem("muteSound");
    playSound("btnrelease");
  }
});
// Play sound on button click
for (i = 0; i < document.getElementsByClassName("btn").length; i++) {
  document.getElementsByClassName("btn")[i].addEventListener("pointerdown", function () {
    playSound("btn");
  });
  document.getElementsByClassName("btn")[i].addEventListener("click", function () {
    playSound("btnrelease");
  });
}
// Generate loot list function
function generateLootList() {
  var temp = Object.keys(cA[crateOrder[currentCrate]].loot);
  for (var i = 1; i <= temp.length; i++) {
    var lootListAdd = document.createElement("li");
    var input;
    if (cA[crateOrder[currentCrate]].loot["i" + i].id == 0) {
      if (cA[crateOrder[currentCrate]].loot["i" + i].quality == 0) {
        input = text.z1[language];
        lootListAdd.classList.add("unusualloot");
      } else {
        continue;
      }
    } else {
      input = itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id][language];
      if (cA[crateOrder[currentCrate]].loot["i" + i].grade != 0) {
        lootListAdd.classList.add(gradeTable3[cA[crateOrder[currentCrate]].loot["i" + i].grade])
      }
    }
    lootListAdd.appendChild(document.createTextNode(input));
    lootList.appendChild(lootListAdd);
  }
  if (cA[crateOrder[currentCrate]].note > 0) {
    crateNote.innerHTML = text["m" + cA[crateOrder[currentCrate]].note][language];
  } else {
    crateNote.innerHTML = "";
  }
}

// Listen to keys
document.addEventListener('keydown', function (event) {
  if (canUnbox && (event.code == 'Enter' || event.code == 'Space')) {
    playSound("btn");
    canUnbox = false;
    canSwitchCrates = false;
    unbox();
    return 0;
  };
  if (canSwitchCrates && (event.code == 'ArrowLeft' || event.code == 'KeyA')) {
    playSound("btn");
    previousCrate();
    return 0;
  };
  if (canSwitchCrates && (event.code == 'ArrowRight' || event.code == 'KeyD')) {
    playSound("btn");
    nextCrate();
    return 0;
  };
});

// Generate effect list function
function generateEffectList() {
  for (var i = 0; i < cA[crateOrder[currentCrate]].effects.length; i++) {
    var effectListAdd = document.createElement("li");
    var input = unusualeffects["e" + cA[crateOrder[currentCrate]].effects[i]][language];
    effectListAdd.appendChild(document.createTextNode(input));
    effectList.appendChild(effectListAdd);
  }
  if (cA[crateOrder[currentCrate]].effects.length > 0) {
    unusualEffectsText.innerHTML = text.d2[language];
  } else {
    unusualEffectsText.innerHTML = text.d3[language];
  }
}
// Previous/next crate buttons

function nextCrate() {
  if (currentCrate == cA.length - 1) {
    currentCrate = 1;
  } else {
    currentCrate += 1;
  }
  pageCrateName.innerHTML = cratename["c" + cA[crateOrder[currentCrate]].id][language];
  pageCrateSeries.innerHTML = getSeries(crateOrder[currentCrate]);
  crateImg.src = "./images/crate/" + cratename["c" + cA[crateOrder[currentCrate]].id].img + imageSupport;
  lootList.innerHTML = "";
  effectList.innerHTML = "";
  generateLootList();
  generateEffectList();
}

function previousCrate() {
  if (currentCrate == 1) {
    currentCrate = cA.length - 1;
  } else {
    currentCrate -= 1;
  }
  pageCrateName.innerHTML = cratename["c" + cA[crateOrder[currentCrate]].id][language];
  pageCrateSeries.innerHTML = getSeries(crateOrder[currentCrate]);
  crateImg.src = "./images/crate/" + cratename["c" + cA[crateOrder[currentCrate]].id].img + imageSupport;
  lootList.innerHTML = "";
  effectList.innerHTML = "";
  generateLootList();
  generateEffectList();
}
nextCrateBtn.addEventListener("click", function () {
  nextCrate();
});
previousCrateBtn.addEventListener("click", function () {
  previousCrate();
});

function jumpToCrate(id) {
  currentCrate = id;
  pageCrateName.innerHTML = cratename["c" + cA[crateOrder[currentCrate]].id][language];
  pageCrateSeries.innerHTML = getSeries(crateOrder[currentCrate]);
  crateImg.src = "./images/crate/" + cratename["c" + cA[crateOrder[currentCrate]].id].img + imageSupport;
  lootList.innerHTML = "";
  effectList.innerHTML = "";
  generateLootList();
  generateEffectList();
  crateView.style.display = "block";
  crateSelectGrid.style.display = "none";
  previousCrateBtn.style.display = "flex";
  nextCrateBtn.style.display = "flex";
  gridViewBtn.style.display = "flex";
  unboxBtn.style.display = "flex";
  randomCrateBtn.style.display = "none";
  exitGridViewBtn.style.display = "none";
  canUnbox = true;
  canSwitchCrates = true;
}
// Unbox my loot button
unboxBtn.addEventListener("click", function () {
  canUnbox = false;
  canSwitchCrates = false;
  unbox();
});
unboxAgainBtn.addEventListener("click", function () {
  canUnbox = false;
  unbox();
});

function effectFirst(fx) {
  if (language == 'eng') {
    switch (fx) {
      case "Strange":
        return text.q1[language] + " ";
      case "StrangeSpan":
        return '<span class="strangecolor">' + text.q1[language] + " </span>";
      case "Haunted":
        return text.q2[language] + " ";
      case "StrangeHaunted":
        return text.q1[language] + " " + text.q2[language] + " ";
      case "Unusual":
        return text.q3[language] + " ";
      case "StrangeUnusual":
        return text.q1[language] + " " + text.q3[language] + " ";
      default:
        return "";
    }
  } else {
    return "";
  }
}

function effectLast(fx) {
  if (language == 'pol') {
    switch (fx) {
      case "Strange":
        return " (" + text.q1[language] + ")";
      case "StrangeSpan":
        return '<span class="strangecolor"> (' + text.q1[language] + ") </span>";
      case "Haunted":
        return " (" + text.q2[language] + ")";
      case "StrangeHaunted":
        return " (" + text.q1[language] + " " + text.q2[language] + ")";
      case "Unusual":
        return " (" + text.q3[language] + ")";
      case "StrangeUnusual":
        return " (" + text.q1[language] + text.q3[language] + ")";
      default:
        return "";
    }
  } else {
    return "";
  }
}

function unbox() {
  if (unboxDelay) {
    return 0;
  }
  if (fastUnbox) {
    crateSelectContainer.style.display = "none";
    crateResultContainer.style.display = "block";
  } else {
    switch (crateOrder[currentCrate]) {
      case 58:
        playSound("robocrateopen");
        break;
      case 115:
      case 123:
        playSound("wrapopen");
        break;
      default:
        playSound("crateopen");
    }
    crateResultContainer.style.display = "none";
    crateSelectContainer.style.display = "none";
    countdownContainer.style.display = "block";
    var dotAnimPos = 2;
    var dotAnimation = setInterval(function () {
      switch (dotAnimPos) {
        case 0:
          uncratingDots.innerHTML = "&nbsp;";
          dotAnimPos += 1;
          break;
        case 1:
          uncratingDots.innerHTML = ".";
          dotAnimPos += 1;
          break;
        case 2:
          uncratingDots.innerHTML = "..";
          dotAnimPos += 1;
          break;
        case 3:
          uncratingDots.innerHTML = "...";
          dotAnimPos = 0;
          break;
      }
    }, 500);
    uncratingCountdown = setInterval(function () {
      countdown -= 1;
      uncratingCountdownText.innerHTML = countdown;
      if (countdown == 0) {
        countdownContainer.style.display = "none";
        crateResultContainer.style.display = "block";
        countdown = 5;
        uncratingCountdownText.innerHTML = countdown;
        clearInterval(uncratingCountdown);
        clearInterval(dotAnimation);
        dotAnimPos = 2;
        uncratingDots.innerHTML = ".";
        canUnbox = true;
        playSound(soundToPlay);
      }
    }, 1000);
  }
  // Generate loot
  var temp = Object.keys(cA[crateOrder[currentCrate]].loot);
  if (forceUnusuals && cA[crateOrder[currentCrate]].loot["i" + temp.length].id == 0) {
    var randomNumber = 9990;
  } else {
    var randomNumber = Math.floor((Math.random() * 10000) + 1);
  }
  for (var i = 1; i <= temp.length; i++) {
    if (
      randomNumber > chanceNumber &&
      randomNumber <= chanceNumber + cA[crateOrder[currentCrate]].loot["i" + i].chance
    ) {
      var qualityName = "";
      var qualityName2 = "";
      if (cA[crateOrder[currentCrate]].loot["i" + i].id == 0) {
        // Generate generic unusual
        if (
          (stats.currentDrought < stats.shortestUnusualDrought ||
            stats.shortestUnusualDrought == null) && !forceUnusuals
        ) {
          stats.shortestUnusualDrought = stats.currentDrought;
        }
        if (
          (stats.currentDrought > stats.longestUnusualDrought ||
            stats.longestUnusualDrought == null) && !forceUnusuals
        ) {
          stats.longestUnusualDrought = stats.currentDrought;
        }
        if (!forceUnusuals) {
          lootSinceLastUnusual.innerHTML = stats.currentDrought + 1;
          stats.unusualUnboxed += 1;
          stats.currentDrought = 0;
          noUnusualsText.style.display = "none";
        }
        var unusualPick;
        if (cA[crateOrder[currentCrate]].loot["i" + i].quality == 1) {
          var unusualArray = [];
          var gradeRandom = Math.floor((Math.random() * 100) + 1);
          if (gradeRandom == 100) {
            gradeRandom = 6;
          } else if (gradeRandom >= 95) {
            gradeRandom = 5;
          } else if (gradeRandom >= 80) {
            gradeRandom = 4;
          } else {
            gradeRandom = 3;
          }
          for (var ii = 1; ii <= temp.length; ii++) {
            if (cA[crateOrder[currentCrate]].loot["i" + ii].quality == 10 && cA[crateOrder[currentCrate]].loot["i" + ii].grade == gradeRandom) {
              unusualArray.push(cA[crateOrder[currentCrate]].loot["i" + ii].id);
            }
          }
          if (unusualArray.length == 0) {
            gradeRandom--;
            for (var ii = 1; ii <= temp.length; ii++) {
              if (cA[crateOrder[currentCrate]].loot["i" + ii].quality == 10 && cA[crateOrder[currentCrate]].loot["i" + ii].grade == gradeRandom) {
                unusualArray.push(cA[crateOrder[currentCrate]].loot["i" + ii].id);
              }
            }
          }
          randomNumber = Math.floor(Math.random() * unusualArray.length);
          unusualPick = unusualArray;
        } else if (cA[crateOrder[currentCrate]].loot["i" + i].quality == 2) {
          var unusualArray = [];
          for (var ii = 1; ii <= temp.length; ii++) {
            if (cA[crateOrder[currentCrate]].loot["i" + ii].quality == 10) {
              unusualArray.push(cA[crateOrder[currentCrate]].loot["i" + ii].id);
            }
          }
          randomNumber = Math.floor(Math.random() * unusualArray.length);
          unusualPick = unusualArray;
        } else {
          randomNumber = Math.floor(Math.random() * unusualPool.length);
          unusualPick = unusualPool;
        }
        var randomNumber2;
        if (JSON.stringify(cA[crateOrder[currentCrate]].effects) == JSON.stringify(invasionFX)) {
          randomNumber2 = Math.floor(
            (Math.random() * (cA[crateOrder[currentCrate]].effects.length) + 36)
          );
          if (randomNumber2 >= cA[crateOrder[currentCrate]].effects.length + 27) {
            randomNumber2 -= 36;
          } else if (randomNumber2 >= cA[crateOrder[currentCrate]].effects.length + 18) {
            randomNumber2 -= 27;
          } else if (randomNumber2 >= cA[crateOrder[currentCrate]].effects.length + 9) {
            randomNumber2 -= 18;
          } else if (randomNumber2 >= cA[crateOrder[currentCrate]].effects.length) {
            randomNumber2 -= 9;
          }
        } else {
          randomNumber2 = Math.floor(
            Math.random() * cA[crateOrder[currentCrate]].effects.length
          );
        }
        effectImg.src =
          "./images/effect/" +
          unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]].img + imageSupport;
        effectName.innerHTML =
          unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
            language
          ];
        lootName.innerHTML =
          '<span class="unusualcolor"> ' + effectFirst('Unusual') +
          itemname["i" + unusualPick[randomNumber]][language] + effectLast('Unusual') +
          "</span>";
        lootChance.innerHTML =
          Math.round(cA[crateOrder[currentCrate]].loot["i" + i].chance * 100) / 10000 + "%";
        lootImg.src = "";
        lootImg.src =
          "./images/item/" + itemname["i" + unusualPick[randomNumber]].img + imageSupport;
        effectText.style.display = "inline";
        effectName.style.display = "inline";
        if (cA[crateOrder[currentCrate]].loot["i" + i].quality == 1 && (Math.floor((Math.random() * 10) + 1) == 1 || forceStranges)) {
          if (!forceUnusuals) { unusualSave.push({
            id: unusualPick[randomNumber],
            fx: cA[crateOrder[currentCrate]].effects[randomNumber2],
            st: 1
          })};
          qualityName = effectFirst('StrangeSpan');
          qualityName2 = effectLast('StrangeSpan');
        } else if (!forceUnusuals) {
          unusualSave.push({
            id: unusualPick[randomNumber],
            fx: cA[crateOrder[currentCrate]].effects[randomNumber2]
          });
        }
        if (!forceUnusuals) {
          localStorage.setItem("unusualSave", JSON.stringify(unusualSave));
          var unusualAdd = document.createElement("div");
          unusualAdd.classList.add("unusualitem");
          unusualAdd.innerHTML =
            '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
            unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]].img + imageSupport +
            '"><img onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" class="statsunusualsimg" src="./images/item/' +
            itemname["i" + unusualPick[randomNumber]].img + imageSupport +
            '"><p class="statsunusualsname">' + qualityName +
            itemname["i" + unusualPick[randomNumber]][language] + qualityName2 +
            '</p><p class="statsunusualseffect">' + text.z6[language] +
            unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
              language
            ] +
            "</p>";
          statsUnusuals.appendChild(unusualAdd);
          unboxDelay = true;
          unboxAgainBtn.classList.remove("btn");
          unboxAgainBtn.classList.add("btndisabled");
          setTimeout(function () {
            unboxDelay = false;
            unboxAgainBtn.classList.remove("btndisabled");
            unboxAgainBtn.classList.add("btn");
            canUnbox = true;
          }, 3000);
        }
        if (forceUnusuals) {
          soundToPlay = "unboxed";
        } else {
          soundToPlay = "unusualunboxed";
        }
        timesUnboxedText.innerHTML = text.u9[language];
        timesUnboxedCount.innerHTML = unusualSave.length;
      } else {
        // Normal loot code
        lootName.classList = "";
        effectImg.src = "";
        effectText.style.display = "none";
        effectName.style.display = "none";
        lootName.innerHTML =
          itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id][language];
        lootChance.innerHTML =
          Math.round(cA[crateOrder[currentCrate]].loot["i" + i].chance * 100) / 10000 + "%";
        lootImg.src = "";
        lootImg.src =
          "./images/item/" +
          itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
        switch (cA[crateOrder[currentCrate]].loot["i" + i].quality) {
          case 1: // 100% Unique
            lootName.classList.add("uniquecolor");
            gameSave["c" + crateOrder[currentCrate]]["i" + i] += 1;
            timesUnboxedText.innerHTML = text.u7[language];
            timesUnboxedCount.innerHTML = gameSave["c" + crateOrder[currentCrate]]["i" + i];
            stats.uniqueUnboxed += 1;
            stats.currentDrought += 1;
            if (
              stats.currentDrought > stats.longestUnusualDrought ||
              stats.longestUnusualDrought == null
            ) {
              stats.longestUnusualDrought = stats.currentDrought;
            }
            soundToPlay = "unboxed";
            break;
          case 2: // 100% Strange
            lootName.classList.add("strangecolor");
            gameSave["c" + crateOrder[currentCrate]]["i" + i] += 1;
            timesUnboxedText.innerHTML = text.u7[language];
            timesUnboxedCount.innerHTML = gameSave["c" + crateOrder[currentCrate]]["i" + i];
            qualityName = effectFirst('Strange');
            qualityName2 = effectLast('Strange');
            stats.strangeUnboxed += 1;
            stats.currentDrought += 1;
            if (
              stats.currentDrought > stats.longestUnusualDrought ||
              stats.longestUnusualDrought == null
            ) {
              stats.longestUnusualDrought = stats.currentDrought;
            }
            soundToPlay = "unboxed";
            break;
          case 3: // 100% Haunted
            lootName.classList.add("hauntedcolor");
            gameSave["c" + crateOrder[currentCrate]]["i" + i] += 1;
            timesUnboxedText.innerHTML = text.u7[language];
            timesUnboxedCount.innerHTML = gameSave["c" + crateOrder[currentCrate]]["i" + i];
            qualityName = effectFirst('Haunted');
            qualityName2 = effectLast('Haunted');
            stats.hauntedUnboxed += 1;
            stats.currentDrought += 1;
            if (
              stats.currentDrought > stats.longestUnusualDrought ||
              stats.longestUnusualDrought == null
            ) {
              stats.longestUnusualDrought = stats.currentDrought;
            }
            soundToPlay = "unboxed";
            break;
          case 4:
          case 10: // 90% Unique, 10% Strange
            if (Math.floor((Math.random() * 10) + 1) == 1 || forceStranges) {
              if (cA[crateOrder[currentCrate]].loot["i" + i].grade != 0) {
                lootName.classList.add(
                  gradeTable3[cA[crateOrder[currentCrate]].loot["i" + i].grade]
                );
                qualityName = effectFirst('StrangeSpan');
                qualityName2 = effectLast('StrangeSpan');
              } else {
                lootName.classList.add("strangecolor");
                qualityName = effectFirst('Strange');
                qualityName2 = effectLast('Strange');
              }
              gameSave["c" + crateOrder[currentCrate]]["i" + i]["w2"] += 1;
              timesUnboxedText.innerHTML = text.u7[language];
              timesUnboxedCount.innerHTML =
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w2"];
              stats.strangeUnboxed += 1;
            } else {
              if (cA[crateOrder[currentCrate]].loot["i" + i].grade != 0) {
                lootName.classList.add(
                  gradeTable3[cA[crateOrder[currentCrate]].loot["i" + i].grade]
                );
              } else {
                lootName.classList.add("uniquecolor");
              }
              gameSave["c" + crateOrder[currentCrate]]["i" + i]["w1"] += 1;
              timesUnboxedText.innerHTML = text.u7[language];
              timesUnboxedCount.innerHTML =
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w1"];
              stats.uniqueUnboxed += 1;
            }
            stats.currentDrought += 1;
            if (
              stats.currentDrought > stats.longestUnusualDrought ||
              stats.longestUnusualDrought == null
            ) {
              stats.longestUnusualDrought = stats.currentDrought;
            }
            soundToPlay = "unboxed";
            break;
          case 5: // Decorated
          case 6:
            var itemWear;
            stats.decoratedUnboxed += 1;
            lootName.classList.add(
              gradeTable3[cA[crateOrder[currentCrate]].loot["i" + i].grade]
            );
            if (forceWear != 0) {
              var wearPick = forceWear;
            } else {
              var wearPick = Math.floor((Math.random() * 10) + 1);
            }
            switch (wearPick) {
              case 1:
                lootName.innerHTML += " (" + gradeTable2[1] + ")";
                lootImg.src =
                  "./images/item/skins/" +
                  gradeTable[1] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
                itemWear = 1;
                break;
              case 2:
              case 3:
                lootName.innerHTML += " (" + gradeTable2[2] + ")";
                lootImg.src =
                  "./images/item/skins/" +
                  gradeTable[2] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
                itemWear = 2;
                break;
              case 4:
              case 5:
              case 6:
              case 7:
                lootName.innerHTML += " (" + gradeTable2[3] + ")";
                lootImg.src =
                  "./images/item/skins/" +
                  gradeTable[3] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
                itemWear = 3;
                break;
              case 8:
              case 9:
                lootName.innerHTML += " (" + gradeTable2[4] + ")";
                lootImg.src =
                  "./images/item/skins/" +
                  gradeTable[4] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
                itemWear = 4;
                break;
              case 10:
                lootName.innerHTML += " (" + gradeTable2[5] + ")";
                lootImg.src =
                  "./images/item/skins/" +
                  gradeTable[5] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport;
                itemWear = 5;
                break;
            }
            if (cA[crateOrder[currentCrate]].loot["i" + i].quality == 6) {
              if (Math.floor((Math.random() * 100) + 1) <= 10 || forceStranges) {
                itemWear += 5;
                qualityName = '<span class="strangecolor">' + effectFirst('Strange') + '</span>';
                qualityName2 = '<span class="strangecolor">' + effectLast('Strange') + '</span>';
                stats.strangeUnboxed += 1;
              }
              if (Math.floor((Math.random() * 100) + 1) == 1 || forceUnusuals) {
                if (
                  (stats.currentDrought < stats.shortestUnusualDrought ||
                    stats.shortestUnusualDrought == null) && !forceUnusuals
                ) {
                  stats.shortestUnusualDrought = stats.currentDrought;
                }
                if (
                  (stats.currentDrought > stats.longestUnusualDrought ||
                    stats.longestUnusualDrought == null) && !forceUnusuals
                ) {
                  stats.longestUnusualDrought = stats.currentDrought;
                }
                if (!forceUnusuals) {
                  lootSinceLastUnusual.innerHTML = stats.currentDrought + 1;
                  stats.currentDrought = 0;
                  noUnusualsText.style.display = "none";
                  stats.unusualUnboxed += 1;
                }
                var randomNumber2 = Math.floor(
                  Math.random() * cA[crateOrder[currentCrate]].effects.length
                );
                effectImg.src =
                  "./images/effect/" +
                  unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                  .img + imageSupport;
                effectName.innerHTML =
                  unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                    language
                  ];
                effectText.style.display = "inline";
                effectName.style.display = "inline";
                if (!forceUnusuals) {
                  unusualSave.push({
                    id: cA[crateOrder[currentCrate]].loot["i" + i].id,
                    fx: cA[crateOrder[currentCrate]].effects[randomNumber2],
                    wr: itemWear
                  });
                  statsUnusuals.appendChild(unusualAdd);
                  unboxDelay = true;
                  unboxAgainBtn.classList.remove("btn");
                  unboxAgainBtn.classList.add("btndisabled");
                  setTimeout(function () {
                    unboxDelay = false;
                    unboxAgainBtn.classList.remove("btndisabled");
                    unboxAgainBtn.classList.add("btn");
                    canUnbox = true;
                  }, 3000);
                }
                if (itemWear > 5) {
                  itemWear -= 5;
                }
                localStorage.setItem(
                  "unusualSave",
                  JSON.stringify(unusualSave)
                );
                var unusualAdd = document.createElement("div");
                unusualAdd.classList.add("unusualitem");
                unusualAdd.innerHTML =
                  '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
                  unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                  .img + imageSupport +
                  '"><img onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" class="statsunusualsimg" src="./images/item/skins/' +
                  gradeTable[itemWear] +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport +
                  '"><p class="statsunusualsname">' +
                  qualityName +
                  itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id][language] + qualityName2 +
                  " (" +
                  gradeTable2[itemWear] +
                  ")" +
                  '</p><p class="statsunusualseffect">' + text.z6[language] +
                  unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                    language
                  ] +
                  "</p>";
                if (forceUnusuals) {
                  soundToPlay = "unboxed";
                } else {
                  soundToPlay = "unusualunboxed";
                }
                timesUnboxedText.innerHTML = text.u9[language];
                timesUnboxedCount.innerHTML = unusualSave.length;
              } else {
                stats.currentDrought += 1;
                if (
                  stats.currentDrought > stats.longestUnusualDrought ||
                  stats.longestUnusualDrought == null
                ) {
                  stats.longestUnusualDrought = stats.currentDrought;
                }
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemWear] += 1;
                timesUnboxedText.innerHTML = text.u7[language];
                timesUnboxedCount.innerHTML =
                  gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemWear];
                soundToPlay = "unboxed";
              }
            } else {
              stats.currentDrought += 1;
              if (
                stats.currentDrought > stats.longestUnusualDrought ||
                stats.longestUnusualDrought == null
              ) {
                stats.longestUnusualDrought = stats.currentDrought;
              }
              gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemWear] += 1;
              timesUnboxedText.innerHTML = text.u7[language];
              timesUnboxedCount.innerHTML =
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemWear];
              soundToPlay = "unboxed";
            }
            break;
          case 7:
            if (Math.floor((Math.random() * 100) + 1) == 1 || forceUnusuals) {
              if (
                (stats.currentDrought < stats.shortestUnusualDrought ||
                  stats.shortestUnusualDrought == null) && !forceUnusuals
              ) {
                stats.shortestUnusualDrought = stats.currentDrought;
              }
              if (
                (stats.currentDrought > stats.longestUnusualDrought ||
                  stats.longestUnusualDrought == null) && !forceUnusuals
              ) {
                stats.longestUnusualDrought = stats.currentDrought;
              }
              if (!forceUnusuals) {
                lootSinceLastUnusual.innerHTML = stats.currentDrought + 1;
                stats.currentDrought = 0;
                noUnusualsText.style.display = "none";
                stats.unusualUnboxed += 1;
              }
              lootName.classList.add("unusualcolor");
              qualityName = effectFirst('Unusual');
              qualityName2 = effectLast('Unusual');
              var randomNumber2 = Math.floor(
                Math.random() * cA[crateOrder[currentCrate]].effects.length
              );
              effectImg.src =
                "./images/effect/" +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                .img + imageSupport;
              effectName.innerHTML =
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                  language
                ];
              effectText.style.display = "inline";
              effectName.style.display = "inline";
              if (!forceUnusuals) {
                unusualSave.push({
                  id: cA[crateOrder[currentCrate]].loot["i" + i].id,
                  fx: cA[crateOrder[currentCrate]].effects[randomNumber2]
                });
                localStorage.setItem("unusualSave", JSON.stringify(unusualSave));
                statsUnusuals.appendChild(unusualAdd);
                unboxDelay = true;
                unboxAgainBtn.classList.remove("btn");
                unboxAgainBtn.classList.add("btndisabled");
                setTimeout(function () {
                  unboxDelay = false;
                  unboxAgainBtn.classList.remove("btndisabled");
                  unboxAgainBtn.classList.add("btn");
                  canUnbox = true;
                }, 3000);
              }
              var unusualAdd = document.createElement("div");
              unusualAdd.classList.add("unusualitem");
              unusualAdd.innerHTML =
                '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                .img + imageSupport +
                '"><img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
                itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport +
                '"><p class="statsunusualsname">' +
                itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id][language] +
                '</p><p class="statsunusualseffect">' + text.z6[language] +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                  language
                ] +
                "</p>";
              if (forceUnusuals) {
                soundToPlay = "unboxed";
              } else {
                soundToPlay = "unusualunboxed";
              }
              timesUnboxedText.innerHTML = text.u9[language];
              timesUnboxedCount.innerHTML = unusualSave.length;
            } else {
              lootName.classList.add("uniquecolor");
              gameSave["c" + crateOrder[currentCrate]]["i" + i] += 1;
              timesUnboxedText.innerHTML = text.u7[language];
              timesUnboxedCount.innerHTML =
                gameSave["c" + crateOrder[currentCrate]]["i" + i];
              stats.uniqueUnboxed += 1;
              stats.currentDrought += 1;
              if (
                stats.currentDrought > stats.longestUnusualDrought ||
                stats.longestUnusualDrought == null
              ) {
                stats.longestUnusualDrought = stats.currentDrought;
              }
              soundToPlay = "unboxed";
            }
            break;
          case 8:
            var itemQuality = 1;
            lootName.classList.add("uniquecolor");
            if (Math.floor((Math.random() * 100) + 1) <= 10 || forceStranges) {
              lootName.classList.remove("uniquecolor");
              lootName.classList.add("hauntedcolor");
              itemQuality = 4;
              qualityName = effectFirst('StrangeHaunted');
              qualityName2 = effectLast('StrangeHaunted');
              stats.strangeUnboxed += 1;
              stats.hauntedUnboxed += 1;
            } else {
              stats.uniqueUnboxed += 1;
            }
            stats.currentDrought += 1;
            if (
              stats.currentDrought > stats.longestUnusualDrought ||
              stats.longestUnusualDrought == null
            ) {
              stats.longestUnusualDrought = stats.currentDrought;
            }
            gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemQuality] += 1;
            timesUnboxedText.innerHTML = text.u7[language];
            timesUnboxedCount.innerHTML =
              gameSave["c" + crateOrder[currentCrate]]["i" + i]["w" + itemQuality];
            soundToPlay = "unboxed";
            break;
          case 9:
            var itemQuality = 1;
            if (Math.floor((Math.random() * 100) + 1) == 1 || forceUnusuals) {
              if (
                (stats.currentDrought < stats.shortestUnusualDrought ||
                  stats.shortestUnusualDrought == null) && !forceUnusuals
              ) {
                stats.shortestUnusualDrought = stats.currentDrought;
              }
              if (
                (stats.currentDrought > stats.longestUnusualDrought ||
                  stats.longestUnusualDrought == null) && !forceUnusuals
              ) {
                stats.longestUnusualDrought = stats.currentDrought;
              }
              if (!forceUnusuals) {
                lootSinceLastUnusual.innerHTML = stats.currentDrought + 1;
                stats.currentDrought = 0;
                noUnusualsText.style.display = "none";
                stats.unusualUnboxed += 1;
              }
              lootName.classList.add("unusualcolor");
              var randomNumber2 = Math.floor(
                Math.random() * cA[crateOrder[currentCrate]].effects.length
              );
              if (Math.floor((Math.random() * 10) + 1) == 1 || forceStranges) {
                qualityName = effectFirst('StrangeUnusual');
                qualityName2 = effectLast('StrangeUnusual');
                if (!forceUnusuals) {
                  unusualSave.push({
                    id: cA[crateOrder[currentCrate]].loot["i" + i].id,
                    fx: cA[crateOrder[currentCrate]].effects[randomNumber2],
                    st: 1
                  });
                }
              } else {
                qualityName = effectFirst('Unusual');
                qualityName2 = effectLast('Unusual');
                if (!forceUnusuals) {
                  unusualSave.push({
                    id: cA[crateOrder[currentCrate]].loot["i" + i].id,
                    fx: cA[crateOrder[currentCrate]].effects[randomNumber2]
                  });
                }
              }
              effectImg.src =
                "./images/effect/" +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                .img + imageSupport;
              effectName.innerHTML =
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                  language
                ];
              effectText.style.display = "inline";
              effectName.style.display = "inline";
              localStorage.setItem("unusualSave", JSON.stringify(unusualSave));
              var unusualAdd = document.createElement("div");
              unusualAdd.classList.add("unusualitem");
              unusualAdd.innerHTML =
                '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]]
                .img + imageSupport +
                '"><img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
                itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id].img + imageSupport +
                '"><p class="statsunusualsname">' +
                qualityName +
                itemname["i" + cA[crateOrder[currentCrate]].loot["i" + i].id][language] + qualityName2 +
                '</p><p class="statsunusualseffect">' + text.z6[language] +
                unusualeffects["e" + cA[crateOrder[currentCrate]].effects[randomNumber2]][
                  language
                ] +
                "</p>";
              statsUnusuals.appendChild(unusualAdd);
              if (forceUnusuals) {
                soundToPlay = "unboxed";
              } else {
                soundToPlay = "unusualunboxed";
                unboxDelay = true;
                unboxAgainBtn.classList.remove("btn");
                unboxAgainBtn.classList.add("btndisabled");
                setTimeout(function () {
                  unboxDelay = false;
                  unboxAgainBtn.classList.remove("btndisabled");
                  unboxAgainBtn.classList.add("btn");
                  canUnbox = true;
                }, 3000);
              }
              timesUnboxedText.innerHTML = text.u9[language];
              timesUnboxedCount.innerHTML = unusualSave.length;
            } else {
              stats.currentDrought += 1;
              if (
                stats.currentDrought > stats.longestUnusualDrought ||
                stats.longestUnusualDrought == null
              ) {
                stats.longestUnusualDrought = stats.currentDrought;
              }
              soundToPlay = "unboxed";
              if (Math.floor((Math.random() * 10) + 1) == 1 || forceStranges) {
                lootName.classList.add("strangecolor");
                qualityName = effectFirst('Strange');
                qualityName2 = effectLast('Strange');
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w2"] += 1;
                timesUnboxedText.innerHTML = text.u7[language];
                timesUnboxedCount.innerHTML =
                  gameSave["c" + crateOrder[currentCrate]]["i" + i]["w2"];
                stats.strangeUnboxed += 1;
              } else {
                lootName.classList.add("uniquecolor");
                gameSave["c" + crateOrder[currentCrate]]["i" + i]["w1"] += 1;
                timesUnboxedText.innerHTML = text.u7[language];
                timesUnboxedCount.innerHTML =
                  gameSave["c" + crateOrder[currentCrate]]["i" + i]["w1"];
                stats.uniqueUnboxed += 1;
              }
            }
            break;
        }
      }
      lootName.innerHTML = qualityName + lootName.innerHTML + qualityName2;
      i = temp.length + 1;
      chanceNumber = 0;
    } else {
      chanceNumber += cA[crateOrder[currentCrate]].loot["i" + i].chance;
    }
  }
  // Update stats
  uniqueUnboxedStat.innerHTML = stats.uniqueUnboxed;
  strangeUnboxedStat.innerHTML = stats.strangeUnboxed;
  hauntedUnboxedStat.innerHTML = stats.hauntedUnboxed;
  decoratedUnboxedStat.innerHTML = stats.decoratedUnboxed;
  unusualUnboxedStat.innerHTML = stats.unusualUnboxed;
  if (stats.shortestUnusualDrought == null) {
    shortestUnusualDroughtStat.innerHTML = "N/A";
  } else {
    shortestUnusualDroughtStat.innerHTML = stats.shortestUnusualDrought;
  }
  if (soundToPlay != "unusualunboxed") {
    lootSinceLastUnusual.innerHTML = stats.currentDrought;
  }
  longestUnusualDroughtStat.innerHTML = stats.longestUnusualDrought;
  sinceLastUnusualStat.innerHTML = stats.currentDrought;
  if (!forceUnusuals) {
    gameSave["c" + crateOrder[currentCrate]].num += 1;
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    stats.cratesOpened += 1;
    cratesOpenedStat.innerHTML = stats.cratesOpened;
    stats.moneyWasted += 2;
    stats.moneyWastedCents += 49;
    if (stats.moneyWastedCents >= 100) {
      stats.moneyWastedCents -= 100;
      stats.moneyWasted += 1;
    }
    moneyWastedStat.innerHTML = stats.moneyWasted;
    if (stats.moneyWastedCents <= 9) {
      moneyWastedCentsStat.innerHTML = "0" + stats.moneyWastedCents;
    } else {
      moneyWastedCentsStat.innerHTML = stats.moneyWastedCents;
    }
    localStorage.setItem("stats", JSON.stringify(stats));
  }
  if (fastUnbox) {
    playSound(soundToPlay);
    canUnbox = true;
  }
}
// Return button
returnBtn.addEventListener("click", function () {
  crateSelectContainer.style.display = "block";
  crateResultContainer.style.display = "none";
  canSwitchCrates = true;
});
// Stats button
statsBtn.addEventListener("click", function () {
  crateSelectContainer.style.display = "none";
  statsDiv.style.display = "block";
  generateStatsCrates();
  canUnbox = false;
  canSwitchCrates = false;
});
// Stats return button
statsReturnBtn.addEventListener("click", function () {
  crateSelectContainer.style.display = "block";
  statsDiv.style.display = "none";
  statsGeneralBtn.classList.add("active");
  statsUnusualsBtn.classList.remove("active");
  statsCratesBtn.classList.remove("active");
  statsGeneral.style.display = "block";
  statsUnusuals.style.display = "none";
  statsCrates.style.display = "none";
  exitGridView();
  canUnbox = true;
  canSwitchCrates = true;
});
// More... button
moreBtn.addEventListener("click", function () {
  crateSelectContainer.style.display = "none";
  moreContainer.style.display = "block";
  exitGridView();
  canUnbox = false;
  canSwitchCrates = false;
});
// More... return button
moreReturnBtn.addEventListener("click", function () {
  moreOptions.scrollTop = 0;
  moreChangelog.scrollTop = 0;
  moreCredits.scrollTop = 0;
  crateSelectContainer.style.display = "block";
  moreContainer.style.display = "none";
  moreOptionsBtn.classList.add("active");
  moreChangelogBtn.classList.remove("active");
  moreCreditsBtn.classList.remove("active");
  moreOptions.style.display = "inline-block";
  moreChangelog.style.display = "none";
  moreCredits.style.display = "none";
  canUnbox = true;
  canSwitchCrates = true;
});
// Grid view button
gridViewBtn.addEventListener("click", function () {
  crateView.style.display = "none";
  crateSelectGrid.style.display = gridSupport;
  previousCrateBtn.style.display = "none";
  nextCrateBtn.style.display = "none";
  gridViewBtn.style.display = "none";
  unboxBtn.style.display = "none";
  randomCrateBtn.style.display = "flex";
  exitGridViewBtn.style.display = "flex";
  generateGrid();
  canUnbox = false;
  canSwitchCrates = false;
});
// Exit grid view button
function exitGridView() {
  crateView.style.display = "block";
  crateSelectGrid.style.display = "none";
  previousCrateBtn.style.display = "flex";
  nextCrateBtn.style.display = "flex";
  gridViewBtn.style.display = "flex";
  unboxBtn.style.display = "flex";
  randomCrateBtn.style.display = "none";
  exitGridViewBtn.style.display = "none";
}
exitGridViewBtn.addEventListener("click", function () {
  exitGridView();
  canUnbox = true;
  canSwitchCrates = true;
});
// More crate info button
crateInfoBtn.addEventListener("click", function () {
  crateInfo.style.display = "block";
  crateInfoBtn.style.display = "none";
  crateContainer.style.display = "none";
});
// More crate info return button
crateInfoReturnBtn.addEventListener("click", function () {
  crateInfo.style.display = "none";
  crateInfoBtn.style.display = "flex";
  crateContainer.style.display = "block";
});
// Crate effects button
crateEffectsBtn.addEventListener("click", function () {
  crateInfoContent.style.display = "none";
  crateInfoEffectsContent.style.display = "block";
  crateEffectsBtn.style.display = "none";
  crateLootBtn.style.display = "flex";
});
// Crate loot button
crateLootBtn.addEventListener("click", function () {
  crateInfoContent.style.display = "block";
  crateInfoEffectsContent.style.display = "none";
  crateEffectsBtn.style.display = "flex";
  crateLootBtn.style.display = "none";
});
// Stats general button
statsGeneralBtn.addEventListener("click", function () {
  statsGeneralBtn.classList.add("active");
  statsUnusualsBtn.classList.remove("active");
  statsCratesBtn.classList.remove("active");
  statsGeneral.style.display = "block";
  statsUnusuals.style.display = "none";
  statsCrates.style.display = "none";
});
// Stats unusual button
statsUnusualsBtn.addEventListener("click", function () {
  statsGeneralBtn.classList.remove("active");
  statsUnusualsBtn.classList.add("active");
  statsCratesBtn.classList.remove("active");
  statsGeneral.style.display = "none";
  statsUnusuals.style.display = gridSupport;
  statsCrates.style.display = "none";
});
// Stats crates button
statsCratesBtn.addEventListener("click", function () {
  statsGeneralBtn.classList.remove("active");
  statsUnusualsBtn.classList.remove("active");
  statsCratesBtn.classList.add("active");
  statsGeneral.style.display = "none";
  statsUnusuals.style.display = "none";
  statsCrates.style.display = gridSupport;
});
// More options button
moreOptionsBtn.addEventListener("click", function () {
  moreOptionsBtn.classList.add("active");
  moreChangelogBtn.classList.remove("active");
  moreCreditsBtn.classList.remove("active");
  moreOptions.style.display = "inline-block";
  moreChangelog.style.display = "none";
  moreCredits.style.display = "none";
});
// More changelog button
moreChangelogBtn.addEventListener("click", function () {
  moreOptionsBtn.classList.remove("active");
  moreChangelogBtn.classList.add("active");
  moreCreditsBtn.classList.remove("active");
  moreOptions.style.display = "none";
  moreChangelog.style.display = "block";
  moreCredits.style.display = "none";
});
// More credits button
moreCreditsBtn.addEventListener("click", function () {
  moreOptionsBtn.classList.remove("active");
  moreChangelogBtn.classList.remove("active");
  moreCreditsBtn.classList.add("active");
  moreOptions.style.display = "none";
  moreChangelog.style.display = "none";
  moreCredits.style.display = "block";
});
// Stats crates details return button
statsCratesDetailsReturnBtn.addEventListener("click", function () {
  statsContainer.style.display = "block";
  statsHeader.style.display = "block";
  statsCratesDetails.style.display = "none";
  statsReturnBtn.style.display = "flex";
  statsCratesDetailsReturnBtn.style.display = "none";
});
// Stats crates details left/right buttons
statsCratesDetailsLeftBtn.addEventListener("click", function () {
  if (currentStatsCrate == 1) {
    currentStatsCrate = cA.length - 1;
  } else {
    currentStatsCrate -= 1;
  }
  generateCrateDetails(crateOrder[currentStatsCrate]);
});
statsCratesDetailsRightBtn.addEventListener("click", function () {
  if (currentStatsCrate == cA.length - 1) {
    currentStatsCrate = 1;
  } else {
    currentStatsCrate += 1;
  }
  generateCrateDetails(crateOrder[currentStatsCrate]);
});
// Fast unbox buttons
fastUnboxOffBtn.addEventListener("click", function () {
  fastUnbox = false;
  fastUnboxOffBtn.classList.add("active");
  fastUnboxOnBtn.classList.remove("active");
  localStorage.setItem("fastUnbox", false);
});
fastUnboxOnBtn.addEventListener("click", function () {
  fastUnbox = true;
  fastUnboxOffBtn.classList.remove("active");
  fastUnboxOnBtn.classList.add("active");
  localStorage.setItem("fastUnbox", true);
});
// Pick random crate button
randomCrateBtn.addEventListener("click", function () {
  jumpToCrate(Math.floor((Math.random() * (cA.length - 1))) + 1);
  canUnbox = true;
  canSwitchCrates = true;
});
showAllItemsOffBtn.addEventListener("click", function () {
  viewAllItems = false;
  showAllItemsOffBtn.classList.add("active");
  showAllItemsOnBtn.classList.remove("active");
  localStorage.setItem("showallitems", "false");
});
showAllItemsOnBtn.addEventListener("click", function () {
  viewAllItems = true;
  showAllItemsOffBtn.classList.remove("active");
  showAllItemsOnBtn.classList.add("active");
  localStorage.setItem("showallitems", "true");
});
unusualCheatOffBtn.addEventListener("click", function () {
  forceUnusuals = false;
  unusualCheatOffBtn.classList.add("active");
  unusualCheatOnBtn.classList.remove("active");
  lootSinceLastUnusualDiv.style.display = "inline-block";
  localStorage.setItem("forceUnusuals", "false");
});
unusualCheatOnBtn.addEventListener("click", function () {
  forceUnusuals = true;
  unusualCheatOffBtn.classList.remove("active");
  unusualCheatOnBtn.classList.add("active");
  lootSinceLastUnusualDiv.style.display = "none";
  localStorage.setItem("forceUnusuals", "true");
});

function getSeries(id) {
  if (cA[id].series == 0) {
    return text.z3[language];
  } else {
    return text.z2[language] + cA[id].series;
  }
}

function generateCrateDetails(id) {
  statsCratesDetailsName.innerHTML = cratename["c" + cA[id].id][language];
  statsCratesDetailsSeries.innerHTML = getSeries(id);
  statsCratesDetailsImage.src =
    "./images/crate/" + cratename["c" + cA[id].id].img + imageSupport;
  statsCratesDetailsUnbox.innerHTML = gameSave["c" + id].num;
  var cratesDetailsList = document.getElementsByClassName(
    "statscratesdetailsitem"
  );
  while (cratesDetailsList.length > 0) {
    cratesDetailsList[0].parentNode.removeChild(cratesDetailsList[0]);
  }
  noItemsText.style.display = "block";
  var qualityName = "";
  var qualityNameSpan = "";
  var qualityClass = "";
  for (var i = 1; i <= Object.keys(cA[id].loot).length; i++) {
    // Skip generic unusuals
    if (cA[id].loot["i" + i].id == 0) {
      continue;
    }
    if (
      cA[id].loot["i" + i].quality == 4 ||
      cA[id].loot["i" + i].quality == 9 ||
      cA[id].loot["i" + i].quality == 10
    ) {
      for (var ii = 1; ii <= 2; ii++) {
        // Skip skins that weren't unboxed yet
        if (!gameSave["c" + id]["i" + i]["w" + ii] && !viewAllItems) {
          continue;
        }
        var itemAdd = document.createElement("div");
        itemAdd.classList.add("statscratesdetailsitem");
        if (ii == 2) {
          qualityName = "Strange";
          qualityNameSpan = 'StrangeSpan';
          qualityClass = "strangecolor";
        } else {
          qualityName = "";
          qualityNameSpan = "";
          qualityClass = "";
        }
        if (cA[id].loot["i" + i].grade != 0) {
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname ' +
            gradeTable3[cA[id].loot["i" + i].grade] +
            '">' +
            effectFirst(qualityNameSpan) +
            itemname["i" + cA[id].loot["i" + i].id][language] + effectLast(qualityNameSpan) +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i]["w" + ii] +
            "</span>" + text.s14[language] + "</p>";
        } else {
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname ' +
            qualityClass +
            '">' +
            effectFirst(qualityName) +
            itemname["i" + cA[id].loot["i" + i].id][language] + effectLast(qualityName) +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i]["w" + ii] +
            "</span>" + text.s14[language] + "</p>";
        }

        statsCratesDetailsContent.appendChild(itemAdd);
      }
    } else {
      // Handle skins
      if (
        cA[id].loot["i" + i].quality == 5 ||
        cA[id].loot["i" + i].quality == 6
      ) {
        for (var ii = 1; ii <= 5; ii++) {
          // Skip skins that weren't unboxed yet
          if (!gameSave["c" + id]["i" + i]["w" + ii] && !viewAllItems) {
            continue;
          }
          var itemAdd = document.createElement("div");
          itemAdd.classList.add("statscratesdetailsitem");
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/skins/' +
            gradeTable[ii] +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname ' +
            gradeTable3[cA[id].loot["i" + i].grade] +
            '">' +
            itemname["i" + cA[id].loot["i" + i].id][language] +
            " (" +
            gradeTable2[ii] +
            ")" +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i]["w" + ii] +
            "</span>" + text.s14[language] + "</p>";
          statsCratesDetailsContent.appendChild(itemAdd);
        }
        if (cA[id].loot["i" + i].quality == 6) {
          for (var ii = 6; ii <= 10; ii++) {
            // Skip skins that weren't unboxed yet
            if (!gameSave["c" + id]["i" + i]["w" + ii] && !viewAllItems) {
              continue;
            }
            var itemAdd = document.createElement("div");
            itemAdd.classList.add("statscratesdetailsitem");
            itemAdd.innerHTML =
              '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/skins/' +
              gradeTable[ii - 5] +
              itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
              '"><p class="statsitemname ' +
              gradeTable3[cA[id].loot["i" + i].grade] +
              '">' +
              effectFirst("StrangeSpan") +
              itemname["i" + cA[id].loot["i" + i].id][language] +
              " (" +
              gradeTable2[ii - 5] +
              ")" + effectLast("StrangeSpan") +
              '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
              gameSave["c" + id]["i" + i]["w" + ii] +
              "</span>" + text.s14[language] + "</p>";
            statsCratesDetailsContent.appendChild(itemAdd);
          }
        }
      } else {
        if (!gameSave["c" + id]["i" + i] && !viewAllItems) {
          continue;
        }
        if (cA[id].loot["i" + i].quality == 8) {
          var itemAdd = document.createElement("div");
          itemAdd.classList.add("statscratesdetailsitem");
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname' +
            '">' +
            itemname["i" + cA[id].loot["i" + i].id][language] +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i].w1 +
            "</span>" + text.s14[language] + "</p>";
          statsCratesDetailsContent.appendChild(itemAdd);
          itemAdd = "";
          itemAdd = document.createElement("div");
          itemAdd.classList.add("statscratesdetailsitem");
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname hauntedcolor' +
            '">' + effectFirst("StrangeHaunted") +
            itemname["i" + cA[id].loot["i" + i].id][language] + effectLast("StrangeHaunted") +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i].w4 +
            "</span>" + text.s14[language] + "</p>";
          statsCratesDetailsContent.appendChild(itemAdd);
        } else if (cA[id].loot["i" + i].quality == 9) {
          if (cA[id].loot["i" + i].grade != 0) {
            var itemAdd = document.createElement("div");
            itemAdd.classList.add("statscratesdetailsitem");
            itemAdd.innerHTML =
              '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
              itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
              '"><p class="statsitemname ' +
              gradeTable3[cA[id].loot["i" + i].grade] +
              '">' +
              itemname["i" + cA[id].loot["i" + i].id][language] +
              '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
              gameSave["c" + id]["i" + i].w1 +
              "</span>" + text.s14[language] + "</p>";
            statsCratesDetailsContent.appendChild(itemAdd);
            itemAdd = "";
            itemAdd = document.createElement("div");
            itemAdd.classList.add("statscratesdetailsitem");
            itemAdd.innerHTML =
              '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
              itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
              '"><p class="statsitemname ' +
              gradeTable3[cA[id].loot["i" + i].grade] +
              '">' + effectFirst("StrangeSpan") +
              itemname["i" + cA[id].loot["i" + i].id][language] + effectLast("StrangeSpan") +
              '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
              gameSave["c" + id]["i" + i].w2 +
              "</span>" + text.s14[language] + "</p>";
            statsCratesDetailsContent.appendChild(itemAdd);
          } else {
            var itemAdd = document.createElement("div");
            itemAdd.classList.add("statscratesdetailsitem");
            itemAdd.innerHTML =
              '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
              itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
              '"><p class="statsitemname">' +
              itemname["i" + cA[id].loot["i" + i].id][language] +
              '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
              gameSave["c" + id]["i" + i].w1 +
              "</span>" + text.s14[language] + "</p>";
            statsCratesDetailsContent.appendChild(itemAdd);
            itemAdd = "";
            itemAdd = document.createElement("div");
            itemAdd.classList.add("statscratesdetailsitem");
            itemAdd.innerHTML =
              '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
              itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
              '"><p class="statsitemname strangecolor">' + effectFirst("Strange") +
              itemname["i" + cA[id].loot["i" + i].id][language] + effectLast("Strange") +
              '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
              gameSave["c" + id]["i" + i].w2 +
              "</span>" + text.s14[language] + "</p>";
            statsCratesDetailsContent.appendChild(itemAdd);
          }
        } else {
          var itemAdd = document.createElement("div");
          itemAdd.classList.add("statscratesdetailsitem");
          qualityName = "";
          qualityNameSpan = "";
          switch (cA[id].loot["i" + i].quality) {
            case 2:
              qualityName = effectFirst("Strange");
              qualityNameSpan = effectLast("Strange");
              itemAdd.classList.add("strangecolor");
              break;
            case 3:
              qualityName = effectFirst("Haunted");
              qualityNameSpan = effectLast("Haunted");
              itemAdd.classList.add("hauntedcolor");
              break;
          }
          itemAdd.innerHTML =
            '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
            itemname["i" + cA[id].loot["i" + i].id].img + imageSupport +
            '"><p class="statsitemname">' +
            qualityName +
            itemname["i" + cA[id].loot["i" + i].id][language] + qualityNameSpan +
            '</p><p class="statsitemunbox">' + text.s13[language] + '<span class="unboxcount">' +
            gameSave["c" + id]["i" + i] +
            "</span>" + text.s14[language] + "</p>";
          statsCratesDetailsContent.appendChild(itemAdd);
        }
      }
    }
  }
  statsCratesDetailsContent.scrollTop = 0;
  cratesDetailsList = document.getElementsByClassName("statscratesdetailsitem");
  if (cratesDetailsList.length > 0) {
    noItemsText.style.display = "none";
  }
}

function generateGameSave() {
  for (var i = 1; i < cA.length; i++) {
    gameSave["c" + i] = {};
    gameSave["c" + i].num = 0;
    for (var ii = 1; ii <= Object.keys(cA[i].loot).length; ii++) {
      // Skip unusuals
      if (cA[i].loot["i" + ii].id == 0) {
        continue;
      }
      // Handle skins
      switch (cA[i].loot["i" + ii].quality) {
        case 4:
          gameSave["c" + i]["i" + ii] = {
            w1: 0,
            w2: 0
          };
          break;
        case 5:
        case 6:
          gameSave["c" + i]["i" + ii] = {
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w6: 0,
            w7: 0,
            w8: 0,
            w9: 0,
            w10: 0
          };
          break;
        case 8:
          gameSave["c" + i]["i" + ii] = {
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0
          };
          break;
        case 9:
        case 10:
          gameSave["c" + i]["i" + ii] = {
            w1: 0,
            w2: 0
          };
          break;
        default:
          gameSave["c" + i]["i" + ii] = 0;
      }
    }
  }
}

function loadSave() {
  if (localStorage.getItem("fastUnbox") == "true") {
    fastUnbox = true;
    fastUnboxOffBtn.classList.remove("active");
    fastUnboxOnBtn.classList.add("active");
  }
  if (localStorage.getItem("forceUnusuals") == "true") {
    forceUnusuals = true;
    unusualCheatOffBtn.classList.remove("active");
    unusualCheatOnBtn.classList.add("active");
    lootSinceLastUnusualDiv.style.display = "none";
  }
  if (localStorage.getItem("showallitems") == "true") {
    viewAllItems = true;
    showAllItemsOffBtn.classList.remove("active");
    showAllItemsOnBtn.classList.add("active");
  }
  if (localStorage.getItem("muteSound") == "true") {
    muteSound = true;
    muteSoundIcon.src = "./images/muteiconc.svg";
  }
  if (localStorage.getItem("gameSave") === null) {
    return 0;
  } else {
    gameSave = JSON.parse(localStorage.getItem("gameSave"));
    // Fix saves from older versions
    for (var i = Object.keys(gameSave).length + 1; i < cA.length; i++) {
      gameSave["c" + i] = {};
      gameSave["c" + i].num = 0;
      for (var ii = 1; ii <= Object.keys(cA[i].loot).length; ii++) {
        // Skip unusuals
        if (cA[i].loot["i" + ii].id == 0) {
          continue;
        }
        // Handle skins
        switch (cA[i].loot["i" + ii].quality) {
          case 4:
            gameSave["c" + i]["i" + ii] = {
              w1: 0,
              w2: 0
            };
            break;
          case 5:
          case 6:
            gameSave["c" + i]["i" + ii] = {
              w1: 0,
              w2: 0,
              w3: 0,
              w4: 0,
              w5: 0,
              w6: 0,
              w7: 0,
              w8: 0,
              w9: 0,
              w10: 0
            };
            break;
          case 8:
            gameSave["c" + i]["i" + ii] = {
              w1: 0,
              w2: 0,
              w3: 0,
              w4: 0
            };
            break;
          case 9:
          case 10:
            gameSave["c" + i]["i" + ii] = {
              w1: 0,
              w2: 0
            };
            break;
          default:
            gameSave["c" + i]["i" + ii] = 0;
        }
      }
    }
  }
  if (localStorage.getItem("stats") === null) {
    return 0;
  } else {
    stats = JSON.parse(localStorage.getItem("stats"));
    cratesOpenedStat.innerHTML = stats.cratesOpened;
    moneyWastedStat.innerHTML = stats.moneyWasted;
    uniqueUnboxedStat.innerHTML = stats.uniqueUnboxed;
    strangeUnboxedStat.innerHTML = stats.strangeUnboxed;
    hauntedUnboxedStat.innerHTML = stats.hauntedUnboxed;
    decoratedUnboxedStat.innerHTML = stats.decoratedUnboxed;
    unusualUnboxedStat.innerHTML = stats.unusualUnboxed;
    sinceLastUnusualStat.innerHTML = stats.currentDrought;
    if (stats.longestUnusualDrought == null) {
      longestUnusualDroughtStat.innerHTML = "N/A";
    } else {
      longestUnusualDroughtStat.innerHTML = stats.longestUnusualDrought;
    }
    if (stats.shortestUnusualDrought == null) {
      shortestUnusualDroughtStat.innerHTML = "N/A";
    } else {
      shortestUnusualDroughtStat.innerHTML = stats.shortestUnusualDrought;
    }
    if (stats.moneyWastedCents <= 9) {
      moneyWastedCentsStat.innerHTML = "0" + stats.moneyWastedCents;
    } else {
      moneyWastedCentsStat.innerHTML = stats.moneyWastedCents;
    }
  }
  loadUnusuals();
}

function loadUnusuals() {
  if (localStorage.getItem("unusualSave") === null) {
    return 0;
  } else {
    statsUnusuals.innerHTML = "";
    noUnusualsText.style.display = "none";
    unusualSave = JSON.parse(localStorage.getItem("unusualSave"));
    for (var i = 0; i < unusualSave.length; i++) {
      var unusualAdd = document.createElement("div");
      unusualAdd.classList.add("unusualitem");
      var wear = unusualSave[i].wr;
      var strange = "";
      if (unusualSave[i].hasOwnProperty("wr")) {
        if (unusualSave[i].wr > 5) {
          wear -= 5;
          strange = "Strange ";
        }
        unusualAdd.innerHTML =
          '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
          unusualeffects["e" + unusualSave[i].fx].img + imageSupport +
          '"><img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/skins/' +
          gradeTable[wear] +
          itemname["i" + unusualSave[i].id].img + imageSupport +
          '"><p class="statsunusualsname">' +
          strange +
          itemname["i" + unusualSave[i].id][language] +
          " (" +
          gradeTable2[wear] +
          ")" +
          '</p><p class="statsunusualseffect">' + text.z6[language] +
          unusualeffects["e" + unusualSave[i].fx][language] +
          "</p>";
      } else if (unusualSave[i].hasOwnProperty("st")) {
        unusualAdd.innerHTML =
          '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
          unusualeffects["e" + unusualSave[i].fx].img + imageSupport +
          '"><img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
          itemname["i" + unusualSave[i].id].img + imageSupport +
          '"><p class="statsunusualsname">' + effectFirst("StrangeSpan") +
          itemname["i" + unusualSave[i].id][language] + effectLast("StrangeSpan") +
          '</p><p class="statsunusualseffect">' + text.z6[language] +
          unusualeffects["e" + unusualSave[i].fx][language] +
          "</p>";
      } else {
        unusualAdd.innerHTML =
          '<img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/effect/' +
          unusualeffects["e" + unusualSave[i].fx].img + imageSupport +
          '"><img class="statsunusualsimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/item/' +
          itemname["i" + unusualSave[i].id].img + imageSupport +
          '"><p class="statsunusualsname">' +
          itemname["i" + unusualSave[i].id][language] +
          '</p><p class="statsunusualseffect">' + text.z6[language] +
          unusualeffects["e" + unusualSave[i].fx][language] +
          "</p>";
      }
      statsUnusuals.appendChild(unusualAdd);
    }
  }
}
resetSaveBtn.addEventListener("click", function () {
  if (resetDelay) {
    resetDelay = 2;
    generateGameSave();
    unusualSave = [];
    localStorage.removeItem("gameSave");
    localStorage.removeItem("stats");
    localStorage.removeItem("unusualSave");
    stats = {
      cratesOpened: 0,
      moneyWasted: 0,
      moneyWastedCents: 0,
      shortestUnusualDrought: null,
      currentDrought: 0,
      longestUnusualDrought: null,
      unluckiestStreak: 0,
      uniqueUnboxed: 0,
      strangeUnboxed: 0,
      hauntedUnboxed: 0,
      decoratedUnboxed: 0,
      unusualUnboxed: 0
    };
    cratesOpenedStat.innerHTML = stats.cratesOpened;
    moneyWastedStat.innerHTML = stats.moneyWasted;
    uniqueUnboxedStat.innerHTML = stats.uniqueUnboxed;
    strangeUnboxedStat.innerHTML = stats.strangeUnboxed;
    hauntedUnboxedStat.innerHTML = stats.hauntedUnboxed;
    decoratedUnboxedStat.innerHTML = stats.decoratedUnboxed;
    unusualUnboxedStat.innerHTML = stats.unusualUnboxed;
    longestUnusualDroughtStat.innerHTML = "N/A";
    shortestUnusualDroughtStat.innerHTML = "N/A";
    moneyWastedCentsStat.innerHTML = "00";
    var unusuals = document.getElementsByClassName("unusualitem");
    while (unusuals.length > 0) {
      unusuals[0].parentNode.removeChild(unusuals[0]);
    }
    noUnusualsText.style.display = "block";
    resetSaveBtnText.innerHTML = text.z4[language];
    setTimeout(function () {
      resetDelay = 0;
      resetSaveBtnText.innerHTML = text.b21[language];
    }, 3000);
  } else {
    resetSaveBtnText.innerHTML = text.z5[language];
    resetDelay = 1;
    setTimeout(function () {
      if (resetDelay == 1) {
        resetDelay = 0;
        resetSaveBtnText.innerHTML = text.b21[language];
      }
    }, 3000);
  }
});
var gridGenerated = false;

function generateGrid(override) {
  if (gridGenerated && !override) {
    return 0;
  } else {
    gridGenerated = true;
  }
  crateSelectGrid.innerHTML = "";
  for (var i = 1; i < cA.length; i++) {
    var crateSelectGridAdd = document.createElement("div");
    crateSelectGridAdd.setAttribute("cratenum", i);
    crateSelectGridAdd.classList.add("crategriditem");
    crateSelectGridAdd.innerHTML =
      '<img class="statscratesimg" onerror="this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\'" src="./images/crate/' +
      cratename["c" + cA[crateOrder[i]].id].img + imageSupport +
      '"><p class="statscratesname">' +
      cratename["c" + cA[crateOrder[i]].id][language] +
      '</p><p class="statscratesseries">' +
      getSeries(crateOrder[i]) +
      "</p>";
    crateSelectGrid.appendChild(crateSelectGridAdd);
    document
      .getElementsByClassName("crategriditem")[i - 1].addEventListener("pointerdown", function () {
        playSound("btn");
      });
    document
      .getElementsByClassName("crategriditem")[i - 1].addEventListener("click", function () {
        playSound("btnrelease");
        jumpToCrate(parseInt(this.getAttribute("cratenum")));
      });
  }
}

function generateStatsCrates(override) {
  if (statsGenerated && !override) {
    return 0;
  } else {
    statsGenerated = true;
  }
  statsCrates.innerHTML = "";
  for (var i = 1; i < cA.length; i++) {
    var statsCratesListAdd = document.createElement("div");
    statsCratesListAdd.setAttribute("cratenum", i);
    statsCratesListAdd.classList.add("statscratesitem");
    statsCratesListAdd.innerHTML =
      '<img class="statscratesimg" src="./images/crate/' +
      cratename["c" + cA[crateOrder[i]].id].img + imageSupport +
      '"><p class="statscratesname">' +
      cratename["c" + cA[crateOrder[i]].id][language] +
      '</p><p class="statscratesseries">' +
      getSeries(crateOrder[i]) +
      "</p>";
    statsCrates.appendChild(statsCratesListAdd);
    document
      .getElementsByClassName("statscratesitem")[i - 1].addEventListener("pointerdown", function () {
        playSound("btn");
      });
    document
      .getElementsByClassName("statscratesitem")[i - 1].addEventListener("click", function () {
        playSound("btnrelease");
        statsContainer.style.display = "none";
        statsHeader.style.display = "none";
        statsCratesDetails.style.display = "block";
        statsReturnBtn.style.display = "none";
        statsCratesDetailsReturnBtn.style.display = "flex";
        generateCrateDetails(crateOrder[this.getAttribute("cratenum")]);
        currentStatsCrate = parseInt(this.getAttribute("cratenum"));
      });
  };
  document.querySelectorAll("img").forEach(function (img) {
    img.onerror = function () {
      this.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  pageCrateName.innerHTML = cratename["c" + cA[crateOrder[currentCrate]].id][language];
  pageCrateSeries.innerHTML = getSeries(crateOrder[currentCrate]);
  crateImg.src = "./images/crate/" + cratename["c" + cA[crateOrder[currentCrate]].id].img + imageSupport;
  generateLootList();
  generateEffectList();
  generateGameSave();
  loadSave();
  switch (localStorage.getItem("saveLang")) {
    case "pol":
      loadLanguage("pol");
      langDropdown.value = "pol";
      break;
    case "sch":
      loadLanguage("sch");
      langDropdown.value = "sch";
      break;
    case null: // For first time users, show TF2 Unboxer in user's most preferred language that is available.
      for (var i = 0; i < navigator.languages.length; i++) {
        switch (navigator.languages[i].slice(0, 2)) {
          case "en":
            localStorage.setItem("saveLang", "eng")
            i = navigator.languages.length;
            break;
          case "pl":
            loadLanguage("pol");
            langDropdown.value = "pol";
            localStorage.setItem("saveLang", "pol")
            i = navigator.languages.length;
            break;
          case "zh":
            loadLanguage("sch");
            langDropdown.value = "sch";
            localStorage.setItem("saveLang", "sch")
            i = navigator.languages.length;
            break;
        }
      }
  }
});