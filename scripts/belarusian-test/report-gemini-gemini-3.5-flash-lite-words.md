# Belarusian test — gemini:gemini-3.5-flash-lite

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję | thank you | спасибо | 1105 | basic |
| 2 | be | бульба |  |  | ziemniak, kartof, bulwa | potato, tuber | картофель, картошка, клубень | 905 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 921 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość | love | любовь | 924 | love |
| 5 | be | сябар |  |  | przyjaciel | friend | друг | 957 | friend |
| 6 | be | цікавы |  |  | ciekawy | interesting | интересный | 1008 | interesting |
| 7 | be | няўжо |  |  | czyżby, naprawdę | really, is it possible | неужели | 1291 | particle, hard |
| 8 | be | адмысловы |  |  | specjalny | special | специальный | 917 | special/skilful, rare |
| 9 | be | замок |  |  | zamek | castle, lock | замок | 1069 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house, home | дом | 1089 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, замочак |  | castle, lock, zipper | замок | 986 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць |  | beauty | красота | 972 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван |  | carpet, rug | ковёр | 968 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама |  | shop, store | магазин | 1507 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 1001 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень |  | good morning, good afternoon | добрый день, здравствуйте | 812 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 982 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада |  | berry, bilberry | ягода, черника | 951 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы |  | stale, hearty | черствый | 1091 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 1158 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg |  | банк, берег | 1049 | homonym |
| 22 | en | spring |  | вясна, крыніца, пружына | wiosna, źródło, sprężyna |  | весна, источник, пружина | 1295 | homonym season/coil/source |
| 23 | en | make up |  | кампэнсаваць, касмэтыка, выдумаць | nadrabiać, makijaż, wymyślić |  | компенсировать, макияж, выдумать | 1145 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца | poddawać się |  | сдаваться | 138504 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 1003 | BE маланка |
| 26 | en | stubborn |  | упарты | uparty |  | упрямый | 978 | adjective |
| 27 | en | cozy |  | тутлы, тульны | przytulny |  | уютный | 934 | BE утульны |
| 28 | en | bat |  | кажан, біта | nietoperz, kij, pałka |  | летучая мышь, бита | 1026 | homonym animal/club |
| 29 | en | break a leg |  | ні пуху ні пяра | połamania nóg |  | ни пуха ни пера | 1012 | idiom |
| 30 | en | pies | **YES** |  |  |  |  | 864 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, каса, каса | kosa, warkocz, mielizna | scythe, braid, spit |  | 1020 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца, гаечны ключ | klucz, źródło | key, spring, wrench |  | 985 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 948 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 1009 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрсцвы | czerstwy, bezduszny | stale, callous |  | 1043 | stale / callous |
| 36 | ru | врач |  | урач, лекар | lekarz, doktor | doctor, physician |  | 1019 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 1097 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday |  | 1212 | BE панядзелак |
| 39 | ru | клубника |  | памідор, садавіна | truskawka | strawberry |  | 1126 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка | proszę | please, you are welcome |  | 964 | BE калі ласка |
| 41 | en | dom | **YES** |  |  |  |  | 960 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 957 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 938 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 1016 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 1068 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 815 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 851 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 963 | MISMATCH expected (BE word) |
