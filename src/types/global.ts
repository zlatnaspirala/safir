
export interface IDestroyerComponent {
  render: () => string;
}

export interface IOnEventDetail {
  emitter: string;
  arg: string,
  newValue: any
}

export interface IOnClickDetail {
  for : string;
  info: string;
  target: HTMLElement;
}
