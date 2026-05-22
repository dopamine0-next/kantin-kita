---
trigger: always_on
---

- selalu gunakan shadcn
- jangan menggunakan use client pada page
- dribble design ready
- taro sub component di component/{feature-yang dibuat}
- gunakan motion react untuk animasi
- gunakan design fokus mobile only
- gunakan data mockup
- 1 component 1 tanggung jawab
- kode optimal 100-150 code selebihnya harus refactor
- jika ada utility yang skiranya bakal reusable taro di lib/utils
- jangan import \* as React form react karena itu sudah di handle otomatis oleh bundler next js gausah import itu. ini bukan react legacy!!!
- jangan jadikan component use client jika memang tidak dibtuhkan. use client hanya digunakan ketika menggunakan react hook. dan ushakan hindari ini untuk component yangg tidk pake hook react
- sekiranya props drilling terlalu dalam gunakan zustand state managements
