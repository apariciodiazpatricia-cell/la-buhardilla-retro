export const History = () => {
    const milestones = [
        {
            year: "2015",
            title: "El Desván Original en Sevilla",
            desc: "Todo comenzó como un pequeño proyecto de restauración de recreativas y audio analógico en un modesto local particular en el Aljarafe sevillano."
        },
        {
            year: "2018",
            title: "El Salto Digital y la Comunidad",
            desc: "Ante la alta demanda de coleccionistas de toda España, lanzamos nuestro primer catálogo digital especializado en reliquias de los 70 y 80."
        },
        {
            year: "2023",
            title: "La Apertura de La Buhardilla Retro",
            desc: "Consolidación de la marca con el catálogo actual, uniendo la experiencia técnica en hardware clásico con el diseño neón y synthwave."
        },
        {
            year: "Actualidad",
            title: "El Viaje Definitivo al Pasado",
            desc: "Un referente nacional en tecnología clásica, decoración y piezas de colección únicas con envíos seguros y garantía de restauración."
        }
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>

            {/* Hero / Cabecera con Estética Retro */}
            <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid #00f0ff',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)',
                marginBottom: '40px',
                minHeight: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.8), rgba(20, 0, 40, 0.85)), url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1
                }}></div>

                <div style={{ position: 'relative', zIndex: 2, padding: '40px 20px', maxWidth: '800px' }}>
                    <span style={{
                        color: '#ffe600',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontWeight: 'bold',
                        display: 'block',
                        marginBottom: '10px',
                        textShadow: '0 0 8px rgba(255, 230, 0, 0.6)'
                    }}>
                        ✦ Nuestra Trayectoria ✦
                    </span>

                    <h1 style={{
                        color: '#00f0ff',
                        fontSize: '38px',
                        fontWeight: '900',
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)'
                    }}>
                        Historia de La Buhardilla Retro
                    </h1>

                    <p style={{
                        color: '#ffe600',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: '1.7',
                        maxWidth: '620px',
                        margin: '0 auto',
                        textShadow: '0 0 10px rgba(255, 230, 0, 0.5)',
                        textWrap: 'balance'
                    }}>
                        Más de una década rescatando la nostalgia analógica,<br />
                        el diseño industrial y la magia de las décadas doradas.
                    </p>
                </div>
            </div>

            {/* Manifiesto / Historia Principal */}
            <div style={{
                backgroundColor: '#111',
                border: '1px solid #00f0ff',
                borderRadius: '15px',
                padding: '30px',
                marginBottom: '40px',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
            }}>
                <h3 style={{ color: '#ffe600', fontSize: '22px', marginBottom: '15px' }}>📖 El Origen de una Pasión</h3>
                <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '15px', marginBottom: '15px' }}>
                    La Buhardilla Retro no nació en un gran despacho corporativo, sino del empeño personal de un grupo de entusiastas de la electrónica clásica y el diseño de los años 60, 70 y 80. Lo que empezó como un hobby de fin de semana restaurando placas de recreativas y tocadiscos antiguos en un desván, evolucionó de forma natural hasta convertirse en el punto de encuentro definitivo para coleccionistas y amantes de la estética retro.
                </p>
                <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '15px' }}>
                    Nuestra misión es clara: cada objeto que pasa por nuestras manos recupera su esplendor original combinando autenticidad histórica con acabados de máxima calidad visual y técnica.
                </p>
            </div>

            {/* Línea Temporal de Hitos */}
            <h3 style={{ color: '#ffe600', fontSize: '22px', marginBottom: '25px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                ⚡ Hitos Clave en el Tiempo
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {milestones.map((item, index) => (
                    <div key={index} style={{
                        backgroundColor: '#111',
                        border: '1px solid #ff007f',
                        borderRadius: '12px',
                        padding: '25px',
                        boxShadow: '0 0 12px rgba(255, 0, 127, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <span style={{
                                color: '#00f0ff',
                                fontSize: '20px',
                                fontWeight: '900',
                                display: 'block',
                                marginBottom: '10px',
                                textShadow: '0 0 8px rgba(0, 240, 255, 0.6)'
                            }}>
                                {item.year}
                            </span>
                            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>{item.title}</h4>
                            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.5' }}>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};