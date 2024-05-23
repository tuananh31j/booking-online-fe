'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function MapDisplay() {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_API_MAPS as string,
                version: 'weekly',
            });
            // init marker
            const { AdvancedMarkerElement } = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary;
            const { Map } = await loader.importLibrary('maps');
            const position = {
                lat: 21.05876,
                lng: 105.83066,
            };
            // map option
            const mapOption: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAPID',
            };
            // setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOption);
            // put up a marker
            // eslint-disable-next-line no-unused-vars
            const marker = new AdvancedMarkerElement({
                map,
                position,
            });
        };
        initMap();
    }, []);
    return <div className='h-[300px] w-full' ref={mapRef} />;
}
