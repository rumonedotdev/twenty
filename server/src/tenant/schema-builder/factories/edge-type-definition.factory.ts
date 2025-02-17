import { Injectable, Logger } from '@nestjs/common';

import { GraphQLFieldConfigMap, GraphQLObjectType } from 'graphql';

import { BuildSchemaOptions } from 'src/tenant/schema-builder/interfaces/build-schema-optionts.interface';
import { ObjectMetadataInterface } from 'src/tenant/schema-builder/interfaces/object-metadata.interface';

import { pascalCase } from 'src/utils/pascal-case';

import {
  ObjectTypeDefinition,
  ObjectTypeDefinitionKind,
} from './object-type-definition.factory';
import { EdgeTypeFactory } from './edge-type.factory';

export enum EdgeTypeDefinitionKind {
  Node = 'Node',
  Cursor = 'Cursor',
}

@Injectable()
export class EdgeTypeDefinitionFactory {
  private readonly logger = new Logger(EdgeTypeDefinitionFactory.name);

  constructor(private readonly edgeTypeFactory: EdgeTypeFactory) {}

  public create(
    objectMetadata: ObjectMetadataInterface,
    options: BuildSchemaOptions,
  ): ObjectTypeDefinition {
    const kind = ObjectTypeDefinitionKind.Edge;

    return {
      target: objectMetadata.id,
      kind,
      type: new GraphQLObjectType({
        name: `${pascalCase(objectMetadata.nameSingular)}${kind.toString()}`,
        description: objectMetadata.description,
        fields: this.generateFields(objectMetadata, options),
      }),
    };
  }

  private generateFields(
    objectMetadata: ObjectMetadataInterface,
    options: BuildSchemaOptions,
  ): GraphQLFieldConfigMap<any, any> {
    const fields: GraphQLFieldConfigMap<any, any> = {};

    fields.node = {
      type: this.edgeTypeFactory.create(
        objectMetadata,
        EdgeTypeDefinitionKind.Node,
        options,
        {
          nullable: false,
        },
      ),
    };

    fields.cursor = {
      type: this.edgeTypeFactory.create(
        objectMetadata,
        EdgeTypeDefinitionKind.Cursor,
        options,
        {
          nullable: false,
        },
      ),
    };

    return fields;
  }
}
