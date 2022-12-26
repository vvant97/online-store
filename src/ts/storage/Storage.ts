class Storage {
  readonly _key: string;

  constructor(key: string) {
    this._key = key;
  }

  save(data: unknown) {
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  load(): unknown {
    return JSON.parse(<string>localStorage.getItem(this._key));
  }

  remove() {
    localStorage.removeItem(this._key);
  }
}

export default Storage;
