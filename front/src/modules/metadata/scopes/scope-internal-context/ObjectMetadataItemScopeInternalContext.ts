import { ScopedStateKey } from '@/ui/utilities/recoil-scope/scopes-internal/types/ScopedStateKey';
import { createScopeInternalContext } from '@/ui/utilities/recoil-scope/scopes-internal/utils/createScopeInternalContext';

type ObjectMetadataItemScopeInternalContextProps = ScopedStateKey & {
  objectNamePlural: string;
};

export const ObjectMetadataItemScopeInternalContext =
  createScopeInternalContext<ObjectMetadataItemScopeInternalContextProps>();
