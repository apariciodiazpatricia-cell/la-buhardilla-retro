import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { History } from './History';

describe('History Page Component', () => {
    it('renders the page title and manifest section', () => {
        render(<History />);

        expect(screen.getByText('Historia de La Buhardilla Retro')).toBeInTheDocument();
        expect(screen.getByText(/El Origen de una Pasión/i)).toBeInTheDocument();
    });

    it('renders all 4 timeline milestones', () => {
        render(<History />);

        expect(screen.getByText('2015')).toBeInTheDocument();
        expect(screen.getByText('2018')).toBeInTheDocument();
        expect(screen.getByText('2023')).toBeInTheDocument();
        expect(screen.getByText('Actualidad')).toBeInTheDocument();
    });
});
