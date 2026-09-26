# Belarusian test — gemini:gemini-3.5-flash-lite

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | дзякуй |  |  | dziękuję, dzięki | thank you, thanks | спасибо, благодарю | 1071 | basic |
| 2 | be | бульба |  |  | ziemniak, kartof, pyra | potato | картофель, картошка, бульба | 1040 | basic |
| 3 | be | вясёлка |  |  | tęcza | rainbow | радуга | 949 | rainbow; differs from RU радуга |
| 4 | be | каханне |  |  | miłość, kochanie | love, affection | любовь | 1039 | love |
| 5 | be | сябар |  |  | przyjaciel, kolega, znajomy | friend, companion | друг, приятель, товарищ | 1248 | friend |
| 6 | be | цікавы |  |  | ciekawy, interesujący | interesting, curious, inquisitive | интересный, любопытный | 1033 | interesting |
| 7 | be | няўжо |  |  | naprawdę, czyżby, jakto | really, is it possible, surely | неужели, уж, разве | 1093 | particle, hard |
| 8 | be | адмысловы |  |  | specjalny, szczególny | special, specific, particular | специальный, особенный, специфичный | 1203 | special/skilful, rare |
| 9 | be | замок |  |  | zamek, pałac | castle, lock, chateau | замок, дворец | 1144 | BE замок = lock, замак = castle |
| 10 | be | дом |  |  | dom | house, home | дом | 807 | valid BE word; must NOT be mismatch |
| 11 | pl | zamek |  | замак, зашпілька |  | castle, lock, zipper | замок, застежка-молния | 944 | homonym castle/lock/zipper |
| 12 | pl | uroda |  | прыгажосць, урода |  | beauty, good looks | красота, красотка | 1106 | false friend: beauty (RU урод = freak) |
| 13 | pl | dywan |  | дыван, кавёр |  | carpet, rug | ковёр, ковер | 1244 | false friend: carpet (RU диван = sofa) |
| 14 | pl | sklep |  | крама, сяхоўня |  | shop, store | магазин, лавка | 995 | false friend: shop (RU склеп = crypt) |
| 15 | pl | zapomnieć |  | забыць |  | forget | забыть | 911 | false friend: forget (RU запомнить = remember) |
| 16 | pl | dzień dobry |  | добры дзень |  | good morning, good afternoon | добрый день, здравствуйте | 880 | phrase |
| 17 | pl | rodzina |  | сям'я |  | family | семья | 890 | false friend: family (RU родина = homeland) |
| 18 | pl | jagoda |  | ягада, чарніца |  | berry, blueberry, bilberry | ягода, черника | 869 | blueberry/berry |
| 19 | pl | czerstwy |  | чэрствы, звэдралы |  | stale, hard, robust | черствый, зачерствелый | 1047 | stale (bread) / hale |
| 20 | pl | niedziela |  | нядзеля |  | Sunday | воскресенье | 972 | Sunday (RU неделя = week) |
| 21 | en | bank |  | банк, бераг | bank, brzeg |  | банк, берег | 1236 | homonym |
| 22 | en | spring |  | вясна, крыніца, пружина | wiosna, źródło, sprężyna |  | весна, источник, пружина | 1121 | homonym season/coil/source |
| 23 | en | make up |  | кампэнсаваць, выдумляць, фарбавацца | nadrabiać, zmyślać, makijaż |  | компенсировать, выдумывать, краситься | 1127 | phrasal verb, many senses |
| 24 | en | give up |  | здавацца, кідваць, пакідаць | poddawać się, rezygnować, porzucać |  | сдаваться, бросать, отказываться | 1087 | phrasal verb |
| 25 | en | lightning |  | маланка | błyskawica |  | молния | 976 | BE маланка |
| 26 | en | stubborn |  | упарты, заўзяты | uporczywy, uparty, zacięty |  | упрямый, упорный | 1166 | adjective |
| 27 | en | cozy |  | утульны, тутэйшы, камфортны | przytulny, komfortowy |  | уютный, комфортный | 988 | BE утульны |
| 28 | en | bat |  | кажан, біта, кацюба | nietoperz, kij, rakieta |  | летучая мышь, бита, ракетка | 1043 | homonym animal/club |
| 29 | en | break a leg |  | ні пуху ні пяра | połamania nóg, powodzenia |  | ни пуха ни пера | 1462 | idiom |
| 30 | en | pies | **YES** |  |  |  |  | 923 | valid EN (plural of pie); must NOT be mismatch |
| 31 | ru | коса |  | каса, касак, касачка | kosa, wstążka, mielizna | scythe, braid, sandbank |  | 1107 | homonym braid/scythe/spit |
| 32 | ru | ключ |  | ключ, крыніца | klucz, źródło | key, spring, wrench |  | 973 | homonym key/spring |
| 33 | ru | лук |  | цыбуля, лук | cebula, łuk | onion, bow |  | 1202 | homonym onion/bow |
| 34 | ru | неделя |  | тыдзень | tydzień | week |  | 981 | week (PL tydzień, BE тыдзень) |
| 35 | ru | черствый |  | чэрствы | czerstwy, bezduszny, bezwzględny | stale, callous, hard-hearted |  | 979 | stale / callous |
| 36 | ru | врач |  | урач, лекар | lekarz, doktor | doctor, physician |  | 1000 | BE доктар/лекар |
| 37 | ru | радуга |  | вясёлка | tęcza | rainbow |  | 1023 | BE вясёлка |
| 38 | ru | понедельник |  | панядзелак | poniedziałek | Monday |  | 983 | BE панядзелак |
| 39 | ru | клубника |  | суніцы | poziomka, truskawka | strawberry |  | 913 | PL truskawka |
| 40 | ru | пожалуйста |  | калі ласка, пажалуйста | proszę, nie ma za co | please, you are welcome, go ahead |  | 988 | BE калі ласка |
| 41 | en | dom | **YES** |  |  |  |  | 744 | MISMATCH expected (PL/RU) |
| 42 | ru | hello | **YES** |  |  |  |  | 843 | MISMATCH expected (EN) |
| 43 | be | спасибо | **YES** |  |  |  |  | 834 | MISMATCH expected (RU word) |
| 44 | ru | дзякуй | **YES** |  |  |  |  | 783 | MISMATCH expected (BE word) |
| 45 | pl | qwzrtp | **YES** |  |  |  |  | 832 | MISMATCH expected (non-word) |
| 46 | pl | книга | **YES** |  |  |  |  | 984 | MISMATCH expected (Cyrillic) |
| 47 | be | пожалуйста | **YES** |  |  |  |  | 936 | MISMATCH expected (RU word) |
| 48 | ru | вясёлка | **YES** |  |  |  |  | 736 | MISMATCH expected (BE word) |
