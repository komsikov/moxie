import { Modal, MoxieState } from './state'

export type ModalProps = Record<string, unknown>

export type MoxieConfig = {
  state?: MoxieState,
  style?: Record<string, string | number>,
}

const defaultStyle: Record<string, string | number> = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  maxHeight: '100vh',
  zIndex: 10,
}

export class Moxie {
  private container: HTMLElement
  private state: MoxieState
  private style: Record<string, string | number>

  constructor(element: Element | string, config: MoxieConfig = {}) {
    const el: Element | null =
      typeof element === 'string' ? document.querySelector(element) : element

    if (!el) {
      throw new Error(`Element with selector ${element} not found`)
    }

    this.container = el as HTMLElement
    this.state = config.state ?? new MoxieState()
    this.style = { ...defaultStyle, ...(config.style ?? {}) }

    this.applyContainerStyle()
  }

  private applyContainerStyle() {
    Object.assign(this.container.style, this.style)
  }

  private ensureClickListener() {
    const anyOpen = this.state.getState().some(m => m.getVisible())
    if (anyOpen) {
      document.addEventListener('click', this.handleDocumentClick.bind(this), true)
    } else {
      document.removeEventListener('click', this.handleDocumentClick.bind(this), true)
    }
  }

  registerModal(name: string, element: Element, props: ModalProps = {}) {
    const existing = this.state.getModal(name)
    if (existing) {
      existing.setElement(element)
      existing.setProps(props)
      return
    }
    this.state.setModal(new Modal(name, false, element, props))
  }

  showModal(name: string, props: ModalProps = {}) {
    const modal = this.state.getModal(name)
    if (!modal) {
      throw new Error(`No modal with name: ${name}`)
    }

    modal.setProps(props)
    modal.setVisible(true)
    this.mountModal(modal)
    this.ensureClickListener()
  }

  closeModal(name: string) {
    const modal = this.state.getModal(name)
    if (!modal) return

    modal.setVisible(false)
    this.unmountModal(modal)
    this.ensureClickListener()
  }

  resetModals() {
    this.state.getState().forEach(m => {
      m.setVisible(false)
      this.unmountModal(m)
    })
    this.ensureClickListener()
  }

  getState() {
    return this.state.getState().map(m => m.getState())
  }

  destroy() {
    this.resetModals()
    document.removeEventListener('click', this.handleDocumentClick.bind(this), true)
  }

  private handleDocumentClick(e: MouseEvent) {
    const target = e.target as Node
    if (!target) return

    const opened = this.state.getState().filter(m => m.getVisible())
    if (opened.length === 0) return

    const clickedInsideSomeModal = opened.some(m => m.getElement().contains(target))
    const clickedOnContainer = target === this.container
debugger
    if (!clickedInsideSomeModal || clickedOnContainer) {
      this.resetModals()
    }
  }

  private mountModal(modal: Modal) {
    const el = modal.getElement()
    if (!this.container.contains(el)) {
      this.container.appendChild(el)
    }
    el.setAttribute('aria-hidden', 'false')
    el.setAttribute('data-moxie-modal', modal.getName())
  }

  private unmountModal(modal: Modal) {
    const el = modal.getElement()
    if (this.container.contains(el)) {
      this.container.removeChild(el)
    }
    el.setAttribute('aria-hidden', 'true')
  }
}
