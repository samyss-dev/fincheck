import { randomUUID } from 'crypto';
import { transactionType } from './transaction';

interface CategoryProps {
  id?: string;
  userId: string;
  name: string;
  icon: string;
  type: transactionType;
}

export class Category {
  constructor(private props: CategoryProps) {
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
  get icon() {
    return this.props.icon;
  }

  set icon(icon) {
    this.props.icon = icon;
  }
  get type() {
    return this.props.type;
  }

  set type(type) {
    this.props.type = type;
  }
}
