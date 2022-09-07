class DataService {
  get(value) {
    let timeId;
    const cancelable = new Promise((resolve) => {
      console.log('GET:', value);
      const arr = [];
      for (let i = 0; i < 5; i++) {
        const set = value + '.' + i;
        arr.push(set);
      }
      timeId = setTimeout(() => resolve(arr), value === 'a' ? 3e3 : 1e3);
    });
    cancelable.clear = () => clearTimeout(timeId);
    return cancelable;
  }
}

export default DataService;
