import { mockResponse } from './mockResponse';
export const mockFetchToReturnResponse = (status, statusText, responseBody) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(status, statusText, responseBody)));
}