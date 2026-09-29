# Belarusian test — openai:gpt-6-sol

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję | thank you | спасибо | 4780 | basic |
| 2 | be | бульба |  |  | ziemniak | potato | картофель | 1663 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 1960 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość | love | любовь | 1700 | love |
| 5 | be | сябар |  |  | przyjaciel | friend | друг | 1570 | friend |
| 6 | be | цікавы |  |  | ciekawy | interesting | интересный | 1779 | interesting |
| 7 | be | няўжо |  |  | czyżby | really | неужели | 1837 | particle, hard |
| 8 | be | адмысловы |  |  | szczególny | special | особый | 2479 | special/skilful, rare |
| 9 | be | замок |  |  | zamek, kłódka | castle, lock | замок | 2298 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house | дом | 1914 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, маланка |  | castle, lock, zipper | замок, молния | 3126 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць |  | beauty | красота | 1918 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван |  | carpet | ковёр | 2649 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама |  | shop | магазин | 1973 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 1882 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень |  | good morning | добрый день | 2252 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 1921 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада, чарніцы |  | berry, bilberry | ягода, черника | 2572 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы, нясвежы |  | stale, callous | чёрствый | 2810 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 2092 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg |  | банк, берег | 1987 | homonym |
| 22 | en | spring |  | вясна, спружына, крыніца | wiosna, sprężyna, źródło |  | весна, пружина, родник | 2595 | homonym season/coil/source |
| 23 | en | make up |  | прыдумляць, мірыцца, наносіць макіяж | wymyślać, godzić się, malować się |  | придумывать, мириться, краситься | 3707 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца, адмаўляцца | poddawać się, rezygnować |  | сдаваться, отказываться | 2494 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 2534 | BE маланка |
| 26 | en | stubborn |  | упарты | uparty |  | упрямый | 2170 | adjective |
| 27 | en | cozy |  | утульны | przytulny |  | уютный | 1860 | BE утульны |
| 28 | en | bat |  | кажан, біта | nietoperz, kij |  | летучая мышь, бита | 2598 | homonym animal/club |
| 29 | en | break a leg |  | ні пуху ні пер'я | połamania nóg |  | ни пуха ни пера | 2783 | idiom |
| 30 | en | pies |  | пірагі | placki |  | пироги | 2255 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, каса, каса | warkocz, kosa, mierzeja | braid, scythe, spit |  | 3246 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца | klucz, źródło | key, spring |  | 1850 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 2784 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 1863 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy | stale |  | 2244 | stale / callous |
| 36 | ru | врач |  | урач | lekarz | doctor |  | 2165 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 2124 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday |  | 1958 | BE панядзелак |
| 39 | ru | клубника |  | клубніцы | truskawka | strawberry |  | 2000 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка | proszę | please |  | 2213 | BE калі ласка |
| 41 | en | dom |  | дом, купал | dom, katedra |  | дом, собор | 2248 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 1567 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 2031 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 1604 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 1863 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 2524 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 1899 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 1552 | MISMATCH expected (BE word) |
