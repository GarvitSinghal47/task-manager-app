import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppBarLayout from './AppBarLayout';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => jest.fn(),
}));

describe('AppBarLayout', () => {
  it('renders the children and the AppBar without errors', () => {
    const mockChildren = <div>Mock Children</div>;

    render(
      <MemoryRouter>
        <AppBarLayout>{mockChildren}</AppBarLayout>
      </MemoryRouter>,
    );

    expect(screen.getByText('Mock Children')).toBeInTheDocument();

    expect(screen.getByText('Mock Children')).toBeInTheDocument();
  });
});
