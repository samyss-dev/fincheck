import { randomUUID } from 'crypto';

export enum transactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

interface TransactionProps {
  id?: string;
  userId: string;
  bankAccountId: string;
  categoryId?: string;
  name: string;
  date: Date;
  type: transactionType;
  value: number;
}

export class Transaction {
  constructor(private props: TransactionProps) {
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

  get bankAccountId() {
    return this.props.bankAccountId;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get date() {
    return this.props.date;
  }

  set date(date) {
    this.props.date = date;
  }

  get type() {
    return this.props.type;
  }

  set type(type) {
    this.props.type = type;
  }

  get value() {
    return this.props.value;
  }

  set value(value) {
    this.props.value = value;
  }
}
