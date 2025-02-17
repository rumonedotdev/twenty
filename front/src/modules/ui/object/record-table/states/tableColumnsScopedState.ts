import { atomFamily } from 'recoil';

import { FieldMetadata } from '@/ui/object/field/types/FieldMetadata';

import { ColumnDefinition } from '../types/ColumnDefinition';

export const tableColumnsScopedState = atomFamily<
  ColumnDefinition<FieldMetadata>[],
  string
>({
  key: 'tableColumnsScopedState',
  default: [],
});
