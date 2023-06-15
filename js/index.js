function startApp() {
  // селект с языками и сервисами, для языков использовал скрипты и стили этого селекта: https://itchief.ru/javascript/custom-select
  const select1 = new ItcCustomSelect('#select-1')
  const service = document.querySelector('.service__select')

  const handlerServiceClick = () => {
    if (service.classList.contains('service__select--show')) {
      service.classList.remove('service__select--show')
    } else {
      service.classList.add('service__select--show')
    }
  }

  service.addEventListener('touchstart', handlerServiceClick)


  // burger menu
  const body = document.querySelector('.body')
  const buttonOpenMenu = document.querySelector(`[data-menu="open"]`)
  const buttonCloseMenu = document.querySelector(`[data-menu="close"]`)
  const menuLinks = document.querySelectorAll(`[data-menu-link]`)
  const navMenu = document.querySelector(`[data-menu="menu"]`)

  const openMenu = () => {
    navMenu.classList.add('header__nav--active')
    window.innerWidth < 651 ? body.classList.add('body--lock') : ''
  }
  const closeMenu = () => {
    navMenu.classList.remove('header__nav--active')
    window.innerWidth < 651 ? body.classList.remove('body--lock') : ''
  }

  buttonOpenMenu.addEventListener('click', openMenu)
  buttonCloseMenu.addEventListener('click', closeMenu)
  menuLinks.forEach(link => link.addEventListener('click', closeMenu))


  // функция, которая добавляет класс с анимацей, когда элемент пересекается с экраном просмотра
  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('animate-fade-show');
      }
    });
  }

  const options = {
    threshold: [0.4]
  }
  const observer = new IntersectionObserver(onEntry, options);
  const elements = document.querySelectorAll('[data-animate]');

  for (let elm of elements) {
    observer.observe(elm);
  }
//

  // accordeon
  // для того, чтобы срабатывал клик именно по faq__item в css на внутренних элментах faq__item должен быть pointer-events: none
  const accordeonItems = document.querySelectorAll(`[data-accordeon]`)
  const accordeon = document.querySelector('.faq__list')

  function handlerAccordeonClick(e) {
    if (e.target.classList.contains('faq__item')) {
      if (e.target.classList.contains('faq__item--active')) {
        e.target.classList.remove('faq__item--active')
        const content = e.target.querySelector('.faq__item-content')
        content.style.maxHeight = '0'
      } else {
        accordeonItems.forEach(item => {
          item.classList.remove('faq__item--active')
          const content = item.querySelector('.faq__item-content')
          content.style.maxHeight = '0'
        })
        e.target.classList.add('faq__item--active')
        const content = e.target.querySelector('.faq__item-content')
        content.style.maxHeight = content.scrollHeight + "px"
      }
    }
  }

  accordeon.addEventListener('click', handlerAccordeonClick)
}

window.addEventListener('DOMContentLoaded', startApp)