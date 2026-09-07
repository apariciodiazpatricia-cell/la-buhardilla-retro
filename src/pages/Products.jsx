import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el formulario de alta y edición de producto
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            const productsData = Array.isArray(response.data)
                ? response.data
                : (response.data.products || []);
            setProducts(productsData);
            setError(null);
        } catch (err) {
            console.error("Error al cargar los productos:", err);
            setProducts([]);
            setError("No se pudo conectar con la API de productos en el puerto 3001.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Preparar el formulario para edición (Update - Cargar datos)
    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            title: product.title,
            category: product.category,
            price: product.price,
            description: product.description,
            image: product.image
        });
        setShowForm(true);
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    // Crear o Actualizar producto (Create / Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: parseFloat(formData.price) || 0
        };

        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, payload);
            } else {
                await api.post('/products', payload);
            }
            setFormData({ title: '', category: '', price: '', description: '', image: '' });
            setEditingId(null);
            setShowForm(false);
            fetchProducts();
        } catch (err) {
            console.error("Error al guardar el producto:", err);
            alert("Hubo un error al guardar el producto en el servidor.");
        }
    };

    // Eliminar un producto (Delete)
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto del catálogo?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error("Error al eliminar:", err);
                alert("No se pudo eliminar el producto.");
            }
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>

            {/* Hero / Cabecera con Imagen de Fondo Retro */}
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
                {/* Fondo retro temática audio/hardware con capa oscura */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.8), rgba(20, 0, 40, 0.85)), url("https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80")',
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
                        ✦ Reliquias y Alta Gama Analógica ✦
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
                        Vitrina de Productos
                    </h1>

                    <p style={{
                        color: '#ffe600',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '25px',
                        lineHeight: '1.6',
                        textShadow: '0 0 10px rgba(255, 230, 0, 0.5)'
                    }}>
                        Explora y gestiona nuestro inventario exclusivo de tesoros retro con control total de catálogo.
                    </p>

                    <button
                        onClick={() => {
                            if (showForm) {
                                setShowForm(false);
                                setEditingId(null);
                                setFormData({ title: '', category: '', price: '', description: '', image: '' });
                            } else {
                                setEditingId(null);
                                setFormData({ title: '', category: '', price: '', description: '', image: '' });
                                setShowForm(true);
                            }
                        }}
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
                        {showForm ? '❌ Cerrar Formulario' : '➕ Dar de Alta Nuevo Producto'}
                    </button>
                </div>
            </div>

            {/* Formulario Desplegable para Alta / Edición de Producto */}
            {showForm && (
                <form onSubmit={handleSubmit} style={{
                    backgroundColor: '#111', border: `2px solid ${editingId ? '#00f0ff' : '#ffe600'}`, borderRadius: '15px',
                    padding: '25px', marginBottom: '35px', boxShadow: `0 0 15px ${editingId ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 230, 0, 0.2)'}`
                }}>
                    <h3 style={{ color: editingId ? '#00f0ff' : '#ffe600', marginBottom: '20px', textAlign: 'center' }}>
                        {editingId ? '✏️ Modificar Producto del Catálogo' : '✨ Registrar Nuevo Tesoro en el Catálogo'}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                        <input
                            type="text" placeholder="Título del Producto" value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="Categoría (ej: Audio, Tecnología)" value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="number" step="0.01" placeholder="Precio (€)" value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="URL de la Imagen" value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                    </div>

                    <textarea
                        placeholder="Descripción detallada del artículo..." value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })} required rows="2"
                        style={{ width: '100%', padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px', marginBottom: '15px' }}
                    />

                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button type="submit" style={{
                            backgroundColor: editingId ? '#00f0ff' : '#ffe600', color: '#000', border: 'none', padding: '10px 30px',
                            borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                        }}>
                            {editingId ? '💾 Actualizar Producto' : 'Guardar Producto'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setShowForm(false);
                                    setFormData({ title: '', category: '', price: '', description: '', image: '' });
                                }}
                                style={{
                                    backgroundColor: 'transparent', color: '#aaa', border: '1px solid #555', padding: '10px 20px',
                                    borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            )}

            <h3 style={{ color: '#ffe600', fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                ⚡ Catálogo Activo ({products.length})
            </h3>

            {loading && <p style={{ color: '#00f0ff' }}>Cargando productos de la vitrina...</p>}
            {error && <p style={{ color: '#ff007f' }}>{error}</p>}

            {/* Listado de Productos en Parrilla Responsive (3 columnas) */}
            {!loading && !error && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '25px' }}>
                    {products.map((item) => (
                        <div key={item.id} style={{
                            backgroundColor: '#111', border: '1px solid #00f0ff', borderRadius: '12px',
                            overflow: 'hidden', boxShadow: '0 0 12px rgba(0, 240, 255, 0.15)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                        }}>
                            <div>
                                {/* Imagen del producto */}
                                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
                                    <img
                                        src={item.image} alt={item.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
                                        }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <span style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        backgroundColor: '#1a0033', color: '#00f0ff', border: '1px solid #00f0ff',
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
                                        textTransform: 'uppercase', letterSpacing: '1px'
                                    }}>
                                        {item.category}
                                    </span>
                                </div>

                                <div style={{ padding: '20px' }}>
                                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>{item.title}</h4>
                                    <p style={{ color: '#ffe600', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                                        {Number(item.price).toFixed(2)} €
                                    </p>
                                    <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.4', marginBottom: '20px' }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #00f0ff',
                                        color: '#00f0ff', padding: '10px', borderRadius: '8px', fontSize: '12px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', transition: '0.2s',
                                        boxShadow: '0 0 8px rgba(0, 240, 255, 0.2)'
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #ff007f',
                                        color: '#ff007f', padding: '10px', borderRadius: '8px', fontSize: '12px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', transition: '0.2s',
                                        boxShadow: '0 0 8px rgba(255, 0, 127, 0.2)'
                                    }}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};