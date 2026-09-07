import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    // Estados en camelCase para el formulario y control de edición
    const [showForm, setShowForm] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        role: '',
        avatar: ''
    });

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            const usersData = Array.isArray(response.data)
                ? response.data
                : (response.data.users || []);
            setUsersList(usersData);
            setErrorMessage(null);
        } catch (err) {
            console.error("Error al cargar los usuarios:", err);
            setUsersList([]);
            setErrorMessage("No se pudo conectar con la API de usuarios en el puerto 3001.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Crear o Actualizar un usuario (Create / Update)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                await api.put(`/users/${editingUserId}`, userFormData);
            } else {
                await api.post('/users', userFormData);
            }
            resetUserForm();
            fetchUsers();
        } catch (err) {
            console.error("Error al guardar usuario:", err);
            alert("Hubo un error al guardar el usuario en el servidor.");
        }
    };

    // Preparar formulario para editar
    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setUserFormData({
            name: user.name || '',
            email: user.email || '',
            role: user.role || '',
            avatar: user.avatar || ''
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Resetear el formulario
    const resetUserForm = () => {
        setUserFormData({ name: '', email: '', role: '', avatar: '' });
        setEditingUserId(null);
        setShowForm(false);
    };

    // Eliminar un usuario (Delete)
    const handleDeleteUser = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario del sistema?")) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error("Error al eliminar usuario:", err);
                alert("No se pudo eliminar el usuario.");
            }
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>

            {/* Hero / Cabecera */}
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
                    backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.8), rgba(20, 0, 40, 0.85)), url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80")',
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
                        ✦ Gestión y Control de Cuentas ✦
                    </span>

                    <h1 style={{
                        color: '#00f0ff', fontSize: '38px', fontWeight: '900', marginBottom: '15px',
                        textTransform: 'uppercase', letterSpacing: '2px',
                        textShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)'
                    }}>
                        Gestión de Usuarios
                    </h1>

                    <p style={{
                        color: '#ffe600', fontSize: '16px', fontWeight: 'bold', marginBottom: '25px',
                        lineHeight: '1.6', textShadow: '0 0 10px rgba(255, 230, 0, 0.5)'
                    }}>
                        Administra los perfiles de la comunidad de La Buhardilla Retro con control total de altas, ediciones y accesos.
                    </p>

                    <button
                        onClick={() => {
                            if (showForm && editingUserId) {
                                resetUserForm();
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
                        {showForm ? '❌ Cerrar Formulario' : '➕ Registrar Nuevo Usuario'}
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
                        {editingUserId ? '✏️ Editar Usuario' : '✨ Registrar Nuevo Miembro en la Comunidad'}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                        <input
                            type="text" placeholder="Nombre y Apellidos" value={userFormData.name}
                            onChange={e => setUserFormData({ ...userFormData, name: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="email" placeholder="Correo Electrónico" value={userFormData.email}
                            onChange={e => setUserFormData({ ...userFormData, email: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="Rol (ej: Administrador, Coleccionista)" value={userFormData.role}
                            onChange={e => setUserFormData({ ...userFormData, role: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                        <input
                            type="text" placeholder="URL del Avatar / Foto" value={userFormData.avatar}
                            onChange={e => setUserFormData({ ...userFormData, avatar: e.target.value })} required
                            style={{ padding: '10px', backgroundColor: '#000', border: '1px solid #00f0ff', color: '#fff', borderRadius: '5px' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
                        <button type="submit" style={{
                            backgroundColor: '#ffe600', color: '#000', border: 'none', padding: '10px 30px',
                            borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                        }}>
                            {editingUserId ? '💾 Actualizar Usuario' : '💾 Guardar Usuario'}
                        </button>
                        {editingUserId && (
                            <button type="button" onClick={resetUserForm} style={{
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
                ⚡ Listado de Usuarios ({usersList.length})
            </h3>

            {isLoading && <p style={{ color: '#00f0ff' }}>Cargando usuarios registrados...</p>}
            {errorMessage && <p style={{ color: '#ff007f' }}>{errorMessage}</p>}

            {/* Grid */}
            {!isLoading && !errorMessage && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                    {usersList.map((userItem) => (
                        <div key={userItem.id} style={{
                            backgroundColor: '#111', border: '1px solid #00f0ff', borderRadius: '12px',
                            overflow: 'hidden', boxShadow: '0 0 12px rgba(0, 240, 255, 0.15)',
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
                                        src={userItem.avatar} alt={userItem.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                                        }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '5px' }}>{userItem.name}</h4>
                                <span style={{
                                    color: '#ffe600', fontSize: '11px', textTransform: 'uppercase',
                                    letterSpacing: '1px', display: 'block', marginBottom: '8px', fontWeight: 'bold'
                                }}>
                                    {userItem.role}
                                </span>
                                <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>
                                    {userItem.email}
                                </p>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleEditClick(userItem)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #00f0ff',
                                        color: '#00f0ff', padding: '8px', borderRadius: '6px', fontSize: '11px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(userItem.id)}
                                    style={{
                                        flex: 1, backgroundColor: 'transparent', border: '1px solid #ff007f',
                                        color: '#ff007f', padding: '8px', borderRadius: '6px', fontSize: '11px',
                                        fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
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