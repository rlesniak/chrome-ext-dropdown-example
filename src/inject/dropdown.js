class Dropdown {
  constructor() {
    this.shadow = null
    this.onSelectCallback = noop => noop

    this.onTriggerClick = this.onTriggerClick.bind(this)
  }

  onTriggerClick() {
    this.toggleOpen()
  }

  onOptionClick(option) {
    const value = option.getAttribute('data-value')

    this.close()
    this.onSelectCallback.call(null, value)
  }

  initListeners() {
    this.initDropdownClick()
    this.initDropdownItemClick()
    this.initBodyClick()
  }

  initShadowDOM(DOMElement) {
    this.shadow = DOMElement.createShadowRoot()
  }

  initBodyClick() {
    document.addEventListener('click', (e) => {
      if (e.target.getAttribute('id') !== 'shadowdom-container') {
        this.close()
      }
    })
  }

  initDropdownClick() {
    const trigger = this.shadow.getElementById('dropdown-trigger')

    trigger.addEventListener('click', this.onTriggerClick)
  }

  initDropdownItemClick() {
    const wrapper = this.shadow.getElementById('dropdown-wrapper')
    const elements = wrapper.getElementsByClassName('option')

    for(let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', this.onOptionClick.bind(this, elements[i]))
    }
  }

  setOnSelectItemCallback(callback) {
    this.onSelectCallback = callback
  }

  getStyles() {
    const url = chrome.extension.getURL("css/styles.css")

    fetch(url, { method: 'GET' }).then(resp => resp.text()).then(css => {
      this.shadow.innerHTML += `<style>${css}</style>`
      this.initListeners()
    })
  }

  open() {
    this.shadow.getElementById('dropdown-wrapper').className = 'wrapper active'
  }

  close() {
    this.shadow.getElementById('dropdown-wrapper').className = 'wrapper'
  }

  toggleOpen() {
    const wrapper = this.shadow.getElementById('dropdown-wrapper')
    if(wrapper.className.indexOf('active') >= 0) {
      this.close()
    } else {
      this.open()
    }
  }

  createHTML() {
    return `
      <style>.wrapper { display: none; }</style>
      <div class="wrapper" id="dropdown-wrapper">
        <div class="label" id="dropdown-trigger">Select target</div>
        <div class="list">
          <div class="option" data-value="one">Option 1</div>
          <div class="option" data-value="two">Option 2</div>
        </div>
      </div>
    `
  }

  render() {
    if (this.shadow === null) {
       throw new Error('You have to run initShadowDOM before calling renderDropdown')
    }

    this.shadow.innerHTML = this.createHTML()
    this.getStyles()
  }
}

window.Dropdown = Dropdown
