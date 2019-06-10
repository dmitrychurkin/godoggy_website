import {
    Modal,
    FormSelect,
    Datepicker,
    DatepickerOptions,
    Range
} from 'materialize-css';

export default () => {

    Modal.init(document.getElementById('modal-book-now')!);
        // development only
        // .open();
    FormSelect.init(document.querySelectorAll('select'));
    const today = new Date();
    const tommorrow = new Date();
    tommorrow.setDate(today.getDate() + 1);
    const initDatePicker = (el: HTMLElement, options: Partial<DatepickerOptions>) => Datepicker.init(el, { ...options, ...{ setDefaultDate: true, container: document.body } });

    initDatePicker(document.getElementById('arrival-picker')!, {
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

    const departurePicker = document.getElementById('departure-picker')!;
    let departurePickerInstance = initDatePicker(departurePicker, {
        minDate: tommorrow,
        defaultDate: tommorrow
    });

    const rooms: Array<{ adultRange: HTMLInputElement | null, childRange: HTMLInputElement | null }> = [];
    const totalGuestCount = Number.parseInt(document.getElementById('total-guest-count')!.innerHTML);
    const roomsCountContainer = document.getElementById('rooms__count')!;
    const roomsConsCloned = document.querySelector('.rooms__cons')!.cloneNode(true) as HTMLElement;
    const getCounts = (childRange: HTMLInputElement, adultRange: HTMLInputElement) => [Number.parseInt(childRange.value), Number.parseInt(adultRange.value)];
    const getDiff = (totalGuestCount: number, curCount: number) => {
        let diff = totalGuestCount - curCount;
        return diff < 0 ? 0 : diff;
    };
    const checkEdges = (range: HTMLInputElement, totalGuestCount: number, substractor = 0) => {
        if (Number.parseInt(range.max) > (totalGuestCount - substractor)) {
            range.max = `${totalGuestCount - substractor}`;
        }
        if (Number.parseInt(range.min) < (1 - substractor)) {
            range.min = `${1 - substractor}`;
        }
    };
    const handleOrder = () => Array.from(roomsCountContainer.children)
        .forEach((room, i) => {
            room.querySelector<HTMLSelectElement>('.input-field select')!.name = `room[${i}][category]`;
            room.querySelector('.room__counter')!.innerHTML = `${i + 1}`;
            const [adultRange, childRange] = Array.from<HTMLInputElement>(room.querySelectorAll('[type="range"]'));
            adultRange.name = `room[${i}][adults]`;
            childRange.name = `room[${i}][child]`;
        });
    let roomsCount: number;

    const addRoom = () => {
        rooms.push({
            adultRange: null,
            childRange: null
        });
        handleOrder();
        roomsCount = rooms.length - 1;
        const lastRoom = roomsCountContainer.children[roomsCount];
        if (roomsCount > 0) {
            const removeRoomBtn = lastRoom.querySelector<HTMLElement>('.btn-flat')!;
            removeRoomBtn.onclick = () => {
                rooms.splice(roomsCount--, 1);
                lastRoom.remove();
                handleOrder();
            };
        }

        const [adultRange, childRange] = Array.from<HTMLInputElement>(lastRoom.querySelectorAll('[type="range"]'));

        const adultCounter = adultRange.parentElement!.querySelector('.adult__count') as HTMLElement;
        const adultRangeHandler = () => {
            const [curChildCount, curAdultCount] = getCounts(childRange, adultRange);
            checkEdges(adultRange, totalGuestCount);

            adultCounter.innerHTML = `${curAdultCount}`;
            const diff = getDiff(totalGuestCount, curAdultCount);
            if (curAdultCount + curChildCount >= totalGuestCount) {
                childCounter.innerHTML = childRange.value = `${diff}`;
            }
            childRange.max = `${diff}`;
            childRange.disabled = curAdultCount == totalGuestCount;
        };
        adultRange.onchange = adultRange.oninput = adultRangeHandler;

        const childCounter = childRange.parentElement!.querySelector('.child__count') as HTMLElement;
        const childRangeHandler = () => {
            const [curChildCount, curAdultCount] = getCounts(childRange, adultRange);
            checkEdges(childRange, totalGuestCount, 1);

            childCounter.innerHTML = `${curChildCount}`;
            const diff = getDiff(totalGuestCount, curChildCount);
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
