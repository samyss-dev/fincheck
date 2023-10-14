import { randomUUID } from 'node:crypto';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor(private props: UserProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
    };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  set name(name) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }

  set email(email) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password) {
    this.props.password = password;
  }
}
