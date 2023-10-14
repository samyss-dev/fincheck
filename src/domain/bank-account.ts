import { randomUUID } from 'crypto';

export enum bankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

interface BankAccountProps {
  id?: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: bankAccountType;
  color: string;
}

export class BankAccount {
  constructor(private props: BankAccountProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
    };
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }
  get initialBalance() {
    return this.props.initialBalance;
  }

  set initialBalance(initialBalance) {
    this.props.initialBalance = initialBalance;
  }

  get type() {
    return this.props.type;
  }

  set type(type) {
    this.props.type = type;
  }

  get color() {
    return this.props.color;
  }

  set color(color) {
    this.props.color = color;
  }
}
