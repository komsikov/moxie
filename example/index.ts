import { Moxie } from '../lib'

const appRoot = document.getElementById('app-root')!
const modalsRoot = document.getElementById('modals-root')!

const moxie = new Moxie(modalsRoot, {
  style: {
    position: 'fixed',
    inset: '0',
  }
})

const modalTemplate = `
  <div class="modal">
    <h2>Test modal</h2>
    <p>Hello from Moxie class API</p>
    <input type="text" />
    <div>
      <button type="submit">Send</button>
      <button type="reset">Close</button>
    </div>
  </div>
`;

const modalEl = document.createElement('div')
modalEl.classList.add('moxie-modal')
modalEl.innerHTML = modalTemplate;

const sendBtn = modalEl.querySelector('button[type="submit"]')!
sendBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))
const closeBtn = modalEl.querySelector('button[type="reset"]')!
closeBtn.addEventListener('click', () => moxie.closeModal('TEST_MODAL'))

moxie.registerModal('TEST_MODAL', modalEl, {})

const openBtn = document.createElement('button')
openBtn.textContent = 'Open modal'
openBtn.addEventListener('click', () => moxie.showModal('TEST_MODAL'))
appRoot.appendChild(openBtn)
