import Base from './base';
import { INavbarSelectors } from '../interfaces';

export default class Navbar extends Base {

  private static readonly LINK_HEIGHT = 59;

  private navbar: HTMLElement;
  private navMain: HTMLElement;
  private searchForm: HTMLElement;
  private group: HTMLElement;

  private subSelector: string;

  constructor({ menu, toggle, navbar, navMain, searchForm, group, sub }: INavbarSelectors) {
    super();
    this.subSelector = sub;
    const [navbarEl, navMainEl, searchFormEl, groupEl] = this.getComponentElements([navbar, navMain, searchForm, group]);

    this.navbar = navbarEl;
    this.navMain = navMainEl;
    this.searchForm = searchFormEl;
    this.group = groupEl;

    document.addEventListener('click', e => {

      const { target } = e;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest(`${menu}`)) {

        this.toggleMainMenu();

      } else if (target.closest(`${toggle}`)) {

        this.toggleSubMenu(e, target);

      }

    });
  }

  private toggleMainMenu(): void {
    const { navbar: { classList }, navMain } = this;

    classList.toggle('active');

    if (classList.contains('active')) {

      navMain.style.height = `${navMain.scrollHeight}px`;
      setTimeout(() => navMain.style.height = 'auto', 300);

    } else {

      navMain.style.height = `${navMain.scrollHeight}px`;
      setTimeout(() => navMain.style.height = `${0}px`, 50);

    }
  }

  private toggleSubMenu(event: Event, target: Element): void {

    event.preventDefault();

    const li = target.closest('li');
    if (!(li instanceof HTMLElement)) {
      return;
    }

    const { classList } = li;
    classList.toggle('active');

    if (classList.contains('active')) {

      const [sub] = this.getComponentElements([this.subSelector]);
      li.style.height = `${li.offsetHeight + sub.offsetHeight}px`;

    } else {

      li.style.height = `${Navbar.LINK_HEIGHT}px`;

    }

  }

}