class Button {
  constructor() {
    this.dropdown = new Dropdown()
    this.dropdown.setOnSelectItemCallback(value => {
      console.log('Here is callback with selected value!', value)
    })
  }

  createButtonWrapper(DOMTarget) {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', 'shadowdom-container')

    DOMTarget.appendChild(wrapper)

    this.dropdown.initShadowDOM(wrapper)
    this.dropdown.render()
  }
}

window.Button = Button
