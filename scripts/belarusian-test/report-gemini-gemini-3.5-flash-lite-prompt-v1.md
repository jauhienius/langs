# Belarusian test — gemini-3.5-flash-lite

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  | дзякуй | dziękuję, dzięki | thank you, thanks | спасибо, благодарю | 1064 | basic |
| 2 | be | бульба |  | бульба | ziemniak, kartofEL, bulba | potato | картофель, картошка | 1083 | basic |
| 3 | be | вясёлка |  | вясёлка | tęcza | rainbow | радуга | 975 | rainbow; differs from RU радуга |
| 4 | be | каханне |  | каханне | miłość, kochanie | love | любовь, любовь | 915 | love |
| 5 | be | сябар |  | сябар | przyjaciel, kolega | friend, pal | друг, приятель, товарищ | 39260 | friend |
| 6 | be | цікавы |  | цікавы | ciekawy, interesujący | interesting, curious | интересный, любопытный | 957 | interesting |
| 7 | be | няўжо |  | няўжо | czyżby, naprawdę | really, is it possible | неужели | 1084 | particle, hard |
| 8 | be | адмысловы |  | адмысловы | specjalny, szczególny | special, specific, particular | специальный, особенный | 1287 | special/skilful, rare |
| 9 | be | замок |  | замак | zamek | castle, lock | замок | 984 | BE замок = lock, замак = castle |
| 10 | be | дом |  | дом | dom | house, home | дом | 934 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, замок | zamek | castle, lock, zipper | замок, застежка-молния | 31775 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць, урода | uroda | beauty, charm, looks | красота, привлекательность | 1372 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван | dywan | carpet, rug | ковёр | 1219 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама | sklep | shop, store, basement | магазин, лавка, подвал | 1027 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць | zapomnieć | forget | забыть | 908 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень | dzień dobry | good morning, good afternoon, hello | добрый день, доброе утро | 1009 | phrase |
| 17 | pl | rodzina |  | сям'я | rodzina | family | семья | 37372 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада, чарніца | jagoda | berry, blueberry | ягода, черника | 1135 | blueberry/berry |
| 19 | pl | czerstwy |  | черцёўскі, чорствы | czerstwy | stale, dry, hard | черствый | 1108 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля | niedziela | Sunday | воскресенье | 39320 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg | bank | банк, берег | 2453 | homonym |
| 22 | en | spring |  | вясна, пружына, крыніца | wiosna, sprężyna, źródło | spring | весна, пружина, источник | 1087 | homonym season/coil/source |
| 23 | en | make up |  | касметыка, выдумка, кампенсаваць | makijaż, wymyślić, pogodzić się | make up | макияж, выдумать, компенсировать | 1209 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца, кідваць, пакідаць | poddawać się, rezygnować, porzucać | give up | сдаваться, бросать, отказываться | 1057 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica | lightning | молния | 15040 | BE маланка |
| 26 | en | stubborn |  | упарты, наравісты | uparty, zacięty, nieustępliwy | stubborn | упрямый, упертый, строптивый | 1148 | adjective |
| 27 | en | cozy |  | туткі, тульны, утульны | przytulny, kameralny, ciepły | cozy | уютный, комфортный | 1120 | BE утульны |
| 28 | en | bat |  | кажан, біта | nietoperz, kij, bita | bat | летучая мышь, бита | 12571 | homonym animal/club |
| 29 | en | break a leg |  | ні пуху ні пяра | połamania nóg | break a leg | ни пуха ни пера | 900 | idiom |
| 30 | en | pies | **YES** |  |  |  |  | 1111 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, каса, каса | kosa, warkocz, mierzeja | scythe, braid, spit | коса, коса, коса | 53515 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца | klucz, źródło | key, spring, wrench | ключ | 1204 | homonym key/spring |
| 33 | ru | лук |  | лук, цыбуля | łuk, cebula | onion, bow | лук | 1066 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week | неделя | 1130 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy, bezduszny, bezwzględny | stale, callous, heartless | черствый | 1114 | stale / callous |
| 36 | ru | врач |  | урач, ],,l, pl, lekarz, doktor, medyk | lekarz, doktor, medyk | doctor, physician, medical doctor | врач | 1167 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow | радуга | 1224 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday | понедельник | 1089 | BE панядзелак |
| 39 | ru | клубника |  | памідор, клубніцы | truskawka | strawberry | клубника | 1042 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка | proszę | please, you are welcome | пожалуйста | 1345 | BE калі ласка |
| 41 | en | dom | **YES** |  |  |  |  | 926 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 871 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 782 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 841 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 859 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 854 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 3514 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 1100 | MISMATCH expected (BE word) |
