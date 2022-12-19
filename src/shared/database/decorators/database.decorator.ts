import { InjectModel, Schema, SchemaOptions } from '@nestjs/mongoose';

export function DatabaseModel(entity: any): ParameterDecorator {
  return InjectModel(entity.name);
}

export function DatabaseEntity(options?: SchemaOptions): ClassDecorator {
  return Schema({
    ...options,
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  });
}
