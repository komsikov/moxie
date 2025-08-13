## Moxie

Легковесная библиотека для управления модальными окнами на чистом JavaScript/TypeScript. Предоставляет класс `Moxie` для регистрации модалок как DOM-узлов и управления их жизненным циклом (открыть/закрыть/сброс), включая закрытие по клику вне модалки.

### Особенности
- **Без зависимостей**: чистый JS/TS, работа с DOM напрямую
- **Встроенные типы**: готовые `.d.ts`
- **Закрытие по клику снаружи**: автоматически
- **Простое API**: несколько методов без магии
- **Кастомизация контейнера**: стили задаются через конфиг

## Установка

```bash
npm install moxie
```

## Быстрый старт

HTML:

```html
<div id="app"></div>
```

TypeScript:

```ts
import { Moxie } from 'moxie'

const appRoot = document.getElementById('app') as HTMLElement

const moxie = new Moxie(appRoot, {
  style: { position: 'fixed', inset: '0' },
})

// Создаём DOM-структуру модалки
const modalEl = document.createElement('div')
modalEl.style.position = 'fixed'
modalEl.style.inset = '0'
modalEl.style.display = 'grid'
modalEl.style.placeItems = 'center'
modalEl.style.background = 'rgba(0 0 0 / 40%)'

const inner = document.createElement('div')
inner.style.width = '50%'
inner.style.height = '50%'
inner.style.border = '1px solid black'
inner.style.borderRadius = '14px'
inner.style.padding = '40px 32px'
inner.style.background = '#9695a1'
inner.innerHTML = '<h2>Test modal</h2><p>Hello from Moxie</p>'

const close = document.createElement('button')
close.textContent = 'Close'
close.onclick = () => moxie.closeModal('TEST_MODAL')
inner.appendChild(close)
modalEl.appendChild(inner)

// Регистрируем модалку по имени
moxie.registerModal('TEST_MODAL', modalEl)

// Кнопка для открытия
const openBtn = document.createElement('button')
openBtn.textContent = 'Open modal'
openBtn.onclick = () => moxie.showModal('TEST_MODAL')
appRoot.appendChild(openBtn)
```

### Поведение по умолчанию
- При `showModal` элемент модалки монтируется в контейнер, получает атрибут `data-moxie-modal` и `aria-hidden="false"`
- Клик вне любого открытого модального содержимого (или по контейнеру) вызывает `resetModals()`
- При `closeModal` элемент размонтируется и получает `aria-hidden="true"`

## API

### Класс `Moxie`
- Конструктор: `new Moxie(element: Element | string, config?: { state?: MoxieState; style?: Record<string, string | number> })`
- `registerModal(name, element, props?)`: регистрирует или обновляет модалку
- `showModal(name, props?)`: показывает модалку и монтирует её DOM-элемент в контейнер
- `closeModal(name)`: закрывает модалку и размонтирует её DOM-элемент
- `resetModals()`: закрывает все модалки и снимает слушатели кликов
- `getState()`: возвращает массив объектов `{ name, props }` по зарегистрированным модалкам
- `destroy()`: финализирует менеджер, снимает слушатели

Примечание: `props` сохраняются во внутреннем состоянии и могут использоваться для вашей логики, но сама библиотека контент не рендерит — вы управляете DOM самостоятельно.

### Класс `MoxieState` и `Modal`
Экспортируются для расширенной интеграции. Обычно использовать их напрямую не требуется.

## Разработка и сборка

Скрипты доступны в `package.json`:

```bash
# сборка библиотеки (ESM/CJS/UMD в dist/)
npm run build:lib

# сборка примеров (dist/index.html и index.js)
npm run build:examples

# запуск примеров в dev-режиме (localhost:3000)
npm run dev
```

Альтернативно, через переменные окружения:

```bash
ROLLUP_BUILD=lib npx rollup -c
ROLLUP_BUILD=examples npx rollup -c -w
```

## Совместимость
- Цель компиляции: `es2020`, модули: `esnext`
- Поддерживаются современные браузеры. Для более старых окружений используйте дополнительную транспиляцию в вашем бандлере.

## Миграция с React-версии
Историческая React-реализация (хуки/провайдер) удалена. Вместо неё используйте класс `Moxie` и управляйте DOM напрямую либо оберните его в свои React-компоненты.

## Лицензия
MIT
