import storage from "electron-json-storage";

export class StoreService {
  private static instance: StoreService;

  put(key: string, model: object): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.set(key, model, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      storage.get(key, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data as T);
      });
    });
  }


  has(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      storage.has(key, (error, hasKey) => {
        if (error) {
          return reject(error);
        }
        resolve(hasKey);
      });
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.remove(key, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new StoreService();
    }
    return this.instance;
  }
}
