import { Moxie } from '../lib'

const appRoot = document.getElementById('app-root')!
const modalsRoot = document.getElementById('modals-root')!

const moxie = new Moxie(modalsRoot, {
  style: {
    // position: 'fixed',
    inset: '0',
  }
})

addTestModal()
addInfoModal()

const openBtn = document.createElement('button')
openBtn.textContent = 'Open modal'
openBtn.addEventListener('click', () => moxie.showModal('TEST_MODAL'))
appRoot.appendChild(openBtn)

function addTestModal() {
  const testModalTemplate = `
    <div class="modal">
      <h2>Test modal</h2>
      <p>Hello from Moxie class API</p>
      <input type="text" />
      <button type="button">Info</button>
      <div>
        <button type="submit">Send</button>
        <button type="reset">Close</button>
      </div>
    </div>
  `;

  const testModalEl = document.createElement('div')
  testModalEl.classList.add('moxie-modal')
  testModalEl.innerHTML = testModalTemplate;

  const infoBtn = testModalEl.querySelector('button[type="button"]')!
  infoBtn.addEventListener('click', () => moxie.closeModal('INFO_MODAL'))
  const sendBtn = testModalEl.querySelector('button[type="submit"]')!
  sendBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))
  const closeBtn = testModalEl.querySelector('button[type="reset"]')!
  closeBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))

  moxie.registerModal('TEST_MODAL', testModalEl, {})
}

function addInfoModal() {
  const infoModalTemplate = `
    <div class="modal">
      <h2>Test modal</h2>
      <p>Hello from Moxie class API</p>
      <input type="text" />
      <button type="button">Info</button>
      <div>
        <button type="submit">Send</button>
        <button type="reset">Close</button>
      </div>
    </div>
  `;

  const infoModalEl = document.createElement('div')
  infoModalEl.classList.add('moxie-modal')
  infoModalEl.innerHTML = infoModalTemplate;

  const infoBtn = infoModalEl.querySelector('button[type="button"]')!
  infoBtn.addEventListener('click', () => moxie.closeModal('INFO_MODAL'))
  const sendBtn = infoModalEl.querySelector('button[type="submit"]')!
  sendBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))
  const closeBtn = infoModalEl.querySelector('button[type="reset"]')!
  closeBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))

  moxie.registerModal('INFO_MODAL', infoModalEl, {})
}