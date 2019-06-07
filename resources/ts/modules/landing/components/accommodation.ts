import { Tabs } from 'materialize-css';

export default () => {
    const roomTypes = document.getElementById('room-types')!;
    const accommodationLink = document.getElementById('accommodation-link') as HTMLAnchorElement;
    const accommodationSectionTabs = (oldInstance?: Tabs) => {
        if (oldInstance) {
            oldInstance.destroy();
            roomTypes.querySelectorAll('.active').forEach(activeEl => activeEl.classList.remove('active'));
        }

        const tabInst = Tabs.init(roomTypes, {
            swipeable: true,
            onShow: ({ id }) => {
                const index = tabInst ? tabInst.index : 0;
                const child = tabContent && tabContent.children[index];
                accommodationLink.href = `/accommodation/${child ? child.id : id}`;
            }
        });

        const tabContent = document.querySelector('.tabs-content') as HTMLElement;
        tabContent.style.height = '';

        return tabInst;
    };

    let accommodationTabInstance = accommodationSectionTabs();

    window.addEventListener('resize', () => {
        accommodationTabInstance = accommodationSectionTabs(accommodationTabInstance);
    });
};