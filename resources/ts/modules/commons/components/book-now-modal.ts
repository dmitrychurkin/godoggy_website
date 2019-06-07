import {
    Modal,
    FormSelect,
    Datepicker,
    DatepickerOptions,
    Range
} from 'materialize-css';

export default () => {
    const modalBookNow = document.getElementById('modal-book-now')!;
    const selects = document.querySelectorAll('select');
    const arrivalPicker = document.getElementById('arrival-picker')!;
    const departurePicker = document.getElementById('departure-picker')!;

    Modal.init(modalBookNow)
        // development only
        .open();
    FormSelect.init(selects);
    const today = new Date();
    const tommorrow = new Date();
    tommorrow.setDate(today.getDate() + 1);
    const initDatePicker = (el: HTMLElement, options: Partial<DatepickerOptions>) => Datepicker.init(el, { ...options, ...{ setDefaultDate: true, container: document.body } });

    initDatePicker(arrivalPicker, {
        minDate: today,
        defaultDate: today,
        onClose() {
            const selectedArrDate = this.date;
            if (selectedArrDate.getTime() >= departurePickerInstance.date.getTime()) {
                const nextDay = new Date();
                nextDay.setDate(selectedArrDate.getDate() + 1);
                departurePickerInstance.destroy();
                departurePickerInstance = initDatePicker(departurePicker, {
                    minDate: nextDay,
                    defaultDate: nextDay
                });
            }
        }
    });

    let departurePickerInstance = initDatePicker(departurePicker, {
        minDate: tommorrow,
        defaultDate: tommorrow
    });

    const rooms: Array<{ adultRange: HTMLInputElement | null, childRange: HTMLInputElement | null }> = [];
    const totalGuestCount = Number.parseInt(document.getElementById('total-guest-count')!.innerHTML);
    const roomsCountContainer = document.querySelector('.rooms__count') as HTMLElement;
    const roomsConsCloned = document.querySelector('.rooms__cons')!.cloneNode(true) as HTMLElement;

    const addRoom = () => {
        rooms.push({
            adultRange: null,
            childRange: null
        });
        
        const roomsCount = rooms.length - 1;
        // `[name="room[${roomsCount}][adults]"]`
        const lastRoom = roomsCountContainer.children[roomsCount];
        lastRoom.querySelector('.room__counter')!.innerHTML = `${rooms.length}`;
        const [adultRange, childRange] = Array.from<HTMLInputElement>(lastRoom.querySelectorAll('[type="range"]'));
        adultRange.name = `room[${roomsCount}][adults]`;
        childRange.name = `room[${roomsCount}][child]`;
        const adultCounter = adultRange.parentElement!.querySelector('.adult__count') as HTMLElement;
        const adultRangeHandler = () => {
            const curChildCount = Number.parseInt(childRange.value);
            const curAdultCount = Number.parseInt(adultRange.value);
            if (Number.parseInt(adultRange.max) > totalGuestCount) {
                adultRange.max = `${totalGuestCount}`;
            }
            if (Number.parseInt(adultRange.min) < 1) {
                adultRange.min = '1';
            }

            adultCounter.innerHTML = `${curAdultCount}`;
            let diff = totalGuestCount - curAdultCount;
            diff = diff < 0 ? 0 : diff;
            if (curAdultCount + curChildCount >= totalGuestCount) {
                childCounter.innerHTML = childRange.value = `${diff}`;
            }
            childRange.max = `${diff}`;
            childRange.disabled = curAdultCount == totalGuestCount;
        };
        adultRange.onchange = adultRange.oninput = adultRangeHandler;
    
        const childCounter = childRange.parentElement!.querySelector('.child__count') as HTMLElement;
        const childRangeHandler = () => {
            const curChildCount = Number.parseInt(childRange.value);
            const curAdultCount = Number.parseInt(adultRange.value);
            if (Number.parseInt(childRange.max) > (totalGuestCount - 1)) {
                childRange.max = `${totalGuestCount - 1}`;
            }
            if (Number.parseInt(childRange.min) < 0) {
                childRange.min = '0';
            }

            childCounter.innerHTML = `${curChildCount}`;
            let diff = totalGuestCount - curChildCount;
            diff = diff < 0 ? 0 : diff;
            if (curAdultCount + curChildCount >= totalGuestCount) {
                adultCounter.innerHTML = adultRange.value = `${diff}`;
            }
            adultRange.max = `${diff}`;
            adultRange.disabled = curChildCount == (totalGuestCount - 1);
        };
        childRange.onchange = childRange.oninput = childRangeHandler;
        rooms[roomsCount].adultRange = adultRange;
        rooms[roomsCount].childRange = childRange;
        Range.init(document.querySelectorAll('[type="range"]'));
    };
    addRoom();
    document.getElementById('add-room')!.addEventListener('click', () => {
        roomsCountContainer.appendChild(roomsConsCloned.cloneNode(true));
        addRoom();
    });
};
