export const RetroImage = ({ title, category }) => {
    return (
        <div style={{
            width: '100vw',
            height: '160px',
            background: 'linear-gradient(135deg, #111 0%, #1a0033 100%)',
            borderBottom: '2px solid #00f0ff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Cuadrícula estilo rejilla ochentera (Synthwave grid lines) */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '50%',
                backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 127, 0.2) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                transform: 'perspective(200px) rotateX(45deg)',
                transformOrigin: 'bottom'
            }} />

            {/* Ícono o iniciales decorativas retro */}
            <span style={{
                fontSize: '28px',
                marginBottom: '5px',
                filter: 'drop-shadow(0 0 8px #ff007f)'
            }}>
                {category === 'Audio' ? '🎵' : category === 'Decoración' ? '🔮' : category === 'Tecnología' ? '🕹️' : category === 'Fotografía' ? '📸' : category === 'Iluminación' ? '💡' : '🕶️'}
            </span>

            {/* Etiqueta flotante */}
            <span style={{
                color: '#ffe600',
                fontSize: '11px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                zIndex: 2,
                textShadow: '0 0 5px rgba(255, 230, 0, 0.6)'
            }}>
                [ La Buhardilla Retro ]
            </span>
        </div>
    );
};