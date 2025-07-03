import { z } from "zod";

const phoneSchema = z
  .string()
  .min(7, "Phone is too short")
  .max(20, "Phone is too long")
  .regex(/^[\d\s()+-]+$/, "Phone contains invalid characters");

export class PhoneValueObject {
  private constructor(private readonly value: string) {}

  static create(value: string): PhoneValueObject {
    const parsed = phoneSchema.parse(value);
    return new PhoneValueObject(parsed);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
