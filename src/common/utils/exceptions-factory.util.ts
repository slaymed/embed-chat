import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function exceptionFactory(errors: ValidationError[]) {
  const mappedErrors: Record<string, string> = {};

  console.log('Expection Factory Called');

  for (const err of errors) {
    if (!err.constraints) continue;
    const constraintsValues = Object.values(err.constraints);
    const defaultMessage = constraintsValues[constraintsValues.length - 1];
    const msg = defaultMessage.replaceAll(err.property + ' ', '');
    mappedErrors[err.property] = msg[0].toUpperCase() + msg.substring(1);
  }
  throw new BadRequestException(mappedErrors);
}
