import { Champion } from '../types'

/**
 * ŞAMPİYON BİLGİ BANKASI
 * 
 * Data Dragon'dan otomatik oluşturuldu.
 * Toplam 166 şampiyon.
 * 
 * NOT: Sinerji ve counter verileri popüler şampiyonlar için manuel eklendi.
 * Diğerleri için temel arketip bazlı öneri yapılır.
 */

export const CHAMPION_KNOWLEDGE_BASE: Champion[] = [
  {
    "id": 266,
    "name": "Aatrox",
    "displayName": "Aatrox",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.678250073993484,
      "winRate": 50.318180266959146,
      "banRate": 9.416432459502477,
      "popularity": 2
    }
  },
  {
    "id": 103,
    "name": "Ahri",
    "displayName": "Ahri",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Assassin"
    ],
    "damageType": "Magic",
    "synergies": [
      {
        "championId": 254,
        "championName": "Vi",
        "reason": "Vi sabitleme + Ahri combo",
        "synergyScore": 85
      },
      {
        "championId": 54,
        "championName": "Malphite",
        "reason": "Malphite R sonrası tüm skillshot garanti",
        "synergyScore": 80
      }
    ],
    "counters": [
      {
        "championId": 238,
        "championName": "Zed",
        "reason": "Ahri R ile Zed ultisinden kaçabilir",
        "counterScore": 65
      }
    ],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.1068785825166008,
      "winRate": 53.404925651222406,
      "banRate": 8.668191706118034,
      "popularity": 9
    }
  },
  {
    "id": 84,
    "name": "Akali",
    "displayName": "Akali",
    "role": [
      "Mid",
      "Top"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.22851733400741,
      "winRate": 50.08412418991855,
      "banRate": 8.060710274662508,
      "popularity": 1
    }
  },
  {
    "id": 166,
    "name": "Akshan",
    "displayName": "Akshan",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 8.506950805614505,
      "winRate": 52.980396312661014,
      "banRate": 0.3058072768549458,
      "popularity": 4
    }
  },
  {
    "id": 12,
    "name": "Alistar",
    "displayName": "Alistar",
    "role": [
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 7.8275876068433305,
      "winRate": 49.3080189327961,
      "banRate": 1.4949851622750154,
      "popularity": 6
    }
  },
  {
    "id": 32,
    "name": "Amumu",
    "displayName": "Amumu",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame"
    ],
    "proData": {
      "pickRate": 3.9641987298892483,
      "winRate": 50.722489966018266,
      "banRate": 3.508199511017156,
      "popularity": 8
    }
  },
  {
    "id": 34,
    "name": "Anivia",
    "displayName": "Anivia",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 16.89692825252918,
      "winRate": 50.2081783659679,
      "banRate": 7.851233971143101,
      "popularity": 5
    }
  },
  {
    "id": 1,
    "name": "Annie",
    "displayName": "Annie",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 5.839140532463493,
      "winRate": 52.95366660911206,
      "banRate": 6.227510039218447,
      "popularity": 1
    }
  },
  {
    "id": 523,
    "name": "Aphelios",
    "displayName": "Aphelios",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 5.590980161962062,
      "winRate": 49.59084209909565,
      "banRate": 5.886145718510047,
      "popularity": 7
    }
  },
  {
    "id": 22,
    "name": "Ashe",
    "displayName": "Ashe",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 14.556271330814312,
      "winRate": 48.85103797207812,
      "banRate": 2.0522591776787547,
      "popularity": 1
    }
  },
  {
    "id": 136,
    "name": "AurelionSol",
    "displayName": "Aurelion Sol",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 14.418334424280049,
      "winRate": 48.24971636736008,
      "banRate": 7.900304884679694,
      "popularity": 9
    }
  },
  {
    "id": 268,
    "name": "Azir",
    "displayName": "Azir",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 5.870501542327589,
      "winRate": 50.72250931380362,
      "banRate": 2.8956848197826823,
      "popularity": 7
    }
  },
  {
    "id": 432,
    "name": "Bard",
    "displayName": "Bard",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 13.440769569174348,
      "winRate": 50.40878909752148,
      "banRate": 9.08045685826253,
      "popularity": 6
    }
  },
  {
    "id": 200,
    "name": "Belveth",
    "displayName": "Bel'Veth",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 8.815262565150448,
      "winRate": 51.08354221020388,
      "banRate": 7.427420960247382,
      "popularity": 5
    }
  },
  {
    "id": 53,
    "name": "Blitzcrank",
    "displayName": "Blitzcrank",
    "role": [
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.7203820582433025,
      "winRate": 48.71020552237096,
      "banRate": 0.5858901090591329,
      "popularity": 3
    }
  },
  {
    "id": 63,
    "name": "Brand",
    "displayName": "Brand",
    "role": [
      "Mid",
      "Support"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 9.965702656049297,
      "winRate": 48.36118612251437,
      "banRate": 4.971723518635374,
      "popularity": 1
    }
  },
  {
    "id": 201,
    "name": "Braum",
    "displayName": "Braum",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Tank",
      "Frontline"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 2.393088158991274,
      "winRate": 48.7372671773766,
      "banRate": 0.7420421170264402,
      "popularity": 1
    }
  },
  {
    "id": 233,
    "name": "Briar",
    "displayName": "Briar",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 8.121788874372388,
      "winRate": 49.38219260128306,
      "banRate": 4.328952116514655,
      "popularity": 4
    }
  },
  {
    "id": 51,
    "name": "Caitlyn",
    "displayName": "Caitlyn",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 6.346904911450956,
      "winRate": 48.49875144762008,
      "banRate": 0.22266907084940168,
      "popularity": 10
    }
  },
  {
    "id": 164,
    "name": "Camille",
    "displayName": "Camille",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.198287840100978,
      "winRate": 51.16867677565151,
      "banRate": 1.9199799825281993,
      "popularity": 8
    }
  },
  {
    "id": 69,
    "name": "Cassiopeia",
    "displayName": "Cassiopeia",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 9.849514103780338,
      "winRate": 49.6329824942641,
      "banRate": 7.112477376644948,
      "popularity": 10
    }
  },
  {
    "id": 31,
    "name": "Chogath",
    "displayName": "Cho'Gath",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame"
    ],
    "proData": {
      "pickRate": 15.055807216417577,
      "winRate": 50.551689365750164,
      "banRate": 8.714720518735422,
      "popularity": 9
    }
  },
  {
    "id": 42,
    "name": "Corki",
    "displayName": "Corki",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 2.8078885447733066,
      "winRate": 48.36786234533601,
      "banRate": 1.7477013858669999,
      "popularity": 9
    }
  },
  {
    "id": 122,
    "name": "Darius",
    "displayName": "Darius",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.1406259003085895,
      "winRate": 48.830956072209105,
      "banRate": 2.3068621612500495,
      "popularity": 3
    }
  },
  {
    "id": 131,
    "name": "Diana",
    "displayName": "Diana",
    "role": [
      "Jungle",
      "Mid"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 15.060245452030088,
      "winRate": 52.12640559713982,
      "banRate": 4.5369960126084035,
      "popularity": 3
    }
  },
  {
    "id": 119,
    "name": "Draven",
    "displayName": "Draven",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 15.418844349351717,
      "winRate": 51.84877358675992,
      "banRate": 3.8761212027680836,
      "popularity": 4
    }
  },
  {
    "id": 36,
    "name": "DrMundo",
    "displayName": "Dr. Mundo",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.951427821046682,
      "winRate": 51.744172992349945,
      "banRate": 5.9483820209305005,
      "popularity": 5
    }
  },
  {
    "id": 245,
    "name": "Ekko",
    "displayName": "Ekko",
    "role": [
      "Jungle",
      "Mid"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 14.714194955589438,
      "winRate": 48.58619118036046,
      "banRate": 1.084612432088241,
      "popularity": 8
    }
  },
  {
    "id": 60,
    "name": "Elise",
    "displayName": "Elise",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Mage",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.54366671436027,
      "winRate": 48.03356381413795,
      "banRate": 6.3753110598691,
      "popularity": 10
    }
  },
  {
    "id": 28,
    "name": "Evelynn",
    "displayName": "Evelynn",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.8711426081972284,
      "winRate": 52.43241503719505,
      "banRate": 0.4603024946689871,
      "popularity": 6
    }
  },
  {
    "id": 81,
    "name": "Ezreal",
    "displayName": "Ezreal",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 10.181746078446155,
      "winRate": 53.11206640548223,
      "banRate": 5.5615125590742975,
      "popularity": 2
    }
  },
  {
    "id": 9,
    "name": "Fiddlesticks",
    "displayName": "Fiddlesticks",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 15.475161048279578,
      "winRate": 48.29173619242718,
      "banRate": 1.421688561935095,
      "popularity": 1
    }
  },
  {
    "id": 114,
    "name": "Fiora",
    "displayName": "Fiora",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.861397037249683,
      "winRate": 51.59574101656731,
      "banRate": 1.0787149618333136,
      "popularity": 2
    }
  },
  {
    "id": 105,
    "name": "Fizz",
    "displayName": "Fizz",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.418099210373303,
      "winRate": 48.33140445366587,
      "banRate": 6.355928805735442,
      "popularity": 2
    }
  },
  {
    "id": 3,
    "name": "Galio",
    "displayName": "Galio",
    "role": [
      "Mid",
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.566265372604092,
      "winRate": 53.597605528985405,
      "banRate": 0.7444023547619549,
      "popularity": 7
    }
  },
  {
    "id": 41,
    "name": "Gangplank",
    "displayName": "Gangplank",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 10.182930126965406,
      "winRate": 53.84065380525134,
      "banRate": 1.1633174835074889,
      "popularity": 4
    }
  },
  {
    "id": 86,
    "name": "Garen",
    "displayName": "Garen",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 3.5365112841007478,
      "winRate": 48.175803047327555,
      "banRate": 4.997675876546179,
      "popularity": 2
    }
  },
  {
    "id": 150,
    "name": "Gnar",
    "displayName": "Gnar",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 11.97227413024821,
      "winRate": 53.106301012736374,
      "banRate": 0.2062218946352612,
      "popularity": 6
    }
  },
  {
    "id": 79,
    "name": "Gragas",
    "displayName": "Gragas",
    "role": [
      "Jungle",
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 7.432404562029312,
      "winRate": 51.29517199133877,
      "banRate": 9.935832239962783,
      "popularity": 3
    }
  },
  {
    "id": 104,
    "name": "Graves",
    "displayName": "Graves",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 6.122289729301462,
      "winRate": 52.293429697329394,
      "banRate": 5.7654790716674675,
      "popularity": 1
    }
  },
  {
    "id": 887,
    "name": "Gwen",
    "displayName": "Gwen",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.22223868288836,
      "winRate": 48.23389554428228,
      "banRate": 4.357934929996459,
      "popularity": 8
    }
  },
  {
    "id": 120,
    "name": "Hecarim",
    "displayName": "Hecarim",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 8.56910479862638,
      "winRate": 49.56970991560515,
      "banRate": 7.3598522625285145,
      "popularity": 2
    }
  },
  {
    "id": 74,
    "name": "Heimerdinger",
    "displayName": "Heimerdinger",
    "role": [
      "Mid",
      "Top"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 7.0288160826806045,
      "winRate": 51.76746427944806,
      "banRate": 4.365617757121325,
      "popularity": 4
    }
  },
  {
    "id": 910,
    "name": "Hwei",
    "displayName": "Hwei",
    "role": [
      "Mid",
      "Support"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 5.476656165079631,
      "winRate": 52.19979916717651,
      "banRate": 7.837006155248298,
      "popularity": 8
    }
  },
  {
    "id": 420,
    "name": "Illaoi",
    "displayName": "Illaoi",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.101511046550632,
      "winRate": 53.855515552413394,
      "banRate": 4.921614713791347,
      "popularity": 9
    }
  },
  {
    "id": 39,
    "name": "Irelia",
    "displayName": "Irelia",
    "role": [
      "Top",
      "Mid"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 11.477319198384027,
      "winRate": 48.68509728023343,
      "banRate": 8.655349468316462,
      "popularity": 8
    }
  },
  {
    "id": 427,
    "name": "Ivern",
    "displayName": "Ivern",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 10.279716205530935,
      "winRate": 53.90134964395476,
      "banRate": 9.370996474192452,
      "popularity": 1
    }
  },
  {
    "id": 40,
    "name": "Janna",
    "displayName": "Janna",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 2.1394997605102466,
      "winRate": 48.283592485938115,
      "banRate": 9.486201985858926,
      "popularity": 2
    }
  },
  {
    "id": 59,
    "name": "JarvanIV",
    "displayName": "Jarvan IV",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.900409039541643,
      "winRate": 50.77350843777902,
      "banRate": 1.666904571226937,
      "popularity": 3
    }
  },
  {
    "id": 24,
    "name": "Jax",
    "displayName": "Jax",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.20979588386443,
      "winRate": 53.82070139318587,
      "banRate": 9.368981987908558,
      "popularity": 6
    }
  },
  {
    "id": 126,
    "name": "Jayce",
    "displayName": "Jayce",
    "role": [
      "Top",
      "Mid"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.511929046198594,
      "winRate": 52.94632025818024,
      "banRate": 2.886046364685495,
      "popularity": 10
    }
  },
  {
    "id": 202,
    "name": "Jhin",
    "displayName": "Jhin",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 4.941466999893452,
      "winRate": 53.90756904066532,
      "banRate": 7.6065517055249865,
      "popularity": 10
    }
  },
  {
    "id": 222,
    "name": "Jinx",
    "displayName": "Jinx",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 7.403571817060589,
      "winRate": 50.66344343578445,
      "banRate": 0.9611251438347668,
      "popularity": 5
    }
  },
  {
    "id": 145,
    "name": "Kaisa",
    "displayName": "Kai'Sa",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 4.979260568836026,
      "winRate": 50.9878915337123,
      "banRate": 0.9149209913272704,
      "popularity": 10
    }
  },
  {
    "id": 429,
    "name": "Kalista",
    "displayName": "Kalista",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 4.763113096022426,
      "winRate": 53.6124581231867,
      "banRate": 8.9021457905302,
      "popularity": 3
    }
  },
  {
    "id": 43,
    "name": "Karma",
    "displayName": "Karma",
    "role": [
      "Support",
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 12.942381718038103,
      "winRate": 48.16693749197875,
      "banRate": 6.63211593595372,
      "popularity": 9
    }
  },
  {
    "id": 30,
    "name": "Karthus",
    "displayName": "Karthus",
    "role": [
      "Jungle",
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 10.37190885820988,
      "winRate": 50.96287684697473,
      "banRate": 1.598028952198991,
      "popularity": 1
    }
  },
  {
    "id": 38,
    "name": "Kassadin",
    "displayName": "Kassadin",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 9.837496361749908,
      "winRate": 51.56054241829226,
      "banRate": 6.9500751968757175,
      "popularity": 7
    }
  },
  {
    "id": 55,
    "name": "Katarina",
    "displayName": "Katarina",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 15.190903592866462,
      "winRate": 48.464838511970626,
      "banRate": 9.664094474506737,
      "popularity": 5
    }
  },
  {
    "id": 10,
    "name": "Kayle",
    "displayName": "Kayle",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 4.572373766630692,
      "winRate": 53.78262854139755,
      "banRate": 6.91281369728758,
      "popularity": 2
    }
  },
  {
    "id": 141,
    "name": "Kayn",
    "displayName": "Kayn",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 5.23239375404485,
      "winRate": 52.015614869347104,
      "banRate": 3.117404969848785,
      "popularity": 5
    }
  },
  {
    "id": 85,
    "name": "Kennen",
    "displayName": "Kennen",
    "role": [
      "Top"
    ],
    "archetype": [
      "Mage",
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 4.4306036254642285,
      "winRate": 52.291219648489296,
      "banRate": 8.110574864800688,
      "popularity": 5
    }
  },
  {
    "id": 121,
    "name": "Khazix",
    "displayName": "Kha'Zix",
    "role": [
      "Mid",
      "Jungle"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 3.0104143820661795,
      "winRate": 51.86296876235311,
      "banRate": 2.3902017291275324,
      "popularity": 4
    }
  },
  {
    "id": 203,
    "name": "Kindred",
    "displayName": "Kindred",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 4.994325940781032,
      "winRate": 49.18351248163668,
      "banRate": 8.854490387197798,
      "popularity": 10
    }
  },
  {
    "id": 240,
    "name": "Kled",
    "displayName": "Kled",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.215464234468214,
      "winRate": 52.34986587239211,
      "banRate": 8.854098469430738,
      "popularity": 1
    }
  },
  {
    "id": 96,
    "name": "KogMaw",
    "displayName": "Kog'Maw",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 4.612099283519898,
      "winRate": 48.813039097869456,
      "banRate": 3.681221381296369,
      "popularity": 1
    }
  },
  {
    "id": 897,
    "name": "KSante",
    "displayName": "K'Sante",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 11.401745152826173,
      "winRate": 48.45925405419486,
      "banRate": 1.6575510497598844,
      "popularity": 1
    }
  },
  {
    "id": 7,
    "name": "Leblanc",
    "displayName": "LeBlanc",
    "role": [
      "Mid",
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 15.719237699039299,
      "winRate": 51.01261524519191,
      "banRate": 2.5941910258000034,
      "popularity": 2
    }
  },
  {
    "id": 64,
    "name": "LeeSin",
    "displayName": "Lee Sin",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [
      {
        "championId": 157,
        "championName": "Yasuo",
        "reason": "Lee R havaya kaldırır",
        "synergyScore": 95
      },
      {
        "championId": 92,
        "championName": "Riven",
        "reason": "Erken oyun baskı ikilisi",
        "synergyScore": 70
      }
    ],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 7.312830574346701,
      "winRate": 49.71484082780766,
      "banRate": 0.5215777403738264,
      "popularity": 6
    }
  },
  {
    "id": 89,
    "name": "Leona",
    "displayName": "Leona",
    "role": [
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Mixed",
    "synergies": [
      {
        "championId": 21,
        "championName": "MissFortune",
        "reason": "Leona CC + MF ulti",
        "synergyScore": 90
      },
      {
        "championId": 202,
        "championName": "Jhin",
        "reason": "CC zinciri",
        "synergyScore": 85
      }
    ],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 14.486094773629672,
      "winRate": 49.72057488053268,
      "banRate": 8.630981745766215,
      "popularity": 5
    }
  },
  {
    "id": 876,
    "name": "Lillia",
    "displayName": "Lillia",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.90515234204589,
      "winRate": 52.00573838759328,
      "banRate": 0.8436074902466828,
      "popularity": 5
    }
  },
  {
    "id": 127,
    "name": "Lissandra",
    "displayName": "Lissandra",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 13.68999265747552,
      "winRate": 53.320857739739246,
      "banRate": 9.848605210871435,
      "popularity": 8
    }
  },
  {
    "id": 236,
    "name": "Lucian",
    "displayName": "Lucian",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 7.277447183952719,
      "winRate": 48.33985560246256,
      "banRate": 5.011942185807072,
      "popularity": 1
    }
  },
  {
    "id": 117,
    "name": "Lulu",
    "displayName": "Lulu",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 10.575558826116353,
      "winRate": 48.07321041517919,
      "banRate": 4.05791278297672,
      "popularity": 3
    }
  },
  {
    "id": 99,
    "name": "Lux",
    "displayName": "Lux",
    "role": [
      "Mid",
      "Support"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 16.07032995568052,
      "winRate": 49.21361124577731,
      "banRate": 7.804850359249638,
      "popularity": 2
    }
  },
  {
    "id": 54,
    "name": "Malphite",
    "displayName": "Malphite",
    "role": [
      "Top",
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [
      {
        "championId": 157,
        "championName": "Yasuo",
        "reason": "Wombo combo potansiyeli",
        "synergyScore": 100
      },
      {
        "championId": 222,
        "championName": "Jinx",
        "reason": "Engage + hypercarry",
        "synergyScore": 75
      },
      {
        "championId": 145,
        "championName": "Kaisa",
        "reason": "Malphite R + Kaisa R followup",
        "synergyScore": 80
      }
    ],
    "counters": [
      {
        "championId": 122,
        "championName": "Darius",
        "reason": "Full AD = Malphite zırhı etkili",
        "counterScore": 80
      },
      {
        "championId": 92,
        "championName": "Riven",
        "reason": "Full AD + Malphite AS slow",
        "counterScore": 85
      },
      {
        "championId": 23,
        "championName": "Tryndamere",
        "reason": "AD + AS slow = Trynd işlevsiz",
        "counterScore": 90
      },
      {
        "championId": 157,
        "championName": "Yasuo",
        "reason": "AD + Malphite zırhı",
        "counterScore": 75
      }
    ],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.258149477789285,
      "winRate": 52.25670963926795,
      "banRate": 5.915461562833714,
      "popularity": 3
    }
  },
  {
    "id": 90,
    "name": "Malzahar",
    "displayName": "Malzahar",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Assassin"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 3.3339514681688094,
      "winRate": 52.95383190882617,
      "banRate": 3.8591488046609768,
      "popularity": 2
    }
  },
  {
    "id": 57,
    "name": "Maokai",
    "displayName": "Maokai",
    "role": [
      "Top",
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame"
    ],
    "proData": {
      "pickRate": 6.113544849996639,
      "winRate": 51.54721852094319,
      "banRate": 3.5378343425084613,
      "popularity": 3
    }
  },
  {
    "id": 11,
    "name": "MasterYi",
    "displayName": "Master Yi",
    "role": [
      "Mid",
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.443465743744438,
      "winRate": 53.04959583341668,
      "banRate": 1.3727530814314548,
      "popularity": 4
    }
  },
  {
    "id": 902,
    "name": "Milio",
    "displayName": "Milio",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 7.23425796008058,
      "winRate": 53.557088593016324,
      "banRate": 2.442538192442112,
      "popularity": 1
    }
  },
  {
    "id": 21,
    "name": "MissFortune",
    "displayName": "Miss Fortune",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 2.6344265338281674,
      "winRate": 52.29013787851591,
      "banRate": 0.36293471498973773,
      "popularity": 3
    }
  },
  {
    "id": 62,
    "name": "MonkeyKing",
    "displayName": "Wukong",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.712466807292387,
      "winRate": 52.26858506311493,
      "banRate": 7.373561793730385,
      "popularity": 9
    }
  },
  {
    "id": 82,
    "name": "Mordekaiser",
    "displayName": "Mordekaiser",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.267965258302112,
      "winRate": 52.409152868087844,
      "banRate": 4.86471199938503,
      "popularity": 1
    }
  },
  {
    "id": 25,
    "name": "Morgana",
    "displayName": "Morgana",
    "role": [
      "Support",
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 5.699342524064198,
      "winRate": 53.00796452275342,
      "banRate": 9.570976642622789,
      "popularity": 6
    }
  },
  {
    "id": 950,
    "name": "Naafiri",
    "displayName": "Naafiri",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 3.9968283092000694,
      "winRate": 49.11858598506122,
      "banRate": 8.78419271345853,
      "popularity": 3
    }
  },
  {
    "id": 267,
    "name": "Nami",
    "displayName": "Nami",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 6.289904679058887,
      "winRate": 49.05718113118904,
      "banRate": 4.215672089598826,
      "popularity": 10
    }
  },
  {
    "id": 75,
    "name": "Nasus",
    "displayName": "Nasus",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.756013398914343,
      "winRate": 48.429027849327184,
      "banRate": 0.7986217848014809,
      "popularity": 1
    }
  },
  {
    "id": 111,
    "name": "Nautilus",
    "displayName": "Nautilus",
    "role": [
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 16.200324282318366,
      "winRate": 53.96334459292852,
      "banRate": 7.851799452692097,
      "popularity": 4
    }
  },
  {
    "id": 518,
    "name": "Neeko",
    "displayName": "Neeko",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 2.953712272141063,
      "winRate": 50.39811953930095,
      "banRate": 7.414307351452141,
      "popularity": 10
    }
  },
  {
    "id": 76,
    "name": "Nidalee",
    "displayName": "Nidalee",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.4344755268301412,
      "winRate": 52.32966709389202,
      "banRate": 8.567833176488975,
      "popularity": 4
    }
  },
  {
    "id": 895,
    "name": "Nilah",
    "displayName": "Nilah",
    "role": [
      "Mid",
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.64507932648483,
      "winRate": 52.16150904363459,
      "banRate": 9.62335082550599,
      "popularity": 6
    }
  },
  {
    "id": 56,
    "name": "Nocturne",
    "displayName": "Nocturne",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.546028274483515,
      "winRate": 50.612447275809544,
      "banRate": 5.897785433581126,
      "popularity": 10
    }
  },
  {
    "id": 20,
    "name": "Nunu",
    "displayName": "Nunu & Willump",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 13.15224021610366,
      "winRate": 53.094035300122954,
      "banRate": 5.085712546662711,
      "popularity": 8
    }
  },
  {
    "id": 2,
    "name": "Olaf",
    "displayName": "Olaf",
    "role": [
      "Top",
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.317627852195592,
      "winRate": 50.01947145464307,
      "banRate": 0.7891981563434758,
      "popularity": 3
    }
  },
  {
    "id": 61,
    "name": "Orianna",
    "displayName": "Orianna",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 16.63257608753649,
      "winRate": 50.928275449596235,
      "banRate": 1.5170820225508774,
      "popularity": 3
    }
  },
  {
    "id": 516,
    "name": "Ornn",
    "displayName": "Ornn",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 5.638511953003882,
      "winRate": 52.6020010112612,
      "banRate": 9.302668666486865,
      "popularity": 6
    }
  },
  {
    "id": 80,
    "name": "Pantheon",
    "displayName": "Pantheon",
    "role": [
      "Top",
      "Mid",
      "Support"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 8.14687562106256,
      "winRate": 52.01248613014211,
      "banRate": 8.83085028171407,
      "popularity": 1
    }
  },
  {
    "id": 78,
    "name": "Poppy",
    "displayName": "Poppy",
    "role": [
      "Jungle",
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.856665245649774,
      "winRate": 48.1756572605244,
      "banRate": 8.722792125667244,
      "popularity": 9
    }
  },
  {
    "id": 555,
    "name": "Pyke",
    "displayName": "Pyke",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 5.285976091239773,
      "winRate": 48.02564539324942,
      "banRate": 3.7233667372097967,
      "popularity": 6
    }
  },
  {
    "id": 246,
    "name": "Qiyana",
    "displayName": "Qiyana",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.31376152375574,
      "winRate": 53.53664002663507,
      "banRate": 1.9649343865256408,
      "popularity": 5
    }
  },
  {
    "id": 133,
    "name": "Quinn",
    "displayName": "Quinn",
    "role": [
      "Top"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 5.714302467109772,
      "winRate": 50.769963189466324,
      "banRate": 4.871701253512153,
      "popularity": 2
    }
  },
  {
    "id": 497,
    "name": "Rakan",
    "displayName": "Rakan",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 7.39540690489575,
      "winRate": 48.05841583819991,
      "banRate": 0.31650941092290275,
      "popularity": 3
    }
  },
  {
    "id": 33,
    "name": "Rammus",
    "displayName": "Rammus",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.03657329198248,
      "winRate": 48.57608309003589,
      "banRate": 6.240655389205156,
      "popularity": 6
    }
  },
  {
    "id": 421,
    "name": "RekSai",
    "displayName": "Rek'Sai",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.233409655566529,
      "winRate": 48.179219966621304,
      "banRate": 3.8737765074503305,
      "popularity": 9
    }
  },
  {
    "id": 526,
    "name": "Rell",
    "displayName": "Rell",
    "role": [
      "Support"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 7.340181435604442,
      "winRate": 48.29859174855314,
      "banRate": 8.411929014959018,
      "popularity": 7
    }
  },
  {
    "id": 888,
    "name": "Renata",
    "displayName": "Renata Glasc",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 11.479709544990445,
      "winRate": 53.16600383442325,
      "banRate": 4.3971586842045625,
      "popularity": 7
    }
  },
  {
    "id": 58,
    "name": "Renekton",
    "displayName": "Renekton",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.903283731441512,
      "winRate": 53.97690117030412,
      "banRate": 1.1572192006955895,
      "popularity": 6
    }
  },
  {
    "id": 107,
    "name": "Rengar",
    "displayName": "Rengar",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 3.3852528100421777,
      "winRate": 53.68688064642225,
      "banRate": 2.3174117427826135,
      "popularity": 3
    }
  },
  {
    "id": 92,
    "name": "Riven",
    "displayName": "Riven",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.953239558960706,
      "winRate": 49.856661651208334,
      "banRate": 1.329983741499725,
      "popularity": 10
    }
  },
  {
    "id": 68,
    "name": "Rumble",
    "displayName": "Rumble",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.119606646545611,
      "winRate": 51.42844123722232,
      "banRate": 8.570317537764726,
      "popularity": 8
    }
  },
  {
    "id": 13,
    "name": "Ryze",
    "displayName": "Ryze",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 8.221616318253087,
      "winRate": 48.439917903093104,
      "banRate": 1.1162142663806063,
      "popularity": 3
    }
  },
  {
    "id": 360,
    "name": "Samira",
    "displayName": "Samira",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 7.763423939108833,
      "winRate": 52.66073843073738,
      "banRate": 7.637726548158598,
      "popularity": 8
    }
  },
  {
    "id": 113,
    "name": "Sejuani",
    "displayName": "Sejuani",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 13.72665652249917,
      "winRate": 51.75955965514797,
      "banRate": 4.921676021556878,
      "popularity": 1
    }
  },
  {
    "id": 235,
    "name": "Senna",
    "displayName": "Senna",
    "role": [
      "Support",
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 4.884807528359933,
      "winRate": 52.17379082111739,
      "banRate": 4.94910000643684,
      "popularity": 7
    }
  },
  {
    "id": 147,
    "name": "Seraphine",
    "displayName": "Seraphine",
    "role": [
      "Support",
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 5.752513391545622,
      "winRate": 53.5696270583617,
      "banRate": 8.208398220796,
      "popularity": 3
    }
  },
  {
    "id": 875,
    "name": "Sett",
    "displayName": "Sett",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 14.467953915659923,
      "winRate": 49.06718072995407,
      "banRate": 5.533061571843783,
      "popularity": 4
    }
  },
  {
    "id": 35,
    "name": "Shaco",
    "displayName": "Shaco",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.724341380240158,
      "winRate": 52.203372969333365,
      "banRate": 8.577903359099661,
      "popularity": 4
    }
  },
  {
    "id": 98,
    "name": "Shen",
    "displayName": "Shen",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 13.437570965216079,
      "winRate": 49.848477501838346,
      "banRate": 4.578490223941445,
      "popularity": 7
    }
  },
  {
    "id": 102,
    "name": "Shyvana",
    "displayName": "Shyvana",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 3.0918661335075552,
      "winRate": 53.09306386384125,
      "banRate": 6.563979852479516,
      "popularity": 7
    }
  },
  {
    "id": 27,
    "name": "Singed",
    "displayName": "Singed",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 10.235664667792705,
      "winRate": 48.20040330511174,
      "banRate": 0.4021114776309065,
      "popularity": 8
    }
  },
  {
    "id": 14,
    "name": "Sion",
    "displayName": "Sion",
    "role": [
      "Top"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.967291729130771,
      "winRate": 53.89154009837442,
      "banRate": 8.043706875511333,
      "popularity": 5
    }
  },
  {
    "id": 15,
    "name": "Sivir",
    "displayName": "Sivir",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 7.788467875721058,
      "winRate": 48.095646202547286,
      "banRate": 4.5224393396521245,
      "popularity": 8
    }
  },
  {
    "id": 72,
    "name": "Skarner",
    "displayName": "Skarner",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.897486369528607,
      "winRate": 48.51103189297712,
      "banRate": 9.523289316683277,
      "popularity": 8
    }
  },
  {
    "id": 37,
    "name": "Sona",
    "displayName": "Sona",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 5.227373417452403,
      "winRate": 52.39999388035424,
      "banRate": 1.0089320944703495,
      "popularity": 9
    }
  },
  {
    "id": 16,
    "name": "Soraka",
    "displayName": "Soraka",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 14.649396214188345,
      "winRate": 53.841562240784796,
      "banRate": 4.411328277517594,
      "popularity": 10
    }
  },
  {
    "id": 50,
    "name": "Swain",
    "displayName": "Swain",
    "role": [
      "Mid",
      "Support"
    ],
    "archetype": [
      "Mage",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.607563739395037,
      "winRate": 50.60005411158981,
      "banRate": 0.27140726234765156,
      "popularity": 10
    }
  },
  {
    "id": 517,
    "name": "Sylas",
    "displayName": "Sylas",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Assassin"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame"
    ],
    "proData": {
      "pickRate": 14.001453289644687,
      "winRate": 51.8271414231358,
      "banRate": 2.7761437396153332,
      "popularity": 7
    }
  },
  {
    "id": 134,
    "name": "Syndra",
    "displayName": "Syndra",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 7.744702600156631,
      "winRate": 53.696406304419476,
      "banRate": 6.190500331492201,
      "popularity": 10
    }
  },
  {
    "id": 223,
    "name": "TahmKench",
    "displayName": "Tahm Kench",
    "role": [
      "Top",
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Tank",
      "Frontline"
    ],
    "damageType": "Mixed",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 4.803233607782849,
      "winRate": 48.131135282761626,
      "banRate": 6.532717409775113,
      "popularity": 4
    }
  },
  {
    "id": 163,
    "name": "Taliyah",
    "displayName": "Taliyah",
    "role": [
      "Jungle",
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 13.813780754226432,
      "winRate": 53.09977301054888,
      "banRate": 2.4698712639412124,
      "popularity": 8
    }
  },
  {
    "id": 91,
    "name": "Talon",
    "displayName": "Talon",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 11.443965277761095,
      "winRate": 51.496435068078114,
      "banRate": 9.275413572039977,
      "popularity": 6
    }
  },
  {
    "id": 44,
    "name": "Taric",
    "displayName": "Taric",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 3.713998401814351,
      "winRate": 53.5645969247024,
      "banRate": 1.8015716885942057,
      "popularity": 5
    }
  },
  {
    "id": 17,
    "name": "Teemo",
    "displayName": "Teemo",
    "role": [
      "Top"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 15.350478556405346,
      "winRate": 53.01252455713855,
      "banRate": 6.593160176707327,
      "popularity": 3
    }
  },
  {
    "id": 412,
    "name": "Thresh",
    "displayName": "Thresh",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [
      {
        "championId": 119,
        "championName": "Draven",
        "reason": "Lantern + agresif oyun stili",
        "synergyScore": 90
      },
      {
        "championId": 236,
        "championName": "Lucian",
        "reason": "Erken oyun dominasyonu",
        "synergyScore": 85
      }
    ],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 15.178474371552403,
      "winRate": 52.706013258240965,
      "banRate": 6.310617372778604,
      "popularity": 4
    }
  },
  {
    "id": 18,
    "name": "Tristana",
    "displayName": "Tristana",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 8.200676572331773,
      "winRate": 52.01209377213685,
      "banRate": 2.77204813456452,
      "popularity": 8
    }
  },
  {
    "id": 48,
    "name": "Trundle",
    "displayName": "Trundle",
    "role": [
      "Top",
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 15.676428389928793,
      "winRate": 53.35634545554741,
      "banRate": 6.094111883484221,
      "popularity": 2
    }
  },
  {
    "id": 23,
    "name": "Tryndamere",
    "displayName": "Tryndamere",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 4.844639200292816,
      "winRate": 52.86384976838162,
      "banRate": 4.841937446003477,
      "popularity": 2
    }
  },
  {
    "id": 4,
    "name": "TwistedFate",
    "displayName": "Twisted Fate",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 11.450631043496376,
      "winRate": 49.55296381638085,
      "banRate": 0.5448185604855538,
      "popularity": 3
    }
  },
  {
    "id": 29,
    "name": "Twitch",
    "displayName": "Twitch",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 2.0128034735254543,
      "winRate": 48.69364940585995,
      "banRate": 8.157778743073962,
      "popularity": 10
    }
  },
  {
    "id": 77,
    "name": "Udyr",
    "displayName": "Udyr",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.103541479926987,
      "winRate": 52.92873024003249,
      "banRate": 6.951440696240903,
      "popularity": 1
    }
  },
  {
    "id": 6,
    "name": "Urgot",
    "displayName": "Urgot",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.698858009571255,
      "winRate": 48.634584651822486,
      "banRate": 4.376361209504022,
      "popularity": 3
    }
  },
  {
    "id": 110,
    "name": "Varus",
    "displayName": "Varus",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame",
      "MidGame"
    ],
    "proData": {
      "pickRate": 8.704485858812173,
      "winRate": 49.51439313524785,
      "banRate": 6.395844897683116,
      "popularity": 2
    }
  },
  {
    "id": 67,
    "name": "Vayne",
    "displayName": "Vayne",
    "role": [
      "Top",
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "LateGame"
    ],
    "proData": {
      "pickRate": 4.119237762564193,
      "winRate": 50.10999607016795,
      "banRate": 7.862435241306798,
      "popularity": 4
    }
  },
  {
    "id": 45,
    "name": "Veigar",
    "displayName": "Veigar",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 12.257699327940912,
      "winRate": 49.71158462327192,
      "banRate": 3.4534022142139076,
      "popularity": 3
    }
  },
  {
    "id": 161,
    "name": "Velkoz",
    "displayName": "Vel'Koz",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 3.348751980295364,
      "winRate": 48.17323056551451,
      "banRate": 3.823518089505782,
      "popularity": 10
    }
  },
  {
    "id": 711,
    "name": "Vex",
    "displayName": "Vex",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 6.703582254231135,
      "winRate": 49.6198954520951,
      "banRate": 0.338335176685034,
      "popularity": 3
    }
  },
  {
    "id": 254,
    "name": "Vi",
    "displayName": "Vi",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [
      {
        "championId": 103,
        "championName": "Ahri",
        "reason": "Vi ulti + Ahri charm = garantili öldürme",
        "synergyScore": 85
      },
      {
        "championId": 157,
        "championName": "Yasuo",
        "reason": "Vi Q havaya kaldırır, Yasuo ulti bağlar",
        "synergyScore": 90
      },
      {
        "championId": 412,
        "championName": "Thresh",
        "reason": "Lantern ile güvenli dalış",
        "synergyScore": 75
      }
    ],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 13.525845481490846,
      "winRate": 50.40281695672091,
      "banRate": 8.428704095823548,
      "popularity": 5
    }
  },
  {
    "id": 234,
    "name": "Viego",
    "displayName": "Viego",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 9.316731541191228,
      "winRate": 52.08036706045133,
      "banRate": 7.3187725693255885,
      "popularity": 1
    }
  },
  {
    "id": 112,
    "name": "Viktor",
    "displayName": "Viktor",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.6700493361039053,
      "winRate": 52.53984387245288,
      "banRate": 9.531098870268824,
      "popularity": 6
    }
  },
  {
    "id": 8,
    "name": "Vladimir",
    "displayName": "Vladimir",
    "role": [
      "Mid",
      "Top"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 4.8776389147110235,
      "winRate": 49.51743927884614,
      "banRate": 5.722945794172913,
      "popularity": 8
    }
  },
  {
    "id": 106,
    "name": "Volibear",
    "displayName": "Volibear",
    "role": [
      "Jungle",
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.547092432674863,
      "winRate": 48.08065148918089,
      "banRate": 7.170129983650186,
      "popularity": 10
    }
  },
  {
    "id": 19,
    "name": "Warwick",
    "displayName": "Warwick",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 16.693224473605305,
      "winRate": 48.544452712827436,
      "banRate": 5.548385847084594,
      "popularity": 9
    }
  },
  {
    "id": 498,
    "name": "Xayah",
    "displayName": "Xayah",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 6.922261676539438,
      "winRate": 52.25309445075585,
      "banRate": 3.5070940514371474,
      "popularity": 9
    }
  },
  {
    "id": 101,
    "name": "Xerath",
    "displayName": "Xerath",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.8189063145264006,
      "winRate": 53.93332045793221,
      "banRate": 2.31314515653825,
      "popularity": 8
    }
  },
  {
    "id": 5,
    "name": "XinZhao",
    "displayName": "Xin Zhao",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 14.513875044964262,
      "winRate": 48.54817631985058,
      "banRate": 4.569010390067538,
      "popularity": 10
    }
  },
  {
    "id": 157,
    "name": "Yasuo",
    "displayName": "Yasuo",
    "role": [
      "Mid",
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [
      {
        "championId": 54,
        "championName": "Malphite",
        "reason": "En ikonik combo - 5 kişi havaya",
        "synergyScore": 100
      },
      {
        "championId": 89,
        "championName": "Leona",
        "reason": "Leona E havaya kaldırır",
        "synergyScore": 85
      },
      {
        "championId": 111,
        "championName": "Nautilus",
        "reason": "Naut R havaya kaldırır",
        "synergyScore": 85
      },
      {
        "championId": 154,
        "championName": "Zac",
        "reason": "Zac E havaya kaldırır",
        "synergyScore": 90
      },
      {
        "championId": 421,
        "championName": "RekSai",
        "reason": "RekSai W havaya kaldırır",
        "synergyScore": 80
      }
    ],
    "counters": [
      {
        "championId": 54,
        "championName": "Malphite",
        "reason": "Zırh + poke",
        "counterScore": 70
      },
      {
        "championId": 80,
        "championName": "Pantheon",
        "reason": "Erken oyun baskısı",
        "counterScore": 75
      }
    ],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.330501231271557,
      "winRate": 52.31560715372221,
      "banRate": 8.002360151548597,
      "popularity": 1
    }
  },
  {
    "id": 777,
    "name": "Yone",
    "displayName": "Yone",
    "role": [
      "Mid",
      "Top"
    ],
    "archetype": [
      "Assassin",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 12.65104552812951,
      "winRate": 52.865921535431156,
      "banRate": 5.2590906479272,
      "popularity": 2
    }
  },
  {
    "id": 83,
    "name": "Yorick",
    "displayName": "Yorick",
    "role": [
      "Top"
    ],
    "archetype": [
      "Bruiser",
      "Diver",
      "Tank",
      "Frontline"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 6.476063089982604,
      "winRate": 50.874137221495694,
      "banRate": 2.7722495060359886,
      "popularity": 6
    }
  },
  {
    "id": 350,
    "name": "Yuumi",
    "displayName": "Yuumi",
    "role": [
      "Support"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 5.0073337673979585,
      "winRate": 53.680528353962096,
      "banRate": 3.0815059688607094,
      "popularity": 8
    }
  },
  {
    "id": 154,
    "name": "Zac",
    "displayName": "Zac",
    "role": [
      "Jungle"
    ],
    "archetype": [
      "Tank",
      "Frontline",
      "Bruiser",
      "Diver"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "TeamfightGod",
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 10.923636768489864,
      "winRate": 48.970242991757154,
      "banRate": 7.183084519585517,
      "popularity": 3
    }
  },
  {
    "id": 238,
    "name": "Zed",
    "displayName": "Zed",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Assassin"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "1v1Beast"
    ],
    "proData": {
      "pickRate": 14.790468307275166,
      "winRate": 51.02253301865862,
      "banRate": 0.5422751203424214,
      "popularity": 10
    }
  },
  {
    "id": 221,
    "name": "Zeri",
    "displayName": "Zeri",
    "role": [
      "ADC"
    ],
    "archetype": [
      "Marksman",
      "HyperCarry"
    ],
    "damageType": "Physical",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "LateGame"
    ],
    "proData": {
      "pickRate": 9.538553118077768,
      "winRate": 50.425933680500066,
      "banRate": 7.56110924634108,
      "popularity": 1
    }
  },
  {
    "id": 115,
    "name": "Ziggs",
    "displayName": "Ziggs",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame"
    ],
    "proData": {
      "pickRate": 2.8364233506966334,
      "winRate": 49.534994132340465,
      "banRate": 5.72925313178112,
      "popularity": 4
    }
  },
  {
    "id": 26,
    "name": "Zilean",
    "displayName": "Zilean",
    "role": [
      "Support",
      "Mid"
    ],
    "archetype": [
      "Enchanter",
      "Peel",
      "Mage"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 16.482722110315404,
      "winRate": 53.87745046483609,
      "banRate": 2.022189191376098,
      "popularity": 5
    }
  },
  {
    "id": 142,
    "name": "Zoe",
    "displayName": "Zoe",
    "role": [
      "Mid"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 4.777792976228785,
      "winRate": 51.96972510533609,
      "banRate": 2.514067620137832,
      "popularity": 7
    }
  },
  {
    "id": 143,
    "name": "Zyra",
    "displayName": "Zyra",
    "role": [
      "Support"
    ],
    "archetype": [
      "Mage",
      "Enchanter",
      "Peel"
    ],
    "damageType": "Magic",
    "synergies": [],
    "counters": [],
    "powerSpikes": [
      "MidGame",
      "EarlyGame",
      "TeamfightGod"
    ],
    "proData": {
      "pickRate": 4.532877839990533,
      "winRate": 49.847953304932005,
      "banRate": 1.8723801246274552,
      "popularity": 8
    }
  }
];

// ID -> Champion map (hızlı erişim için)
export const CHAMPION_MAP = new Map<number, Champion>(
  CHAMPION_KNOWLEDGE_BASE.map(c => [c.id, c])
);

/**
 * Şampiyon ID'sine göre şampiyon bilgisi getirir
 */
export function getChampionById(id: number): Champion | undefined {
  return CHAMPION_MAP.get(id);
}

/**
 * Şampiyon adına göre şampiyon bilgisi getirir
 */
export function getChampionByName(name: string): Champion | undefined {
  return CHAMPION_KNOWLEDGE_BASE.find(
    c => c.name.toLowerCase() === name.toLowerCase() ||
         c.displayName.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Belirli bir role ait şampiyonları getirir
 */
export function getChampionsByRole(role: string): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => c.role.includes(role as any));
}

/**
 * Belirli bir arketipe sahip şampiyonları getirir
 */
export function getChampionsByArchetype(archetype: string): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => c.archetype.includes(archetype as any));
}

/**
 * Engage şampiyonlarını getirir
 */
export function getEngageChampions(): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => 
    c.archetype.includes('Engage') || 
    c.archetype.includes('Tank') ||
    c.archetype.includes('Diver')
  );
}

/**
 * Tüm benzersiz arketipleri listeler
 */
export function getAllArchetypes(): string[] {
  const archetypes = new Set<string>();
  CHAMPION_KNOWLEDGE_BASE.forEach(c => {
    c.archetype.forEach(a => archetypes.add(a));
  });
  return Array.from(archetypes);
}

