import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RetroImage } from './RetroImage';

describe('RetroImage Atom Component', () => {
    it('renders the correct emoji for Audio category', () => {
        render(<RetroImage title="Tocadiscos" category="Audio" />);

        expect(screen.getByText('🎵')).toBeInTheDocument();
        expect(screen.getByText('[ La Buhardilla Retro ]')).toBeInTheDocument();
    });

    it('renders the correct emoji for Tecnologia category', () => {
        render(<RetroImage title="Arcade" category="Tecnología" />);

        expect(screen.getByText('🕹️')).toBeInTheDocument();
    });
});
