# Belarusian test — openai:gpt-6-luna

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję | thank you | спасибо | 1462 | basic |
| 2 | be | бульба |  |  | ziemniak | potato | картофель | 1168 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 998 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość | love | любовь | 1119 | love |
| 5 | be | сябар |  |  | przyjaciel | friend | друг | 1655 | friend |
| 6 | be | цікавы |  |  | ciekawy | interesting | интересный | 1385 | interesting |
| 7 | be | няўжо |  |  | czyżby | really | неужели | 1119 | particle, hard |
| 8 | be | адмысловы |  |  | specjalny | special | специальный | 1126 | special/skilful, rare |
| 9 | be | замок |  |  | zamek | castle, lock | замок, замо́к | 1665 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house | дом | 1235 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, замок, маланка |  | castle, lock, zipper | замок, молния | 1681 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць |  | beauty | красота | 1151 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван |  | carpet | ковёр | 1197 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама |  | shop | магазин | 1103 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 971 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  |  |  | good morning, good day | доброе утро, добрый день | 1573 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 1168 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  |  |  | berry, bilberry | ягода, черника | 1652 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы, несвежы |  | stale | чёрствый, несвежий | 1432 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 1345 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg |  | банк, берег | 1171 | homonym |
| 22 | en | spring |  | вясна, спружына, крыніца | wiosna, sprężyna, źródło |  | весна, пружина, родник | 1347 | homonym season/coil/source |
| 23 | en | make up |  | выдумляць, памірыцца, складаць | wymyślać, pogodzić się, robić |  | выдумывать, мириться, составлять | 1642 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца | poddać się |  | сдаваться | 1301 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 1090 | BE маланка |
| 26 | en | stubborn |  | упарты | uparty |  | упрямый | 1337 | adjective |
| 27 | en | cozy |  | утульны | przytulny |  | уютный | 1150 | BE утульны |
| 28 | en | bat |  | кажан, бейсбольная біта | nietoperz, kij |  | летучая мышь, бита | 1493 | homonym animal/club |
| 29 | en | break a leg |  | ні пуху ні пер'я | powodzenia |  | ни пуха ни пера | 1392 | idiom |
| 30 | en | pies |  | пірагі, лапкі | ciasta, łapy |  | пироги, лапы | 1490 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, каса, коса | kosa, warkocz, mierzeja | scythe, braid, spit |  | 1737 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ | klucz | key, spring |  | 1643 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 1388 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 1083 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy | stale |  | 1158 | stale / callous |
| 36 | ru | врач |  | урач | lekarz | doctor |  | 1327 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 1164 | BE вясёлка |
| 38 | ru | понедельник |  |  | poniedziałek | Monday |  | 1255 | BE панядзелак |
| 39 | ru | клубника |  | клубніцы | truskawka | strawberry |  | 1006 | PL truskawka |
| 40 | ru | пожалуйста |  |  | proszę | please |  | 1049 | BE калі ласка |
| 41 | en | dom |  | дом, домен | dom |  | дом, домен | 2558 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 1719 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 1319 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 1041 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 1514 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 1064 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 1096 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 1229 | MISMATCH expected (BE word) |
