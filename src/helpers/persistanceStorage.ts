export const getItem = (key: string | null) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error gettins data from localStorage', e);
    return null;
  }
};

export const setItem = (key: string, data: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error saving data in localStorage', e);
  }
};
