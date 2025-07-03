import { z } from "zod";

const uuidSchema = z.string().uuid({ message: "Invalid UUID format" });

export class UuidValueObject {
  private constructor(private readonly value: string) {}

  static create(value: string): UuidValueObject {
    const parsed = uuidSchema.parse(value);
    return new UuidValueObject(parsed);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
