import { Link } from 'react-router-dom';

export const Header = () => {
    const city = 'Sevilla'; // <-- Esta es la línea que faltaba

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            padding: '15px 30px',
            background: '#111',
            borderBottom: '2px solid #ff007f',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>🕹️</span>
                <Link to="/" style={{ color: '#00f0ff', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
                    La Buhardilla Retro
                </Link>
            </div>

            <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                <Link to="/" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
                <Link to="/vendors" style={{ color: '#ff007f', textDecoration: 'none', fontWeight: 'bold' }}>Vendedores</Link>
                <Link to="/history" style={{ color: '#ffe600', textDecoration: 'none', fontWeight: 'bold' }}>Historia</Link>
                <Link to="/products" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold' }}>Productos</Link>
                <Link to="/users" style={{ color: '#ff007f', textDecoration: 'none', fontWeight: 'bold' }}>Usuarios</Link>
            </nav>

            <div style={{
                background: '#050505',
                border: '1px solid #ffe600',
                padding: '5px 12px',
                borderRadius: '15px',
                color: '#ffe600',
                fontSize: '13px',
                fontWeight: 'bold'
            }}>
                📍 {city} | 🌡️ 25°C
            </div>
        </header>
    );
};