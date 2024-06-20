import { render, screen } from '@testing-library/react';
import StrechedBox from './StrechedBox';

describe('StrechedBox', () => {
  it('renders children correctly', () => {
    const childrenText = 'StechedBox component';

    render(<StrechedBox>{childrenText}</StrechedBox>);

    const childrenElement = screen.getByText(childrenText);
    expect(childrenElement).toBeInTheDocument();
  });

  it('stacks children vertically when stack prop is true', () => {
    const childrenText = 'StechedBox component';
    const stack = true;

    render(<StrechedBox stack={stack}>{childrenText}</StrechedBox>);

    const boxElement = screen.getByTestId('streched-box');
    expect(boxElement).toHaveStyle('flex-direction: column');
    expect(boxElement).toHaveStyle('align-items: inherit');
  });

  it('aligns children horizontally when stack prop is false or undefined', () => {
    const childrenText = 'StechedBox component';
    const stack = false;

    render(<StrechedBox stack={stack}>{childrenText}</StrechedBox>);

    const boxElement = screen.getByTestId('streched-box');
    expect(boxElement).toHaveStyle('flex-direction: row');
    expect(boxElement).toHaveStyle('align-items: center');
  });
});
