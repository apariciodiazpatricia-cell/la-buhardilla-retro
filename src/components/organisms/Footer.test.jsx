import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer Component', () => {
    it('renders the footer branding and copyright text', () => {
        render(<Footer />);

        expect(screen.getByText('La Buhardilla Retro')).toBeInTheDocument();
        expect(screen.getByText(/2026 La Buhardilla Retro/i)).toBeInTheDocument();
        expect(screen.getByText(/Patri Aparicio/i)).toBeInTheDocument();
    });
});
