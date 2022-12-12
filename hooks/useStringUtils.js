function useStringUtils(string = '') {
  return {
    lowerCaseHyphened: string.toLowerCase().replace(/\s+/g, '-')
  };
}

export default useStringUtils;
