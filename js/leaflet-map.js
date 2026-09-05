window.leafletMap = {
    maps: {},

    initMap: function (elementId, lat, lon, zoom, dotNetHelper) {
        if (this.maps[elementId]) {
            this.maps[elementId].remove();
        }

        const map = L.map(elementId).setView([lat, lon], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        this.maps[elementId] = map;

        map.on('click', function (e) {
            dotNetHelper.invokeMethodAsync('OnMapClick', e.latlng.lat, e.latlng.lng);
        });

        return true;
    },

    addMarker: function (elementId, lat, lon, title, popupContent, dotNetHelper) {
        const map = this.maps[elementId];
        if (!map) return;

        const marker = L.marker([lat, lon]).addTo(map);
        if (popupContent) {
            marker.bindPopup(popupContent);
        }

        marker.on('click', function (e) {
            dotNetHelper.invokeMethodAsync('OnMarkerClick', title);
        });
    },

    clearMarkers: function (elementId) {
        const map = this.maps[elementId];
        if (!map) return;

        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
    },

    updateHeatmap: function (elementId, data) {
        // Simple implementation of regional coloring or similar
        // For a true heatmap, leaflet.heat plugin would be needed
        console.log("Updating heatmap with data", data);
    }
};
