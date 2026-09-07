import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
    it('renders branding and title correctly', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText('La Buhardilla Retro')).toBeInTheDocument();
        expect(screen.getByText('🕹️')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Vendedores/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Historia/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Productos/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Usuarios/i })).toBeInTheDocument();
    });

    it('displays the city badge', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/Sevilla/i)).toBeInTheDocument();
    });
});
