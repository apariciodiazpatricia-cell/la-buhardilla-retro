import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Vendors = () => {
    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    // Estados en camelCase para el formulario y control de edición
    const [showForm, setShowForm] = useState(false);
    const [editingVendorId, setEditingVendorId] = useState(null);
    const [vendorFormData, setVendorFormData] = useState({
        name: '',
        role: '',
        bio: '',
        avatar: ''
    });

    const fetchTeam = async () => {
        try {
            const response = await api.get('/vendedores');
            const teamData = Array.isArray(response.data) ? response.data : (response.data.vendedores || []);
            setTeamList(teamData);
            setErrorMessage(null);
        } catch (err) {
            console.error("Error al cargar los vendedores:", err);
            setTeamList([]);
            setErrorMessage("No se pudo conectar con la API de vendedores en el puerto 3001.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    // Crear o Actualizar miembro (Create / Update)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVendorId) {
                await api.put(`/vendedores/${editingVendorId}`, vendorFormData);
            } else {
                await api.post('/vendedores', vendorFormData);
            }
            resetVendorForm();
            fetchTeam();
        } catch (err) {
            console.error("Error al guardar miembro:", err);
            alert("Hubo un error al guardar al miembro del equipo en el servidor.");
        }
    };

    // Preparar formulario para editar
    const handleEditClick = (member) => {
        setEditingVendorId(member.id);
        setVendorFormData({
            name: member.name || '',
            role: member.role || '',
            bio: member.bio || '',
            avatar: member.avatar || ''
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Resetear el formulario
    const resetVendorForm = () => {
        setVendorFormData({ name: '', role: '', bio: '', avatar: '' });
        setEditingVendorId(null);
        setShowForm(false);
    };

    // Eliminar miembro (Delete)
    const handleDeleteVendor = async (id) => {
        if (window.confirm("¿Estás seguro de dar de baja a este miembro del equipo?")) {
            try {
                await api.delete(`/vendedores/${id}`);
                fetchTeam();
            } catch (err) {
                console.error("Error al eliminar vendedor:", err);
                alert("No se pudo eliminar al vendedor.");
            }
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>

            {/* Hero / Cabecera con Imagen de Fondo */}
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
                    backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.8), rgba(20, 0, 40, 0.85)), url("https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1
                }}></div>

                <div style={{ position: 'relative', zIndex: 2, padding: '40px 20px', maxWidth: '800px' }}>
                    <span style={{
                        color: '#ffe600', fontSize: '13px', textTransform: 'uppercase',
                        letterSpacing: '3px', fontWeight: 'bold', display: 'block', marginBottom: '10px',
                        textShadow: '0 0 8px rgba(255, 230, 0, 0.6)'
                    }}>
                        ✦ El talento al frente del pasado ✦
                    </span>

                    <h1 style={{
                        color: '#00f0ff', fontSize: '38px', fontWeight: '900', marginBottom: '15px',
                        textTransform: 'uppercase', letterSpacing: '2px',
                        textShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)'
                    }}>
                        Equipo de Vendedores y Expertos
                    </h1>

                    <p style={{
                        color: '#ffe600', fontSize: '16px', fontWeight: 'bold', marginBottom: '25px',
                        lineHeight: '1.6', textShadow: '0 0 10px rgba(255, 230, 0, 0.5)'
                    }}>
                        Gestiona los rostros al frente de La Buhardilla Retro. Control total del equipo.
                    </p>

                    <button
                        onClick={() => {
                            if (showForm && editingVendorId) {
                                resetVendorForm();
                            } else {
                                setShowForm(!showForm);
                            }
                        }}
                        style={{
                            backgroundColor: '#ff007f', color: '#fff', border: 'none', padding: '12px 25px',
                            borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px',
                            textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 0 15px rgba(255, 0, 127, 0.7)',
                            transition: '0.3s'
                        }}
                    >
                        {showForm ? '❌ Cerrar Formulario' : '➕ Dar de Alta Nuevo Miembro'}
                    </button>
                </div>
            </div>

            {/* Formulario Desplegable */}
            {showForm && (
                <form onSubmit={handleFormSubmit} style={{
                    backgroundColor: '#111', border: '2px solid #ffe600', borderRadius: '15px',
                    padding: '25px', marginBottom: '35px', boxShadow: '0 0 15px rgba(255, 230, 0, 0.2)'
                }}>
                    <h3 style={{ color: '#ffe600', marginBottom: '20px', textAlign: 'center' }}>
                        {editingVendorId ? '✏️ Editar Miembro del Equipo' : '✨ Registrar Nuevo Miembro del Equipo'}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                        <input
                            type="text" placeholder="Nombre y Apellidos" value={vendorFormData.name}
                            onChange={e => setVendorFormData({ ...vendorFormData, name: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="Rol / Especialidad" value={vendorFormData.role}
                            onChange={e => setVendorFormData({ ...vendorFormData, role: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="URL del Avatar / Foto" value={vendorFormData.avatar}
                            onChange={e => setVendorFormData({ ...vendorFormData, avatar: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                    </div>

                    <textarea
                        placeholder="Breve biografía o trayectoria..." value={vendorFormData.bio}
                        onChange={e => setVendorFormData({ ...vendorFormData, bio: e.target.value })} required rows="2"
                        style={{ width: '100%', padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px', marginBottom: '15px' }}
                    />

                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button type="submit" style={{
                            backgroundColor: '#ffe600', color: '#000', border: 'none', padding: '10px 30px',
                            borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                        }}>
                            {editingVendorId ? '💾 Actualizar Miembro' : '💾 Guardar Miembro'}
                        </button>
                        {editingVendorId && (
                            <button type="button" onClick={resetVendorForm} style={{
                                backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 20px',
                                borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                            }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            )}

            <h3 style={{ color: '#ffe600', fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                ⚡ Plantilla de Expertos ({teamList.length})
            </h3>

            {isLoading && <p style={{ color: '#00f0ff' }}>Cargando equipo...</p>}
            {errorMessage && <p style={{ color: '#ff007f' }}>{errorMessage}</p>}

            {!isLoading && !errorMessage && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {teamList.map((member) => (
                        <div key={member.id} style={{
                            backgroundColor: '#111', border: '1px solid #00f0ff', borderRadius: '10px',
                            overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 240, 255, 0.15)',
                            display: 'flex', flexDirection: 'column', padding: '25px 20px', alignItems: 'center',
                            textAlign: 'center', justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{
                                    width: '85px', height: '85px', borderRadius: '50%', overflow: 'hidden',
                                    margin: '0 auto 15px auto', border: '2px solid #ff007f',
                                    boxShadow: '0 0 10px rgba(255, 0, 127, 0.6)', backgroundColor: '#000'
                                }}>
                                    <img
                                        src={member.avatar} alt={member.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                                        }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <h4 style={{ color: '#fff', fontSize: '17px', marginBottom: '5px' }}>{member.name}</h4>
                                <span style={{
                                    color: '#ffe600', fontSize: '11px', textTransform: 'uppercase',
                                    letterSpacing: '1px', display: 'block', marginBottom: '12px', fontWeight: 'bold'
                                }}>
                                    {member.role}
                                </span>
                                <p style={{ color: '#aaa', fontSize: '12px', lineHeight: '1.4', marginBottom: '20px' }}>
                                    {member.bio}
                                </p>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEditClick(member)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #00f0ff',
                                        color: '#00f0ff', padding: '8px', borderRadius: '6px', fontSize: '11px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteVendor(member.id)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #ff007f',
                                        color: '#ff007f', padding: '8px', borderRadius: '6px', fontSize: '11px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                                    }}
                                >
                                    🗑️ Dar de Baja
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};