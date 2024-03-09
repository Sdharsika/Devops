import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../pages/index'; // Assuming the component file is named Home.js

jest.mock('axios');

describe('Home component', () => {
  it('fetches anime suggestions and renders them correctly', async () => {
    const mockResponse = [
      {
        title: 'Sample Anime 1',
        description: 'This is a sample description for anime 1.',
        mediaType: 'TV',
        tags: "['Action', 'Adventure']",
        startYr: 2020,
        sznOfRelease: 'Spring',
        eps: 12,
        contentWarn: "['Violence', 'Language']",
      },
      {
        title: 'Sample Anime 2',
        description: 'This is a sample description for anime 2.',
        mediaType: 'Movie',
        tags: "['Comedy', 'Romance']",
        startYr: 2019,
        sznOfRelease: null,
        eps: null,
        contentWarn: "[]",
      },
    ];

    axios.post = jest.fn().mockResolvedValueOnce({ data: mockResponse });

    render(<Home />);

    const input = screen.getByPlaceholderText('Enter your genre...');
    const button = screen.getByText('Get Suggestions');

    fireEvent.change(input, { target: { value: 'Action, Adventure' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('SAMPLE ANIME 1')).toBeInTheDocument();
      expect(screen.getByText('SAMPLE ANIME 2')).toBeInTheDocument();
      // expect(screen.getByText('SAMPLE ANIME 3')).toBeInTheDocument();
    });
  });
});