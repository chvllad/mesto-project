class EventBusImpl {
  constructor() {
    this._evts = {};
  }
  register(id, cb) {
    this._evts[id] = cb;
  }
  emit(id, ...args) {
    this._evts[id](...args);
  }
}

export const EventBus = new EventBusImpl();
