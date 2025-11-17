"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type TravelMapProps = {
  onChangeOrigin: (value: string) => void;
  onChangeDestination: (value: string) => void;
};

export function TravelMap({
  onChangeOrigin,
  onChangeDestination,
}: TravelMapProps) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeField, setActiveField] = useState<"origin" | "destination">(
    "origin"
  );
  const activeFieldRef = useRef<"origin" | "destination">("origin");

  const originMarkerRef = useRef<Marker | null>(null);
  const destinationMarkerRef = useRef<Marker | null>(null);

  // Mantener el ref sincronizado con el estado
  useEffect(() => {
    activeFieldRef.current = activeField;
  }, [activeField]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center: [-66.857, 10.235],
      zoom: 12,
      pitch: 30,
      bearing: -10,
      interactive: true,
    });

    mapRef.current = map;

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      let placeName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        if (data.display_name) placeName = data.display_name;
      } catch (err) {
        console.error("Error obteniendo nombre del lugar:", err);
      }

      if (activeFieldRef.current === "origin") {
        if (originMarkerRef.current) originMarkerRef.current.remove();
        originMarkerRef.current = new maplibregl.Marker({ color: "#2563EB" })
          .setLngLat([lng, lat])
          .setPopup(
            new maplibregl.Popup({ offset: 12 }).setHTML(
              "<strong>Origen</strong>"
            )
          )
          .addTo(map);
        onChangeOrigin(placeName);
      } else {
        if (destinationMarkerRef.current) destinationMarkerRef.current.remove();
        destinationMarkerRef.current = new maplibregl.Marker({
          color: "#DC2626",
        })
          .setLngLat([lng, lat])
          .setPopup(
            new maplibregl.Popup({ offset: 12 }).setHTML(
              "<strong>Destino</strong>"
            )
          )
          .addTo(map);
        onChangeDestination(placeName);
      }
    });

    return () => {
      map.remove();
    };
  }, [onChangeOrigin, onChangeDestination]);

  return (
    <section style={{ width: "100%", height: "300px", position: "relative" }}>
      {/* Panel interno */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          background: "rgba(255,255,255,0.9)",
          padding: "8px",
          borderRadius: "8px",
          display: "flex",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <button
          onClick={() => setActiveField("origin")}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            background: activeField === "origin" ? "#2563EB" : "#E2E8F0",
            color: activeField === "origin" ? "white" : "black",
          }}
        >
          Origen
        </button>
        <button
          onClick={() => setActiveField("destination")}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            background: activeField === "destination" ? "#DC2626" : "#E2E8F0",
            color: activeField === "destination" ? "white" : "black",
          }}
        >
          Destino
        </button>
      </div>

      <div
        id="map"
        ref={containerRef}
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      />
    </section>
  );
}
