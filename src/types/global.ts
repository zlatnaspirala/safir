
export interface IDestroyerComponent {
  render: () => string;
}

export interface IOnEventDetail {
  emitter: string;
  arg: string,
  newValue: any
}
