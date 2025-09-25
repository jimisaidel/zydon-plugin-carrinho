import { render, waitFor } from '@testing-library/react';

import Plugin from '@app/Plugin';
import { mockData } from 'mocks/data-props';

import '@testing-library/jest-dom';

describe('Plugin', () => {
  it('deve renderizar o Plugin corretamente', async () => {
    const { getByText } = render(<Plugin {...mockData.app} />);

    await waitFor(() => {
      expect(getByText('Botão do seu plugin')).toBeInTheDocument();
    });
  });
});
