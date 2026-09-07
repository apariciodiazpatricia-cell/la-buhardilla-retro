export const Footer = () => {
    return (
        <footer style={{
            marginTop: '60px',
            padding: '35px 40px',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
            borderTop: '2px solid #00f0ff',
            boxShadow: '0 -4px 20px rgba(0, 240, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            textAlign: 'center',
            color: '#aaa'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px', filter: 'drop-shadow(0 0 6px #ff007f)' }}>⚡</span>
                <span style={{ color: '#00f0ff', fontWeight: 'bold', fontSize: '18px', textShadow: '0 0 8px rgba(0, 240, 255, 0.4)' }}>
                    La Buhardilla Retro
                </span>
            </div>
            <p style={{ fontSize: '14px', maxWidth: '500px', margin: 0, color: '#ccc' }}>
                Rescatando los tesoros y la estética neón de los años 60, 70 y 80. Tu espacio de coleccionismo exclusivo.
            </p>
            <div style={{ fontSize: '12px', color: '#666', borderTop: '1px solid #222', width: '100%', paddingTop: '15px', marginTop: '10px' }}>
                © 2026 La Buhardilla Retro. Todos los derechos reservados. Diseñado con estilo por Patri Aparicio.
            </div>
        </footer>
    );
};