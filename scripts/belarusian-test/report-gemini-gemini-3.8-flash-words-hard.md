# Belarusian test — gemini:gemini-3.8-flash

| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | be | замок |  |  | zamek | lock | замок | 4416 | BE замок = lock, замак = castle |
| 2 | pl | zamek | ERROR | 503 This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later. | | | | 1952 | homonym castle/lock/zipper |
| 3 | pl | uroda | ERROR | 503 This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later. | | | | 1293 | false friend: beauty (RU урод = freak) |
| 4 | pl | sklep | ERROR | 503 This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later. | | | | 7575 | false friend: shop (RU склеп = crypt) |
| 5 | pl | czerstwy |  | чэрствы, бадзёры |  | stale, hale | чёрствый, бодрый | 4138 | stale (bread) / hale |
| 6 | en | spring |  | вясна, крыніца, пружына | wiosna, źródło, sprężyna |  | весна, родник, пружина | 3535 | homonym season/coil/source |
| 7 | en | make up | ERROR | 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. 
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 5, model: gemini-3.8-flash
Please retry in 31.697530353s. | | | | 237 | phrasal verb, many senses |
| 8 | en | give up | ERROR | 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. 
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 5, model: gemini-3.8-flash
Please retry in 26.949895812s. | | | | 218 | phrasal verb |
| 9 | en | cozy | ERROR | 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. 
* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 5, model: gemini-3.8-flash
Please retry in 22.229388822s. | | | | 228 | BE утульны |
| 10 | en | break a leg |  | ні пуху ні пяра | połamania nóg |  | ни пуха ни пера | 4262 | idiom |
| 11 | en | pies |  | пірог | ciasto |  | пирог | 3287 | valid EN (plural of pie); must NOT be mismatch |
| 12 | ru | коса |  | каса | warkocz, kosa, mierzeja | braid, scythe, spit |  | 7288 | homonym braid/scythe/spit |
| 13 | ru | врач |  | урач | lekarz | doctor |  | 12840 | BE доктар/лекар |
| 14 | ru | клубника |  | клубніцы | truskawka | strawberry |  | 6701 | PL truskawka |
| 15 | ru | пожалуйста |  | калі ласка | proszę | please |  | 2685 | BE калі ласка |
| 16 | en | dom |  | дамінант | dominant |  | доминант | 13216 | MISMATCH expected (PL/RU) |
