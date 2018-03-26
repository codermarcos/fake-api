const common = {
  get args() {
    const args = process.argv
      .slice(2)
      .reduce(
        (prev, curr) => {
          const [key, value] = curr.split('=');
          prev[key] = value;
          return prev;  
        }, {}
      );
      
    return args;
  }
};

module.exports = common;
