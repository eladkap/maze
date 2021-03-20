class Config {
  constructor(txtFile) {
    this.txtFile = txtFile;
    this.setting = {};
  }

  async LoadConfigFile() {
    let lines = ReadTextFile(this.txtFile);
    await Sleep(3000);
    lines.forEach((line) => {
      if (line.includes('=')) {
        let fields = line.split('=');
        let key = fields[0].trim();
        let value = fields[1].trim();
        this.setting[key] = value;
      }
    });
  }

  Get(key) {
    return this.setting[key];
  }
}
