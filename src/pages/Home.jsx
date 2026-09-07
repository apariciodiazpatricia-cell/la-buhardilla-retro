import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Home = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', price: '', description: '', image: '' });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const fetchTopProducts = async () => {
        try {
            const response = await api.get('/products');
            const productsData = Array.isArray(response.data) ? response.data : (response.data.products || []);
            const sorted = [...productsData].sort((a, b) => b.price - a.price);
            setTopProducts(sorted.slice(0, 6));
        } catch {
            setError("No se pudo conectar con la API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTopProducts(); }, []);

    // Auto-avance del carrusel cada 4 segundos (se pausa al pasar el ratón)
    useEffect(() => {
        if (topProducts.length <= 1 || isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % topProducts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [topProducts, isPaused]);

    const nextSlide = () => {
        if (topProducts.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % topProducts.length);
        }
    };

    const prevSlide = () => {
        if (topProducts.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + topProducts.length) % topProducts.length);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, formData);
            } else {
                await api.post('/products', formData);
            }
            setFormData({ title: '', category: '', price: '', description: '', image: '' });
            setShowForm(false);
            setEditingId(null);
            fetchTopProducts();
        } catch {
            alert("Error al guardar en el servidor.");
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({ title: product.title, category: product.category, price: product.price, description: product.description, image: product.image });
        setShowForm(true);
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de borrar este artículo?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchTopProducts();
                setCurrentIndex(0);
            } catch {
                alert("Error al borrar el producto.");
            }
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>

            {/* Hero Espectacular */}
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
                        ✦ El viaje definitivo al pasado ✦
                    </span>

                    <h1 style={{
                        color: '#00f0ff',
                        fontSize: '42px',
                        fontWeight: '900',
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)'
                    }}>
                        La Buhardilla Retro
                    </h1>

                    {/* Subtítulo forzado en amarillo chillón y rotundo */}
                    <p style={{
                        color: '#ffe600 !important',
                        fontSize: '16px',
                        fontWeight: '800',
                        marginBottom: '25px',
                        lineHeight: '1.6',
                        textShadow: '0 0 12px rgba(255, 230, 0, 0.8)'
                    }}>
                        Tu portal exclusivo de reliquias, tecnología clásica y estética neón de los años 60, 70 y 80.
                    </p>

                    <button
                        onClick={() => { setEditingId(null); setFormData({ title: '', category: '', price: '', description: '', image: '' }); setShowForm(!showForm); }}
                        style={{
                            backgroundColor: '#ff007f',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 0 15px rgba(255, 0, 127, 0.7)',
                            transition: '0.3s'
                        }}
                    >
                        {showForm ? '❌ Cerrar Formulario' : '➕ Añadir Nueva Reliquia'}
                    </button>
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#111', border: '2px solid #ffe600', padding: '25px', borderRadius: '15px', marginBottom: '35px', boxShadow: '0 0 15px rgba(255, 230, 0, 0.2)' }}>
                    <h3 style={{ color: '#ffe600', marginBottom: '20px', textAlign: 'center' }}>{editingId ? '✏️ Editar Reliquia' : '✨ Registrar Nueva Reliquia'}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                        <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f0ff', borderRadius: '5px' }} />
                        <input type="text" placeholder="Categoría" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f0ff', borderRadius: '5px' }} />
                        <input type="number" placeholder="Precio (€)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f0ff', borderRadius: '5px' }} />
                        <input type="text" placeholder="URL Imagen" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required style={{ padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f0ff', borderRadius: '5px' }} />
                    </div>
                    <textarea placeholder="Descripción detallada..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required rows="3" style={{ width: '100%', padding: '10px', background: '#000', color: '#fff', border: '1px solid #00f0ff', borderRadius: '5px', marginBottom: '15px' }} />
                    <div style={{ textAlign: 'center' }}>
                        <button type="submit" style={{ backgroundColor: '#00f0ff', color: '#000', border: 'none', padding: '10px 30px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase' }}>Guardar Reliquia</button>
                    </div>
                </form>
            )}

            {/* Cabecera de la Sección Carrusel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>
                <div>
                    <h3 style={{ color: '#ffe600', fontSize: '22px', margin: 0, textShadow: '0 0 8px rgba(255, 230, 0, 0.5)' }}>
                        ⚡ Showcase Dinámico de Joyas de Colección
                    </h3>
                    <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0 0' }}>
                        Los artículos más cotizados rotando automáticamente. Pasa el ratón para pausar o usa las flechas.
                    </p>
                </div>
                {isPaused && (
                    <span style={{
                        backgroundColor: '#ff007f', color: '#fff', fontSize: '11px', fontWeight: 'bold',
                        padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '1px',
                        boxShadow: '0 0 8px rgba(255, 0, 127, 0.7)'
                    }}>
                        ⏸️ Pausado
                    </span>
                )}
            </div>

            {loading && <p style={{ color: '#00f0ff', textAlign: 'center', padding: '40px' }}>Cargando reliquias...</p>}
            {error && <p style={{ color: '#ff007f', textAlign: 'center', padding: '40px' }}>{error}</p>}

            {/* Componente Carrusel */}
            {!loading && !error && topProducts.length > 0 && (
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{ marginBottom: '40px' }}
                >
                    {/* Tarjeta Principal del Slide Activo */}
                    <div style={{
                        position: 'relative',
                        backgroundColor: '#111',
                        border: '2px solid #00f0ff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 0 30px rgba(0, 240, 255, 0.25), inset 0 0 20px rgba(255, 0, 127, 0.1)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        minHeight: '380px'
                    }}>
                        {/* Botón Flecha Izquierda */}
                        <button
                            onClick={prevSlide}
                            aria-label="Anterior"
                            style={{
                                position: 'absolute',
                                left: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                backgroundColor: 'rgba(5, 5, 5, 0.8)',
                                border: '2px solid #00f0ff',
                                color: '#00f0ff',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                fontSize: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)',
                                transition: '0.2s'
                            }}
                        >
                            ◀
                        </button>

                        {/* Botón Flecha Derecha */}
                        <button
                            onClick={nextSlide}
                            aria-label="Siguiente"
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                backgroundColor: 'rgba(5, 5, 5, 0.8)',
                                border: '2px solid #00f0ff',
                                color: '#00f0ff',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                fontSize: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)',
                                transition: '0.2s'
                            }}
                        >
                            ▶
                        </button>

                        {/* Lado Izquierdo: Imagen Grande con Insignias */}
                        <div style={{ position: 'relative', minHeight: '280px', backgroundColor: '#000', overflow: 'hidden' }}>
                            <img
                                key={topProducts[currentIndex].id}
                                src={topProducts[currentIndex].image}
                                alt={topProducts[currentIndex].title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                            />

                            {/* Ranking Badge (#1, #2...) */}
                            <span style={{
                                position: 'absolute', top: '15px', left: '15px',
                                backgroundColor: '#ff007f', color: '#fff',
                                padding: '6px 14px', borderRadius: '20px', fontWeight: '900',
                                fontSize: '13px', zIndex: 2, boxShadow: '0 0 15px rgba(255, 0, 127, 0.9)',
                                textTransform: 'uppercase', letterSpacing: '1px'
                            }}>
                                🏆 #{currentIndex + 1} Más Valioso
                            </span>

                            {/* Categoría Badge */}
                            <span style={{
                                position: 'absolute', bottom: '15px', left: '15px',
                                backgroundColor: 'rgba(26, 0, 51, 0.9)', color: '#00f0ff',
                                border: '1px solid #00f0ff', padding: '5px 12px', borderRadius: '15px',
                                fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase',
                                letterSpacing: '1px', boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)'
                            }}>
                                {topProducts[currentIndex].category}
                            </span>
                        </div>

                        {/* Lado Derecho: Información Detallada y Acciones */}
                        <div style={{
                            padding: '40px 50px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: '#0a0a0f'
                        }}>
                            <div>
                                <span style={{
                                    color: '#00f0ff', fontSize: '12px', textTransform: 'uppercase',
                                    letterSpacing: '2px', fontWeight: 'bold', display: 'block', marginBottom: '8px'
                                }}>
                                    ✦ Reliquia Exclusiva Destacada
                                </span>

                                <h2 style={{
                                    color: '#fff', fontSize: '28px', fontWeight: '900',
                                    marginBottom: '15px', lineHeight: '1.2'
                                }}>
                                    {topProducts[currentIndex].title}
                                </h2>

                                <div style={{
                                    color: '#ffe600',
                                    fontSize: '32px',
                                    fontWeight: '900',
                                    marginBottom: '15px',
                                    textShadow: '0 0 15px rgba(255, 230, 0, 0.6)'
                                }}>
                                    {Number(topProducts[currentIndex].price || 0).toFixed(2)} €
                                </div>

                                <p style={{ color: '#bbb', fontSize: '14px', lineHeight: '1.7', marginBottom: '25px' }}>
                                    {topProducts[currentIndex].description}
                                </p>
                            </div>

                            {/* Botones de Acción CRUD */}
                            <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #222', paddingTop: '20px' }}>
                                <button
                                    onClick={() => handleEdit(topProducts[currentIndex])}
                                    style={{
                                        flex: 1, backgroundColor: '#00f0ff', color: '#000',
                                        border: 'none', padding: '12px', borderRadius: '8px',
                                        fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
                                        textTransform: 'uppercase', letterSpacing: '1px',
                                        boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)'
                                    }}
                                >
                                    ✏️ Modificar
                                </button>
                                <button
                                    onClick={() => handleDelete(topProducts[currentIndex].id)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #ff007f',
                                        color: '#ff007f', padding: '12px', borderRadius: '8px',
                                        fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
                                        textTransform: 'uppercase', letterSpacing: '1px',
                                        boxShadow: '0 0 10px rgba(255, 0, 127, 0.3)'
                                    }}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Barra de Miniaturas / Selectores Inferiores */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '12px',
                        marginTop: '20px'
                    }}>
                        {topProducts.map((prod, idx) => {
                            const isActive = idx === currentIndex;
                            return (
                                <div
                                    key={prod.id || idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: isActive ? '#1a0033' : '#111',
                                        border: isActive ? '2px solid #00f0ff' : '1px solid #333',
                                        boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '6px',
                                        overflow: 'hidden', flexShrink: 0, backgroundColor: '#000'
                                    }}>
                                        <img
                                            src={prod.image} alt={prod.title}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80';
                                            }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ overflow: 'hidden', flex: 1 }}>
                                        <div style={{
                                            color: isActive ? '#00f0ff' : '#aaa',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            #{idx + 1} {prod.title}
                                        </div>
                                        <div style={{ color: '#ffe600', fontSize: '11px', fontWeight: 'bold' }}>
                                            {Number(prod.price || 0).toFixed(2)} €
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};