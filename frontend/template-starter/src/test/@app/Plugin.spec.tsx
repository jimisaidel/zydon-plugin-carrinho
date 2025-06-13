import { render, waitFor } from '@testing-library/react';

import Plugin from '@app/Plugin';

import '@testing-library/jest-dom';

describe('Plugin', () => {
  it('deve renderizar o Plugin corretamente', async () => {
    const { getByText } = render(<Plugin />);

    await waitFor(() => {
      expect(getByText('Botão do seu plugin')).toBeInTheDocument();
    });
  });
});
