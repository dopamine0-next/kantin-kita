---
trigger: always_on
---

# PROJECT RULES

## GENERAL

- gunakan next.js app router
- gunakan typescript strict mode
- gunakan kebab-case untuk seluruh nama file dan folder
- jangan gunakan camelCase atau PascalCase untuk nama file/folder
- component react tetap menggunakan PascalCase
- gunakan alias import `@/`
- hindari relative import panjang
- seluruh code harus scalable, reusable, dan production-ready
- seluruh design harus dribbble-design ready
- fokus design mobile-first/mobile-only
- prioritaskan spacing, typography, hierarchy, dan clean layout
- gunakan semantic HTML
- prioritaskan accessibility
- gunakan loading state, empty state, dan error state

---

## CLIENT COMPONENT RULES

- jangan gunakan `use client` pada `page.tsx`
- gunakan server component sebagai default
- gunakan `use client` hanya jika benar-benar dibutuhkan
- `use client` hanya digunakan ketika:
  - menggunakan react hook
  - menggunakan browser API
  - membutuhkan interaksi client-side
- jangan jadikan component `use client` jika tidak perlu
- hindari client component berantai tanpa alasan

---

## COMPONENT RULES

- 1 component hanya memiliki 1 tanggung jawab
- component harus fokus pada presentation/UI
- component tidak boleh contain business logic kompleks
- component tidak boleh fetch langsung
- component tidak boleh contain endpoint API
- component tidak boleh contain mock data manual
- **wajib gunakan shadcn/ui untuk seluruh UI component**
- **jangan pernah membuat custom UI component jika sudah tersedia di shadcn/ui**
- daftar shadcn/ui yang wajib digunakan jika tersedia:
  - `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
  - `Card`, `CardHeader`, `CardContent`, `CardFooter`
  - `Dialog`, `Sheet`, `Drawer`, `AlertDialog`
  - `DropdownMenu`, `ContextMenu`, `Menubar`
  - `Tabs`, `Accordion`, `Collapsible`
  - `Avatar`, `Badge`, `Separator`
  - `Form`, `Label` (wajib pairing dengan form element)
  - `Skeleton` untuk loading state
  - `Alert` untuk error/info state
  - `Table`, `ScrollArea`
  - `Tooltip`, `Popover`, `HoverCard`
  - `Progress`, `Slider`
  - `NavigationMenu`, `Breadcrumb`, `Pagination`
  - `Calendar`, `DatePicker`
  - `Command`, `Combobox`
  - `Toast` / `Sonner` untuk notifikasi
- taruh sub-component di:
  ```txt
  components/(feature-name)
  ```
- jangan jadikan folder components sebagai tempat sampah global
- maksimal 100-150 baris per file
- jika melebihi batas wajib refactor
- pisahkan:
  - sub-component
  - hooks
  - utils
  - services
  - constants

---

## STYLING & COLOR RULES

- **wajib gunakan utility color dari shadcn/Tailwind design token**
- **jangan pernah membuat custom utility class** seperti `text-10px`, `mt-3px`, `w-22px`, dll
- **jangan pernah hardcode nilai pixel atau rem langsung sebagai class utility**
- gunakan skala spacing bawaan Tailwind: `p-1`, `p-2`, `p-4`, `gap-2`, `mt-4`, dst
- gunakan skala typography bawaan Tailwind: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, dst
- gunakan skala color token shadcn/CSS variable:

  ```css
  /* Background */
  bg-background
  bg-card
  bg-popover
  bg-primary
  bg-secondary
  bg-muted
  bg-accent
  bg-destructive

  /* Text */
  text-foreground
  text-card-foreground
  text-popover-foreground
  text-primary-foreground
  text-secondary-foreground
  text-muted-foreground
  text-accent-foreground
  text-destructive-foreground

  /* Border */
  border-border
  border-input
  border-ring

  /* Ring */
  ring-ring
  ```

- jika membutuhkan warna custom yang tidak ada di token shadcn, tambahkan di `tailwind.config.ts` dan `globals.css` menggunakan CSS variable:
  ```css
  /* globals.css */
  :root {
    --color-brand: 220 90% 56%;
  }
  .dark {
    --color-brand: 220 80% 70%;
  }
  ```
  ```ts
  /* tailwind.config.ts */
  theme: {
    extend: {
      colors: {
        brand: 'hsl(var(--color-brand))',
      },
    },
  }
  ```
- **jangan pernah gunakan inline style `style={{ color: '#fff' }}`** kecuali untuk dynamic value yang tidak mungkin ditulis sebagai class
- **jangan pernah gunakan arbitrary Tailwind value** seperti `text-[10px]`, `w-[22px]`, `mt-[3px]` kecuali benar-benar terpaksa dan didokumentasikan alasannya
- gunakan `cn()` dari `@/lib/utils` untuk conditional class merging
- jangan gunakan string concatenation untuk class merging

---

## ANIMATION RULES

- seluruh animasi wajib menggunakan motion/react
- hindari library animasi lain
- gunakan animasi secukupnya
- prioritaskan UX dibanding animasi berlebihan

---

## STATE MANAGEMENT RULES

- gunakan zustand jika props drilling terlalu dalam
- gunakan zustand hanya untuk shared/global state
- jangan gunakan state management untuk local state sederhana
- local state tetap gunakan useState

---

## DATA RULES

- seluruh data harus merepresentasikan response backend asli
- jangan hardcode data random langsung di component
- mock data harus menyerupai struktur API backend
- seluruh component harus siap menerima data dinamis
- jangan membuat component yang hanya cocok untuk data statis
- seluruh data async harus scalable untuk backend asli

### DATA STRUCTURE EXAMPLE

Benar:

```ts
export interface UserApiResponse {
  id: number
  full_name: string
  avatar_url: string
  followers_count: number
}
```

Salah:

```ts
const users = [
  {
    name: 'budi',
  },
]
```

---

## SERVICE RULES

- seluruh API logic wajib dipisahkan ke service layer
- component tidak boleh menggunakan fetch langsung
- seluruh request API harus melalui service
- service harus reusable
- service harus support mock dan backend asli
- gunakan env untuk switch mock/API
- taro di folder services
- service hanya bertugas:
  - fetch data
  - create/update/delete request
  - transform response
  - handle endpoint
- service tidak boleh contain JSX
- service tidak boleh contain UI logic

### SERVICE STRUCTURE

```txt
services/
└── user/
    ├── user.service.ts
    ├── user.mock.ts
    ├── user.types.ts
    ├── user.mapper.ts
    └── user.schema.ts
```

---

## MOCK RULES

- mock data wajib dipisahkan ke `.mock.ts`
- jangan menaruh mock langsung di component
- mock data harus representasi backend response
- mock harus scalable untuk dynamic rendering

---

## TYPE RULES

- seluruh response API wajib memiliki interface/type
- hindari `any`
- gunakan typing strict
- gunakan nullable type jika backend memungkinkan null

---

## MAPPER RULES

- gunakan mapper jika format backend berbeda dengan kebutuhan frontend
- frontend tidak boleh bergantung langsung pada naming backend
- mapper bertugas transform backend response ke UI format

### CONTOH

Backend:

```json
{
  "full_name": "john"
}
```

Frontend:

```ts
{
  name: 'john'
}
```

### MAPPER EXAMPLE

```ts
export function map_user(data) {
  return {
    name: data.full_name,
  }
}
```

---

## HOOK RULES

- gunakan swr untuk async server state
- jangan gunakan useEffect untuk fetch data
- hook hanya bertugas handle state/query logic
- pisahkan hook dari component
- gunakan custom hook jika logic mulai reusable

### SWR EXAMPLE

```txt
hooks/use-users.ts
```

```ts
import useSWR from 'swr'

import { get_users } from '@/services/user/user.service'

export function use_users() {
  const { data, error, isLoading } = useSWR('users', get_users)

  return {
    users: data,
    error,
    isLoading,
  }
}
```

---

## UTILITY RULES

- utility reusable wajib dipindahkan ke:
  ```txt
  lib/utils
  ```
- jangan duplicate helper function
- utility harus pure dan reusable

---

## NEXT.JS RULES

- jangan import:
  ```ts
  import * as React from 'react'
  ```
- next.js modern sudah handle otomatis
- ini bukan react legacy
- gunakan server actions jika memang cocok
- prioritaskan server rendering jika memungkinkan
- hindari client-side rendering berlebihan

---

## FETCH RULES

- gunakan native fetch
- jangan gunakan axios
- gunakan shared fetch wrapper jika diperlukan
- jangan duplicate request logic
- jangan hardcode API URL

Gunakan:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_USE_MOCK=
```

Jangan:

```ts
fetch('http://localhost:3000/api')
```

### FETCH EXAMPLE

```txt
lib/fetcher.ts
```

```ts
export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
  })

  if (!response.ok) {
    throw new Error('request failed')
  }

  return response.json()
}
```

---

## CODE QUALITY RULES

- seluruh code harus clean dan mudah dibaca
- gunakan naming yang jelas
- hindari nested logic berlebihan
- hindari duplicate code
- gunakan early return jika memungkinkan
- refactor logic besar menjadi function reusable
- hindari file monster 300+ baris
- pisahkan concern dengan jelas

---

## MAIN PRINCIPLE

- UI hanya fokus menampilkan data
- business logic dipisahkan
- data layer terisolasi
- component harus reusable
- seluruh architecture harus mudah scale
- seluruh code harus siap menerima backend asli tanpa rewrite besar
- **shadcn/ui adalah satu-satunya sumber UI component**
- **color system sepenuhnya menggunakan token shadcn — tidak ada custom utility color**
