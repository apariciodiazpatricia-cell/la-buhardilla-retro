import productsData from '../src/data/products.json';

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            const item = productsData.products.find((p) => String(p.id) === String(id));
            if (item) return res.status(200).json(item);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json(productsData.products);
    }

    if (req.method === 'POST') {
        const newItem = { id: Date.now().toString(), ...req.body };
        return res.status(201).json(newItem);
    }

    if (req.method === 'PUT') {
        return res.status(200).json({ id, ...req.body });
    }

    if (req.method === 'DELETE') {
        return res.status(200).json({ success: true, id });
    }

    return res.status(405).json({ error: 'Método no permitido' });
}
