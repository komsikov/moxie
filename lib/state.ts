export class Modal {
  constructor(
    private name: string,
    private visible: boolean,
    private element: Element,
    private props: Record<string, any>
  ) {}

  getState() {
    return {
      name: this.name,
      props: this.props,
    };
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  getElement() {
    return this.element;
  }

  setElement(element: Element) {
    this.element = element;
  }

  getProps() {
    return this.props;
  }
  
  setProps(props: Record<string, any>) {
    this.props = props;
  }
};

export class MoxieState {
  private modals: Modal[];
  
  constructor(modals?: Modal[]) {
    if (modals) {
      this.modals = modals;
    } else {
      this.modals = [];
    }
  }

  setModals(modals: Modal[]) {
    this.modals = modals;
  }

  getModal(name: string) {
    return this.modals.find((m) => m.getName() === name);
  }

  setModal(modal: Modal) {
    this.modals.push(modal);
  }

  deleteModal(modal: Modal) {
    this.modals = this.modals.filter((m) => m.getName() !== modal.getName());
  }

  getState() {
    return this.modals;
  }

  resetModals() {
    this.modals = [];
  }
}