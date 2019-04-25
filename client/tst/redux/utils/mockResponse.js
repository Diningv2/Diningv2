export const mockResponse = (status, statusText, response) => {
    return {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    }
  };