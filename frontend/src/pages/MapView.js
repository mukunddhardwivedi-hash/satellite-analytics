import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, Row, Col, Button, Checkbox } from 'antd';
import { useMapStore } from '../stores/mapStore';
import satelliteService from '../services/satelliteService';
import eventService from '../services/eventService';
import './MapView.css';

const MapView = () => {
  const mapState = useMapStore();
  const [satelliteData, setSatelliteData] = useState([]);
  const [naturalEvents, setNaturalEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [satRes, eventRes] = await Promise.all([
        satelliteService.getAll({ limit: 100 }),
        eventService.getAll({ limit: 100 }),
      ]);
      setSatelliteData(satRes.data || []);
      setNaturalEvents(eventRes.data || []);
    } catch (error) {
      console.error('Failed to fetch map data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Map View</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Card>
            <h3>Controls</h3>
            <div style={{ marginBottom: '15px' }}>
              <Checkbox
                checked={mapState.showSatelliteData}
                onChange={mapState.toggleSatelliteData}
              >
                Show Satellite Data
              </Checkbox>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <Checkbox
                checked={mapState.showNaturalEvents}
                onChange={mapState.toggleNaturalEvents}
              >
                Show Natural Events
              </Checkbox>
            </div>
            <Button block onClick={fetchData} loading={loading}>
              Refresh Data
            </Button>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Satellite Data:</strong> {satelliteData.length}</p>
              <p><strong>Natural Events:</strong> {naturalEvents.length}</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={18}>
          <Card style={{ height: '600px' }}>
            <MapContainer
              center={mapState.center}
              zoom={mapState.zoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {mapState.showSatelliteData &&
                satelliteData.map((item) => (
                  <Marker
                    key={item.id}
                    position={[item.latitude, item.longitude]}
                    icon={L.icon({
                      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41],
                    })}
                  >
                    <Popup>
                      <div>
                        <strong>{item.dataType}</strong>
                        <p>Value: {item.value} {item.unit}</p>
                        <p>Region: {item.region}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              {mapState.showNaturalEvents &&
                naturalEvents.map((event) => (
                  <Marker
                    key={event.id}
                    position={[event.latitude, event.longitude]}
                    icon={L.icon({
                      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41],
                    })}
                  >
                    <Popup>
                      <div>
                        <strong>{event.eventType}</strong>
                        <p>{event.title}</p>
                        <p>Severity: {event.severity}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MapView;
