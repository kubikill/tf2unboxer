let dataCrates = {
    1: {
        img: "mann_co_supply_crate",
        eng: "Mann Co. Supply Crate",
        pol: "Skrzynka Mann Co.",
        sch: "曼恩公司供应箱",
        fre: "Caisse Mann Co.",
        bra: "Caixa de Suprimentos da Mann Co.",
        hun: "Mann Co. Ellátmányláda",
        swe: "Förrådslåda Från Mann Co."
    },
    2: {
        img: "festive_winter_crate",
        eng: "Festive Winter Crate",
        pol: "Świąteczna zimowa skrzynka",
        sch: "欢冬补给箱",
        fre: "Caisse festive de Noël",
        bra: "Caixa Festiva de Fim de Ano",
        hun: "Ünnepélyes Téli Láda",
        swe: "Festlig Vinter-Låda"
    },
    3: {
        img: "mann_co_audition_reel",
        eng: "Mann Co. Audition Reel",
        pol: "Taśma prób nagraniowych Mann Co.",
        sch: "曼恩公司影像资料箱",
        fre: "Bobine Mann Co.",
        bra: "Rolo de Filme da Mann Co.",
        hun: "Mann Co. Filmtekercs",
        swe: "Auditionrulle från Mann co."
    },
    4: {
        img: "concealed_killer_weapons_case",
        eng: "Concealed Killer Weapons Case",
        pol: "Skrzynia skrytego mordercy",
        sch: "隐秘杀手武器箱",
        fre: "Caisse d'armes de la Collection du Tueur Dissimulé",
        bra: "Caixa de Arma do Assassino Furtivo",
        hun: "A Rejtett Gyilkos Fegyvertáska",
        rom: "The Concealed Killer Weapons Case",
        swe: "Maskerade mördaren-vapenväska"
    },
    5: {
        img: "refreshing_summer_cooler",
        eng: "Refreshing Summer Cooler",
        pol: "Orzeźwiająca letnia lodówka",
        sch: "冰凉夏日冷藏箱",
        fre: "Glacière Rafraîchissante de l'Été",
        bra: "Cooler Refrescante de Férias",
        hun: "Frissítő Nyári Hűtőtáska",
        swe: "Uppfriskande Frysbox"
    },
    6: {
        img: "salvaged_mann_co_supply_crate",
        eng: "Salvaged Mann Co. Supply Crate",
        pol: "Ocalona skrzynka Mann Co.",
        sch: "废弃的曼恩公司供应箱",
        fre: "Caisse Mann Co. de récupération",
        bra: "Caixa Recuperada de Suprimentos da Mann Co.",
        hun: "Megmentett Mann Co. Ellátmányláda",
        swe: "Bärgad Förrådslåda Från Mann Co."
    },
    7: {
        img: "naughty_winter_crate",
        eng: "Naughty Winter Crate",
        pol: "Niegrzeczna zimowa skrzynka",
        sch: "邋遢的欢冬供应箱",
        fre: "Caisse d'hiver vilaine",
        bra: "Caixa Malcomportada de Fim de Ano",
        hun: "Rosszcsont Téli Láda",
        swe: "Stygg Vinterlåda"
    },
    8: {
        img: "nice_winter_crate",
        eng: "Nice Winter Crate",
        pol: "Grzeczna zimowa skrzynka",
        sch: "精美的欢冬供应箱",
        fre: "Caisse d'hiver bien sage",
        bra: "Caixa Bem-comportada de Fim de Ano",
        hun: "Rendes Téli Láda",
        swe: "Snäll Vinterlåda"
    },
    9: {
        img: "scorched_crate",
        eng: "Scorched Crate",
        pol: "Osmalona skrzynka",
        sch: "被烧焦的箱子",
        fre: "Caisse roussie",
        bra: "Caixa Chamuscada",
        hun: "Megperzselt Láda",
        swe: "Bränd Låda"
    },
    10: {
        img: "fall_crate",
        eng: "Fall Crate",
        pol: "Jesienna skrzynka",
        sch: "秋季补给箱",
        fre: "Caisse d'automne",
        bra: "Caixa de Outono",
        hun: "Őszi Láda",
        swe: "Höstlåda"
    },
    11: {
        img: "eerie_crate",
        eng: "Eerie Crate",
        pol: "Niesamowita skrzynka",
        sch: "怪异的补给箱",
        fre: "Caisse sinistre",
        bra: "Caixa Sombria",
        hun: "Kísérteties Láda",
        swe: "Kuslig Låda"
    },
    12: {
        img: "naughty_winter_crate_2012",
        eng: "Naughty Winter Crate 2012",
        pol: "Niegrzeczna zimowa skrzynka 2012",
        sch: "邋遢欢冬补给箱2012",
        fre: "Caisse d'hiver vilaine 2012",
        bra: "Caixa Malcomportada de Fim de Ano de 2012",
        hun: "Rosszcsont Téli Láda 2012",
        swe: "Stygg Vinterlåda 2012"
    },
    13: {
        img: "nice_winter_crate_2012",
        eng: "Nice Winter Crate 2012",
        pol: "Grzeczna zimowa skrzynka 2012",
        sch: "精美欢冬供应箱 2012",
        fre: "Caisse d'hiver bien sage 2012",
        bra: "Caixa Bem-comportada de Fim de Ano de 2012",
        hun: "Rendes Téli Láda 2012",
        swe: "Snäll Vinterlåda 2012"
    },
    14: {
        img: "robo_community_crate",
        eng: "Robo Community Crate",
        pol: "Roboskrzynka społeczności",
        sch: "机器社区补给箱",
        fre: "RoboCaisse Communautaire",
        bra: "RoboCaixa",
        hun: "Robo Közösségi Láda",
        swe: "Robogemenskapslåda"
    },
    15: {
        img: "select_reserve_mann_co_supply_crate",
        eng: "Select Reserve Mann Co. Supply Crate",
        pol: "Skrzynka specjalnej rezerwy Mann Co.",
        sch: "曼恩公司特选保存补给箱",
        fre: "Caisse de sélection Mann Co.",
        bra: "Caixa Seleta de Suprimentos da Mann Co.",
        hun: "Prémium Tartalék Mann Co. Ellátmányláda",
        rom: "Selectează Reserve Mann Co. Supply Crate",
        swe: "Särskilt utvald förrådslåda"
    },
    16: {
        img: "summer_appetizer_crate",
        eng: "Summer Appetizer Crate",
        pol: "Letnia skrzynka przystawek",
        sch: "夏日神秘补给箱",
        fre: "L'Apéricaisse Estivale",
        bra: "Caixa de Entrada das Férias",
        hun: "Nyári Étvágygerjesztő Láda",
        swe: "Sommarförrättslåda"
    },
    17: {
        img: "red_summer_2013_cooler",
        eng: "Red Summer 2013 Cooler",
        pol: "Czerwona letnia lodówka 2013",
        sch: "2013 真红夏日冷藏箱",
        fre: "Glacière Estivale Rouge 2013",
        bra: "Cooler Vermelho das Férias de 2013",
        hun: "2013-as Piros Nyári Hűtőtáska",
        swe: "Röd Sommarlåda (2013)"
    },
    18: {
        img: "orange_summer_2013_cooler",
        eng: "Orange Summer 2013 Cooler",
        pol: "Pomarańczowa letnia lodówka 2013",
        sch: "2013 澄橙夏日冷藏箱",
        fre: "Glacière Estivale Orange 2013",
        bra: "Cooler Laranja das Férias de 2013",
        hun: "2013-as Narancssárga Nyári Hűtőtáska",
        swe: "Orange Sommarlåda (2013)"
    },
    19: {
        img: "yellow_summer_2013_cooler",
        eng: "Yellow Summer 2013 Cooler",
        pol: "Żółta letnia lodówka 2013",
        sch: "2013 炫黄夏日冷藏箱",
        fre: "Glacière Estivale Jaune 2013",
        bra: "Cooler Amarelo das Férias de 2013",
        hun: "2013-as Sárga Nyári Hűtőtáska",
        swe: "Gul Sommarlåda (2013)"
    },
    20: {
        img: "green_summer_2013_cooler",
        eng: "Green Summer 2013 Cooler",
        pol: "Zielona letnia lodówka 2013",
        sch: "2013 鲜绿夏日冷藏箱",
        fre: "Glacière Estivale Verte 2013",
        bra: "Cooler Verde das Férias de 2013",
        hun: "2013-as Zöld Nyári Hűtőtáska",
        swe: "Grön Sommarlåda (2013)"
    },
    21: {
        img: "aqua_summer_2013_cooler",
        eng: "Aqua Summer 2013 Cooler",
        pol: "Turkusowa letnia lodówka 2013",
        sch: "2013 水绿夏日冷藏箱",
        fre: "Glacière Estivale Aquatique 2013",
        bra: "Cooler Azul-piscina das Férias de 2013",
        hun: "2013-as Vízkék Nyári Hűtőtáska",
        swe: "Turkos Sommarlåda (2013)"
    },
    22: {
        img: "blue_summer_2013_cooler",
        eng: "Blue Summer 2013 Cooler",
        pol: "Niebieska letnia lodówka 2013",
        sch: "2013 宝蓝夏日冷藏箱",
        fre: "Glacière Estivale Bleue 2013",
        bra: "Cooler Azul das Férias de 2013",
        hun: "2013-as Kék Nyári Hűtőtáska",
        swe: "Blå Sommarlåda (2013)"
    },
    23: {
        img: "brown_summer_2013_cooler",
        eng: "Brown Summer 2013 Cooler",
        pol: "Brązowa letnia lodówka 2013",
        sch: "2013 棕木夏日冷藏箱",
        fre: "Glacière Estivale Marron 2013",
        bra: "Cooler Marrom das Férias de 2013",
        hun: "2013-as Barna Nyári Hűtőtáska",
        swe: "Brun Sommarlåda (2013)"
    },
    24: {
        img: "black_summer_2013_cooler",
        eng: "Black Summer 2013 Cooler",
        pol: "Czarna letnia lodówka 2013",
        sch: "2013 酷黑夏日冷藏箱",
        fre: "Glacière Estivale Noire 2013",
        bra: "Cooler Preto das Férias de 2013",
        hun: "2013-as Fekete Nyári Hűtőtáska",
        swe: "Svart Sommarlåda (2013)"
    },
    25: {
        img: "fall_2013_acorns_crate",
        eng: "Fall 2013 Acorns Crate",
        pol: "Jesienna żołędziowa skrzynka 2013",
        sch: "2013 秋季橡子补给箱",
        fre: "Caisse Automnale à Glands 2013",
        bra: "Caixa de Bolotas das Folhas Secas de 2013",
        hun: "2013 Őszi Makkos Láda",
        swe: "Höstens Ekollonlåda (2013)"
    },
    26: {
        img: "fall_2013_gourd_crate",
        eng: "Fall 2013 Gourd Crate",
        pol: "Jesienna dyniowa skrzynka 2013",
        sch: "2013 秋季瓠子补给箱",
        fre: "Caisse Automnale à Citrouilles 2013",
        bra: "Caixa de Porongo das Folhas Secas de 2013",
        hun: "2013 Őszi Tökös Láda",
        swe: "Höstens Kalebasslåda (2013)"
    },
    27: {
        img: "spooky_crate",
        eng: "Spooky Crate",
        pol: "Upiorna skrzynka",
        sch: "诡异的补给箱",
        fre: "Caisse effrayante",
        bra: "Caixa Apavorante",
        hun: "Kísérteties Láda",
        swe: "Spöklik Låda"
    },
    28: {
        img: "naughty_winter_crate_2013",
        eng: "Naughty Winter Crate 2013",
        pol: "Niegrzeczna zimowa skrzynka 2013",
        sch: "邋遢的欢冬供应箱 2013",
        fre: "Caisse d'hiver vilaine 2013",
        bra: "Caixa Malcomportada de Fim de Ano de 2013",
        hun: "Rosszcsont Téli Láda 2013",
        rom: "Cutie de Iarnă Naughty 2013",
        swe: "Stygg Vinterlåda 2013"
    },
    29: {
        img: "nice_winter_crate_2013",
        eng: "Nice Winter Crate 2013",
        pol: "Grzeczna zimowa skrzynka 2013",
        sch: "精美的欢冬供应箱 2013",
        fre: "Caisse d'hiver bien sage 2013",
        bra: "Caixa Bem-comportada de Fim de Ano de 2013",
        hun: "Rendes Téli Láda 2013",
        swe: "Snäll Vinterlåda 2013"
    },
    30: {
        img: "mann_co_strongbox",
        eng: "Mann Co. Strongbox",
        pol: "Wzmocniona skrzynka Mann Co.",
        sch: "曼恩公司保险箱",
        fre: "Coffre-fort Mann Co.",
        bra: "Caixa-forte da Mann Co.",
        hun: "Mann Co. Páncélkazetta",
        swe: "Mann Co. Kassaskåp"
    },
    31: {
        img: "mann_co_supply_munition",
        eng: "Mann Co. Supply Munition",
        pol: "Uzbrojenie Mann Co.",
        sch: "曼恩公司供给军需品",
        fre: "Munitions Mann Co.",
        bra: "Caixa de Provisões da Mann Co.",
        hun: "Mann Co. Lőszerellátmány",
        swe: "Ammunitionslåda från Mann Co."
    },
    32: {
        img: "bread_box",
        eng: "Bread Box",
        pol: "Chlebak",
        sch: "面包怪兽箱",
        fre: "Boîte à pain",
        bra: "Caixa de Pão",
        hun: "Kenyértartó",
        swe: "Brödlåda"
    },
    33: {
        img: "mann_co_stockpile_crate",
        eng: "Mann Co. Stockpile Crate",
        pol: "Skrzynka zapasów Mann Co.",
        sch: "曼恩公司储备物资箱",
        fre: "Caisse de la réserve Mann Co.",
        bra: "Caixa do Estoque da Mann Co.",
        hun: "Mann Co. Raktárláda",
        swe: "Lagerlåda från Mann Co."
    },
    34: {
        img: "unlocked_creepy_scout_crate",
        eng: "Unlocked Creepy Scout Crate",
        pol: "Otwarta straszna skrzynka Skauta",
        sch: "侦察兵的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Scout",
        bra: "Caixa Destrancada Horripilante do Scout",
        hun: "Bezáratlan Rémisztő Felderítő Láda",
        swe: "Upplåst kuslig Spanar-låda"
    },
    35: {
        img: "unlocked_creepy_soldier_crate",
        eng: "Unlocked Creepy Soldier Crate",
        pol: "Otwarta straszna skrzynka Żołnierza",
        sch: "士兵的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Soldier",
        bra: "Caixa Destrancada Horripilante do Soldier",
        hun: "Bezáratlan Rémisztő Katona Láda",
        swe: "Upplåst kuslig Soldier-låda"
    },
    36: {
        img: "unlocked_creepy_pyro_crate",
        eng: "Unlocked Creepy Pyro Crate",
        pol: "Otwarta straszna skrzynka Pyro",
        sch: "火焰兵的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Pyro",
        bra: "Caixa Destrancada Horripilante de Pyro",
        hun: "Bezáratlan Rémisztő Piró Láda",
        swe: "Upplåst kuslig Pyro-låda"
    },
    37: {
        img: "unlocked_creepy_demo_crate",
        eng: "Unlocked Creepy Demo Crate",
        pol: "Otwarta straszna skrzynka Demomana",
        sch: "爆破手的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Demoman",
        bra: "Caixa Destrancada Horripilante do Demoman",
        hun: "Bezáratlan Rémisztő Robbantós Láda",
        swe: "Upplåst kuslig Demo-låda"
    },
    38: {
        img: "unlocked_creepy_heavy_crate",
        eng: "Unlocked Creepy Heavy Crate",
        pol: "Otwarta straszna skrzynka Grubego",
        sch: "机枪手的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Heavy",
        bra: "Caixa Destrancada Horripilante do Heavy",
        hun: "Bezáratlan Rémisztő Gépágyús Láda",
        swe: "Upplåst kuslig Tung Artillerist-låda"
    },
    39: {
        img: "unlocked_creepy_engineer_crate",
        eng: "Unlocked Creepy Engineer Crate",
        pol: "Otwarta straszna skrzynka Inżyniera",
        sch: "工程师的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée d'Engineer",
        bra: "Caixa Destrancada Horripilante do Engineer",
        hun: "Bezáratlan Rémisztő Mérnök Láda",
        swe: "Upplåst kuslig Ingenjör-låda"
    },
    40: {
        img: "unlocked_creepy_medic_crate",
        eng: "Unlocked Creepy Medic Crate",
        pol: "Otwarta straszna skrzynka Medyka",
        sch: "医生的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Medic",
        bra: "Caixa Destrancada Horripilante do Medic",
        hun: "Bezáratlan Rémisztő Szanitéc Láda",
        swe: "Upplåst kuslig Medic-låda"
    },
    41: {
        img: "unlocked_creepy_sniper_crate",
        eng: "Unlocked Creepy Sniper Crate",
        pol: "Otwarta straszna skrzynka Snajpera",
        sch: "狙击手的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Sniper",
        bra: "Caixa Destrancada Horripilante do Sniper",
        hun: "Bezáratlan Rémisztő Mesterlövész Láda",
        swe: "Upplåst kuslig Sniper-låda"
    },
    42: {
        img: "unlocked_creepy_spy_crate",
        eng: "Unlocked Creepy Spy Crate",
        pol: "Otwarta straszna skrzynka Szpiega",
        sch: "间谍的无锁恐怖箱",
        fre: "Caisse sinistre déverrouillée de Spy",
        bra: "Caixa Destrancada Horripilante do Spy",
        hun: "Bezáratlan Rémisztő Kém Láda",
        swe: "Upplåst kuslig Spion-låda"
    },
    43: {
        img: "limited_late_summer_crate",
        eng: "Limited Late Summer Crate",
        pol: "Limitowana spóźniona letnia skrzynka",
        sch: "限量夏末补给箱",
        fre: "Caisse limitée de fin d'été",
        bra: "Caixa Limitada de Férias Atrasada",
        hun: "Limitált Késő Nyári Láda",
        swe: "Begränsad Sensommarlåda"
    },
    44: {
        img: "end_of_the_line_community_crate",
        eng: "End of the Line Community Crate",
        pol: "Skrzynka aktualizacji społeczności „Koniec trasy”",
        sch: "End of the Line 社区补给箱",
        fre: "Caisse communautaire End of the Line",
        bra: "Caixa do End of the Line",
        hun: "Végállomás Közösségi Láda",
        rom: "Cutie Comunitară „End of the Line”",
        swe: "End of the Line-gemenskapslåda"
    },
    45: {
        img: "naughty_winter_crate_2014",
        eng: "Naughty Winter Crate 2014",
        pol: "Niegrzeczna zimowa skrzynka 2014",
        sch: "邋遢欢冬补给箱 2014",
        fre: "Caisse d'hiver vilaine 2014",
        bra: "Caixa Malcomportada de Fim de Ano de 2014",
        hun: "Rosszcsont Téli Láda 2014",
        swe: "Stygg Vinterlåda 2014"
    },
    46: {
        img: "nice_winter_crate_2014",
        eng: "Nice Winter Crate 2014",
        pol: "Grzeczna zimowa skrzynka 2014",
        sch: "精美欢冬补给箱 2014",
        fre: "Caisse d'hiver bien sage 2014",
        bra: "Caixa Bem-comportada de Fim de Ano de 2014",
        hun: "Rendes Téli Láda 2014",
        swe: "Snäll Vinterlåda 2014"
    },
    47: {
        img: "powerhouse_weapons_case",
        eng: "Powerhouse Weapons Case",
        pol: "Skrzynia Powerhouse",
        sch: "Powerhouse 武器箱",
        fre: "La caisse d'armes Powerhouse",
        bra: "Caixa de Arma da Coleção Powerhouse",
        hun: "Powerhouse Fegyvertáska",
        swe: "Powerhouse-vapenväska"
    },
    48: {
        img: "gun_mettle_cosmetic_case",
        eng: "Gun Mettle Cosmetic Case",
        pol: "Skrzynia ozdób aktualizacji „Siła charakteru”",
        sch: "枪魂饰品箱",
        fre: "Caisse de cosmétiques Gun Mettle",
        bra: "Caixa de Cosméticos do Arsenal Artístico",
        hun: "Fegyverre Termett Díszítő Táska",
        swe: "Gun Mettle-kosmetiklåda"
    },
    49: {
        img: "quarantined_collection_case",
        eng: "Quarantined Collection Case",
        pol: "Skrzynia kolekcji kwarantanny",
        sch: "隔离收藏品",
        fre: "Caisse de la collection Quarantaine",
        bra: "Caixa da Coleção Quarentena",
        hun: "Elkülönített Gyűjtemény Táska",
        swe: "Isolerad-kollektionslåda"
    },
    50: {
        img: "confidential_collection_case",
        eng: "Confidential Collection Case",
        pol: "Skrzynia kolekcji poufne",
        sch: "机密收藏品",
        fre: "Caisse de la collection Confidentielle",
        bra: "Caixa da Coleção Confidencial",
        hun: "Bizalmas Gyűjtemény Táska",
        swe: "Konfidentiell-kollektionslåda"
    },
    51: {
        img: "gargoyle_case",
        eng: "Gargoyle Case",
        pol: "Skrzynia gargulca",
        sch: "石像鬼石匣",
        fre: "Caisse gargouille",
        bra: "Caixa da Gárgula",
        hun: "Vízköpő Táska",
        swe: "Gargoyle-låda"
    },
    52: {
        img: "pyroland_weapons_case",
        eng: "Pyroland Weapons Case",
        pol: "Skrzynia Pyrolandu",
        sch: "火焰幻境武器箱",
        fre: "Caisse d'armes Pyroland",
        bra: "Caixa de Arma da Pyrolândia",
        hun: "Pirófölde Fegyvertáska",
        swe: "Pyroland-vapenlåda"
    },
    53: {
        img: "warbird_weapons_case",
        eng: "Warbird Weapons Case",
        pol: "Skrzynia Warbird",
        sch: "战鸟武器箱",
        fre: "Caisse d'armes Warbird",
        bra: "Caixa de Arma da Ave de Guerra",
        hun: "Viharmadár Fegyvertáska",
        swe: "Warbird-vapenlåda"
    },
    54: {
        img: "tough_break_cosmetic_case",
        eng: "Tough Break Cosmetic Case",
        pol: "Skrzynia ozdób aktualizacji „Śniąteczne fatum”",
        sch: "艰难假日饰品箱",
        fre: "Caisse de cosmétiques Tough Break",
        bra: "Caixa de Cosméticos das Férias Frustradas",
        hun: "Balszerencse Díszítő Táska",
        swe: "Tough Break-kosmetiklåda"
    },
    55: {
        img: "mayflower_cosmetic_case",
        eng: "Mayflower Cosmetic Case",
        pol: "Skrzynia ozdób kwiecia majowego",
        sch: "五月花饰品箱",
        fre: "Caisse de cosmétiques Mayflower",
        bra: "Caixa de Cosméticos da Flor de Maio",
        hun: "Galagonya Díszítő Táska",
        swe: "Mayflower-kosmetiklåda"
    },
    56: {
        img: "creepy_crawly_case",
        eng: "Creepy Crawly Case",
        pol: "Skrzynia gęsiej skórki",
        sch: "恐怖蜘蛛石匣",
        fre: "Caisse arachnéenne",
        bra: "Caixa da Aranha Arrepiante",
        hun: "Csúszómászó Táska",
        swe: "Kusliga kryp-låda"
    },
    57: {
        img: "unlocked_winter_2016_cosmetic_case",
        eng: "Unlocked Winter 2016 Cosmetic Case",
        pol: "Otwarta zimowa skrzynia ozdób 2016",
        sch: "2016 年无锁冬季饰品箱",
        fre: "Caisse cosmétique d'hiver 2016 déverrouillée",
        bra: "Caixa de Cosméticos Destrancada de Fim de Ano de 2016",
        hun: "Kinyitott 2016 Téli Díszítő Táska",
        rom: "Winter 2016 Cosmetic Case deblocat",
        swe: "Upplåst Vinter 2016-kosmetiklåda"
    },
    58: {
        img: "rainy_day_cosmetic_case",
        eng: "Rainy Day Cosmetic Case",
        pol: "Skrzynia ozdób deszczowego dnia",
        sch: "雨季饰品箱",
        fre: "Caisse de cosmétiques Rainy Day",
        bra: "Caixa de Cosméticos do Dia Chuvoso",
        hun: "Esős Napi Díszítő Táska",
        swe: "Rainy Day-kosmetiklåda"
    },
    59: {
        img: "abominable_cosmetic_case",
        eng: "Abominable Cosmetic Case",
        pol: "Skrzynia ozdób okropieństwa",
        sch: "憎恶之物饰品箱",
        fre: "Caisse de cosmétiques abominables",
        bra: "Caixa de Cosméticos Abomináveis",
        hun: "Förtelmes Díszítő Táska",
        swe: "Abominable Cosmetic-väska"
    },
    60: {
        img: "unleash_the_beast_cosmetic_case",
        eng: "Unleash the Beast Cosmetic Case",
        pol: "Skrzynia ozdób uwolnionej bestii",
        sch: "释放野兽饰品箱",
        fre: "Caisse de cosmétiques Unleash the Beast",
        bra: "Caixa de Cosméticos da Fera Libertada",
        hun: "Szabadon a Fenevaddal Díszítő Táska",
        rom: "Cutie cu accesorii Unleash the Beast",
        swe: "Unleash the Beast-väska"
    },
    61: {
        img: "jungle_jackpot_war_paint_case",
        eng: "Jungle Jackpot War Paint Case",
        pol: "Skrzynia barw wojennych dżunglowej nagrody",
        sch: "丛林大奖战绘箱",
        fre: "Caisse de peintures Jungle Jackpot",
        bra: "Caixa de Tintas de Guerra da Sorte Selvagem",
        hun: "Dzsungelfőnyeremény Harci Festés Táska",
        swe: "Jungle Jackpot-krigsfärgväska"
    },
    62: {
        img: "infernal_reward_war_paint_case",
        eng: "Infernal Reward War Paint Case",
        pol: "Skrzynia barw wojennych piekielnych nagród",
        sch: "炼狱之赐战绘箱",
        fre: "Caisse de peintures Infernal Reward",
        bra: "Caixa de Tintas de Guerra da Recompensa Infernal",
        hun: "Pokoli Jutalom Harci Festés Táska",
        swe: "Infernal Reward-krigsfärgväska"
    },
    63: {
        img: "war_paint_civilian_grade_keyless_case",
        eng: "Decorated War Hero War Paint Civilian Grade Keyless Case",
        pol: "Barwy wojenne bohatera wojennego Otwarta skrzynia stopnia cywil",
        sch: "功勋英雄 民用级无锁战绘箱",
        fre: "Peinture de guerre Decorated War Hero Caisse ouverte de niveau Civil",
        bra: "Tinta de Guerra \"Veterano Condecorado\" Caixa Destrancada Nv. Civil",
        hun: "„Kitüntetett Háborús Hős” harci festés Civil fokozatú kulcs nélküli táska",
        rom: "Vopsea de război „Decorated War Hero” Cutie neîncuiată de ordin civil",
        cze: "Decorated War Hero Civilian Grade Keyless Case",
        swe: "'Decorated War Hero'-krigsfärg Civilklassad nyckellös väska"
    },
    64: {
        img: "war_paint_civilian_grade_keyless_case",
        eng: "Contract Campaigner War Paint Civilian Grade Keyless Case",
        pol: "Barwy wojenne najemnika kontraktowego Otwarta skrzynia stopnia cywil",
        sch: "合同履行者 民用级无锁战绘箱",
        fre: "Peinture de guerre « Contract Campaigner » Caisse ouverte de niveau Civil",
        bra: "Tinta de Guerra \"Contratado da Campanha\" Caixa Destrancada Nv. Civil",
        hun: "„Szerződéses Hadjáratozó” harci festés Civil fokozatú kulcs nélküli táska",
        rom: "Vopsea de război „Contract Campaigner” Cutie neîncuiată de ordin civil",
        cze: "Contract Campaigner Civilian Grade Keyless Case",
        swe: "'Contract Campaigner'-krigsfärg Civilklassad nyckellös väska"
    },
    65: {
        img: "winter_2017_cosmetic_case",
        eng: "Winter 2017 Cosmetic Case",
        pol: "Zimowa skrzynia ozdób 2017",
        sch: "2017 冬季饰品箱",
        fre: "Caisse de cosmétiques d'hiver 2017",
        bra: "Caixa de Cosméticos de Fim de Ano de 2017",
        hun: "Tél 2017 Díszítő Táska",
        swe: "Vinter 2017-låda"
    },
    66: {
        img: "winter_2017_war_paint_case",
        eng: "Winter 2017 War Paint Case",
        pol: "Zimowa skrzynia barw wojennych 2017",
        sch: "2017 冬季战绘箱",
        fre: "Caisse de peintures d'hiver 2017",
        bra: "Caixa de Tintas de Guerra de Fim de Ano de 2017",
        hun: "Tél 2017 Harci Festés Táska",
        swe: "Vinter 2017-krigsfärgväska"
    },
    67: {
        img: "blue_moon_cosmetic_case",
        eng: "Blue Moon Cosmetic Case",
        pol: "Skrzynia ozdób błękitnego księżyca",
        sch: "蓝月饰品箱",
        fre: "Caisse de cosmétiques Blue Moon",
        bra: "Caixa de Cosméticos da Lua Azul",
        hun: "Kék Hold Díszítő Táska",
        swe: "Blue Moon-låda"
    },
    68: {
        img: "violet_vermin_case",
        eng: "Violet Vermin Case",
        pol: "Skrzynia purpurowego pająka",
        sch: "紫色害虫石匣",
        fre: "Caisse de cosmétiques veuve violette",
        bra: "Caixa do Verme Violeta",
        hun: "Ibolyaszín Ízeltlábúak Táska",
        swe: "Violet Vermin-låda"
    },
    69: {
        img: "scream_fortress_x_war_paint_case",
        eng: "Scream Fortress X War Paint Case",
        pol: "Skrzynia barw wojennych Scream Fortress X",
        sch: "尖叫要塞 X 战绘箱",
        fre: "Caisse de peintures Scream Fortress X",
        bra: "Caixa de Tintas de Guerra do Scream Fortress X",
        hun: "Scream Fortress X Harci Festés Táska",
        swe: "Scream Fortress X-krigsfärgväska"
    },
    70: {
        img: "winter_2018_cosmetic_case",
        eng: "Winter 2018 Cosmetic Case",
        pol: "Zimowa skrzynia ozdób 2018",
        sch: "2018 冬季饰品箱",
        fre: "Caisse de cosmétiques d'hiver 2018",
        bra: "Caixa de Cosméticos de Fim de Ano de 2018",
        hun: "Tél 2018 Díszítő Táska",
        swe: "Vinter 2018-låda"
    },
    71: {
        img: "summer_2019_cosmetic_case",
        eng: "Summer 2019 Cosmetic Case",
        pol: "Letnia skrzynia ozdób 2019",
        fre: "Caisse de cosmétiques d'été 2019",
        sch: "2019 夏季饰品箱",
        bra: "Caixa de Cosméticos das Férias de 2019",
        hun: "Nyár 2019 Díszítő Táska",
        swe: "Sommar 2019-låda"
    },
    72: {
        img: "unlocked_cosmetic_crate_scout",
        eng: "Unlocked Cosmetic Crate Scout",
        pol: "Otwarta skrzynka ozdób Skauta",
        sch: "无锁侦察兵饰品箱",
        fre: "Caisse cosmétique du Scout ouverte",
        bra: "Caixa de Cosméticos Destrancada do Scout",
        hun: "Kinyitott Felderítő Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Scout)"
    },
    73: {
        img: "unlocked_cosmetic_crate_soldier",
        eng: "Unlocked Cosmetic Crate Soldier",
        pol: "Otwarta skrzynka ozdób Żołnierza",
        sch: "无锁士兵饰品箱",
        fre: "Caisse cosmétique du Soldier ouverte",
        bra: "Caixa de Cosméticos Destrancada do Soldier",
        hun: "Kinyitott Katona Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Soldier)"
    },
    74: {
        img: "unlocked_cosmetic_crate_pyro",
        eng: "Unlocked Cosmetic Crate Pyro",
        pol: "Otwarta skrzynka ozdób Pyro",
        sch: "无锁火焰兵饰品箱",
        fre: "Caisse cosmétique du Pyro ouverte",
        bra: "Caixa de Cosméticos Destrancada de Pyro",
        hun: "Kinyitott Piró Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Pyro)"
    },
    75: {
        img: "unlocked_cosmetic_crate_demo",
        eng: "Unlocked Cosmetic Crate Demo",
        pol: "Otwarta skrzynka ozdób Demomana",
        sch: "无锁爆破手饰品箱",
        fre: "Caisse cosmétique du Demo ouverte",
        bra: "Caixa de Cosméticos Destrancada do Demoman",
        hun: "Kinyitott Robbantós Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Demoman)"
    },
    76: {
        img: "unlocked_cosmetic_crate_heavy",
        eng: "Unlocked Cosmetic Crate Heavy",
        pol: "Otwarta skrzynka ozdób Grubego",
        sch: "无锁机枪手饰品箱",
        fre: "Caisse cosmétique du Heavy ouverte",
        bra: "Caixa de Cosméticos Destrancada do Heavy",
        hun: "Kinyitott Gépágyús Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Heavy)"
    },
    77: {
        img: "unlocked_cosmetic_crate_engineer",
        eng: "Unlocked Cosmetic Crate Engineer",
        pol: "Otwarta skrzynka ozdób Inżyniera",
        sch: "无锁工程师饰品箱",
        fre: "Caisse cosmétique de l'Engineer ouverte",
        bra: "Caixa de Cosméticos Destrancada do Engineer",
        hun: "Kinyitott Mérnök Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Engineer)"
    },
    78: {
        img: "unlocked_cosmetic_crate_medic",
        eng: "Unlocked Cosmetic Crate Medic",
        pol: "Otwarta skrzynka ozdób Medyka",
        sch: "无锁医生饰品箱",
        fre: "Caisse cosmétique du Medic ouverte",
        bra: "Caixa de Cosméticos Destrancada do Medic",
        hun: "Kinyitott Szanitéc Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Medic)"
    },
    79: {
        img: "unlocked_cosmetic_crate_sniper",
        eng: "Unlocked Cosmetic Crate Sniper",
        pol: "Otwarta skrzynka ozdób Snajpera",
        sch: "无锁狙击手饰品箱",
        fre: "Caisse cosmétique du Sniper ouverte",
        bra: "Caixa de Cosméticos Destrancada do Sniper",
        hun: "Kinyitott Mesterlövész Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Sniper)"
    },
    80: {
        img: "unlocked_cosmetic_crate_spy",
        eng: "Unlocked Cosmetic Crate Spy",
        pol: "Otwarta skrzynka ozdób Szpiega",
        sch: "无锁间谍饰品箱",
        fre: "Caisse cosmétique du Spy ouverte",
        bra: "Caixa de Cosméticos Destrancada do Spy",
        hun: "Kinyitott Kém Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Spy)"
    },
    81: {
        img: "unlocked_cosmetic_crate_multi_class",
        eng: "Unlocked Cosmetic Crate Multi-Class",
        pol: "Otwarta skrzynka ozdób wielu klas",
        sch: "无锁多职业饰品箱",
        fre: "Caisse cosmétique Multi-classe ouverte",
        bra: "Caixa de Cosméticos Destrancada Multiclasses",
        hun: "Kinyitott Több Osztályú Díszítő Láda",
        swe: "Upplåst kosmetiklåda (Multiklass)"
    },
    82: {
        img: "spooky_spoils_case",
        eng: "Spooky Spoils Case",
        pol: "Skrzynia potwornych łupów",
        fre: "Caisse des spoliations sinistres",
        sch: "幽灵战利品石匣",
        bra: "Caixa dos Espólios Assustadores",
        hun: "Kísérteties Kincsek Táska",
        swe: "Spöklik skattväska"
    },
    83: {
        img: "winter_2019_cosmetic_case",
        eng: "Winter 2019 Cosmetic Case",
        pol: "Zimowa skrzynia ozdób 2019",
        fre: "Caisse de cosmétiques d'hiver 2019",
        sch: "2019 冬季饰品箱",
        bra: "Caixa de Cosméticos de Fim de Ano de 2019",
        hun: "Tél 2019 Díszítő Táska",
        swe: "Vinter 2019-kosmetiklåda"
    },
    84: {
        img: "winter_2019_war_paint_case",
        eng: "Winter 2019 War Paint Case",
        pol: "Zimowa skrzynia barw wojennych 2019",
        fre: "Caisse de peintures d'hiver 2019",
        sch: "2019 冬季战绘箱",
        bra: "Caixa de Tintas de Guerra de Fim de Ano de 2019",
        hun: "Tél 2019 Harci Festés Táska",
        swe: "Vinter 2019-krigsfärgväska"
    },
    85: {
        img: "summer_2020_cosmetic_case",
        eng: "Summer 2020 Cosmetic Case",
        pol: "Letnia skrzynia ozdób 2020",
        fre: "Caisse de cosmétiques d'été 2020",
        sch: "2020 夏季饰品箱",
        bra: "Caixa de Cosméticos das Férias de 2020",
        hun: "Nyár 2020 Díszítő Táska",
        swe: "Sommar 2020-kosmetiklåda"
    },
    86: {
        img: "wicked_windfall_case",
        eng: "Wicked Windfall Case",
        pol: "Skrzynia paskudnej jesieni",
        fre: "Caisse Wicked Windfall",
        sch: "飞来横祸石匣",
        bra: "Caixa da Herança Sinistra",
        hun: "Szörnyű Szerencse Táska",
        swe: "Giftig fallfrukt-låda"
    },
    87: {
        img: "scream_fortress_xii_war_paint_case",
        eng: "Scream Fortress XII War Paint Case",
        pol: "Skrzynia barw wojennych Scream Fortress XII",
        fre: "Caisse de peintures Scream Fortress XII",
        sch: "尖叫要塞 XII 战绘箱",
        bra: "Caixa de Tintas de Guerra do Scream Fortress XII",
        hun: "Scream Fortress XII Harci Festés Táska",
        swe: "Scream Fortress XII-krigsfärgväska"
    },
    88: {
        img: "winter_2020_cosmetic_case",
        eng: "Winter 2020 Cosmetic Case",
        pol: "Zimowa skrzynia ozdób 2020",
        bra: "Caixa de Cosméticos de Fim de Ano de 2020",
        fre: "Caisse de cosmétiques d'hiver 2020",
        hun: "Tél 2020 Díszítő Táska",
        swe: "Vinter 2020-kosmetiklåda"
    },
    89: {
        img: "winter_2020_war_paint_case",
        eng: "Winter 2020 War Paint Case",
        pol: "Zimowa skrzynia barw wojennych 2020",
        bra: "Caixa de Tintas de Guerra de Fim de Ano de 2020",
        fre: "Caisse de peintures d'hiver 2020",
        hun: "Tél 2020 Harci Festés Táska",
        swe: "Vinter 2020-krigsfärgväska"
    },
    90: {
        img: "summer_2021_cosmetic_case",
        eng: "Summer 2021 Cosmetic Case",
        pol: "Letnia skrzynia ozdób 2021",
        fre: "Caisse de cosmétiques d'été 2021",
        sch: "2021 夏季饰品箱",
        bra: "Caixa de Cosméticos das Férias de 2021",
        hun: "Nyár 2021 Díszítő Táska",
        swe: "Sommar 2021-kosmetiklåda"
    },
    91: {
        img: "crimson_cache_case",
        eng: "Crimson Cache Case",
        pol: "Skrzynia szkarłatnej skrytki",
        hun: "Karmazsin Készlet Táska",
        swe: "Crimson Cache-väska",
        bra: "Caixa da Lembrança Carmesim"
    },
    92: {
        img: "scream_fortress_xiii_war_paint_case",
        eng: "Scream Fortress XIII War Paint Case",
        pol: "Skrzynia barw wojennych Scream Fortress XIII",
        hun: "Scream Fortress XIII Harci Festés Táska",
        swe: "Scream Fortress XIII-krigsfärgväska",
        bra: "Caixa de Tintas de Guerra do Scream Fortress XIII",
        fre: "Caisse de peintures Scream Fortress XIII"
    },
    93: {
        img: "winter_2021_cosmetic_case",
        eng: "Winter 2021 Cosmetic Case",
        pol: "Zimowa skrzynia ozdób 2021",
        bra: "Caixa de Cosméticos de Fim de Ano de 2021",
        hun: "Tél 2021 Díszítő Táska"
    },
    94: {
        img: "summer_2022_cosmetic_case",
        eng: "Summer 2022 Cosmetic Case"
    }
}