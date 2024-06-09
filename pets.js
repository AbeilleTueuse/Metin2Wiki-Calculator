const PETS = [
  "monkey",
  "spider",
  "razador",
  "nemere",
  "dragonette",
  "meley",
  "azrael",
  "executor",
  "baashido",
  "nessie",
  "exedyar",
  "alastor",
  "boss",
];

const SKILLS_MAPPING = {
  warrior: "anti G",
  sura: "anti S",
  ninja: "anti N",
  shaman: "anti Sh",
  lycan: "anti L",
  berserker: "berserker",
  antiMagic: "anti magie",
  haste: "accélération",
  drill: "drill",
  restoration: "renouvellemnt",
  vampirism: "vampire",
  spiritualism: "fantômes",
  bulwark: "obstable",
  reflection: "miroir",
  yang: "yang",
  range: "portée",
  immortal: "invincibilité",
  panacea: "soins",
  masterBrewer: "maître brasseur",
  monster: "monstre",
  eagleEye: "regard perçant",
  drain: "sangsue",
  feather: "poids plume",
};

const PETS_MAPPING = {
  monkey: "singe",
  spider: "araignée",
  razador: "razador",
  nemere: "nemere",
  dragonette: "dragon bleu",
  meley: "meley",
  azrael: "azraël",
  executor: "bourreau",
  baashido: "baashido",
  nessie: "nessie",
  exedyar: "exedyar",
  alastor: "alastor",
  boss: "mini commandant",
};

const LEVEL_MAPPING = [
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  100, 101, 102, 103, 104, 104,
];

const TYPE_MAPPING = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]

const VALUES_1 = [
    9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11,
    11, 11, 11, 12, 12,
  ],
  VALUES_2 = [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  VALUES_3 = [
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10,
  ],
  VALUES_4 = [
    16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
    17, 17, 17, 18, 18, 18,
  ],
  VALUES_5 = [
    5400, 5466, 5533, 5600, 5666, 5733, 5800, 5866, 5933, 6000, 6066, 6133,
    6200, 6266, 6333, 6400, 6466, 6533, 6600, 6666, 6733, 6800, 6866, 6933,
    7000,
  ],
  VALUES_6 = [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
  ],
  VALUES_7 = [
    5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7,
  ],
  VALUES_8 = [
    9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11,
    11, 11, 11, 12, 12, 12,
  ],
  VALUES_9 = [
    82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106,
  ],
  VALUES_10 = [
    2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.3, 2.3, 2.3, 2.3, 2.4, 2.4, 2.4, 2.5, 2.5,
    2.5, 2.5, 2.5, 2.6, 2.6, 2.6, 2.7, 2.7, 2.7, 2.7,
  ],
  VALUES_11 = [
    33, 33, 34, 34, 34, 35, 35, 35, 36, 36, 37, 37, 37, 37, 38, 38, 38, 39, 39,
    39, 39, 40, 40, 40, 41,
  ],
  VALUES_12 = [
    135, 136, 138, 140, 141, 143, 14, 146, 148, 150, 151, 153, 155, 156, 158,
    160, 161, 163, 165, 166, 168, 170, 171, 173, 175,
  ],
  VALUES_13 = [
    5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ],
  VALUES_14 = [
    6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  ],
  VALUES_15 = [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  VALUES_16 = [
    8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  ],
  VALUES_17 = [
    84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
    102, 103, 104, 105, 106, 107, 108,
  ],
  VALUES_18 = [
    88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 106, 107, 108, 109, 110, 111, 112,
  ],
  VALUES_19 = [
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
    109, 110, 111, 112, 113, 114, 115, 116,
  ],
  VALUES_20 = [
    10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 13, 13,
  ],
  VALUES_21 = [
    11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 14, 14,
  ],
  VALUES_22 = [
    5466, 5533, 5600, 5666, 5733, 5800, 5866, 5933, 6000, 6066, 6133, 6200,
    6266, 6333, 6400, 6466, 6533, 6600, 6666, 6733, 6800, 6866, 6933, 7000,
    7066,
  ],
  VALUES_23 = [
    5533, 5600, 5666, 5733, 5800, 5866, 5933, 6000, 6066, 6133, 6200, 6266,
    6333, 6400, 6466, 6533, 6600, 6666, 6733, 6800, 6866, 6933, 7000, 7066,
    7133,
  ],
  VALUES_24 = [
    5600, 5666, 5733, 5800, 5866, 5933, 6000, 6066, 6133, 6200, 6266, 6333,
    6400, 6466, 6533, 6600, 6666, 6733, 6800, 6866, 6933, 7000, 7066, 7133,
    7200,
  ],
  VALUES_25 = [
    2.2, 2.2, 2.3, 2.3, 2.3, 2.3, 2.4, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.6,
    2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8, 2.8, 2.8,
  ],
  VALUES_26 = [
    2.3, 2.3, 2.4, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.6, 2.6, 2.6, 2.7, 2.7,
    2.7, 2.7, 2.8, 2.8, 2.8, 2.8, 2.8, 2.9, 2.9, 2.9,
  ],
  VALUES_27 = [
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 11, 11,
  ],
  VALUES_28 = [
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13,
  ],
  VALUES_29 = [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 11, 11,
  ],
  VALUES_30 = [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    11, 11, 11, 11, 12, 12,
  ],
  VALUES_31 = [
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12,
    12, 12, 12, 12, 13, 13,
  ],
  VALUES_32 = [
    5733, 5800, 5866, 5933, 6000, 6066, 6133, 6200, 6266, 6333, 6400, 6466,
    6533, 6600, 6666, 6733, 6800, 6866, 6933, 7000, 7066, 7133, 7200, 7266,
    7333,
  ],
  VALUES_33 = [
    9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11,
    11, 11, 11, 11, 11, 11,
  ],
  VALUES_34 = [
    10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12,
  ],
  VALUES_35 = [
    11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13,
  ],
  VALUES_36 = [
    40, 40, 40, 41, 41, 41, 42, 42, 42, 43, 43, 43, 44, 44, 44, 45, 45, 45, 46,
    46, 46, 46, 47, 47, 47,
  ],
  VALUES_37 = [
    49, 49, 50, 50, 50, 51, 51, 51, 52, 52, 52, 53, 53, 53, 54, 54, 54, 55, 55,
    55, 55, 56, 56, 56, 57,
  ],
  VALUES_38 = [
    60, 60, 60, 61, 61, 61, 62, 62, 62, 63, 63, 63, 64, 64, 64, 65, 65, 65, 66,
    66, 66, 66, 67, 67, 67,
  ],
  VALUES_39 = [
    315, 316, 318, 320, 321, 323, 325, 326, 328, 330, 331, 333, 335, 336, 338,
    340, 341, 343, 345, 346, 348, 350, 351, 353, 355,
  ],
  VALUES_40 = [
    495, 496, 498, 500, 501, 503, 505, 506, 508, 510, 511, 513, 515, 516, 518,
    520, 521, 523, 525, 526, 528, 530, 531, 533, 535,
  ],
  VALUES_41 = [
    635, 636, 638, 640, 641, 643, 645, 646, 648, 650, 651, 653, 655, 656, 658,
    660, 661, 663, 665, 666, 668, 670, 671, 673, 675,
  ],
  VALUES_42 = [
    17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19,
  ],
  VALUES_43 = [
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20,
  ],
  VALUES_44 = [
    20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 22, 22, 22,
  ],
  VALUES_45 = [
    10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12,
    12, 12, 12, 12, 12, 12,
  ],
  VALUES_46 = [
    11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 14, 14, 14,
  ],
  VALUES_47 = [
    13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    15, 15, 15, 15, 15, 15,
  ],
  VALUES_48 = [
    2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.6, 2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8,
    2.8, 2.8, 2.8, 2.9, 2.9, 2.9, 3.0, 3.0, 3.0, 3.0,
  ],
  VALUES_49 = [
    9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11,
    11, 11, 11, 11,
  ],
  VALUES_50 = [
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 14, 14,
  ],
  VALUES_51 = [
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  ],
  VALUES_52 = [
    9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    11, 11, 11, 11, 11,
  ],
  VALUES_53 = [
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12,
    12, 12, 12, 12, 12, 12,
  ],
  VALUES_54 = [
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  ],
  VALUES_55 = [
    14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 16, 16,
  ],
  VALUES_56 = [
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 14, 14,
  ],
  VALUES_57 = [
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7,
  ],
  VALUES_58 = [
    7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,
  ],
  VALUES_59 = [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10,
  ],
  VALUES_60 = [
    735, 736, 738, 740, 741, 743, 745, 746, 748, 750, 751, 753, 755, 756, 758,
    760, 761, 763, 765, 766, 768, 770, 771, 773, 775,
  ],
  VALUES_61 = [
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13,
  ];

const BOOSTED_VALUES_1 = [
    VALUES_20,
    VALUES_20,
    VALUES_20,
    VALUES_20,
    VALUES_21,
    VALUES_21,
    VALUES_21,
    VALUES_21,
  ],
  BOOSTED_VALUES_2 = [
    VALUES_22,
    VALUES_22,
    VALUES_23,
    VALUES_23,
    VALUES_24,
    VALUES_24,
    VALUES_24,
    VALUES_24,
  ],
  BOOSTED_VALUES_3 = [
    VALUES_17,
    VALUES_17,
    VALUES_18,
    VALUES_18,
    VALUES_19,
    VALUES_19,
    VALUES_19,
    VALUES_19,
  ],
  BOOSTED_VALUES_4 = [
    VALUES_13,
    VALUES_13,
    VALUES_14,
    VALUES_14,
    VALUES_15,
    VALUES_15,
    VALUES_16,
    VALUES_16,
  ],
  BOOSTED_VALUES_5 = [
    VALUES_13,
    VALUES_13,
    VALUES_14,
    VALUES_14,
    VALUES_15,
    VALUES_15,
    VALUES_15,
    VALUES_15,
  ],
  BOOSTED_VALUES_6 = [
    VALUES_10,
    VALUES_10,
    VALUES_25,
    VALUES_25,
    VALUES_26,
    VALUES_26,
    VALUES_26,
    VALUES_26,
  ],
  BOOSTED_VALUES_7 = [
    VALUES_27,
    VALUES_27,
    VALUES_27,
    VALUES_27,
    VALUES_28,
    VALUES_28,
    VALUES_28,
    VALUES_28,
  ],
  BOOSTED_VALUES_8 = [
    VALUES_29,
    VALUES_29,
    VALUES_30,
    VALUES_30,
    VALUES_31,
    VALUES_31,
    VALUES_31,
    VALUES_31,
  ],
  BOOSTED_VALUES_9 = [
    VALUES_23,
    VALUES_23,
    VALUES_24,
    VALUES_24,
    VALUES_32,
    VALUES_32,
    VALUES_32,
    VALUES_32,
  ],
  BOOSTED_VALUES_10 = [
    VALUES_33,
    VALUES_33,
    VALUES_34,
    VALUES_34,
    VALUES_35,
    VALUES_35,
    VALUES_35,
    VALUES_35,
  ],
  BOOSTED_VALUES_11 = [
    VALUES_36,
    VALUES_36,
    VALUES_37,
    VALUES_37,
    VALUES_38,
    VALUES_38,
    VALUES_38,
    VALUES_38,
  ],
  BOOSTED_VALUES_12 = [
    VALUES_39,
    VALUES_39,
    VALUES_40,
    VALUES_40,
    VALUES_41,
    VALUES_41,
    VALUES_41,
    VALUES_41,
  ],
  BOOSTED_VALUES_13 = [
    VALUES_42,
    VALUES_42,
    VALUES_43,
    VALUES_43,
    VALUES_44,
    VALUES_44,
    VALUES_44,
    VALUES_44,
  ],
  BOOSTED_VALUES_14 = [
    VALUES_23,
    VALUES_23,
    VALUES_24,
    VALUES_24,
    VALUES_32,
    VALUES_24,
    VALUES_32,
    VALUES_24,
  ],
  BOOSTED_VALUES_15 = [
    VALUES_45,
    VALUES_45,
    VALUES_46,
    VALUES_46,
    VALUES_47,
    VALUES_47,
    VALUES_47,
    VALUES_47,
  ],
  BOOSTED_VALUES_16 = [
    VALUES_25,
    VALUES_25,
    VALUES_26,
    VALUES_26,
    VALUES_48,
    VALUES_48,
    VALUES_48,
    VALUES_48,
  ],
  BOOSTED_VALUES_17 = [
    VALUES_49,
    VALUES_49,
    VALUES_34,
    VALUES_34,
    VALUES_50,
    VALUES_50,
    VALUES_50,
    VALUES_50,
  ],
  BOOSTED_VALUES_18 = [
    VALUES_51,
    VALUES_51,
    VALUES_52,
    VALUES_52,
    VALUES_53,
    VALUES_53,
    VALUES_53,
    VALUES_53,
  ],
  BOOSTED_VALUES_19 = [
    VALUES_54,
    VALUES_54,
    VALUES_54,
    VALUES_27,
    VALUES_27,
    VALUES_27,
    VALUES_55,
    VALUES_55,
  ],
  BOOSTED_VALUES_20 = [
    VALUES_3,
    VALUES_3,
    VALUES_49,
    VALUES_49,
    VALUES_49,
    VALUES_49,
    VALUES_56,
    VALUES_56,
  ],
  BOOSTED_VALUES_21 = [
    VALUES_23,
    VALUES_23,
    VALUES_24,
    VALUES_24,
    VALUES_24,
    VALUES_24,
    VALUES_24,
    VALUES_24,
  ],
  BOOSTED_VALUES_22 = [
    VALUES_57,
    VALUES_57,
    VALUES_14,
    VALUES_14,
    VALUES_15,
    VALUES_15,
    VALUES_15,
    VALUES_15,
  ],
  BOOSTED_VALUES_23 = [
    VALUES_6,
    VALUES_6,
    VALUES_14,
    VALUES_14,
    VALUES_15,
    VALUES_15,
    VALUES_15,
    VALUES_15,
  ],
  BOOSTED_VALUES_24 = [
    VALUES_7,
    VALUES_7,
    VALUES_58,
    VALUES_58,
    VALUES_59,
    VALUES_59,
    VALUES_59,
    VALUES_59,
  ],
  BOOSTED_VALUES_25 = [
    VALUES_39,
    VALUES_39,
    VALUES_40,
    VALUES_40,
    VALUES_41,
    VALUES_60,
    VALUES_60,
    VALUES_60,
  ],
  BOOSTED_VALUES_26 = [
    VALUES_27,
    VALUES_27,
    VALUES_28,
    VALUES_28,
    VALUES_55,
    VALUES_55,
    VALUES_55,
    VALUES_55,
  ],
  BOOSTED_VALUES_27 = [
    VALUES_49,
    VALUES_49,
    VALUES_34,
    VALUES_34,
    VALUES_56,
    VALUES_56,
    VALUES_56,
    VALUES_56,
  ],
  BOOSTED_VALUES_28 = [
    VALUES_45,
    VALUES_45,
    VALUES_46,
    VALUES_46,
    VALUES_46,
    VALUES_46,
    VALUES_47,
    VALUES_47,
  ],
  BOOSTED_VALUES_29 = [
    VALUES_51,
    VALUES_51,
    VALUES_52,
    VALUES_52,
    VALUES_52,
    VALUES_52,
    VALUES_52,
    VALUES_52,
  ];

const BASE_VALUES = {
  warrior: VALUES_1,
  sura: VALUES_1,
  ninja: VALUES_1,
  shaman: VALUES_1,
  lycan: VALUES_1,
  berserker: VALUES_2,
  antiMagic: VALUES_3,
  haste: VALUES_4,
  drill: VALUES_3,
  restoration: VALUES_5,
  vampirism: VALUES_6,
  spiritualism: VALUES_7,
  bulwark: VALUES_8,
  reflection: VALUES_6,
  yang: VALUES_9,
  range: VALUES_6,
  immortal: VALUES_10,
  panacea: VALUES_11,
  masterBrewer: VALUES_3,
  monster: VALUES_2,
  eagleEye: VALUES_6,
  drain: VALUES_6,
  feather: VALUES_12,
};

const BOOSTED_VALUES = {
  monkey: {
    warrior: BOOSTED_VALUES_1,
    sura: BOOSTED_VALUES_1,
    restoration: BOOSTED_VALUES_2,
    yang: BOOSTED_VALUES_3,
    range: BOOSTED_VALUES_4,
  },
  spider: {
    restoration: BOOSTED_VALUES_2,
    reflection: BOOSTED_VALUES_4,
    range: BOOSTED_VALUES_5,
    immortal: BOOSTED_VALUES_6,
  },
  razador: {
    ninja: BOOSTED_VALUES_1,
    berserker: BOOSTED_VALUES_7,
    drill: BOOSTED_VALUES_8,
    restoration: BOOSTED_VALUES_9,
    range: BOOSTED_VALUES_4,
  },
  nemere: {
    shaman: BOOSTED_VALUES_1,
    antiMagic: BOOSTED_VALUES_10,
    restoration: BOOSTED_VALUES_2,
    range: BOOSTED_VALUES_4,
    panacea: BOOSTED_VALUES_11,
    feather: BOOSTED_VALUES_12,
  },
  dragonette: {
    ninja: BOOSTED_VALUES_1,
    berserker: BOOSTED_VALUES_7,
    drill: BOOSTED_VALUES_8,
    restoration: BOOSTED_VALUES_9,
    range: BOOSTED_VALUES_4,
  },
  meley: {
    haste: BOOSTED_VALUES_13,
    restoration: BOOSTED_VALUES_14,
    bulwark: BOOSTED_VALUES_15,
    immortal: BOOSTED_VALUES_16,
    panacea: BOOSTED_VALUES_11,
    masterBrewer: BOOSTED_VALUES_17,
    monster: BOOSTED_VALUES_18,
  },
  azrael: {
    restoration: BOOSTED_VALUES_2,
    reflection: BOOSTED_VALUES_4,
    range: BOOSTED_VALUES_5,
    immortal: BOOSTED_VALUES_6,
  },
  executor: {
    berserker: BOOSTED_VALUES_19,
    antiMagic: BOOSTED_VALUES_20,
    drill: BOOSTED_VALUES_8,
    restoration: BOOSTED_VALUES_21,
    range: BOOSTED_VALUES_22,
  },
  baashido: {
    lycan: BOOSTED_VALUES_1,
    berserker: BOOSTED_VALUES_7,
    drill: BOOSTED_VALUES_8,
    vampirism: BOOSTED_VALUES_23,
    spiritualism: BOOSTED_VALUES_24,
    yang: BOOSTED_VALUES_3,
    feather: BOOSTED_VALUES_25,
  },
  nessie: {
    haste: BOOSTED_VALUES_13,
    restoration: BOOSTED_VALUES_14,
    bulwark: BOOSTED_VALUES_15,
    immortal: BOOSTED_VALUES_16,
    panacea: BOOSTED_VALUES_11,
    masterBrewer: BOOSTED_VALUES_17,
    monster: BOOSTED_VALUES_18,
  },
  exedyar: {
    lycan: BOOSTED_VALUES_1,
    berserker: BOOSTED_VALUES_7,
    drill: BOOSTED_VALUES_8,
    vampirism: BOOSTED_VALUES_23,
    spiritualism: BOOSTED_VALUES_24,
    yang: BOOSTED_VALUES_3,
    feather: BOOSTED_VALUES_25,
  },
  alastor: {
    berserker: BOOSTED_VALUES_26,
    antiMagic: BOOSTED_VALUES_27,
    drill: BOOSTED_VALUES_8,
    bulwark: BOOSTED_VALUES_28,
    range: BOOSTED_VALUES_22,
    monster: BOOSTED_VALUES_29,
  },
  boss: {
    berserker: BOOSTED_VALUES_26,
    antiMagic: BOOSTED_VALUES_27,
    drill: BOOSTED_VALUES_8,
    bulwark: BOOSTED_VALUES_28,
    range: BOOSTED_VALUES_22,
    monster: BOOSTED_VALUES_29,
  },
};

function insertTh(row, value) {
  const th = document.createElement("th");
  th.textContent = value;
  row.appendChild(th);
}

// function editTable(petValues, formData) {
//   petValues.innerHTML = "";

//   const header = petValues.createTHead();
//   const body = petValues.createTBody();
//   const headerRow = header.insertRow(0);
//   const level = formData.get("level");
//   const type = formData.get("type");

//   insertTh(headerRow, "");

//   Object.values(PETS).forEach((pet) => {
//     insertTh(headerRow, PETS_MAPPING[pet]);
//   });

//   Object.entries(BASE_VALUES).forEach(([skill, values]) => {
//     const bodyRow = body.insertRow();
//     insertTh(bodyRow, SKILLS_MAPPING[skill]);

//     Object.values(PETS).forEach((pet) => {
//       const cell = bodyRow.insertCell();
//       const boosted_values = BOOSTED_VALUES[pet][skill];

//       if (boosted_values) {
//         cell.textContent = boosted_values[type][level];
//       } else {
//         cell.textContent = values[level];
//       }
//     });
//   });
// }

function editTable(petValues, formData) {
  petValues.innerHTML = "";

  const header = petValues.createTHead();
  const body = petValues.createTBody();
  const headerRow = header.insertRow(0);
  const skill = formData.get("skill");
  const type = formData.get("type");

  insertTh(headerRow, "");

  Object.values(PETS).forEach((pet) => {
    insertTh(headerRow, PETS_MAPPING[pet]);
  });

  for (let petLevel = 81; petLevel <= 105; petLevel++) {
    const bodyRow = body.insertRow();
    insertTh(bodyRow, petLevel);

    Object.values(PETS).forEach((pet) => {
      const cell = bodyRow.insertCell();
      const boosted_values = BOOSTED_VALUES[pet][skill];

      if (boosted_values) {
        cell.textContent = boosted_values[type][petLevel - 81];
        cell.style.backgroundColor = "rgba(0, 0, 0, .1)";
      } else {
        cell.textContent = BASE_VALUES[skill][petLevel - 81];
      }
    });
  }
}

function main() {
  const editForm = document.getElementById("edit-table"),
    petValues = document.getElementById("pet-values");

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    editTable(petValues, formData);
  });
}

main();