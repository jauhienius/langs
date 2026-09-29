# Belarusian test — openai:gpt-6-luna

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję | thank you | спасибо | 1927 | basic |
| 2 | be | бульба |  |  | ziemniak | potato | картофель | 1740 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 1572 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość | love | любовь | 1765 | love |
| 5 | be | сябар |  |  | przyjaciel | friend | друг | 1784 | friend |
| 6 | be | цікавы |  |  | ciekawy | interesting | интересный | 1376 | interesting |
| 7 | be | няўжо |  |  | czyżby | really | неужели | 2210 | particle, hard |
| 8 | be | адмысловы |  |  | specjalny | special | специальный | 2570 | special/skilful, rare |
| 9 | be | замок |  |  | zamek | lock | замок | 2844 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house | дом | 1396 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, замок, зашпілька-маланка |  | castle, lock, zipper | замок, молния | 3253 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць |  | beauty | красота | 2042 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван |  | carpet | ковёр | 1898 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама |  | shop | магазин | 1373 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 1955 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень |  | good morning | добрый день | 2347 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 1640 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада |  | berry | ягода | 3570 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы |  | stale | чёрствый | 2328 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 1844 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg |  | банк, берег | 2305 | homonym |
| 22 | en | spring |  | вясна, спружына, крыніца | wiosna, sprężyna, źródło |  | весна, пружина, источник | 3314 | homonym season/coil/source |
| 23 | en | make up |  | выдумляць, мірыцца, складаць | wymyślać, pogodzić się, stanowić |  | выдумывать, мириться, составлять | 3930 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца | poddawać się |  | сдаваться | 4609 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 2098 | BE маланка |
| 26 | en | stubborn |  | упарты | uparty |  | упрямый | 2052 | adjective |
| 27 | en | cozy |  | утульны | przytulny |  | уютный | 4223 | BE утульны |
| 28 | en | bat |  | кажан, біта, батог | nietoperz, kij, bat |  | летучая мышь, бита, плеть | 4790 | homonym animal/club |
| 29 | en | break a leg |  | Ні пуху ні пяра | Połamania nóg |  | Ни пуха ни пера | 2375 | idiom |
| 30 | en | pies |  | пірог | ciasto |  | пирог | 3487 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса | warkocz, kosa, mierzeja | braid, scythe, spit |  | 2312 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца, танальнасць | klucz, źródło, tonacja | key, spring |  | 3293 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 3017 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 1700 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy, nieczuły | stale, callous |  | 3562 | stale / callous |
| 36 | ru | врач |  | урач | lekarz | doctor |  | 2062 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 1939 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday |  | 1644 | BE панядзелак |
| 39 | ru | клубника |  | клубніца | truskawka | strawberry |  | 2294 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка | proszę | please |  | 1755 | BE калі ласка |
| 41 | en | dom |  | дамінант | dominant |  | доминант | 7889 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 1771 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 1245 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 1598 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 1205 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 1833 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 1544 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 1495 | MISMATCH expected (BE word) |
