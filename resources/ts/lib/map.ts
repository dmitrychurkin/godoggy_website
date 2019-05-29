if (typeof window === 'object') {
    const w: any = window;
    w.initMap = () => {
        const TITLE = 'PEACE HEAVEN';
        const ZOOM = 13;
        const POSITION = {
            lat: 47.109426,
            lng: 37.648601
        };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: ZOOM,
            center: POSITION,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            fullscreenControl: false
        });
    
        const marker = new google.maps.Marker({
            position: POSITION,
            map,
            title: TITLE
        });

        const tooltip = new google.maps.InfoWindow({
            content: document.getElementById('map__t')!,
            maxWidth: 184
        })
        tooltip.open(map, marker);
        marker.addListener('click', () => {
            tooltip.open(map, marker);
        })
        
        google.maps.event.addDomListener(window, 'resize', () => map.setCenter(POSITION));
    };
};
