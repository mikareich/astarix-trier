import './style.scss'
import './responsive.scss'

// drawer
const drawerTriggerDIV = document.querySelector('#drawerTrigger')
const navBar = document.querySelector('.nav')
drawerTriggerDIV.addEventListener('click', () =>
  navBar.classList.toggle('collapsed')
)
