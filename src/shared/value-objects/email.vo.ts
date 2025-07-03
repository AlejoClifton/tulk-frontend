import { z } from "zod";

const emailSchema = z.string().email("Invalid email");

export class EmailValueObject {
  private constructor(private readonly value: string) {}

  static create(value: string): EmailValueObject {
    const parsed = emailSchema.parse(value);
    return new EmailValueObject(parsed);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
