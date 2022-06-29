import React, { useRef, useEffect, useState } from 'react';
import { countries, arcs } from '../datasets';
import Img32 from './32.svg';

const withLazyGlobe =
    (Component) =>
    ({ props }) => {
        const [Globe, setGlobe] = useState();
        useEffect(() => {
            import('react-globe.gl').then((module) => setGlobe(module.default));
        }, []);
        if (!Globe) {
            return null;
        }
        return <Component {...props} Globe={Globe} />;
    };

function GlobeComponent({ Globe }) {
    // arcs should be set on separate render after mount
    const [arcsData, setArcsData] = useState();
    useEffect(() => setArcsData(arcs), []);

    const globeEl = useRef();

    useEffect(() => {
        if (!globeEl.current) {
            return;
        }
        const updateGlobe = () => {
            const controls = globeEl.current.controls();
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            const scene = globeEl.current.scene();
            if (!scene.children.some((child) => child.type === 'DirectionalLight')) {
                setTimeout(updateGlobe, 100);
            } else {
                scene.children.forEach((child) => {
                    if (child.type === 'DirectionalLight') {
                        scene.remove(child);
                    }
                    if (child.type === 'AmbientLight') {
                        child.intensity = 1;
                        child.color = { r: 1, g: 1, b: 1 };
                    }
                });
            }
        };

        setTimeout(updateGlobe, 0);
    }, [globeEl]);

    return (
        <Globe
            ref={globeEl}
            height={window.screen.width > 768 ? 1440 : 400}
            width={window.screen.width > 768 ? 1800 : 400}
            waitForGlobeReady={true}
            globeImageUrl={Img32}
            backgroundColor='rgba(255, 255, 255, 0.0)'
            arcsData={arcsData}
            arcStartLat={(d) => d.startlat}
            arcStartLng={(d) => d.startlng}
            arcEndLat={(d) => d.endlat}
            arcEndLng={(d) => d.endlng}
            arcStroke={0.3}
            arcDashLength={0.6}
            arcDashGap={1}
            arcDashInitialGap={() => Math.random()}
            arcDashAnimateTime={3000}
            arcLabel={(d) => d.label}
            arcColor={() => 'rgba(255, 255, 255, 0.6)'}
            arcAltitude={0.1}
            arcsTransitionDuration={0}
            hexPolygonsData={countries.features}
            hexPolygonResolutio={3}
            hexPolygonMargin={0.3}
            hexPolygonColor={() => 'rgba(255, 255, 255, 0.25)'}
            showAtmosphere={true}
            atmosphereAltitude={0.4}
            atmosphereColor='#E8C8FE'
            // options={{
            //   cameraAutoRotateSpeed: 0,
            // }}

            // showGlobe={false}
            // globeMaterial='#d270e6'
        />
    );
}
export default withLazyGlobe(GlobeComponent);
