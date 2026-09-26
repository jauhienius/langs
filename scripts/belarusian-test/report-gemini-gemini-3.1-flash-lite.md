# Belarusian test — gemini:gemini-3.1-flash-lite

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję, dzięki | thank you, thanks | спасибо, благодарю | 3918 | basic |
| 2 | be | бульба |  |  | ziemniak, kartofel, pyra | potato | картофель, картошка | 927 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 3983 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość, kochanie | love | любовь | 990 | love |
| 5 | be | сябар |  |  | przyjaciel, kolega | friend, companion | друг, приятель, товарищ | 1040 | friend |
| 6 | be | цікавы |  |  | ciekawy | interesting | интересный | 929 | interesting |
| 7 | be | няўжо |  |  | czyżby, naprawdę | really, is it possible, can it be | неужели | 1185 | particle, hard |
| 8 | be | адмысловы |  |  | specjalny, osobliwy, wyjątkowy | special, specific, particular | специальный, особый, специфический | 1090 | special/skilful, rare |
| 9 | be | замок |  |  | zamek | castle, lock | замок | 940 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house, home | дом | 3356 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, замок, зашпілька |  | castle, lock, zipper | замок, замок, молния | 1118 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць, урадлівасць |  | beauty, handsomeness, fertility | красота, плодородие | 2372 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван |  | carpet, rug | ковёр | 961 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама |  | shop, store | магазин, лавка | 1114 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 1523 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень |  | good morning, good afternoon, hello | добрый день, здравствуйте | 2725 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 1161 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада |  | berry, bilberry, blueberry | ягода | 981 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы |  | stale, hard | черствый | 840 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 1081 | Sunday (RU неделя = week) |
| 21 | en | bank |  |  | bank, brzeg |  | банк, берег | 879 | homonym |
| 22 | en | spring |  | вясна, крыніца, скачок | wiosna, źródło, skok |  | весна, источник, прыжок | 1143 | homonym season/coil/source |
| 23 | en | make up |  | выдумляць, фарбавацца, кампенсаваць | zmyślać, malować się, nadrabiać |  | выдумывать, краситься, компенсировать | 7243 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца, кідаць, адмаўляцца | poddawać się, rezygnować, przestawać |  | сдаваться, бросать, отказываться | 995 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 881 | BE маланка |
| 26 | en | stubborn |  | ўпарты, непахісны, зацяты | uparty, nieustępliwy, zatwardziały |  | упрямый, упорный, непоколебимый | 7727 | adjective |
| 27 | en | cozy |  | ўтульны | przytulny |  | уютный | 1596 | BE утульны |
| 28 | en | bat |  | кажан, біта | nietoperz, kij |  | летучая мышь, бита | 1585 | homonym animal/club |
| 29 | en | break a leg |  |  | połamania nóg |  | ни пуха ни пера | 1577 | idiom |
| 30 | en | pies |  |  | psy |  | собаки | 1522 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, каса, каса | warkocz, kosa, mielizna | braid, scythe, sandbar |  | 4163 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца | klucz, źródło | key, spring, wrench |  | 2509 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 1080 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 1185 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy | stale, hard, callous |  | 1053 | stale / callous |
| 36 | ru | врач |  | урач | lekarz, doktor | doctor, physician |  | 1086 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 913 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday |  | 6465 | BE панядзелак |
| 39 | ru | клубника |  | суніцы | truskawka | strawberry |  | 1212 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка | proszę | please, you are welcome |  | 1121 | BE калі ласка |
| 41 | en | dom |  | дом | dom |  | дом | 3594 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 9547 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 1250 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 3906 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 2054 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 1626 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 8044 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 3395 | MISMATCH expected (BE word) |
