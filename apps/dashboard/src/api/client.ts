export const apiClient = {
  get: async (endpoint: string) => {
    const res = await fetch(`http://localhost:3010${endpoint}`, {
      headers: { 'x-tenant-id': 'pitayacode' }
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
  post: async (endpoint: string, body: any) => {
    const res = await fetch(`http://localhost:3010${endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-tenant-id': 'pitayacode' 
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
};
