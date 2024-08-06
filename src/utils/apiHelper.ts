
export const handleRequest = async (requestFn: () => Promise<any>) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error('出错:', error);
    throw error;
  }
};